const {getGuildDoc,getRole} = require("../../utils")

module.exports = {
    name: 'delete team',
    aliases: ['dt'],
    description: 'Deletes a team',
    usage: [`delete team <role>`],
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
            if(!guildDoc.teams.has(role.id)) return message.channel.send("That team doesn't exist!")
            guildDoc.teams.delete(role.id)
            let error
            error, guildDoc = await guildDoc.save()
            if(error) throw error
            message.channel.send("Deleted team!")
        } catch (error) {throw error}
    }
};