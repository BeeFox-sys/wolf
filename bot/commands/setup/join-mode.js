const {getGuildDoc,getRole} = require("../../utils")

module.exports = {
    name: 'join mode',
    aliases: ['jm'],
    description: 'Changes the team join mode\n**Assign**: The join command is disabled, and admins manage the team roles\n**Random**: The join command adds the user to a psudo-random team\n**Choice**:The join command allows the user to join a team of their choosing',
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
            let joinModes = {
                0: "assign",
                1: "random",
                2: "choice"
            }
            switch(args.join(" ").toLowerCase()){

                case "assign":
                    guildDoc.joinMode = 0
                    break

                case "random":
                    guildDoc.joinMode = 1
                    break

                case "choice":
                    guildDoc.joinMode = 2
                    break

                default:
                    return message.channel.send(`Current join mode is ${joinModes[guildDoc.joinMode]}\n**Assign**: The join command is disabled, and admins manage the team roles\n**Random**: The join command adds the user to a psudo-random team\n**Choice**:The join command allows the user to join a team of their choosing`)
            }
            let error
            error, guildDoc = await guildDoc.save()
            if(error) throw error
            message.channel.send(`Set join mode to ${joinModes[guildDoc.joinMode]}`)
        } catch (error) {throw error}
    }
};