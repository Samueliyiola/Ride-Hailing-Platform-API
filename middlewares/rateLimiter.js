import rateLimit from "express-rate-limit";
// To avoid a single user from congesting the server with muliple requests and also to prevent bruteforce hacking approcah on endpoints like login.

const limiter = rateLimit({
    windowMs : 1000 * 60 * 5,
    max : 20,
    message : "You have tried multiple times, please try later!",
    standardHeaders : true,
    legacyHeaders : false
})


export default limiter;