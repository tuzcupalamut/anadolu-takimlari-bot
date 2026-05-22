const buildPanel =
require(
"../utils/buildPanel"
);

const {
getConfig,
savePanelId
}

=

require(
"../utils/panelManager"
);

module.exports =
async client => {

const config =
getConfig();

if (
!config.panelChannelId
)
return;

const channel =

await client.channels.fetch(

config.panelChannelId

);

if (
!channel
)
return;

try {

await channel.messages.fetch(

config.panelMessageId

);

}

catch {

const msg =

await channel.send(

buildPanel(

config.embedColor

)

);

savePanelId(
msg.id
);

console.log(
"Panel geri oluşturuldu."
);

}

};