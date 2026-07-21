export interface IAutoCatLogger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    system(message: string): void;
}

export class ConsoleAutoCatLogger implements IAutoCatLogger {
    private format(level: string, message: string): string {
        const timestamp = new Date().toISOString();

        return `[${timestamp}] [${level}] ${message}`;
    }

    info(message: string): void {
        console.info("\x1b[36m%s\x1b[0m", this.format("INFO", message));
    }

    warn(message: string): void {
        console.warn("\x1b[33m%s\x1b[0m", this.format("WARN", message));
    }

    error(message: string): void {
        console.error("\x1b[31m%s\x1b[0m", this.format("ERROR", message));
    }

    system(message: string): void {
        console.log("\x1b[35m%s\x1b[0m", this.format("SYSTEM", message));
    }
}