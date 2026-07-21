import { IAutoCatLogger } from "../log/index.js";
export declare class AutoCatException extends Error {
    private logger;
    readonly useWarningLog: boolean;
    readonly skipCurrentPipeline: boolean;
    constructor(message: string, logger: IAutoCatLogger, config?: {
        useWarningLog?: boolean;
        skipCurrentPipeline?: boolean;
    });
    logMessage(): void;
}
