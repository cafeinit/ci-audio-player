/**
 * @fileoverview CIAudioPlayerCore
 * @author burning <www.cafeinit.com>
 * @version 2018.03.01
 */

// 只是简单地模拟播放过程
class CIAudioPlayerCore {
  constructor() {
    this.time = 0
    this.timer = null
  }

  play({ track, onPlay, onPlaying, onStop }) {
    this.stop()

    if (typeof onPlay === 'function') {
      onPlay()
    }

    this.timer = setInterval(() => {
      if (typeof onPlaying === 'function') {
        onPlaying(this.time++)
      }

      if (this.time > track.duration) {
        this.stop()
        if (typeof onStop === 'function') {
          onStop()
        }
      }
    }, 1000)
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.time = 0
    }
  }
}

module.exports = CIAudioPlayerCore
