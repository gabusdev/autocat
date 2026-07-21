import { IAutoCatLogger } from "../log/index.js";
import { AutoCatPipeline } from "../pipeline/index.js";
export declare class AutoCatScheduler<TStore> {
    private readonly pipeline;
    private readonly intervalMs;
    private readonly getStore;
    private readonly logger?;
    private timer?;
    private running;
    constructor(pipeline: AutoCatPipeline<TStore>, intervalMs: number, getStore: () => TStore, logger?: IAutoCatLogger | undefined);
    start(): void;
    stop(): void;
    executeOnce(): Promise<void>;
    isRunning(): boolean;
    private getLogger;
}
