import { IAutoCatLogger } from "../log";
import { AutoCatTask } from "../tasks";

export class AutoCatPipeline<TStore> {
    private tasks: AutoCatTask<TStore>[] = [];
    private logger: IAutoCatLogger;
    private name: string;

    constructor(name: string, logger: IAutoCatLogger) {
        this.name = name;
        this.logger = logger;
    }

    add(task: AutoCatTask<TStore>): this {
        this.tasks.push(task);
        return this;
    }

    async run(
        initialStore: TStore,
    ): Promise<TStore> {
        let store = initialStore;

        this.logger.system(`Running pipeline: ${this.name}`);

        for (const [index, task] of this.tasks.entries()) {
            this.logger.system(`Running task (${index + 1}/${this.tasks.length} of ${this.name}): ${task.name}`);
            store = await task(store, this.logger);
        }

        return store;
    }
}