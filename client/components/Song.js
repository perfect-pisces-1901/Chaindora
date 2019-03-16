import React from 'react';

export default function Song(props) {
  const uri = `https://gateway.ipfs.io/ipfs/${props.song.hash}`
  const title = props.song.title
  const artist = props.song.artist
  return (
    <div>
      <a href={uri}>>></a> {title} {artist}
    </div>
  )
}
