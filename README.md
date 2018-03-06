# ci-audio-player
CafeInit Audio Player Controller & PlayList


## Install

```
npm install ci-audio-player --save
```

## Usage

```javascript
import { CIAudioPlayer, CIPlayList } from 'ci-audio-player'

const myPlayList = new CIPlayList()
const myPlayer = new CIAudioPlayer()

myPlayList.addItem({
  title: 'Cold Violet Skies',
  src: 'http://m128.xiami.net/13/103013/488558/1770746870_2958111_l.mp3?auth_key=1520823600-0-0-2e8c724e64a03d0f43acfadd7acde87e',
  image: 'http://pic.xiami.net/images/album/img13/103013/4885581326345732.jpg?x-oss-process=image/resize,limit_0,m_pad,w_185,h_185',
  artist: 'Loolacoma',
})

myPlayList.addItem({
  title: 'I Wanted You To Stay On the Other (Side)',
  src: 'http://m192.xiami.net/492/93492/507167/1770943493_3204894_l.mp3?auth_key=1520823600-0-0-0435768c8231972b4fb7ab7ef02e7bbd',
  image: 'http://pic.xiami.net/images/album/img93/332993/1334332993.jpg?x-oss-process=image/resize,limit_0,m_pad,w_185,h_185',
  artist: 'Summer Heart',
})

myPlayList.addItem({
  title: 'Missing Parts',
  src: 'http://m128.xiami.net/121/93121/481855/1770670075_2869332_l.mp3?auth_key=1520823600-0-0-5664996fd0fb3c878a3b3a5dd47e8c92',
  image: 'http://pic.xiami.net/images/album/img21/93121/4818551323156608.jpg?x-oss-process=image/resize,limit_0,m_pad,w_185,h_185',
  artist: 'Jeff Pianki',
})

myPlayer.setPlayList(myPlayList)
myPlayer.setMode(2)   // 1:单曲 2:顺序
// myPlayer.setLoop(false)

myPlayer.onTrackPlaying = (index, track) => {
  console.log('track playing', index, track)
}

myPlayer.play()
```
