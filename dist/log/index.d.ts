export interface IAutoCatLogger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    system(message: string): void;
}
export declare class ConsoleAutoCatLogger implements IAutoCatLogger {
    private format;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    system(message: string): void;
}
