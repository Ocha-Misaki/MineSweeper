'use strict'
{
  class Ceil {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.bombFlag = false
      this.isOpen = false
      this.text = ''
    }
    open() {
      if (this.bombFlag === true) {
        this.element.textContent = '💣'
        this.element.style.backgroundColor = 'red'
      } else {
        this.element.textContent = this.text
        this.element.style.backgroundColor = 'brown'
      }
      this.isOpen = true
      return this.bombFlag
    }
  }

  const div = document.querySelector('div')
  const clearCeil = () => {
    while (div.firstChild) {
      div.removeChild(div.firstChild)
    }
  }

  // Board クラス
  // − Level
  // - Ceilsの初期化、描画
  let isGameOver = true
  let rowNum = 3 //デフォルト
  let colNum = 3
  let bombNum = 1
  const adjustLevel = (ceilNum, _bombNum) => {
    rowNum = ceilNum
    colNum = ceilNum
    bombNum = _bombNum
  }
  adjustLevel(3, 2)

  const ceils = []
  const makeCeils = (rowNum, colNum) => {
    for (let row = 0; row < rowNum; row++) {
      ceils[row] = []
      for (let col = 0; col < colNum; col++) {
        ceils[row].push(new Ceil(col, row))
      }
    }
    setBomb(ceils, bombNum)
    setHints(ceils)
    renderCeils(ceils)
  }

  const setBomb = (ceils, bombNum) => {
    let count = 0
    while (true) {
      const bombColNum = Math.floor(Math.random() * colNum)
      const bombRowNum = Math.floor(Math.random() * rowNum)
      if (ceils[bombColNum][bombRowNum].bombFlag == false) {
        ceils[bombColNum][bombRowNum].bombFlag = true
        count++
      }
      if (count == bombNum) {
        break
      }
    }
  }

  const setHints = (ceils) => {
    for (let row = 0; row < rowNum; row++) {
      for (let col = 0; col < colNum; col++) {
        const count = checkAroundCeils(col, row).length
        ceils[col][row].text = String(count)
      }
    }
  }

  const checkAroundCeils = (x, y) => {
    const results = []
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const cx = x + dx
        const cy = y + dy
        if (cx < 0 || cy < 0) {
          continue
        }
        if (cx >= colNum || cy >= rowNum) {
          continue
        }
        if (x == cx && y == cy) {
          continue
        }
        if (ceils[cx][cy].bombFlag) {
          results.push(ceils[cx][cy])
        }
      }
    }
    return results
  }
  const renderCeils = (ceils) => {
    for (let row = 0; row < rowNum; row++) {
      const tr = document.createElement('tr')
      for (let col = 0; col < colNum; col++) {
        const td = document.createElement('td')
        ceils[row][col].element = td
        td.addEventListener('click', () => {
          if (isGameOver == true) {
            return
          } else if (ceils[row][col].bombFlag) {
            stopTimer()
          }
          isGameOver = ceils[row][col].open()
          if (isGameOver) {
            confirm('Game Over')
          }
        })
        tr.appendChild(td)
      }
      div.appendChild(tr)
    }
  }

  makeCeils(rowNum, colNum)

  let startTime
  let intervalID
  const startTimer = () => {
    startTime = Date.now()
    intervalID = setInterval(() => {
      updateScore()
    }, 10)
  }
  const stopTimer = () => {
    clearInterval(intervalID)
    intervalID = undefined
  }
  const score = document.getElementById('score')
  const updateScore = () => {
    const elapsedTime = new Date(Date.now() - startTime)
    const seconds = String(elapsedTime.getSeconds())
    const milliSeconds = String(elapsedTime.getMilliseconds()).padStart(3, '0')
    score.textContent = `${seconds}.${milliSeconds}`
  }
  const start = document.createElement('button')
  start.textContent = 'START'
  document.querySelector('body').appendChild(start)
  start.addEventListener('click', () => {
    if (isGameOver) {
      startTimer()
      clearCeil()
      isGameOver = false
      makeCeils(rowNum, colNum)
    }
  })
}
