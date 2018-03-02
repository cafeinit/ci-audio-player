/**
 * @fileoverview app
 * @author burning <www.cafeinit.com>
 * @version 2018.03.01
 */

import $ from 'jquery'
import CIAudioPlayer from '../../src/CIAudioPlayer'
import CIPlayList from '../../src/CIPlayList'
import './style.less'

const myPlayList = new CIPlayList()
const myPlayer = new CIAudioPlayer()

$(() => {
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

  myPlayList.setCurrentIndex(0)


  myPlayer.setPlayList(myPlayList)
  myPlayer.setMode(2)   // 1:单曲 2:顺序 3:随机
  // myPlayer.setLoop(false)


  myPlayer.onTrackPlay = (index, track) => {
    // console.log('track play', index)
    console.log('track play', index)
    render()
  }

  myPlayer.onTrackPlaying = (index, track, time) => {
    console.log('track playing', index, track.duration - time)
  }

  myPlayer.onStop = index => {
    console.log('player stopped', index)
    render()
  }

  // myPlayer.play()

  // // 模拟自动播放过程中有新消息
  // setTimeout(() => {
  //   console.log('add a new message 1')
  //   myPlayList.addItem({
  //     title: 'TRACK TITLE 04',
  //     src: 'http://...',
  //     image: 'http://...',
  //     duration: parseInt(0.05 * 60),
  //     artist: 'ARTIST NAME',
  //   })
  //
  //   myPlayer.setPlayList(myPlayList)
  //
  //   // if (!myPlayer.isPlaying) {
  //   //   myPlayer.playNext()
  //   // }
  //   myPlayer.playNext()
  // }, 1000 * 3)
  //
  // // // 模拟用户点击播放按钮
  // // setTimeout(() => {
  // //   console.log('USER PLAY TRACK 2')
  // //   myPlayer.play(2)
  // // }, 1000 * 5.5)
  //
  // // 模拟播放结束后有新消息
  // setTimeout(() => {
  //   console.log('add a new message 2')
  //   myPlayList.addItem({
  //     title: 'TRACK TITLE 05',
  //     src: 'http://...',
  //     image: 'http://...',
  //     duration: parseInt(0.05 * 60),
  //     artist: 'ARTIST NAME',
  //   })
  //
  //   myPlayer.setPlayList(myPlayList)
  //
  //   // if (!myPlayer.isPlaying) {
  //   //   myPlayer.playNext()
  //   // }
  //   myPlayer.playNext()
  // }, 1000 * 20)

  render()

  function render() {
    renderPlayList($('#play-list'), myPlayList.getItems())
    renderPlayer($('#player'), {
      isPlaying: myPlayer.isPlaying,
      time: myPlayer.time,
      track: myPlayList.getCurrentItem()
    })
  }
})


function renderPlayList($el, data) {
  // console.log('renderPlayList', $el, data)
  $el.empty()
  data.map((item, i) => {
    let className = item.is_actived ? 'actived' : ''
    let $item = $(`<li class="${className}">
      <div class="track">
        <em class="no">${i}</em>
        <h4 class="title">${item.title}</h4>
      </div>
      <div class="action">
        <a class="button" href="javascript:;" onclick="trackPlayButtonOnClick(${i})">play</a>
      </div>
    </li>`)
    $el.append($item)
  })
}

function renderPlayer($el, data) {
  // console.log('isPlaying', data.isPlaying)
  if (data.isPlaying) {
    $el.find('.btn-play').hide()
    $el.find('.btn-pause').show()
  }
  else {
    $el.find('.btn-play').show()
    $el.find('.btn-pause').hide()
  }
}

window.trackPlayButtonOnClick = (index) => {
  console.log('trackPlayButtonOnClick', index)
  myPlayer.play(index)
}

window.playerPlayButtonOnClick = () => {
  console.log('playerPlayButtonOnClick')
  myPlayer.play()
}

window.playerPauseButtonOnClick = () => {
  console.log('playerPauseButtonOnClick')
  myPlayer.stop()
}
