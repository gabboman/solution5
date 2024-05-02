export const environment = {
    port: 3002,
    validMediaFormats: ["png", "jpg", "webp"],
    useImageCache: true,
    //time in seconds to cache a link response
    cacheLinkExpiryTime: 300,
    //bullmq redis db. Could theoretically be the same db as the cache one for links but I like to keep them separated
    bullmqConnection: {
        host: 'localhost',
        port: 6379,
        db: 4
      },
      // second database used for cache
      redisioConnection: {
        host: 'localhost',
        port: 6379,
        db: 5
      },
}