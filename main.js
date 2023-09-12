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
    ceils[bombRowNum][bombColNum] = 1
  }
  makeBombPosition(rowNum, colNum)

  for (let row = 0; row < rowNum; row++) {
    const tr = document.createElement('tr')
    for (let col = 0; col < colNum; col++) {
      const td = document.createElement('td')

      td.textContent = ceils[row][col]
      tr.appendChild(td)
    }
    document.querySelector('div').appendChild(tr)
  }
}
