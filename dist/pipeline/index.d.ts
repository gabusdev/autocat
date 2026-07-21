import { IAutoCatLogger } from "../log/index.js";
import { AutoCatTask } from "../tasks/index.js";
export declare class AutoCatPipeline<TStore> {
    readonly name: string;
    readonly logger: IAutoCatLogger;
    private readonly tasks;
    constructor(name: string, logger: IAutoCatLogger);
    add(task: AutoCatTask<TStore>): this;
    run(initialStore: TStore): Promise<TStore>;
}
