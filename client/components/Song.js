import React from 'react';

export default function Song(props) {
  const song = props.song
  const playSong = props.playSong
  const currentSong = props.currentSong
  const title = song.title
  const artist = song.artist
  const hash = song.hash
  const uri = `https://gateway.ipfs.io/ipfs/${hash}`
  return (
    <tr>
      <td>
        {
          currentSong.hash !== hash ?
            <a onClick={(ev) => playSong(ev, song, uri)}>PLAY</a>
          :
            ''
        }
      </td>
      <td>{title}</td>
      <td>{artist}</td>
      <td>{hash}</td>
    </tr>
  )
}
