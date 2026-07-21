import { IAutoCatLogger } from "../log";
import { AutoCatPipeline } from "../pipeline";

export class AutoCatScheduler<TStore> {
    private timer?: number;
    private running = false;

    constructor(
        private readonly pipeline: AutoCatPipeline<TStore>,
        private readonly intervalMs: number,
        private readonly getStore: () => TStore,
        private readonly logger?: IAutoCatLogger
    ) { }

    start(): void {
        if (this.timer) {
            return; // already started
        }

        this.getLogger().system(`Starting scheduler for pipeline: ${this.pipeline.name}`);

        this.timer = setInterval(() => {
            void this.executeOnce();
        }, this.intervalMs);
    }

    stop(): void {
        if (!this.timer) {
            return;
        }

        clearInterval(this.timer);
        this.timer = undefined;
    }

    async executeOnce(): Promise<void> {
        if (this.running) {
            this.getLogger().warn(
                "Execution skipped because another run is in progress"
            );
            return;
        }

        this.running = true;

        try {
            await this.pipeline.run(
                this.getStore()
            );
        } catch (error) {
            //   this.getLogger().error(error);
        } finally {
            this.running = false;
        }
    }

    isRunning(): boolean {
        return this.running;
    }

    private getLogger(): IAutoCatLogger {
        return this.logger ?? this.pipeline.logger
    }
}