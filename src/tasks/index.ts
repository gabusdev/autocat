import { IAutoCatLogger } from "../log";

export type AutoCatTask<TStore> = (input: TStore, logger: IAutoCatLogger) => TStore | Promise<TStore>;