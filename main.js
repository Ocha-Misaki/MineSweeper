'use strict'
{
  let rowNum = 3
  let colNum = 3

  const div = document.querySelector('div')
  //スタートボタンを連続で押した時に、セルが増えないようにした
  const clearCeil = () => {
    while (div.firstChild) {
      div.removeChild(div.firstChild)
    }
  }

  const setBombPosition = (rowNum, colNum) => {
    //ceilsを関数内で定義することで、スタートを押すたびにリセットさせるようにした
    const ceils = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    const bombRowNum = Math.floor(Math.random() * rowNum)
    const bombColNum = Math.floor(Math.random() * colNum)
    ceils[bombRowNum][bombColNum] = '*'
    makeCeil(ceils)
  }

  const makeCeil = (ceils) => {
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
      div.appendChild(tr)
    }
  }

  const start = document.createElement('button')
  start.textContent = 'START'
  document.querySelector('body').appendChild(start)

  start.addEventListener('click', () => {
    clearCeil()
    setBombPosition(rowNum, colNum)
  })

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
