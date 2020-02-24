const {getGuildDoc} = require("../utils")
const {Collection} = require("discord.js")
module.exports = {
    name: 'leaderboard',
    aliases: ['scores','teams'],
    description: 'Displays the teams leaderbord',
    usage: [],
    catagory: "General",
    hidden: false,
    owner: false,
    guild: true,
    userPerms: [],
    runPerms: [],
	async execute(message, args) {
        try{
            let guildDoc = await getGuildDoc(message.guild.id)
            if(!guildDoc.teams.size) return message.channel.send("This guild has no teams yet!")
            let response = `> ${message.guild.name} team leaderboard`
            let teams  = new Collection(guildDoc.teams)
            teams.sort((a,b)=>{
                return b - a 
            })
            for (const team of teams) {
                let teamRole = await message.guild.roles.resolve(team[0])
                response += `\n**${teamRole.name}** (${teamRole.members.size} members): ${team[1]} points`
            }
            message.channel.send(response)
        } catch (error) {throw error}
    }
};