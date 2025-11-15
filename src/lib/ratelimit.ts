import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl || !redisToken) {
  console.warn("[ratelimit] UPSTASH env vars are not set. Rate limiting is disabled.");
}

const redis = redisUrl && redisToken
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : undefined;

export const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requêtes / minute / IP
    })
  : {
      // Fallback no-op ratelimit quand Redis n'est pas configuré
      limit: async () => ({ success: true, remaining: 999, reset: 0 }),
    };
