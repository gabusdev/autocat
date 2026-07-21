import { AutoCatException } from "../error/index.js";
export class AutoCatPipeline {
    name;
    logger;
    tasks = [];
    constructor(name, logger) {
        this.name = name;
        this.logger = logger;
    }
    add(task) {
        this.tasks.push(task);
        return this;
    }
    async run(initialStore) {
        let store = initialStore;
        this.logger.system(`Running pipeline: ${this.name}`);
        for (const [index, task] of this.tasks.entries()) {
            this.logger.system(`Running task (${index + 1}/${this.tasks.length} of ${this.name}): ${task.name}`);
            try {
                store = await task(store, this.logger);
            }
            catch (error) {
                if (error instanceof AutoCatException) {
                    error.logMessage();
                    if (error.skipCurrentPipeline) {
                        this.logger.system(`Skipping pipeline: ${this.name} due to error ${error.name}`);
                        break;
                    }
                    else {
                        this.logger.system(`Continuing pipeline: ${this.name} after error ${error.name}`);
                        continue;
                    }
                }
                if (error instanceof Error) {
                    this.logger.error(`Unhandled error: ${error.name}: ${error.message}`);
                    break;
                }
                else {
                    this.logger.error(`Unexpected error: ${error}`);
                }
            }
        }
        return store;
    }
}
