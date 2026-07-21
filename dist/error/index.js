export class AutoCatException extends Error {
    logger;
    useWarningLog;
    skipCurrentPipeline;
    constructor(message, logger, config) {
        super(message);
        this.logger = logger;
        this.useWarningLog = config?.useWarningLog ?? true;
        this.skipCurrentPipeline = config?.skipCurrentPipeline ?? true;
    }
    logMessage() {
        if (this.useWarningLog) {
            this.logger.warn(this.message);
        }
        else {
            this.logger.error(this.message);
        }
    }
}
