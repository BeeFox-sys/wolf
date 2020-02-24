const Mongoose = require.main.require("mongoose")


let guild = new Mongoose.Schema({
    id: String,
    teams: {type:Map,default: new Map()},
    joinMode: {type: Number, min:0,max:2,default:0}
})
let user = new Mongoose.Schema({
    id: String
})


module.exports = {
    users: Mongoose.model('users', user),
    guilds: Mongoose.model('guilds',guild)
}