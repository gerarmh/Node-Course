const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modeules.js/replace-templates");
//Bloqueo de forma sincrona
//const textIn = fs.readFileSync('1-node-farm/starter/txt/input.txt', 'utf-8');
//console.log(textIn);

//const textOut = `This is what we know about avocado : ${textIn}.\nCreated on ${Date.now()}`;
//fs.writeFileSync('1-node-farm/starter/txt/output.txt',textOut);
//console.log('File written!');

// ejercicio de no bloqueo de forma sincrona

//fs.readFile('1-node-farm/starter/txt/start.txt', 'utf-8' , (err, data1)=> {

//      if(err) return console.log('ERROR!!');

//fs.readFile(`1-node-farm/starter/txt/${data1}.txt`, 'utf-8' , (err, data2)=> {
//  console.log(data2);
//
//  fs.readFile('1-node-farm/starter/txt/append.txt', 'utf-8' , (err, data3)=> {
//    console.log(data3);
//
//      fs.writeFile('1-node-farm/starter/txt/final.txt',`${data2}\n${data3}` ,'utf-8', err=>  {
//        console.log('Your File has been written!! Congratulations');

//  })

//});

//});

//});
//console.log('Will read file!!');
/////////////////////////
//SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-overview.html`,
  "utf8"
);

const tempCard = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-card.html`,
  "utf8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-product.html`,
  "utf8"
);

////////////////////////
const data = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/dev-data/data.json`,
  "utf8"
);
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lowercase: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //const pathname = req.url;

  //Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);
  }
  //ProductPage
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  //API PAGE
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  //NOT FOUND PAGE
  else {
    res.writeHead(404, {
      "content-Type": "Text/HTML",
      "My-owm-header": "hello-world",
    });
    res.end("PAGE NOT FOUND");
  }
});

//-----------------Listen the open o closed server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the request on port 8000");
});
