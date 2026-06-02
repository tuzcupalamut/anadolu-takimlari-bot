const {
EmbedBuilder
} = require("discord.js");

module.exports =
async member => {

const welcomeChannelId =
"1504379038163140690";

const panelChannelId =
"1504379038163140696";

const channel =

member.guild.channels.cache.get(
welcomeChannelId
);

if (
!channel
)
return;

const embed =

new EmbedBuilder()

.setColor(
"#0f2f6b"
)

.setTitle(
"🏟️ Anadolu Şampiyonası"
)

.setDescription(

`
👋 Aramıza hoş geldin ${member}

🏟️ Takım rolünü almak için:

<#${panelChannelId}>
`

)

.setThumbnail(

member.user.displayAvatarURL()

)

.setFooter({

text:

`Toplam üye • ${member.guild.memberCount}`

})

.setTimestamp();

channel.send({

embeds:[
embed
]

});

};