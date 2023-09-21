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

  class Timer {
    constructor(elementId) {
      this.startTime
      this.intervalID
      this.element = document.getElementById(elementId)
    }
    start = () => {
      this.startTime = Date.now()
      this.intervalID = setInterval(() => {
        this.update()
      }, 10)
    }
    stop = () => {
      clearInterval(this.intervalID)
      this.intervalID = undefined
    }
    update() {
      const elapsedTime = new Date(Date.now() - this.startTime)
      const minutes = String(elapsedTime.getMinutes()).padStart(2, '0')
      const seconds = String(elapsedTime.getSeconds()).padStart(2, '0')
      const milliSeconds = String(elapsedTime.getMilliseconds()).padStart(
        3,
        '0'
      )
      this.element.textContent = `${minutes}:${seconds}.${milliSeconds}`
    }
  }

  class Game {
    constructor(elementId, level) {
      this.boardElement = document.getElementById(elementId)
      this.init(level)
      this.makeCeils()
      this.gameOver = true
      this.hitsPoint = 0
      this.ceils = []
      this.timer = new Timer('score')
    }

    init(level) {
      this.ceils = []
      switch (level) {
        case 1:
          this.row = 5
          this.col = 5
          this.bombCount = 3
          break

        case 2:
          this.row = 7
          this.col = 7
          this.bombCount = 5
          break

        default:
          this.row = 3
          this.col = 3
          this.bombCount = 1
          break
      }
    }
    start() {
      if (this.gameOver) {
        this.timer.start()
        this.clearCeil()
        this.gameOver = false
        this.makeCeils()
      }
    }
    clearCeil = () => {
      while (this.boardElement.firstChild) {
        this.boardElement.removeChild(this.boardElement.firstChild)
      }
    }
    makeCeils() {
      for (let row = 0; row < this.row; row++) {
        this.ceils[row] = []
        for (let col = 0; col < this.col; col++) {
          this.ceils[row].push(new Ceil(col, row))
        }
      }
      this.setBomb()
      this.setHints()
      this.renderCeils()
    }

    setBomb = () => {
      let count = 0
      while (true) {
        const bombColNum = Math.floor(Math.random() * this.col)
        const bombRowNum = Math.floor(Math.random() * this.row)
        if (this.ceils[bombColNum][bombRowNum].bombFlag == false) {
          this.ceils[bombColNum][bombRowNum].bombFlag = true
          count++
        }
        if (count == this.bombCount) {
          break
        }
      }
    }

    setHints = () => {
      for (let row = 0; row < this.row; row++) {
        for (let col = 0; col < this.col; col++) {
          const count = this.checkAroundCeils(col, row).length
          this.ceils[col][row].text = String(count)
        }
      }
    }

    checkAroundCeils = (x, y) => {
      const results = []
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const cx = x + dx
          const cy = y + dy
          if (cx < 0 || cy < 0) {
            continue
          }
          if (cx >= this.col || cy >= this.row) {
            continue
          }
          if (x == cx && y == cy) {
            continue
          }
          if (this.ceils[cx][cy].bombFlag) {
            results.push(this.ceils[cx][cy])
          }
        }
      }
      return results
    }
    renderCeils = () => {
      for (let row = 0; row < this.row; row++) {
        const tr = document.createElement('tr')
        for (let col = 0; col < this.col; col++) {
          const td = document.createElement('td')
          this.ceils[row][col].element = td
          this.hitsPoint = this.row * this.col - this.bombCount
          td.addEventListener('click', () => {
            if (this.gameOver) {
              confirm('Game Over')
              return
            } else if (this.ceils[row][col].bombFlag == true) {
              this.timer.stop()
            }
            if (this.hitsPoint == 0) {
              confirm('Game Clear!')
              return
            }
            this.gameOver = this.ceils[row][col].open()
            this.hitsPoint--
          })
          if (this.gameOver) {
            confirm('Game Over')
            return
          }
          tr.appendChild(td)
        }
        this.boardElement.appendChild(tr)
      }
    }
  }

  const game = new Game('content', 1)

  const start = document.createElement('button')
  start.textContent = 'START'
  document.querySelector('body').appendChild(start)
  start.addEventListener('click', () => {
    game.start()
  })
}
