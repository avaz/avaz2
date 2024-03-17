import fs from "fs";
const JSON5 = require("json5");

const [file] = process.argv.slice(2);

const cv = JSON5.parse(fs.readFileSync(file, "utf-8"));

fs.writeFileSync(
  file.replace(/\.json5$/, ".json"),
  JSON.stringify(cv, null, " "),
);
