import { IAutoCatLogger } from "../log";

export class AutoCatException extends Error {
    private logger: IAutoCatLogger
    public readonly useWarningLog: boolean
    public readonly skipCurrentPipeline: boolean

    constructor(message: string, logger: IAutoCatLogger, config?: { useWarningLog?: boolean, skipCurrentPipeline?: boolean }) {
        super(message);
        this.logger = logger
        this.useWarningLog = config?.useWarningLog ?? true
        this.skipCurrentPipeline = config?.skipCurrentPipeline ?? true
    }

    logMessage() {
        if (this.useWarningLog) {
            this.logger.warn(this.message)
        } else {
            this.logger.error(this.message)
        }
    }
}