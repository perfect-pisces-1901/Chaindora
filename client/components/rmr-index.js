import React from 'react';
import PropTypes from 'prop-types';

function checkMediaConstraint(mediaConstraint) {
  let mediaType = Object.keys(mediaConstraint)[0];
  let constraint = mediaConstraint[mediaType];
  if (constraint) {
    if (typeof constraint !== 'boolean' && typeof constraint !== 'object') {
      return new Error(
        `The ${mediaType} prop must be either a boolean or MediaTrackConstraints object. Please check your React Media Recorder component`
      );
    }
  }
  if (typeof constraint === 'object') {
    let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    let unsupportedConstraints = Object.keys(constraint).filter(
      // eslint-disable-next-line no-shadow
      constraint => !supportedConstraints[constraint]
    );
    if (unsupportedConstraints.length > 0) {
      return new Error(
        `The constraint(s) [${unsupportedConstraints.join(
          ','
        )}] which you've supplied to the ${mediaType} prop are unsupported in this browser`
      );
    }
  }
}

let errors = {
  AbortError: 'media_aborted',
  NotAllowedError: 'permission_denied',
  NotFoundError: 'no_specified_media_found',
  NotReadableError: 'media_in_use',
  OverconstrainedError: 'invalid_media_constraints',
  TypeError: 'no_constraints'
};

export default class ReactMediaRecorder extends React.Component {
  state = {
    status: 'idle'
  };
  chunks = [];

  static propTypes = {
    audio: ({ audio }) => checkMediaConstraint({ audio }),
    video: ({ video }) => checkMediaConstraint({ video }, true),
    delay: PropTypes.number,
    muted: ({ muted, audio, video }) => {
      if (typeof muted !== 'boolean') {
        return new Error(
          `Invalid prop: muted should be a boolan value. Please check your react-media-recorder component declaration`
        );
      }
      if (muted && (audio && !video)) {
        return new Error(
          `It looks like you tried to mute as well as record audio. Please check your react-media-recorder component declaration`
        );
      }
    },
    render: PropTypes.func.isRequired,
    blobPropertyBag: PropTypes.object,
    whenStopped: PropTypes.func
  };

  static defaultProps = {
    audio: true,
    muted: false,
    delay: 0,
    render: () => null,
    whenStopped: () => null
  };

  constructor(props) {
    super(props);
    if (!window.MediaRecorder) {
      throw new Error('React Media Recorder: Unsupported browser');
    }
    let {
      audio,
      video,
      blobPropertyBag = video ? { type: 'video/mp4' } : { type: 'audio/wav' }
    } = props;

    if (Object.prototype.hasOwnProperty.call(props, 'muted')) {
      console.warn(
        'React Media Recorder: Please use mute() and unmute() functions available in the render method for muting/unmuting audio. mute prop will be deprecated soon.'
      );
    }
    props.muted && (this.state.status += `_muted`);
    this.requiredMedia = {
      audio: typeof audio === 'boolean' ? !!audio : audio,
      video: typeof video === 'boolean' ? !!video : video
    };
    this.blobPropertyBag = blobPropertyBag;
  }

  componentDidMount = async () => {
    const stream = await this.getMediaStream();

    if (stream) {
      stream
        .getAudioTracks()
        // eslint-disable-next-line no-return-assign
        .forEach(track => (track.enabled = !this.props.muted));
      this.stream = stream;
    }
  };
  componentDidUpdate = prevProps => {
    if (prevProps.muted !== this.props.muted) {
      this.stream
        .getAudioTracks()
        // eslint-disable-next-line no-return-assign
        .forEach(track => (track.enabled = !this.props.muted));
    }
    if (this.stream) {
      const isMuted = !this.stream
        .getAudioTracks()
        .every(track => track.enabled);
      if (isMuted && !this.state.status.includes('muted')) {
        this.setState(prevState => ({
          status: `${prevState.status}_muted`
        }));
      }
      if (!isMuted && this.state.status.includes('muted')) {
        this.setState(prevState => ({
          status: prevState.status.replace('_muted', '')
        }));
      }
    }
  };

  componentWillUnmount = () => {
    this.flush();
  };

  flush = () => {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.mediaRecorder = null;
    this.stream = null;
    this.chunks = [];
  };

