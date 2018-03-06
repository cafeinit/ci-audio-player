/**
 * @fileoverview CIAudioPlayerCore
 * @author burning <www.cafeinit.com>
 * @version 2018.03.06
 */

// http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp

export default class CIAudioPlayerCore {
  constructor() {
    // this.getPlayer()
    // console.log('CIAudioPlayerCore.player', this.player)
    this.onPlay = null
    this.onPlaying = null
    this.onEnded = null
    this.onError = null
  }

  getPlayer() {
    if (!this.player) {
      this.player = new Audio()
    }
    return this.player
  }

  play(track) {
    let player = this.getPlayer()

    player.onplay = evt => {
      // console.log('CIAudioPlayerCore.onplay', evt)
      if (typeof this.onPlay === 'function') {
        this.onPlay(evt, player.currentTime || 0, player.duration || 0)
      }
    }

    player.ontimeupdate = evt => {
      // console.log('CIAudioPlayerCore.ontimeupdate', evt)
      if (typeof this.onPlaying === 'function') {
        this.onPlaying(evt, player.currentTime || 0, player.duration || 0)
      }
    }

    // 当音频已暂停时
    // player.onpause = evt => {
    //   console.log('CIAudioPlayerCore.onpause', evt)
    // }

    // 当目前的播放列表已结束时
    player.onended = evt => {
      // console.log('CIAudioPlayerCore.onended', evt)
      if (typeof this.onEnded === 'function') {
        this.onEnded(evt)
      }
    }

    player.onerror = evt => {
      // console.log('CIAudioPlayerCore.onerror', evt)
      if (typeof this.onError === 'function') {
        this.onError(evt)
      }
    }

    if (track.src && track.src !== player.currentSrc) {
      player.src = track.src
    }

    console.log('CIAudioPlayerCore.play')
    player.play()
  }

  pause() {
    let player = this.getPlayer()
    player.pause()
  }

  /**
   * @param {Number} progress [0, 1]
   */
  goto(progress) {
    let player = this.getPlayer()
    player.currentTime = player.duration * progress || 0
    // console.log('CIAudioPlayerCore.goto', progress, player.currentTime)
  }
}
