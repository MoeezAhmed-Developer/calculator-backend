const http = require("http");
const queryString = require("querystring");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      res.setHeader("Content-Type", "text/html");
      res.write(
        `<h1>Welcome to Advanced Calculator</h1>
        <a href="/calculator">Calculator</a>`,
      );
      res.end();
    } else if (req.url == "/calculator") {
      res.setHeader("Content-Type", "text/html");
      res.write(
        `<form action="/calculator-result" method="post">
           <input type="number" placeholder="Enter a number ...." name="calc1" />
           <input type="number" placeholder="Enter a number ...." name="calc2" />
           <button>Sum</button>
           </form>`,
      );
      res.end();
    } else if (req.url == "/calculator-result") {
      let data = [];
      req.on("data", (chunk) => {
        data.push(chunk);
      });

      req.on("end", () => {
        let rawData = Buffer.concat(data).toString();
        let finalData = queryString.parse(rawData);
        const result = Number(finalData.calc1) + Number(finalData.calc2);

        res.seHeader("Content-Type", "text/html");
        res.write(`
            <h2>Result</h2>
            <h3>Your Calculation Result is <i>${result}</i></h3>
        `);
        res.end();
      });
    }
  })
  .listen(3200);

// https://github.com/MoeezAhmed-Developer/calculator-backend.git
//