  muteAudio = mute => {
    if (this.stream) {
      if (this.stream.getAudioTracks().every(track => track.enabled === mute)) {
        // eslint-disable-next-line no-return-assign
        this.stream.getAudioTracks().forEach(track => (track.enabled = !mute));
        this.setState(prevState => prevState); // Dummy state update.
      }
    }
  };

  getMediaStream = async () => {
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia(
        this.requiredMedia
      );
      return stream;
    } catch (error) {
      this.setState({ status: errors[error.name] });
    }
  };

  onRecordingStop = () => {
    console.log('onRecordingStop');
    // eslint-disable-next-line no-alert
    const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

    /*
    FROM WEB-DICTATAPHONE

    var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
    chunks = [];
    var audioURL = window.URL.createObjectURL(blob);
    audio.src = audioURL;
    */

    const blob = new Blob(this.chunks, this.blobPropertyBag);
    const url = URL.createObjectURL(blob);
    console.log('url: ', url)
    if (this.props.whenStopped) {
      this.props.whenStopped(url);
    }
    this.setState({ mediaBlob: url, status: 'stopped' });

    if (this.onStop) {
      this.onStop({id: -17,
                   name: clipName || 'unnammed clip',
                   audioUrl: url })
    }

    console.log('recorder stopped');
  };

  onRecordingActive = ({ data }) => {
    this.chunks.push(data);
  };

  initMediaRecorder = stream => {
    const mediaRecorder = new MediaRecorder(stream);
    //this.visualize(stream);
    mediaRecorder.ondataavailable = this.onRecordingActive;
    mediaRecorder.onstop = this.onRecordingStop;
    mediaRecorder.onerror = () => this.setState({ status: 'recorder_error' });
    return mediaRecorder;
  };

  visualize = stream => {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.source = this.audioContext.createMediaStreamSource(stream);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.source.connect(this.analyser);
    //analyser.connect(audioCtx.destination);
  };

  draw = (canvas) => {
    console.log('draw ', this)
    if (!this.canvasContext) {
      this.canvasContext = canvas.getContext('2d');
    }
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    requestAnimationFrame(() => this.draw(canvas));
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.canvasContext.fillStyle = 'rgb(200, 200, 200)';
    this.canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = 'rgb(0, 0, 0)';
    this.canvasContext.beginPath();
    const sliceWidth = (WIDTH * 1.0) / this.bufferLength;
    let x = 0;
    for (let i = 0; i < this.bufferLength; i++) {
      let v = this.dataArray[i] / 128.0;
      let y = (v * HEIGHT) / 2;
      if (i === 0) {
        this.canvasContext.moveTo(x, y);
      } else {
        this.canvasContext.lineTo(x, y);
      }
      x += sliceWidth;
    }
    this.canvasContext.lineTo(canvas.width, canvas.height / 2);
      this.canvasContext.stroke();
  };

  startRecording = async (canvas) => {
    console.log('RMR: START RECORDING')
    if (!this.stream || (this.stream && !this.stream.active)) {
      const stream = await this.getMediaStream();
      if (stream) {
        this.stream = stream;
      } else {
        return;
      }
    }
    this.mediaRecorder = this.initMediaRecorder(this.stream);
    this.chunks = [];
    this.setState({ mediaBlob: null });
    setTimeout(() => {
      this.mediaRecorder.start();
      //console.log('About to draw...')
      //this.draw(canvas);
      this.setState({ status: 'recording' });
    }, this.props.delay);
    if (this.props.delay > 0) {
      this.setState({ status: 'delayed_start' });
    }
  };

  pauseRecording = () => {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.setState({ status: 'paused' });
      this.mediaRecorder.pause();
    }
  };

  resumeRecording = () => {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.setState({ status: 'recording' });
      this.mediaRecorder.resume();
    }
  };

  stopRecording = (f) => {
    console.log('RMR: STOP RECORDING')
    this.onStop = f
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
    }
  };

  render = () =>
    this.props.render({
      status: this.state.status,
      startRecording: this.startRecording,
      stopRecording: this.stopRecording,
      pauseRecording: this.pauseRecording,
      resumeRecording: this.resumeRecording,
      muteAudio: () => this.muteAudio(true),
      unmuteAudio: () => this.muteAudio(false),
      mediaBlob: this.state.mediaBlob
    });
}
