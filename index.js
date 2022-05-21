const axios = require("axios");

const express = require("express");

var morgan = require("morgan");

const app = express();
const port = process.env.PORT || 5000;

//
app.use(morgan("combined"));
//

app.get("/", (req, res) => {
  res.send("Pito Blog Ping 1! v1");
});

app.listen(port, () => {
  console.log(`App are running!`);
});

// PING
let appDomain = "https://pitoblog-ping1.herokuapp.com/";
let pingUrls = ["https://pitoghichep.com/ping", appDomain];
let pingGapTime = 5 * 60 * 1000;

ping(pingUrls);
setInterval(() => {
  let utcDate = new Date();
  let h = utcDate.getUTCHours();
  if (h >= 0 && h <= 12) {
    ping(pingUrls);
  }
}, pingGapTime);

function ping(urls) {
  urls.forEach((url) => {
    axios
      .get(url)
      .then((_) => {
        console.log(_.data);
        console.log(`Make ${url} alive! - from ${appDomain}`);
      })
      .catch((e) => {
        console.log("Failed to ping -", e);
      });
  });
}
