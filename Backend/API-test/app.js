var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var port = 3001;
//si sube//

app.use(cors({ allowedHeaders: "Content-Type, Cache-Control" }));
app.options("*", cors()); // enable pre-flight

app.use(bodyParser.json());

app.post("/calculate", (req, res) => {
  const moneyToSpend = req.body.money;
  const chocolateprice = req.body.price;
  const chocolateWrapper = req.body.wrapper;

  let totalChocolates = Math.floor(moneyToSpend / chocolateprice);
  let remainingWrapper = totalChocolates;
  let changedChocolates = remainingWrapper;

  while (remainingWrapper >= chocolateWrapper) {
    changedChocolates = Math.floor(remainingWrapper / chocolateWrapper);
    remainingWrapper = remainingWrapper % chocolateWrapper;
    totalChocolates += changedChocolates;
    remainingWrapper += changedChocolates;
  }

  res.status(200).send({
    totalChocolates: totalChocolates,
  });
});

app.listen(port, () =>
  console.log(`Visual contact app listening on port ${port}!`)
);
