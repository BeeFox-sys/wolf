module.exports = {
    name: 'about',
    aliases: ['info'],
    description: 'About the bot',
    usage: [],
    catagory: "Misc",
    hidden: false,
    owner: false,
    guild: false,
    userPerms: [],
    runPerms: [],
	async execute(message, args) {
        try{
            message.channel.send(
```This bot is part of the animal helper bot series. Wolf helps create teams and have a guild team board. Imagine houses from Harry Potter, each user can gain points and through that support a team```
            )
        } catch (error) {throw error}
    }
};