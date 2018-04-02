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
    src: 'http://m320.xiami.net/145/26145/178981/3557211_3655722_h.mp3?auth_key=1523242800-0-0-3db2ec8e7b6e9873c2b3dc3f2548fd83',
    image: 'http://pic.xiami.net/images/album/img13/103013/4885581326345732.jpg?x-oss-process=image/resize,limit_0,m_pad,w_185,h_185',
    // duration: parseInt(3.5 * 60),
    artist: 'Loolacoma',
  })

  myPlayList.addItem({
    title: 'I Wanted You To Stay On the Other (Side)',
    src: 'http://m192.xiami.net/966/465559966/365559978/1771799186_10341828_l.mp3?auth_key=1523242800-0-0-cfd03d9c477e64f2ba0c0483f3163c25',
    image: 'http://pic.xiami.net/images/album/img93/332993/1334332993.jpg?x-oss-process=image/resize,limit_0,m_pad,w_185,h_185',
    // duration: parseInt(4 * 60),
    artist: 'Summer Heart',
  })

  myPlayList.addItem({
    title: 'Missing Parts',
    src: 'http://m192.xiami.net/1/358/62358/336487/1768985037_594290_l.mp3?auth_key=1523242800-0-0-02c38668086b83e8b1d44e88a4304660',
    image: 'http://pic.xiami.net/images/album/img21/93121/4818551323156608.jpg?x-oss-process=image/resize,limit_0,m_pad,w_185,h_185',
    // duration: parseInt(0.05 * 60),
    artist: 'Jeff Pianki',
  })

  myPlayList.addItem({
    title: 'TEST',
    src: 'http://res.eweixue.com/audio/2018-04-02_15:52:49:343.mp3',
    image: 'http://pic.xiami.net/images/album/img21/93121/4818551323156608.jpg?x-oss-process=image/resize,limit_0,m_pad,w_185,h_185',
    // duration: parseInt(0.05 * 60),
    artist: 'burning',
  })

  let item = myPlayList.getLastItem()
  console.log('test getLastItem', item.index, item)

  myPlayList.setCurrentIndex(0)


  myPlayer.setPlayList(myPlayList)
  myPlayer.setMode(2)   // 1:单曲 2:顺序 3:随机
  myPlayer.setLoop(false)


  myPlayer.onTrackPlay = (index, track) => {
    // console.log('track play', index)
    console.log('track play', index)
    render()
  }

  myPlayer.onTrackPlaying = (index, track) => {
    // console.log('track playing', index, track)
    render()
  }

  myPlayer.onListEnd = (index) => {
    console.log('onListEnd', index)
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
  myPlayer.play(index)
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
