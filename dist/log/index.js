export class ConsoleAutoCatLogger {
    format(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }
    info(message) {
        console.info("\x1b[36m%s\x1b[0m", this.format("INFO", message));
    }
    warn(message) {
        console.warn("\x1b[33m%s\x1b[0m", this.format("WARN", message));
    }
    error(message) {
        console.error("\x1b[31m%s\x1b[0m", this.format("ERROR", message));
    }
    system(message) {
        console.log("\x1b[35m%s\x1b[0m", this.format("SYSTEM", message));
    }
}
