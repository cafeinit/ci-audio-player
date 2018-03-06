/**
 * @fileoverview app
 * @author burning <www.cafeinit.com>
 * @version 2018.03.06
 */

import $ from 'jquery'
import { CIAudioPlayer, CIPlayList } from '../../src/index'
// import { CIAudioPlayer, CIPlayList } from '../../dist/ci-audio-player'
// import { CIAudioPlayer, CIPlayList } from 'ci-audio-player'
import './style.less'

// console.log('CIAudioPlayer', typeof CIAudioPlayer, CIAudioPlayer)
// console.log('CIPlayList', typeof CIPlayList, CIPlayList)

const myPlayList = new CIPlayList()
const myPlayer = new CIAudioPlayer()

$(() => {
  myPlayList.addItem({
    title: 'Cold Violet Skies',
    src: 'http://m128.xiami.net/13/103013/488558/1770746870_2958111_l.mp3?auth_key=1520823600-0-0-2e8c724e64a03d0f43acfadd7acde87e',
    image: 'http://pic.xiami.net/images/album/img13/103013/4885581326345732.jpg?x-oss-process=image/resize,limit_0,m_pad,w_185,h_185',
    // duration: parseInt(3.5 * 60),
    artist: 'Loolacoma',
  })

  myPlayList.addItem({
    title: 'I Wanted You To Stay On the Other (Side)',
    src: 'http://m192.xiami.net/492/93492/507167/1770943493_3204894_l.mp3?auth_key=1520823600-0-0-0435768c8231972b4fb7ab7ef02e7bbd',
    image: 'http://pic.xiami.net/images/album/img93/332993/1334332993.jpg?x-oss-process=image/resize,limit_0,m_pad,w_185,h_185',
    // duration: parseInt(4 * 60),
    artist: 'Summer Heart',
  })

  myPlayList.addItem({
    title: 'Missing Parts',
    src: 'http://m128.xiami.net/121/93121/481855/1770670075_2869332_l.mp3?auth_key=1520823600-0-0-5664996fd0fb3c878a3b3a5dd47e8c92',
    image: 'http://pic.xiami.net/images/album/img21/93121/4818551323156608.jpg?x-oss-process=image/resize,limit_0,m_pad,w_185,h_185',
    // duration: parseInt(0.05 * 60),
    artist: 'Jeff Pianki',
  })

  let item = myPlayList.getLastItem()
  console.log('test getLastItem', item.index, item)

  myPlayList.setCurrentIndex(0)


  myPlayer.setPlayList(myPlayList)
  myPlayer.setMode(2)   // 1:单曲 2:顺序 3:随机
  // myPlayer.setLoop(false)


  myPlayer.onTrackPlay = (index, track) => {
    // console.log('track play', index)
    console.log('track play', index)
    render()
  }

  myPlayer.onTrackPlaying = (index, track) => {
    // console.log('track playing', index, track)
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
      currentTime: parseInt(myPlayer.duration - myPlayer.currentTime),
      progress: parseInt(myPlayer.progress * 100) + '%',
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

  $el.find('.time').html(data.currentTime)
  $el.find('.progress').html(data.progress)
}

window.trackPlayButtonOnClick = (index) => {
  console.log('trackPlayButtonOnClick', index)
  myPlayer.play({ index })
}

window.playerPlayButtonOnClick = () => {
  console.log('playerPlayButtonOnClick')
  myPlayer.play()
}

window.playerPauseButtonOnClick = () => {
  console.log('playerPauseButtonOnClick')
  myPlayer.pause()
}

window.playerPrevButtonOnClick = () => {
  console.log('playerPrevButtonOnClick')
  myPlayer.playPrev()
}

window.playerNextButtonOnClick = () => {
  console.log('playerPauseButtonOnClick')
  myPlayer.playNext()
}

window.playerProgressButtonOnClick = () => {
  let progress = 0.9
  console.log('playerProgressButtonOnClick', progress)
  myPlayer.gotoAndPlay(progress)
}
