import merge from 'lodash/merge';
import forEach from 'lodash/forEach';

const VIDEO_START_COMMAND = 'start';
const VIDEO_STOP_COMMAND = 'stop';
const VIDEO_COMMAND_SEPARATOR = ':';

const defaults = {
  onVideoPlayCallbacks: [],
  onVideoEndCallbacks: [],
};

/* global window, console */

function buildCommand(commandArr) {
  return commandArr.join(VIDEO_COMMAND_SEPARATOR);
}

function outputCommand(command, fileName) {
  const cmdArr = [command];

  if (fileName) {
    cmdArr.push(fileName);
  }

  const inBrowser = typeof alert === 'function';
  const alertFunction = !inBrowser ? console.log : window.alert;
  alertFunction(buildCommand(cmdArr));
}

function randomString(length = 5) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function sendCommandToUHDPro(opts) {
  const inBrowser = typeof alert === 'function';
  const alertFunction = !inBrowser ? console.log : window.alert;
  alertFunction(opts);
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

    this.identifier = randomString();
    this.currentlyPlayingVideo = null;
  }

  /**
   * Method to start playing a video
   *
   * @param {String} fileName
   * @param {Object} options
   */
  startVideo(fileName) {
    outputCommand(VIDEO_START_COMMAND, fileName);
    this.currentlyPlayingVideo = fileName;
    forEach(
      this.opts.onVideoPlayCallbacks,
      func => func({ command: VIDEO_START_COMMAND, fileName }),
    );
  }

  /**
   * Method to start an array of videos
   *
   * @param {array} opts.files
   * @param {boolean} opts.loop
   * @param {object} opts.popup
   */
  startVideos({
    files,
    loop = true,
    popup = {},
  }) {
    sendCommandToUHDPro({
      files,
      command: VIDEO_START_COMMAND,
      key: this.identifier,
      loop,
      popup,
    });
  }

  /**
   * Method to stop the videos with this identifier
   */
  stopVideos() {
    sendCommandToUHDPro({
      command: VIDEO_STOP_COMMAND,
      key: this.identifier,
    });
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
      fileName: this.currentlyPlayingVideo,
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
