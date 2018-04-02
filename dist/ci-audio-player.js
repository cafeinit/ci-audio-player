!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define([],i):"object"==typeof exports?exports.CIAudioPlayer=i():t.CIAudioPlayer=i()}(window,function(){return function(t){var i={};function e(s){if(i[s])return i[s].exports;var n=i[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,e),n.l=!0,n.exports}return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);class s{constructor(){this.onPlay=null,this.onPlaying=null,this.onEnded=null,this.onError=null}getPlayer(){return this.player||(this.player=new Audio),this.player}play(t){let i=this.getPlayer();i.onplay=(t=>{"function"==typeof this.onPlay&&this.onPlay(t,i.currentTime||0,i.duration||0)}),i.ontimeupdate=(t=>{"function"==typeof this.onPlaying&&this.onPlaying(t,i.currentTime||0,i.duration||0)}),i.onended=(t=>{"function"==typeof this.onEnded&&this.onEnded(t)}),i.onerror=(t=>{"function"==typeof this.onError&&this.onError(t)}),t.src&&t.src!==i.currentSrc&&(i.src=t.src),console.log("CIAudioPlayerCore.play"),i.play()}pause(){this.getPlayer().pause()}goto(t){let i=this.getPlayer();i.currentTime=i.duration*t||0}}class n{constructor(){this.playList=null,this.tracks=[],this.index=0,this.mode=2,this.isLoop=!0,this.isPlaying=!1,this.currentTime=0,this.duration=0,this.progress=0,this.player=new s,this.onPause=null,this.onTrackPlay=null,this.onTrackPlaying=null,this.onListEnd=null}setPlayList(t){this.playList=t,this.initTracks()}setMode(t){this.mode=t,this.initTracks()}setLoop(t){this.isLoop=t}play(t){"number"==typeof t?(this.index=parseInt(t)||0,this.playList.setCurrentIndex(t)):this.playList.setCurrentIndex(this.index),1===this.mode&&(this.index=0,this.initTracks());let i=this.getTrack(this.index);if(!i)return void("function"==typeof this.onError&&this.onError(`Track ${t} undefinded`));let e=this.player;e.onPlay=((t,e,s)=>{this.isPlaying=!0,this.currentTime=e,this.duration=s,this.progress=0,"function"==typeof this.onTrackPlay&&this.onTrackPlay(this.index,i)}),e.onPlaying=((t,e,s)=>{if("function"==typeof this.onTrackPlaying){let t=0;s>0&&(t=(t=e/s)>1?1:t),this.currentTime=e,this.duration=s,this.progress=t,this.onTrackPlaying(this.index,i,{currentTime:e,duration:s,progress:t})}}),e.onEnded=(t=>{this.playNext()}),e.onError=(t=>{"function"==typeof this.onError&&this.onError(this.index,t)}),e.play(i)}playPrev(){let t=this.index-1;t<0?this.isLoop?(t=this.tracks.length-1,this.index=t,this.play()):this.stop():(this.index=t,this.play())}playNext(){let t=this.index+1;t>=this.tracks.length?this.isLoop?(t=0,this.index=t,this.play()):this.stop():(this.index=t,this.play())}pause(){this.player.pause(),this.isPlaying=!1,"function"==typeof this.onPause&&this.onPause(this.index)}stop(){this.isPlaying=!1,"function"==typeof this.onListEnd&&this.onListEnd(this.index)}gotoAndPlay(t){this.player.goto(t)}initTracks(t){1===this.mode?this.tracks=[this.playList.getCurrentItem()]:2===this.mode?this.tracks=this.playList.getItems():3===this.mode&&(this.tracks=this.playList.getItems(!0))}getTrack(t){return this.tracks[t]||null}}class r{constructor(){this.index=0,this.list=[]}getItem(t){return this.list[t]||null}getLastItem(){return this.list[this.list.length-1]||null}getCurrentItem(){return this.getItem(this.index)}getItems(t){return[...this.list]}setItem(t,i){return t=(t=t<0?0:t)>this.list.length?this.list.length:t,i.index=t,this.list[t]=i,i}setCurrentIndex(t){this.index=t,this.list.forEach((i,e)=>{i.is_actived=e===t})}addItem(t){return t.index=this.list.length||0,this.list.push(t),t}removeItem(t){this.list.splice(t,1)}}e.d(i,"CIAudioPlayer",function(){return n}),e.d(i,"CIAudioPlayerCore",function(){return s}),e.d(i,"CIPlayList",function(){return r})}])});