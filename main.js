'use strict'
{
  const ceils = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]

  let rowNum = 3
  let colNum = 3

  const makeBombPosition = (rowNum, colNum) => {
    const bombRowNum = Math.floor(Math.random() * rowNum)
    const bombColNum = Math.floor(Math.random() * colNum)
    ceils[bombRowNum][bombColNum] = '*'
  }
  const start = document.createElement('button')
  start.textContent = 'START'
  document.querySelector('div').appendChild(start)

  makeBombPosition(rowNum, colNum)

  for (let row = 0; row < rowNum; row++) {
    const tr = document.createElement('tr')
    for (let col = 0; col < colNum; col++) {
      const td = document.createElement('td')
      td.textContent = ceils[row][col]
      td.addEventListener('click', () => {
        checkCeil(td)
      })
      tr.appendChild(td)
    }
    document.querySelector('div').appendChild(tr)
  }

  let safeNum = 0
  const checkCeil = (td) => {
    if (td.textContent == '*') {
      confirm('game over')
    } else {
      td.classList.add('safe')
      safeNum++
    }

    if (safeNum == 8) {
      confirm('game clear!')
    }
  }
}
