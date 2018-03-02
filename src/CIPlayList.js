/**
 * @fileoverview CIPlayList
 * @author burning <www.cafeinit.com>
 * @version 2018.03.01
 */

class CIPlayList {
  constructor() {
    this.index = 0
    this.list = []
  }

  getItem(index) {
    return this.list[index] || null
  }

  getCurrentItem() {
    return this.getItem(this.index)
  }

  getItems(isRandom) {
    if (isRandom) {
      return [ ...this.list ]
    }
    else {
      return [ ...this.list ]
    }
  }

  setItem(index, item) {
    index = (index < 0) ? 0 : index
    index = (index > this.list.length) ? this.list.length : index
    this.list[index] = item
  }

  setCurrentIndex(index) {
    console.log('CIPlayList.setCurrentIndex', index)
    this.index = index
    this.list.forEach((item, i) => {
      if (i === index) {
        item.is_actived = true
      }
      else {
        item.is_actived = false
      }
    })
  }

  addItem(item) {
    item._key = parseInt(Math.random() * 100000000)
    this.list.push(item)
  }

  removeItem(index) {
    this.list.splice(index, 1)
  }

  // insertItem(index, item) {
  //
  // }
}

module.exports = CIPlayList
