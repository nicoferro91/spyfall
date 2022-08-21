// document.getElementById("MyElement").classList.add('MyClass');
// document.getElementById("MyElement").classList.remove('MyClass');

const socket = io().connect()

const gameCreate = ()=>{
    const playerName = document.querySelector("#playerName").value
    if(playerName) {
        console.log("game created")
        socket.emit("client-hostName", playerName)
        document.querySelector("#gameChoice").classList.add('d-none')
        const playersList = document.querySelector("#playersList")
        const newPlayer = document.createElement("li")
        newPlayer.innerText = playerName
        playersList.appendChild(newPlayer)
    }
}

const gameJoin = ()=>{
    const playerName = document.querySelector("#playerName").value
    if(playerName) {
        console.log("joined game")
        socket.emit("client-playerName", playerName)
        document.querySelector("#gameChoice").classList.add('d-none')
        const playersList = document.querySelector("#playersList")
        const newPlayer = document.createElement("li")
        newPlayer.innerText = playerName
        playersList.appendChild(newPlayer)
    }
}

const updatePlayers = (players) => {
    const playersList = document.querySelector("#playersList")
    playersList.innerHTML = ""
    console.log(players)
    players.forEach(player => {
        const newPlayer = document.createElement("li")
        newPlayer.innerText = player
        playersList.appendChild(newPlayer)
    })
}

socket.on("server-updatePlayers", players => {
    updatePlayers(players)
})