const express = require("express")
const { Server: HttpServer } = require("http")
const { SocketAddress } = require("net")
const { Server: IOServer } = require("socket.io")
const Container = require("./container")

const app = express()
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

app.use(express.static("public"))
const PORT = 8080

// Comunicacion servidor-cliente
ioServer.on("connection", socket => {
    console.log("usuario conectado", socket.id)
    socket.on("disconnect", () => {
        console.log("usuario desconectado", socket.id)
    })
    socket.on("client-hostName", async socket => {
        const container = new Container("./data/players.txt")
        await container.addPlayer(socket)
        const players = await container.getPlayers()
        console.log(players)
        ioServer.sockets.emit("server-updatePlayers", players)
    })
    socket.on("client-playerName", async socket => {
        const container = new Container("./data/players.txt")
        await container.addPlayer(socket)
        const players = await container.getPlayers()
        console.log(players)
        ioServer.sockets.emit("server-updatePlayers", players)
    })
})


httpServer.listen(PORT, err => {
    if (err) throw new Error("Error en servidor")
    console.log(`Servidor en puerto: ${PORT}`)
})
