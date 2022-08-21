const fs = require("fs")
class Container {
    constructor(route) {
        this.route = route
    }
    // Agregar un jugador en un grupo
    async addPlayer(player) {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            console.log(dataParse)
            // const group = dataParse.length
            // console.log(group)
            dataParse.push(player)
            await fs.promises.writeFile(this.route, JSON.stringify(dataParse, null, 2))
        } catch (error) {
            console.log(error)
        }
    }
    // Borrar un jugador

    // Devolver un grupo
    async getPlayers() {
        try {
            let data = await fs.promises.readFile(this.route, "utf8")
            let dataParse = JSON.parse(data)
            return dataParse
        } catch (error) {
            console.log(error)
        }
    }
    // Borrar un grupo
    
}
module.exports = Container