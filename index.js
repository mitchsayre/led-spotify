var position = 0
var song
var tid
var starts = []
var is_open = true

window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token) }
    })

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message) })
    player.addListener('authentication_error', ({ message }) => { console.error(message) })
    player.addListener('account_error', ({ message }) => { console.error(message) })
    player.addListener('playback_error', ({ message }) => { console.error(message) })

    // Playback status updates
    player.addListener('player_state_changed', state => {
        // // console.log(state)
        // // console.log('Currently Playing', state.track_window.current_track);
        // // clearInterval(tid)
        // position = state.position
        // console.log('taco', state.track_window.current_track.id, song)
        // if (state.track_window.current_track != song) {
        //     console.log('')
        //     song = state.track_window.current_track.id
        //     starts = []
        //     if (!is_waiting) {
        //         httpGetSong(song, token)
        //     }    
        // }
        // if (!state.paused)
        // tid = setInterval(() => {
        //     position++
        //     if (starts.includes(position)) {
        //         changeColor()
        //     }
        // }, 1)
        if (is_open && !(is_open = !is_open)) {
            setTimeout(console.log(state), 3000)
            is_open = true
        }
    })

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
    })

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    // Connect to the player!
    player.connect()
}

const getRandomColor = ()=> {
    let letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

const changeColor = ()=> {
    let div = document.getElementsByClassName('container')[0]
    div.style.backgroundColor = getRandomColor() 
}

// id: spotify song id, token: OAuth token
const httpGetSong = (id, token) => {
    is_waiting = true;
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
                starts[i] = beat.start
            })
            is_waiting = false
        }
    }
    xhr.send()
}

// document.addEventListener("DOMContentLoaded", () => {
//     httpGetSong(song, token)
// })
