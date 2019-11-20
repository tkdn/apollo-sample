import Redis = require("ioredis");

export const cacheClient = new Redis({
    maxRetriesPerRequest: 10,
    reconnectOnError() {
        return true;
    },
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});
cacheClient.on("error", console.log);
