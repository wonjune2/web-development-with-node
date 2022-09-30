const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;

const serveStaticFile = (res, path, contentType, responseCode = 200) => {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("500 - internal Error");
    }
    res.writeHead(responseCode, { "Content-Type": contentType });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  // 쿼리스트링, 옵션인 마지막 슬래시를 없애고 소문자로 바꿔서 url을 정규화 합니다.
  const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
  switch (path) {
    case "":
      serveStaticFile(res, "/public/home.html", "text/html");
      break;
    case "/about":
      serveStaticFile(res, "/public/about.html", "text/html");
      break;
    case "/img/logo.png":
      serveStaticFile(res, "/public/img/logo.png", "image/png");
    default:
      serveStaticFile(res, "public/404.html", "text/html", 404);
  }
});

server.listen(port, () =>
  console.log(`serverr started on port ${port}: press Crtl-C to terminate`)
);
