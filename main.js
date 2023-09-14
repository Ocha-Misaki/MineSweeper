'use strict'
{
  let rowNum = 3
  let colNum = 3

  const div = document.querySelector('div')
  const clearCeil = () => {
    while (div.firstChild) {
      div.removeChild(div.firstChild)
    }
  }

  const makeCeils = (rowNum, colNum) => {
    const ceils = []
    for (let row = 0; row < rowNum; row++) {
      ceils[row] = []
      for (let col = 0; col < colNum; col++) {
        ceils[row].push(new Ceil(row, col))
      }
    }
    renderCeils(ceils)
    console.log(ceils)
  }

  const renderCeils = (ceils) => {
    for (let row = 0; row < rowNum; row++) {
      const tr = document.createElement('tr')
      for (let col = 0; col < colNum; col++) {
        const td = document.createElement('td')
        td.textContent = `${ceils[row][col].x} , ${ceils[row][col].y}`
        td.addEventListener('click', () => {})
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
    // safeNum = 0
    makeCeils(rowNum, colNum)
  })

  // let safeNum = 0
  // const checkCeil = (td) => {
  //   if (td.textContent == '*') {
  //     td.classList.add('out')
  //     confirm('game over…')
  //   } else {
  //     td.classList.add('safe')
  //     safeNum++
  //   }

  //   if (safeNum == 8) {
  //     confirm('game clear!')
  //   }
  // }

  class Ceil {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.bombFlag = false
    }

    //ボムかどうか
    check() {
      if (this.bombFlag === true) {
        this.textContent = '*'
      }
    }
  }
}
