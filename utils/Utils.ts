export const timer = <T>(fn: () => Promise<T>, timeout: number) => {
    return new Promise<T>((resolve, reject) => {
        const timerId = setTimeout(() => {
            reject("Function timed out");
        }, timeout);

        fn().then(result => {
            clearTimeout(timerId);
            resolve(result);
        }).catch(reject);
    });
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));