document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.querySelector('.board')
  const grid = Array.from({ length: 18 }, () => Array(18).fill(null))
  const aplacebutton = document.getElementById('aplace')
  aplacebutton.addEventListener('click', () => {
    if(player) {
      let a = ai(1)
      row = a[0]
      col = a[1]
      playerplace(row, col)
    }
  })
  const remakebutton = document.getElementById('remake')
  remakebutton.addEventListener('click', () => {
    if(player || e)
      initgame()
  })
  const rebackbutton = document.getElementById('reback')
  rebackbutton.addEventListener('click', () => {
    if(player && arr2.length > 0)
      reback()
  })
  let arr1 = new Array()
  let arr2 = new Array()
  let player = true
  let e = false
  /**
   * 初始化
   */
  function initgame() {
    arr1 = new Array()
    arr2 = new Array()
    player = true
    e = false
    gridContainer.innerHTML = ''
    for (let row = 0; row < 18; row++) {
      for (let col = 0; col < 18; col++) {
        const cell = document.createElement('div')
        cell.className = 'cell'
        cell.addEventListener('click', () => {
          if(player)
            playerplace(row, col)
        })
        grid[row][col] = 0
        gridContainer.appendChild(cell)
      }
    }
  }

  function playerplace(row, col) {
    if (grid[row][col] != 0) return
    let piece = document.createElement('div')
    piece.className = 'piece'
    piece.classList.add('black')
    const cell = gridContainer.children[row *   18 + col]
    if (cell) 
      cell.appendChild(piece)
    grid[row][col] = 1
    arr1.push([ row, col ])
    player = false
    let arr = check(row, col, 5)
    if(arr.length >= 5){
      end(arr)
      return
    }
    setTimeout(() => {
    aiplace(-1)
    }, 500)

  }
  /**
   * AI放置
   */
  function aiplace(){
    let a = ai(-1)
    row = a[0]
    col = a[1]
    grid[row][col] = -1
    let piece = document.createElement('div')
    piece.className = 'piece'
    piece.classList.add('white')
    const cell = gridContainer.children[row *   18 + col]
    if (cell) 
      cell.appendChild(piece)
    arr2.push([ row, col ])
    let arr = check(row, col, 5)
    if(arr.length >= 5){
      end(arr)
      return
    }
    player = true
  }
  function ai(p) {
    const emptyCells = new Array()
    for (let row = 0; row < 18; row++)
      for (let col = 0; col < 18; col++) 
        if (grid[row][col] == 0) {
          emptyCells.push([ row, col ])
      }
    let row, col
    let ischeck = false
    let Arr1
    let Arr2
    function checkall(r, c, k) {
      let a = checklr(r, c, k)
      if(a.length > 0){
        ischeck = true
        row = a[0]
        col = a[1]
      }
      a = checkud(r, c, k)
      if(a.length > 0){
        ischeck = true
        row = a[0]
        col = a[1]
      }
      a = checklurd(r, c, k)
      if(a.length > 0){
        ischeck = true
        row = a[0]
        col = a[1]
      }
      a = checkruld(r, c, k)
      if(a.length > 0){
        ischeck = true
        row = a[0]
        col = a[1]
      }
    }
    if(p == -1){
      Arr1 = arr1
      Arr2 = arr2
    }else {
      Arr1 = arr2
      Arr2 = arr1
    }
    if(Arr1.length == 0 && Arr2.length == 0){
      row = 9
      col = 9
    }
    else{
    //检测连子下
    let prow1 = Arr1[Arr1.length - 1][0]
    let pcol1 = Arr1[Arr1.length - 1][1]
    if(arr2.length > 0){
      let prow2 = Arr2[Arr2.length - 1][0]
      let pcol2 = Arr2[Arr2.length - 1][1]
      //自己五子
      checkall(prow2, pcol2, 4)
      //五子
      if(!ischeck){
        for(let i = Arr2.length - 2; i >= 0; i--){
          checkall(Arr2[i][0], Arr2[i][1], 4)
        }
      }
      //自己间隔可连五子
      if(!ischeck){
        for(let i = 0; i < emptyCells.length; i++){
          let r = emptyCells[i][0]
          let c = emptyCells[i][1]
          grid[r][c] = p
          a = checklr(r, c, 5)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checkud(r, c, 5)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checklurd(r, c, 5)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checkruld(r, c, 5)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          grid[r][c] = 0
        }
      }
      //对方下一步五子
      if(!ischeck){
        checkall(prow1, pcol1, 4)
      }
      //对方间隔五子
      if(!ischeck){
        for(let i = 0; i < emptyCells.length; i++){
          let r = emptyCells[i][0]
          let c = emptyCells[i][1]
          grid[r][c] = p * -1
          a = checklr(r, c, 5)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checkud(r, c, 5)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checklurd(r, c, 5)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checkruld(r, c, 5)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          grid[r][c] = 0
        }
      }
      //对方四子
      if(!ischeck){
        for(let i = Arr1.length - 2; i >= 0; i--){
          checkall(Arr1[i][0], Arr1[i][1], 4)
        }
      }
      //自己四子
      if(!ischeck){
        checkall(prow2, pcol2, 3)
      }
      if(!ischeck){
        for(let i = Arr2.length - 2; i >= 0; i--){
          checkall(Arr2[i][0], Arr2[i][1], 3)
        }
      }
      if(!ischeck){
        for(let i = 0; i < emptyCells.length; i++){
          let r = emptyCells[i][0]
          let c = emptyCells[i][1]
          grid[r][c] = p
          a = checklr(r, c, 4)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checkud(r, c, 4)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checklurd(r, c, 4)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checkruld(r, c, 4)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          grid[r][c] = 0
        }
      }
      //对方下一步四子
      if(!ischeck){
        checkall(prow1, pcol1, 3)
      }
      if(!ischeck){
        for(let i = Arr1.length - 2; i >= 0; i--){
          checkall(Arr1[i][0], Arr2[i][1], 3)
        }
      }
      if(!ischeck){
        for(let i = 0; i < emptyCells.length; i++){
          let r = emptyCells[i][0]
          let c = emptyCells[i][1]
          grid[r][c] = p * -1
          a = checklr(r, c, 4)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checkud(r, c, 4)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checklurd(r, c, 4)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          a = checkruld(r, c, 4)
          if(a.length > 0){
            ischeck = true
            row = r
            col = c
          }
          grid[r][c] = 0
        }
      }
    }


    //随机下
    if(!ischeck){
      let brr
      if(arr1.length == 0){
        brr = [[8 , 8]] 
      }
      else 
        brr = kmeans(arr1, parseInt(arr1.length / 8 + 1), 100)
      let wrr
      if(arr2.length == 0){
        wrr = [[9 , 9]] 
      }
      else 
        wrr = kmeans(arr2, parseInt(arr2.length / 8 + 1), 100)
      let b = []
      let w = []
      let totalr = 0
      let totalc = 0
      for(let i = 0; i < brr.length; i++){
        totalr += brr[i][0]
        totalc += brr[i][1]
      }
      b.push(totalr / brr.length)
      b.push(totalc / brr.length)
      totalr = 0
      totalc = 0
      for(let i = 0; i < wrr.length; i++){
        totalr += wrr[i][0]
        totalc += wrr[i][1]
      }
      w.push(totalr / brr.length)
      w.push(totalc / brr.length) 
      row = parseInt(b[0] * 0.3 + w[0] * 0.7)
      col = parseInt(b[1] * 0.3 + w[1] * 0.7)
      let mindis = 500
      console.log(emptyCells)
      let mrow = emptyCells[parseInt(emptyCells.length / 2)][0], 
      mcol = emptyCells[parseInt(emptyCells.length / 2)][1]
      for(let i = 0; i < emptyCells.length; i++){
        let dis = Math.sqrt(Math.pow(row - emptyCells[i][0], 2) + Math.pow(col - emptyCells[i][1], 2))
        if(dis < mindis){
          mrow = emptyCells[i][0]
          mcol = emptyCells[i][1]
          mindis = dis
        }
      }
      row = mrow
      col = mcol
    }
  }
    console.log(ischeck)
    console.log("row:",row,"col:",col)
    return [row , col]
  }

  function kmeans(ARR, K, max_iters) {
    let centroids = new Array()
    let labels = new Array()
    if(K > ARR.length)
      K = ARR.length
    for(let i = 0; i < K; i++){
      let idx = Math.floor(Math.random() * ARR.length)
      console.log(idx)
      centroids.push([ARR[idx][0],ARR[idx][1]])
      console.log(ARR[idx][0],ARR[idx][1])
      console.log(centroids[centroids.length-1])
      console.log(centroids[centroids.length-1][0],centroids[centroids.length-1][1])
    }
    console.log(ARR)
    console.log(centroids)
    for(let i = 0; i < max_iters; i++){
      let distances = []
      for(let j = 0; j < ARR.length; j++){
        for(let k = 0; k < K; k++){   
          distances.push(Math.sqrt(Math.pow(ARR[j][0] - centroids[k][0], 2) 
                        + Math.pow(ARR[j][1] - centroids[k][1], 2)))
          }
      }
      for(let j = 0; j < ARR.length; j++){
        let min = 999
        let idx = 0
        for(let k = 0; k < K; k++){
          if(distances[j * K + k] < min){
            min = distances[j * K + k]
            idx = k
          }
        }
        labels.push(idx)
      }
      let new_centroids = []
      for(let k = 0; k < K; k++){
        let a = 0
        let totalr = 0
        let totalc = 0
        for(let id = 0; id < ARR.length; id++){
          if(labels[id] == k){
            totalr += ARR[id][0]
            totalc += ARR[id][1]
            a++
          }
        }
        new_centroids.push([totalr / a, totalc / a])
      }
      let flag = true
      for(let k = 0; k < K; k++)
        if(centroids[k][0] != new_centroids[k][0] && centroids[k][1] != new_centroids[k][1]){
          centroids[k][0] = new_centroids[k][0]
          centroids[k][1] = new_centroids[k][1]
          flag = false
        }
      if(flag)
        break
    }
    return centroids
  }

  initgame()
  
  /**
   * 键盘事件
   */ 
  document.addEventListener('keyup', event => {
    if (event.key === 'ArrowLeft' && player && arr2.length >= 1) {
      reback()
    }
  })

  /**
   * 回溯
   */
  function reback() {
    let row1 = arr1[arr1.length - 1][0], col1 = arr1[arr1.length - 1][1]
    let row2 = arr2[arr2.length - 1][0], col2 = arr2[arr2.length - 1][1]
    grid[row1][col1] = 0
    grid[row2][col2] = 0
    arr1.pop()
    arr2.pop()
    gridContainer.innerHTML = ''
    for (let row = 0; row <   18; row++) {
      for (let col = 0; col <   18; col++) {
        const cell = document.createElement('div')
        cell.className = 'cell'
        cell.addEventListener('click', () => {
          if(player)
            playerplace(row, col)
        })
        let piece = document.createElement('div')
        if(grid[row][col] == 1){
          piece.className = 'piece'
          piece.classList.add('black')
          cell.appendChild(piece)
        }else if(grid[row][col] == -1){
          piece.className = 'piece'
          piece.classList.add('white')
          cell.appendChild(piece)
        }
        gridContainer.appendChild(cell)
      }
    }
  }
  /**
   * 按照指定的个数检查连子
   */
  function check(row, col, tp){
    let arr = [[ row, col ]]
    let Arr = []
    let total = 1
    let maxtotal = tp - 1
    let p = grid[row][col]
    //上下
    for(let r = row - 1; r >= 0; r--){
      if(grid[r][col] == p){
        total++
        arr.push([ r, col ])
      }
      else break
    }
    for(let r = row + 1; r <   18; r++){
      if(grid[r][col] == p){
        total++
        arr.push([ r, col ])
      }
      else break
    }
    if(total > maxtotal)
      Arr = arr
    total = 1
    arr = [[ row, col ]]
    //左右
    for(let c = col - 1; c >= 0; c--){
      if(grid[row][c] == p){
        total++
        arr.push([ row, c ])
      }
      else break
    }
    for(let c = col + 1; c <   18; c++){
      if(grid[row][c] == p){
        total++
        arr.push([ row, c ])
      }
      else break
    }
    if(total > maxtotal)
      Arr = arr
    total = 1
    arr = [[ row, col ]]
    //左上右下
    for(let r = row - 1, c = col - 1; c >= 0 && r >= 0; r--, c--){
      if(grid[r][c] == p){
        total++
        arr.push([ r, c ])
      }
      else break
    }
    for(let r = row + 1, c = col + 1; c <   18 && r <   18; r++, c++){
      if(grid[r][c] == p){
        total++
        arr.push([ r, c ])
      }
      else break
    }
    if(total > maxtotal)
      Arr = arr
    total = 1
    arr = [[ row, col ]]
    //右上左下
    for(let r = row - 1, c = col + 1; c <   18 && r >= 0; r--, c++){
      if(grid[r][c] == p){
        total++
        arr.push([ r, c ])
      }
      else break
    }
    for(let r = row + 1, c = col - 1; c >= 0 && r <   18; r++, c--){
      if(grid[r][c] == p){
        total++
        arr.push([ r, c ])
      }
      else break
    }
    if(total > maxtotal)
      Arr = arr
    total = 1
    arr = [[ row, col ]]
    return Arr
  }
  /**
   * 检测上下
   */
  function checkud(row, col, tp){
    let nrow = -1, ncol = -1
    let arr = []
    let total = 1
    let p = grid[row][col]
    //上下
    for(let r = row - 1; r >= 0; r--){
      if(grid[r][col] == p){
        total++
      }
      else {
        if(grid[r][col] == 0){
          nrow = r
          ncol = col
        }
        break
      }
    }
    for(let r = row + 1; r <   18; r++){
      if(grid[r][col] == p){
        total++
      }
      else {
        if(grid[r][col] == 0){
          nrow = r
          ncol = col   
        }
        break
      }
    }
    if(total >= tp && nrow >=0 && ncol >= 0){
      arr.push(nrow)
      arr.push(ncol)
    }
    return arr
  }
  /**
   * 检测左右
   */
  function checklr(row, col, tp){
    let nrow = -1, ncol = -1
    let arr = []
    let total = 1
    let p = grid[row][col]
    //左右
    for(let c = col - 1; c >= 0; c--){
      if(grid[row][c] == p){
        total++
      }
      else {
        if(grid[row][c] == 0){
          nrow = row
          ncol = c 
        }
        break
      }
    }
    for(let c = col + 1; c <   18; c++){
      if(grid[row][c] == p){
        total++
      }
      else {
        if(grid[row][c] == 0){
          nrow = row
          ncol = c  
        }
        break
      }
    }
    if(total >= tp && nrow >=0 && ncol >= 0){
      arr.push(nrow)
      arr.push(ncol)
    }
    return arr
  }
  /**
   * 检测左上右下
   */
  function checklurd(row, col, tp){
    let nrow = -1, ncol = -1
    let arr = []
    let total = 1
    let p = grid[row][col]
    //左上右下
    for(let r = row - 1,c = col - 1; c >= 0 && r >= 0;r--, c--){
      if(grid[r][c] == p){
        total++
      }
      else {
        if(grid[r][c] == 0){
          nrow = r
          ncol = c 
        }
        break
      }
    }
    for(let r = row + 1,c = col + 1; c <   18 && r <   18;r++, c++){
      if(grid[r][c] == p){
        total++
      }
      else {
        if(grid[r][c] == 0){
          nrow = r
          ncol = c   
        }
        break
      }
    }
    if(total >= tp && nrow >=0 && ncol >= 0){
      arr.push(nrow)
      arr.push(ncol)
    }
    return arr
  }
  /**
   * 检测右上左下
   */
  function checkruld(row, col, tp){
    let nrow = -1, ncol = -1
    let arr = []
    let total = 1
    let p = grid[row][col]
    //右上左下
    for(let r = row - 1,c = col + 1; c <   18 && r >= 0;r--, c++){
      if(grid[r][c] == p){
        total++
      }
      else {
        if(grid[r][c] == 0){
          nrow = r
          ncol = c   
        }
        break
      }
    }
    for(let r = row + 1,c = col - 1; c >= 0 && r <   18;r++, c--){
      if(grid[r][c] == p){
        total++
      }
      else {
        if(grid[r][c] == 0){
          nrow = r
          ncol = c   
        }
        break
      }
    }
    if(total >= tp && nrow >=0 && ncol >= 0){
      arr.push(nrow)
      arr.push(ncol)
    }
    return arr
  }

  /**
   * 结算
   */
  function end(arr){
    e = true
    for(let i = 0;i < arr.length; i++){
      let _row = arr[i][0]
      let _col = arr[i][1]
      const _cell = gridContainer.children[_row *   18 + _col]
      const _piece = _cell.firstChild
      _piece.style.border = '2px solid green'
    }
  }

})
  