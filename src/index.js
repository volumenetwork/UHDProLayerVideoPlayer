import merge from 'lodash/merge';
import forEach from 'lodash/forEach';

const VIDEO_START_COMMAND = 'start';
const VIDEO_STOP_COMMAND = 'stop';
const VIDEO_COMMAND_SEPARATOR = ':';

const inBrowser = typeof process !== 'object';
const alertFunction = !inBrowser ? console.log : window.alert;

const defaults = {
  onVideoPlayCallbacks: [],
  onVideoEndCallbacks: []
};

function buildCommand(commandArr) {
  return commandArr.join(VIDEO_COMMAND_SEPARATOR);
}

function outputCommand(command, fileName) {
  const cmdArr = [command];

  if (fileName) {
    cmdArr.push(fileName);
  }

  alertFunction(buildCommand(cmdArr));
}

/**
 * @class VideoPlayer
 */
export default class VideoPlayer {

  /**
   *
   * @param {Object} [opts]
   * @param {Function[]} [opts.onVideoPlayCallbacks]
   * @param {Function[]} [opts.onVideoEndCallbacks]
   */
  constructor(opts) {
    this.opts = merge({}, defaults, opts);

    this.currentlyPlayingVideo = null;
  }

  /**
   * Method to start playing a video
   *
   * @param {String} fileName
   */
  startVideo(fileName) {
    outputCommand(VIDEO_START_COMMAND, fileName);
    this.currentlyPlayingVideo = fileName;
    forEach(this.opts.onVideoPlayCallbacks, func => func({ command: VIDEO_START_COMMAND, fileName}));
  }

  /**
   *
   * @returns {null|String}
   */
  getNowPlaying() {
    return this.currentlyPlayingVideo;
  }

  /**
   * Method to stop playing a video
   */
  stopVideo() {
    if (this.currentlyPlayingVideo === null) {
      outputCommand(VIDEO_STOP_COMMAND);
    } else {
      outputCommand(VIDEO_STOP_COMMAND, this.currentlyPlayingVideo);
      this.currentlyPlayingVideo = null;
    }

    forEach(this.opts.onVideoEndCallbacks, func => func({
      command: VIDEO_STOP_COMMAND,
      fileName: this.currentlyPlayingVideo
    }));
  }

  // ALIASES
  playVideo(fileName) {
    return this.startVideo(fileName);
  }

  endVideo() {
    return this.stopVideo();
  }
}
