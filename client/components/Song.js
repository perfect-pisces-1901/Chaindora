import React from "react";
import { Button, Icon } from "antd";

export default function Song(props) {
  const song = props.song;
  const togglePlay = props.togglePlay;
  const currentSong = props.currentSong;
  const paused = props.paused;
  const title = song.title;
  const artist = song.artist;
  const hash = song.hash;
  const uri = `https://gateway.ipfs.io/ipfs/${hash}`;
  return (
    <tr id="allSongs">
      <td>
        {currentSong.hash !== hash || paused ? (
          <Icon
            type="caret-right"
            style={{ fontSize: "30px" }}
            // type="primary"
            // shape="circle"
            // icon="caret-right"
            onClick={ev => togglePlay(ev, song, uri)}
          />
        ) : (
          <Icon
            type="pause"
            style={{ fontSize: "30px" }}
            onClick={ev => togglePlay(ev, song, uri)}
          />
        )}
      </td>
      <td>{title}</td>
      <td>{artist}</td>
      {/* <td>{hash}</td> */}
    </tr>
  );
}
