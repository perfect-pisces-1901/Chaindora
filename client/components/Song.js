import React from 'react';

export default function Song(props) {
  const song = props.song
  const togglePlay = props.togglePlay
  const currentSong = props.currentSong
  const audioTime = props.audioTime
  const audioDuration = props.audioDuration
  const paused = props.paused
  const title = song.title
  const artist = song.artist
  const hash = song.hash
  const uri = `https://gateway.ipfs.io/ipfs/${hash}`
  const secondsToMMSS = (seconds) => {
    seconds = +seconds
    const mm = Math.floor(seconds / 60)
    const ss = ('00' + (seconds % 60)).slice(-2)
    return (seconds < 60) ? `00:${ss}` : `${mm}:${ss}`
  }
  return (
    <tr>
      <td>
        {
          (currentSong.hash !== hash || paused) ?
            <i className="fa fa-play-circle" onClick={(ev) => togglePlay(ev, song, uri)} />
          :
            <i className="fa fa-pause-circle" onClick={(ev) => togglePlay(ev, song, uri)} />
        }
      </td>
      <td>{title}</td>
      <td>{artist}</td>
      <td className="player_controls">
        <span style={{display: (currentSong.hash === hash ? 'inline' : 'none')}}>
          { secondsToMMSS(audioTime) } &nbsp;
        </span>
        <span style={{display: (currentSong.hash === hash ? 'inline' : 'none')}}>
          { secondsToMMSS(audioDuration) } &nbsp;
        </span>
        <input
          style={{display: (currentSong.hash === hash ? 'inline' : 'none')}}
          id={`playback_control_${hash}`}
          type="range"
          defaultValue="0"
          max={{audioDuration}} />
      </td>
    </tr>
  )
}
