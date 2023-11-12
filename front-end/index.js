const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(express.json());

app.use(
  "/api/search/:topic",
  createProxyMiddleware({
    target: "http://192.168.42.1:3333",
    pathRewrite: {
      "^/api/search": "/api/search",
    },
  }),
  (req, res) => {
    res.send(req);
  }
);

app.use(
  "/api/info/:itemNumber",
  createProxyMiddleware({
    target: "http://192.168.42.1:3333",
    pathRewrite: {
      "^/api/info": "/api/info",
    },
  }),
  (req, res) => {
    res.send(req);
  }
);

app.use(
  "/api/purchase/:itemNumber",
  createProxyMiddleware({
    target: "http://192.168.42.1:4444",
    pathRewrite: {
      "^/api/purchase": "/api/purchase",
    },
  }),
  (req, res) => {
    res.send(req);
  }
);

const port = 2222;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
