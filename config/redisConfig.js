import Redis from "ioredis";

const redis = new Redis({
    host : "127.0.0.1",
    port : 6379
});

redis.on("connect", () =>{
    console.log("Redis connected");
});

redis.on("error", (error) =>{
    console.log("Redis error detected: " + error);
});


export default redis;