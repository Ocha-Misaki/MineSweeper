'use strict'
{
  for (let i = 0; i < 3; i++) {
    const tr = document.createElement('tr')
    for (let col = 0; col < 3; col++) {
      const td = document.createElement('td')
      td.textContent = 1
      tr.appendChild(td)
    }
    document.querySelector('div').appendChild(tr)
  }
}
