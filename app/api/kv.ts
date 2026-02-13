import { Redis } from '@upstash/redis';

export const kv = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || "https://example.com",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "example_token",
});