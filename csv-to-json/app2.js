var fs = require("fs");
console.log("\n *START* \n");
var content = fs.readFileSync("output.json");
console.log("Output Content : \n"+ content);
console.log("\n *EXIT* \n");
