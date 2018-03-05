/**
 * @fileoverview CIAudioPlayer
 * @author burning <www.cafeinit.com>
 * @version 2018.03.05
 */

const CIAudioPlayerCore = require('./CIAudioPlayerCore')

class CIAudioPlayer {
  constructor() {
    this.playList = null  // 播放列表
    this.tracks = []      // 实际播放的曲目
    this.index = 0        // 当前播放的曲目index
    this.mode = 2         // 1:单曲播放 2:顺序播放 3:随机播放
    this.isLoop = true    // 是否循环播放
    this.isPlaying = false

    this.player = new CIAudioPlayerCore()

    this.onPlay = null
    this.onStop = null

    this.onTrackPlay = null
    this.onTrackPlaying = null
    this.onTrackStop = null
  }

  setPlayList(list) {
    this.playList = list
    this.initTracks()
  }

  setMode(val) {
    this.mode = val
    this.initTracks()
  }

  setLoop(val) {
    this.isLoop = val
  }

  /**
   * @param {Number} index PlayList的当前索引(点击PlayList的播放键)
   */
  play(index) {
    if (typeof index === 'number') {
      this.index = parseInt(index) || 0
      this.playList.setCurrentIndex(index)
    }
    else {
      this.playList.setCurrentIndex(this.index)
    }

    // 单曲模式track中只有1条数据
    if (this.mode === 1) {
      this.index = 0
      this.initTracks()
    }

    let track = this.getTrack(this.index)
    if (!track) {
      console.log('track', index, 'undefinded')
      return
    }

    let player = this.player
    player.onPlay = evt => {
      this.isPlaying = true
      // console.log('TRACK PLAY', this.index, track.title, evt)
      if (typeof this.onTrackPlay === 'function') {
        this.onTrackPlay(this.index, track)
      }
    }

    player.onPlaying = (evt, time) => {
      console.log('TRACK PLAYING', track.duration - time, evt)
      // console.log('TRACK PLAYING', evt)
      // if (typeof this.onTrackPlaying === 'function') {
      //   this.onTrackPlaying(this.index, track, time)
      // }
    }

    player.onEnded = evt => {
      console.log('TRACK Ended', evt)
      this.playNext()
    }

    player.play(track)
  }

  playPrev() {
    let index = this.index - 1
    if (index < 0) {
      if (this.isLoop) {
        index = this.tracks.length - 1
        this.index = index
        this.play()
      }
      else {
        this.stop()
      }
    }
    else {
      this.index = index
      this.play()
    }
  }

  playNext() {
    let index = this.index + 1
    if (index >= this.tracks.length) {
      if (this.isLoop) {
        index = 0
        this.index = index
        this.play()
      }
      else {
        this.stop()
      }
    }
    else {
      this.index = index
      this.play()
    }
  }

  stop() {
    this.player.stop()
    this.isPlaying = false
    if (typeof this.onStop === 'function') {
      this.onStop(this.index)
    }
  }

  initTracks(index) {
    if (this.mode === 1) {    // 单曲
      this.tracks = [ this.playList.getCurrentItem() ]
    }
    else if (this.mode === 2) {   // 顺序
      this.tracks = this.playList.getItems()
    }
    else if (this.mode === 3) {   // 随机
      this.tracks = this.playList.getItems(true)
    }
    // console.log('CIAudioPlayer.initTracks', this.mode, this.playList, this.tracks)
  }

  getTrack(index) {
    return this.tracks[index] || null
  }
}

module.exports = CIAudioPlayer
