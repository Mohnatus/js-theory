let http = require("http"),
  rp = require("request-promise"),
	cheerio = require("cheerio");

let	sources = {
  "yandex": {
    url: "https://yandex.ru/pogoda/moscow",
    el: ".fact__temp .temp__value",
    unit: "C"
  },
  "gismeteo": {
    url: "https://www.gismeteo.ru/weather-moscow-4368/now/",
    el: ".now__weather .nowvalue__text_l",
    unit: 'C'
  }
};

let promises = [];

let getData = (response) => {
  for (let src in sources) {
    let source = sources[src];

    let promise = rp(source.url)
      .then(html => {
        let $ = cheerio.load(html);
        let temp = $(source.el).text() + source.unit;
        return {
          src: src,
          value: temp
        };
      });
    promises.push(promise);
      

    // request(source.url, (err, res, body) => {
    //   if (err) {
    //     console.log("Error: " + error);
    //     return;
    //   }

    //   let $ = cheerio.load(body);
    //   let temp = $(source.el).text() + source.unit;

    //   response.writeHead(200, {"Content-Type": "text/plain"});
    //   response.end(`Источник: ${src}, температура: ${temp}`);
    // })
  };

  Promise.all(promises)
    .then(values => {
      let str = "";
      values.forEach(data => {
        str += `Source: ${data.src}, temperature: ${data.value}<br>`
      });
      response.end(str);
    });
};

let server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  getData(res);
  
});

server.listen(3000);

  

