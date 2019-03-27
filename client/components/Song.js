import React from 'react';
import { Icon } from 'antd';

export default function Song(props) {
  const song = props.song
  const togglePlay = props.togglePlay
  const currentSong = props.currentSong
  const audioTime = props.audioTime
  const audioDuration = props.audioDuration
  const onInput = props.onInput
  const paused = props.paused
  const title = song.title
  const artist = song.artist
  const hash = song.hash
  const imageUrl = song.imageUrl
  const uri = `https://gateway.ipfs.io/ipfs/${hash}`
  const secondsToMMSS = (seconds) => {
    seconds = +seconds
    const mm = Math.floor(seconds / 60)
    const ss = ('00' + (seconds % 60)).slice(-2)
    return (seconds < 60) ? `00:${ss}` : `${mm}:${ss}`
  }
  return (
    <tr id="allSongs">
      <td>
        {currentSong.hash !== hash || paused ? (
          <Icon
            type="caret-right"
            style={{ fontSize: '30px' }}
            // type="primary"
            // shape="circle"
            // icon="caret-right"
            onClick={ev => togglePlay(ev, song, uri)}
          />
        ) : (
          <Icon
            type="pause"
            style={{ fontSize: '30px' }}
            onClick={ev => togglePlay(ev, song, uri)}
          />
        )}
      </td>
      <td><img id="user-song-img" src={imageUrl} /></td>
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
          max={audioDuration}
          onInput={onInput} />
      </td>
    </tr>
  );
}
