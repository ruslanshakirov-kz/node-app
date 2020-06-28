const app = require("express")();
const redis = require("redis");
const ps = require('process');
const client = redis.createClient({
    host: "redis-server",
    port: 6379
});

client.set("visits", 0);
app.get("/crash", (req, res) => {
    ps.exit(0);
})

app.get("/", (req, res) => {

    client.get("visits", (err, visits) => {
        visits = parseInt(visits) + 1;
        client.set("visits", visits)
        res.send("Number of visits: " + visits);
    })
})

app.listen(8080, () => {
    console.log("listening")
})