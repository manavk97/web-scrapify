export class Logger {
    private enableLogging: boolean;

    constructor(enableLogging: boolean) {
        this.enableLogging = enableLogging;
    }

    log(message?: any, ...optionalParams: any[]) {
        if(this.enableLogging) {
            console.log(message, ...optionalParams);
        }
    }

    error(message?: any, ...optionalParams: any[]) {
        if(this.enableLogging) {
            console.error(message, ...optionalParams);
        }
    }   

    info(message?: any, ...optionalParams: any[]) {
        if(this.enableLogging) {
            console.info(message, ...optionalParams);
        }
    }

    warn(message?: any, ...optionalParams: any[]) {
        if(this.enableLogging) {
            console.warn(message, ...optionalParams);
        }
    }
}