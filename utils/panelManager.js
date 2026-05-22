const fs =
require("fs");

const path =
"./config.json";

function getConfig() {

return JSON.parse(
fs.readFileSync(
path,
"utf8"
)
);

}

function savePanelId(
id
) {

const config =
getConfig();

config.panelMessageId =
id;

fs.writeFileSync(

path,

JSON.stringify(
config,
null,
2
)

);

}

module.exports = {

getConfig,

savePanelId

};