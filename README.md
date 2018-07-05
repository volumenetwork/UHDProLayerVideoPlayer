# UHDProLayerVideoPlayer
Javascript Library to be able to play videos from a Layer on the UHDPro Application. This is **only** designed to work with the **Volume UHDPro Android Application** version 1.5.0 and upwards.

## Installation

`yarn add uhdpro-layer-video-player`

`npm install uhdpro-layer-video-player`

## Usage

```$javascript

imnport VideoPlayer from 'uhdpro-layer-video-player';

const videoPlayer = new VideoPlayer({
  onVideoPlayCallbacks: [console.log], // optional
  onVideoEndCallbacks: [console.log], // optional
});


videoPlayer.startVideo('foo.mp4');
// start:foo.mp4
// { command: 'start', fileName: 'foo.mp4' } // onVideoPlayCallbacks

videoPlayer.endVideo();
// stop:foo.mp4
// { command: 'stop', fileName: null } // onVideoEndCallbacks

videoPlayer.endVideo();
// stop
// { command: 'stop', fileName: null } // onVideoEndCallbacks

```

## Todo

- Tests
- Improve documentation
