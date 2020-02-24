const {getGuildDoc,getRole} = require("../../utils")

module.exports = {
    name: 'create team',
    aliases: ['ct','add team'],
    description: 'Creates a team',
    usage: [`create team <role>`],
    catagory: "Setup",
    hidden: false,
    owner: false,
    guild: true,
    userPerms: ["MANAGE_ROLES"],
    runPerms: [],
	async execute(message, args) {
        try{
            let role = await getRole(args.join(" "),message.guild)
            if(!role) return message.channel.send("That isn't a valid role!")
            let guildDoc = await getGuildDoc(message.guild.id)
            if(guildDoc.teams.has(role.id)) return message.channel.send("That team already exists!")
            guildDoc.teams.set(role.id,0)
            let error
            error, guildDoc = await guildDoc.save()
            if(error) throw error
            message.channel.send("Created team!")
        } catch (error) {throw error}
    }
};