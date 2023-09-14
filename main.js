'use strict'
{
  class Ceil {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.bombFlag = false
      this.isOpen = false
    }
    open() {
      if (this.bombFlag === true) {
        this.element.textContent = '💣'
      }
      this.isOpen = true
      this.element.style.backgroundColor = 'brown'
      return this.bombFlag
    }
  }

  const div = document.querySelector('div')
  const clearCeil = () => {
    while (div.firstChild) {
      div.removeChild(div.firstChild)
    }
  }

  let rowNum = 3
  let colNum = 3
  const ceils = []
  const makeCeils = (rowNum, colNum) => {
    for (let row = 0; row < rowNum; row++) {
      ceils[row] = []
      for (let col = 0; col < colNum; col++) {
        ceils[row].push(new Ceil(row, col))
      }
    }
    setBomb(ceils)
    renderCeils(ceils)
  }
  makeCeils(rowNum, colNum)

  const setBomb = (ceils) => {
    const bombRowNum = Math.floor(Math.random() * rowNum)
    const bombColNum = Math.floor(Math.random() * colNum)
    ceils[bombRowNum][bombColNum].bombFlag = true
  }

  let isGameOver = false
  const renderCeils = (ceils) => {
    for (let row = 0; row < rowNum; row++) {
      const tr = document.createElement('tr')
      for (let col = 0; col < colNum; col++) {
        const td = document.createElement('td')
        ceils[row][col].element = td
        td.addEventListener('click', () => {
          if (isGameOver == true) {
            //タイマーを止める
            //セルをクリックできなくする
            return
          }
          isGameOver = ceils[row][col].open()
        })
        tr.appendChild(td)
      }
      div.appendChild(tr)
    }
  }

  const start = document.createElement('button')
  start.textContent = 'START'
  document.querySelector('body').appendChild(start)
  start.addEventListener('click', () => {
    clearCeil()
    isGameOver = false
    makeCeils(rowNum, colNum)
  })
}
