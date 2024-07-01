document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.querySelector('.GridContainer')
  let grid = Array.from({ length: 4 }, () => Array(4).fill(null))
  let sumnum = 0
  let maxnum = 4
  const remakebutton = document.getElementById('b')
  remakebutton.addEventListener('click', () => {
    initgame()
  })
  /**
   * 刷新格子
   */
  function rendergrid() {
    gridContainer.innerHTML = ''
    grid.forEach(row => {
      row.forEach(cell => {
      const cellElement = document.createElement('div')
      cellElement.classList.add('cell')
      if(cell){
        cellElement.classList.add('Num' + cell)
        cellElement.textContent = cell
      }
      gridContainer.appendChild(cellElement)
      })
    })
    document.querySelector('.Print').textContent = '总分：' + sumnum
  }

  /**
   * 随机放置
   */
  function placerandomblock() {
  const emptyCells = grid.reduce((acc, row, rowIndex) => {
    row.forEach((cell, colIndex) => {
    if (!cell) {
      acc.push({ rowIndex, colIndex })
    }
    })
    return acc
  }, [])
    if (emptyCells.length > 0) {
      const { rowIndex, colIndex } = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      let randommath = Math.random() > 0.8 ? Math.pow(2, parseInt(maxnum / 2048) + 2) : 
             Math.pow(2, parseInt(maxnum / 2048) + 1)
      grid[rowIndex][colIndex] = randommath
      sumnum += grid[rowIndex][colIndex]
      rendergrid()
    }
  }

  /**
   * 初始化
   */
  function initgame() {
    sumnum = 0
    maxnum = 4
    gridContainer.innerHTML = ''
    grid = Array.from({ length: 4 }, () => Array(4).fill(null))
    placerandomblock()
    placerandomblock()
    rendergrid()
  }

  initgame()

  /**
   * 监听键盘事件，移动方块
   */ 
  document.addEventListener('keyup', event => {
    if (event.key === 'ArrowUp') {
      moveup()
    }
    else if (event.key === 'ArrowDown') {
      movedown()
    }
    else if (event.key === 'ArrowLeft') {
      moveleft()
    }
    else if (event.key === 'ArrowRight') {
      moveright()
    }
  })

  /**
   * 向上移动
   */
  function moveup() {
    let ismove = false// 是否移动过
    // 遍历每一列
    for (let col = 0; col < 4; col++) {
      let mergedCells = new Set() // 记录已经合并过的格子索引
      // 从第二行开始，向上移动格子
      for (let row = 1; row < 4; row++) {
        if (grid[row][col]) {
          let currentrow = row
          let nrow = row
          while (currentrow > 0) {
        // 移动格子
          if (!grid[currentrow - 1][col]) {
            ismove = true
            nrow = currentrow - 1
          } else if (grid[currentrow - 1][col] === grid[row][col] 
            && !mergedCells.has((currentrow - 1) * 4 + col) 
            && !mergedCells.has(currentrow * 4 + col)) 
          {
            // 合并格子
            ismove = true
            updatecellposition(row, col, currentrow - 1, col)
            grid[currentrow - 1][col] *= 2
            if (grid[currentrow - 1][col] > maxnum)
            maxnum = grid[currentrow - 1][col]
            grid[row][col] = null
            mergedCells.add((currentrow - 1) * 4 + col)
            break
          }
          else break
          currentrow--
        }
        updatecellposition(row, col, nrow, col)
        let g = grid[row][col]
        grid[row][col] = null
        grid[nrow][col] = g
      }
    }  
  }
  move(ismove)
  }

  /**
   * 向下移动
   */
  function movedown() {
    let ismove = false// 是否移动过
    // 遍历每一列
    for (let col = 0; col < 4; col++) {
      let mergedCells = new Set() // 记录已经合并过的格子索引
      // 从第三行开始，向下移动格子
      for (let row = 2; row >= 0; row--) {
        if (grid[row][col]) {
          let currentrow = row
          let nrow = row
          while (currentrow < 3) {
          // 移动格子
          if (!grid[currentrow + 1][col]) {
            ismove=true
            nrow = currentrow + 1
          } else if (grid[currentrow + 1][col] === grid[row][col] 
            && !mergedCells.has((currentrow + 1) * 4 + col)
            && !mergedCells.has(currentrow * 4 + col)) 
          {
            // 合并格子
            ismove=true
            updatecellposition(row, col, currentrow + 1, col)
            grid[currentrow + 1][col] *= 2
            if(grid[currentrow + 1][col] > maxnum)
            maxnum = grid[currentrow + 1][col]
            grid[row][col] = null
            mergedCells.add((currentrow + 1) * 4 + col)
            break
          }
        else break
        currentrow++
        }
        updatecellposition(row, col, nrow, col)
        let g = grid[row][col]
        grid[row][col] = null
        grid[nrow][col] = g
        }
      }
    }
    move(ismove)
  }

  /**
   * 左移
   */
  function moveleft() {
  let ismove = false// 是否移动过
  // 遍历每一行
  for (let row = 0; row < 4; row++) {
    let mergedCells = new Set() // 记录已经合并过的格子索引
    // 从第二列开始，向左移动格子
    for (let col = 1; col < 4; col++) {
    if (grid[row][col]) {
      let currentcol = col
      let ncol = col
      while (currentcol > 0) {
      // 移动格子
      if (!grid[row][currentcol - 1]) {
        ismove = true
        ncol = currentcol - 1
      } else if (grid[row][currentcol - 1] === grid[row][col] 
        && !mergedCells.has((currentcol - 1) * 4 + row)
        && !mergedCells.has(currentcol * 4 + row)) 
        {
        // 合并格子
        ismove = true
        
        //grid[row][currentcol - 1] = null
        if(grid[row][currentcol - 1] > maxnum)
        maxnum = grid[row][currentcol - 1]
        let cell = gridContainer.children[row * 4 + col]
        cell.style.zIndex = 5
        updatecellposition(row, col, row, currentcol - 1)
        grid[row][currentcol - 1] = grid[row][col] * 2
        grid[row][col] = null
        cell.style.zIndex = 2
        mergedCells.add((currentcol - 1) * 4 + row)
        break
      }
      else break
      currentcol--
      }
      updatecellposition(row, col, row, ncol)
      let g = grid[row][col]
      grid[row][col] = null
      grid[row][ncol] = g
    }
    } 
  }
  move(ismove)
  }

  /**
   * 右移
   */
  function moveright() {
  let ismove = false// 是否移动过
  // 遍历每一行
  for (let row = 0; row < 4; row++) {
    let mergedCells = new Set() // 记录已经合并过的格子索引
    // 从第三列开始，向右移动格子
    for (let col = 2; col >= 0; col--) {
    if (grid[row][col]) {
      let currentcol = col
      let ncol = col
      while (currentcol < 3) {
      // 移动格子
      if (!grid[row][currentcol + 1]) {
        ismove = true
        ncol = currentcol + 1
      } else if (grid[row][currentcol + 1] === grid[row][col] 
        && !mergedCells.has((currentcol + 1) * 4 + row)
        && !mergedCells.has(currentcol * 4 + row)) 
        {
        // 合并格子
        ismove = true
        updatecellposition(row, col, row, currentcol + 1)
        grid[row][currentcol + 1] *= 2
        if(grid[row][currentcol + 1] > maxnum)
        maxnum = grid[row][currentcol + 1]
        grid[row][col] = null
        mergedCells.add((currentcol + 1) * 4 + row)
        break
      }
      else break
      currentcol++
      }
      updatecellposition(row, col, row, ncol)
      let g = grid[row][col]
      grid[row][col] = null
      grid[row][ncol] = g
      
    }
    }   
  }
  move(ismove)
  }

  /**
   * 有移动则刷新并放置
   */
  function move(ismove) {
  if (ismove) {
    setTimeout(() => {
    // 重新渲染游戏格子
    rendergrid()
    // 放置新的随机块
    placerandomblock()
    }, 200)
  }
  }

  /**
   * 更新位置的动画
   */
  function updatecellposition(row, col, nrow, ncol) {
    const ocell = gridContainer.children[row * 4 + col]
    ocell.style.zIndex = 114
    ocell.style.transform = ''
    const newX = (ncol - col) * 150
    const newY = (nrow - row) * 150
    setTimeout(() => {
      ocell.style.transition = 'transform 0.2s ease-in-out'
      ocell.style.transform = `translate(${newX}px, ${newY}px)`
    }, 0)
    ocell.addEventListener('transitionend', () => {
      console.log('Animation ended')
    }, { once: true })
    ocell.style.zIndex = 2
    
  }
  
})
