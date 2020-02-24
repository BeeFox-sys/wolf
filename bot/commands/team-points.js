const {getGuildDoc,getRole} = require("../utils")
module.exports = {
    name: 'reward',
    aliases: [],
    description: 'Rewards a team points\nCan be a negitive number',
    usage: ['reward <team> <points>'],
    catagory: "General",
    hidden: false,
    owner: false,
    guild: true,
    userPerms: ['MANAGE_ROLES'],
    runPerms: [],
	async execute(message, args) {
        try{
            let guildDoc = await getGuildDoc(message.guild.id)
            let points = parseInt(args.pop())
            if(isNaN(points)) return message.channel.send("That is not a valid number of points!")
            let team = await getRole(args.join(" "),message.guild)
            if(!guildDoc.teams.has(team.id)) return message.channel.send("That is not a team!")
            let currentPoints = guildDoc.teams.get(team.id)
            guildDoc.teams.set(team.id,currentPoints+points)
            let error
            error,guildDoc = await guildDoc.save()
            if(error) throw error
            if(points<0) return message.channel.send(`${Math.abs(points)} taken from ${team}. 😢`)
            return message.channel.send(`${points} rewarded to ${team}! 🎉`)
        } catch (error) {throw error}
    }
};