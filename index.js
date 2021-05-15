const getRandomColor = ()=> {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const changeColor = ()=> {
    let div = document.getElementsByClassName('container')[0]
    div.style.backgroundColor = getRandomColor() 
}

// id: spotify song id, token: OAuth token
const httpGetSong = (id, token) => {
    let xhr = new XMLHttpRequest()
    xhr.withCredentials = false

    xhr.open("GET", `https://api.spotify.com/v1/audio-analysis/${id}`)
    xhr.setRequestHeader('Content-Type', 'application/xml')
    xhr.setRequestHeader("Authorization", `Bearer ${token}`)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            changeColor()
            let res = JSON.parse(xhr.responseText)
            console.log(res)
            res.beats.map((beat, i) => {
                setTimeout(() => {changeColor()}, beat.start * 1000)
            })
            


        }
    }
    xhr.send()
}

document.addEventListener("DOMContentLoaded", () => {
    httpGetSong(song, token)
})
