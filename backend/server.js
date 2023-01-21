var express = require('express');  
var fs = require("fs")
var bodyParser = require('body-parser');  
var cors = require("cors");
var nodeCmd = require("node-cmd")
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

var app = express();  

app.use(express.static('public'));  
app.use(cors())

app.get("/", (req, res) => {
  res.send("test done")
})

app.post("/save-file", bodyParser.json(), async (req, res) => {
  // console.log(req.body)
  const code = req.body.code
  await fs.writeFileSync("./input.py", code)
  await fs.writeFileSync("./output.txt", "")
  await nodeCmd.runSync("python3 input.py > output.txt")
  res.end(JSON.stringify("done"))
})

app.get("/output", bodyParser.text(), async (_, res) => {
  const data = await fs.readFileSync("./output.txt")
  console.log(data)
  res.send(data)
})

const run = async () => {
  console.log("listening at http://localhost:5000")  
}
app.listen(5000, run)  