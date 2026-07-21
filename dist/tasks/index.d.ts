import { IAutoCatLogger } from "../log/index.js";
export type AutoCatTask<TStore> = (input: TStore, logger: IAutoCatLogger) => TStore | Promise<TStore>;
