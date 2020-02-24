const {getGuildDoc,getRole} = require("../utils")
const {Collection} = require("discord.js")
module.exports = {
    name: 'join',
    aliases: ['join team'],
    description: 'Adds you to a team',
    usage: ['join [team name]'],
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
            if(!guildDoc.joinMode) return message.channel.send("You cannot join a team, an admin must add you to one manually")
            let teams = message.guild.roles.cache.filter(r => guildDoc.teams.has(r.id))
            let min = Infinity
            for (const team of teams) {
                if(team[1].members.has(message.author.id)) return message.channel.send("You are already a member of a team!")
                if(min > team[1].members.size) min = team[1].members.size
            }
            let newTeam
            if(guildDoc.joinMode == 1){
                teams = teams.filter(r => r.members.size == min)
                newTeam = teams.random()
                await message.member.roles.add(newTeam)
                return message.channel.send(`Added you to ${newTeam.name}!`)
            }
            if(guildDoc.joinMode == 2){
                newTeam = await getRole(args.join(" "),message.guild)
                if(!teams.has(newTeam.id)) return message.channel.send("That is not a valid team!")
                await message.member.roles.add(newTeam)
                return message.channel.send(`Added you to ${newTeam.name}!`)
            }
        } catch (error) {throw error}
    }
};