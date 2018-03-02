/**
 * @fileoverview CIAudioPlayer test
 * @author burning <www.cafeinit.com>
 * @version 2018.03.01
 */

const CIAudioPlayer = require('../src/CIAudioPlayer')
const CIPlayList = require('../src/CIPlayList')

const myPlayList = new CIPlayList()
myPlayList.addItem({
  title: 'TRACK TITLE 01',
  src: 'http://...',
  image: 'http://...',
  duration: parseInt(0.025 * 60),
  artist: 'ARTIST NAME',
})

myPlayList.addItem({
  title: 'TRACK TITLE 02',
  src: 'http://...',
  image: 'http://...',
  duration: parseInt(0.1 * 60),
  artist: 'ARTIST NAME',
})

myPlayList.addItem({
  title: 'TRACK TITLE 03',
  src: 'http://...',
  image: 'http://...',
  duration: parseInt(0.05 * 60),
  artist: 'ARTIST NAME',
})

const myPlayer = new CIAudioPlayer()
myPlayer.setPlayList(myPlayList)
myPlayer.setMode(2)   // 1:单曲 2:顺序 3:随机
myPlayer.setLoop(false)


myPlayer.onTrackPlay = (index, track) => {
  console.log('track play', index, track._key)
}

myPlayer.onTrackPlaying = (index, track, time) => {
  console.log('track playing', index, track.duration - time)
}

myPlayer.onStop = index => {
  console.log('player stopped', index)
}

myPlayer.play()

// 模拟自动播放过程中有新消息
setTimeout(() => {
  console.log('add a new message 1')
  myPlayList.addItem({
    title: 'TRACK TITLE 04',
    src: 'http://...',
    image: 'http://...',
    duration: parseInt(0.05 * 60),
    artist: 'ARTIST NAME',
  })

  myPlayer.setPlayList(myPlayList)

  if (!myPlayer.isPlaying) {
    myPlayer.playNext()
  }
}, 1000 * 3)

// 模拟用户点击播放按钮
setTimeout(() => {
  console.log('USER PLAY TRACK 2')
  myPlayer.play(2)
}, 1000 * 5.5)

// 模拟播放结束后有新消息
setTimeout(() => {
  console.log('add a new message 2')
  myPlayList.addItem({
    title: 'TRACK TITLE 05',
    src: 'http://...',
    image: 'http://...',
    duration: parseInt(0.05 * 60),
    artist: 'ARTIST NAME',
  })

  myPlayer.setPlayList(myPlayList)

  if (!myPlayer.isPlaying) {
    myPlayer.playNext()
  }
}, 1000 * 20)
