const {getGuildDoc,getRole} = require("../../utils")

module.exports = {
    name: 'reset teams',
    aliases: ['rts'],
    description: 'Resets all points for all teams',
    usage: [],
    catagory: "Setup",
    hidden: false,
    owner: false,
    guild: true,
    userPerms: ["MANAGE_ROLES"],
    runPerms: [],
	async execute(message, args) {
        try{
            let guildDoc = await getGuildDoc(message.guild.id)
            for (const team of guildDoc.teams) {
                guildDoc.teams.set(team[0],0)
            }
            let error
            error, guildDoc = await guildDoc.save()
            if(error) throw error
            message.channel.send("Reset all team points to 0")
        } catch (error) {throw error}
    }
};