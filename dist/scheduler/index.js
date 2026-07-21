export class AutoCatScheduler {
    pipeline;
    intervalMs;
    getStore;
    logger;
    timer;
    running = false;
    constructor(pipeline, intervalMs, getStore, logger) {
        this.pipeline = pipeline;
        this.intervalMs = intervalMs;
        this.getStore = getStore;
        this.logger = logger;
    }
    start() {
        if (this.timer) {
            return; // already started
        }
        this.getLogger().system(`Starting scheduler for pipeline: ${this.pipeline.name}`);
        this.timer = setInterval(() => {
            void this.executeOnce();
        }, this.intervalMs);
    }
    stop() {
        if (!this.timer) {
            return;
        }
        clearInterval(this.timer);
        this.timer = undefined;
    }
    async executeOnce() {
        if (this.running) {
            this.getLogger().warn("Execution skipped because another run is in progress");
            return;
        }
        this.running = true;
        try {
            await this.pipeline.run(this.getStore());
        }
        catch (error) {
            if (error instanceof Error) {
                this.getLogger().error(`Unhandled error in scheduler: ${error.name}: ${error.message}`);
            }
            else {
                this.getLogger().error(`Unhandled error in scheduler: ${error}`);
            }
        }
        finally {
            this.running = false;
        }
    }
    isRunning() {
        return this.running;
    }
    getLogger() {
        return this.logger ?? this.pipeline.logger;
    }
}
