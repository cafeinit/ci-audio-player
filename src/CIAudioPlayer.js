/**
 * @fileoverview CIAudioPlayer
 * @author burning <www.cafeinit.com>
 * @version 2018.03.01
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

  play(index) {
    this.isPlaying = true
    if (typeof index === 'number') {
      this.index = parseInt(index) || 0
    }

    let track = this.getTrack(this.index)
    this.player.play({
      track: track,
      onPlay: () => {
        // console.log('TRACK PLAY', this.index, track.title)
        if (typeof this.onTrackPlay === 'function') {
          this.onTrackPlay(this.index, track)
        }
      },

      onPlaying: (time) => {
        // console.log('TRACK PLAYING', track.duration - time)
        if (typeof this.onTrackPlaying === 'function') {
          this.onTrackPlaying(this.index, track, time)
        }
      },

      onStop: () => {
        this.playNext()
      }
    })
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
        this.isPlaying = false
        if (typeof this.onStop === 'function') {
          this.onStop(this.index)
        }
      }
    }
    else {
      this.index = index
      this.play()
    }
  }

  // stop() {
  //   // this.player.stop()
  //   if (typeof this.onStop === 'function') {
  //     this.onStop(this.index)
  //   }
  // }

  initTracks() {
    if (this.mode === 1) {    // 单曲
      this.tracks = [ this.playList.getCurrentItem() ]
    }
    else if (this.mode === 2) {   // 顺序
      this.tracks = this.playList.getItems()
    }
    else if (this.mode === 3) {   // 随机
      this.tracks = this.playList.getItems(true)
    }
    // console.log('CIAudioPlayer.initTracks', this.mode, this.tracks)
  }

  getTrack(index) {
    return this.tracks[index] || null
  }
}

module.exports = CIAudioPlayer
