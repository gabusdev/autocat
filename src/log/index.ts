export interface IAutoCatLogger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    system(message: string): void;
}

export class AutoCatLogger implements IAutoCatLogger {
    info(message: string) {
        console.log(message);
    }
    warn(message: string) {
        console.warn(message);
    }
    error(message: string) {
        console.error(message);
    }
    system(message: string) {
        console.log(`##system## ${message}`);
    }
}