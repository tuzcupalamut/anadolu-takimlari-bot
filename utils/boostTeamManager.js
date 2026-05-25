const fs = require("fs");

const PATH =
"./data/boostTeams.json";

function getTeams() {

if (
!fs.existsSync(PATH)
) {

fs.writeFileSync(
PATH,
"[]"
);

}

return JSON.parse(

fs.readFileSync(
PATH,
"utf8"
)

);

}

function saveTeams(
teams
) {

fs.writeFileSync(

PATH,

JSON.stringify(
teams,
null,
2
)

);

}

function addTeam(
team
) {

const teams =
getTeams();

teams.push(
team
);

saveTeams(
teams
);

}

module.exports = {

getTeams,
saveTeams,
addTeam

};