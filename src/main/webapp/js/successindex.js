//页面隐藏显示
function showPage(pageId) {
  // 隐藏所有页面
  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }

  // 显示选定的页面
  var page = document.getElementById(pageId);
  if (page) {
    page.style.display = "block";
  }
}
//改变页面的active
const index = document.querySelector('#index')
const productinformation = document.querySelector('#productinformation')
const helpcenter = document.querySelector('#helpcenter')
const aboutus = document.querySelector('#about-us')
const footerinfomation = document.querySelector('#footerinfomation')
const footerhelp = document.querySelector('#footerhelp')
const gotoplaycontrol = document.querySelector('#gotoplaycontrol')
// 更新导航项的active类
function setActiveNav(e) {
  // 取消默认操作
  // e.preventDefault();

  // 移除所有导航项的active类
  index.classList.remove('active');
  productinformation.classList.remove('active');
  helpcenter.classList.remove('active');
  aboutus.classList.remove('active');
  const clickedLink = e.target;
  // 添加当前点击的导航项的active类
  if (clickedLink.tagName === 'A' && clickedLink.getAttribute("name") === "product-information") {
    productinformation.classList.add('active');
  }
  else if (clickedLink.tagName === 'A' && clickedLink.getAttribute("name") === "help-center") {
    helpcenter.classList.add('active');
  }
  else if (clickedLink.tagName === 'A' && clickedLink.getAttribute("name") === "gotoplaycontrol") {
    index.classList.add('active');
  }
  else {
    clickedLink.classList.add('active');
  }
}
index.addEventListener('click', setActiveNav);
productinformation.addEventListener('click', setActiveNav);
helpcenter.addEventListener('click', setActiveNav);
aboutus.addEventListener('click', setActiveNav);
footerinfomation.addEventListener('click', setActiveNav);
footerhelp.addEventListener('click', setActiveNav);
gotoplaycontrol.addEventListener('click', setActiveNav);
//排行榜切换
//页面隐藏显示
const leveleasy = document.querySelector('#leveleasy')
const levelmid = document.querySelector('#levelmid')
const levelhard = document.querySelector('#levelhard')
const tableeasy = document.querySelector('#tableeasy')
const tablemid = document.querySelector('#tablemid')
const tablehard = document.querySelector('#tablehard')
function showPagetable(pageId) {
  // 隐藏所有页面
  var pages = document.getElementsByClassName("pagelevel");
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }

  // 显示选定的页面
  var page = document.getElementById(pageId);
  if (page) {
    page.style.display = "block";
  }
}
function setActiveNavbtn(e) {
  // 取消默认操作

  // 移除所有导航项的active类
  leveleasy.classList.remove('activebtn');
  levelmid.classList.remove('activebtn');
  levelhard.classList.remove('activebtn');
  const clickedLink = e.target;
  // 添加当前点击的导航项的active类
  clickedLink.classList.add('activebtn');
}
leveleasy.addEventListener('click', setActiveNavbtn);
levelmid.addEventListener('click', setActiveNavbtn);
levelhard.addEventListener('click', setActiveNavbtn);

// 赋值用户信息
const userinfotext1 = document.querySelector('#userinfotext1')
//登陆过滤器
window.addEventListener('load', function () {
  $.ajax({
    url: "LoginFilter",
    method: "POST",
    data: {
      action: "islogined",

    },
    success: function (data) {
      if (data) {
        userinfotext1.innerHTML = data
      }
      else {
        location.href = "index.html"
      }
    },
    error: function () {
      console.log("AJAX请求出错");
    }
  });
})

// 退出登陆监听器
const exit = document.querySelector('.info .exit')
exit.addEventListener('click', function () {
  if (confirm('你确定要退出登陆吗？')) {
    $.ajax({
      url: "UserExitlogin",
      method: "POST",
      data: {
        action: "exitlogin",

      },
      success: function (data) {
        if (data) {
          location.href = "index.html"
        }
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
  }
})

// 电梯导航
const elevator = document.querySelector('.xtx-elevator')
const tofooter = document.querySelector('.xtx-elevator .tofooter')
const footer = document.querySelector('.project')
const topgo = document.querySelector('.topgo')
const toplay = document.querySelector('.toplay')
window.addEventListener('scroll', function () {
  const n = document.documentElement.scrollTop
  if (n > 0) {
    elevator.style.opacity = 1
  }
  else {
    elevator.style.opacity = 0
  }
})
topgo.addEventListener('click', function () {
  document.documentElement.scrollTop = 0
})
tofooter.addEventListener('click', function () {
  document.documentElement.scrollTop = footer.offsetTop
})
toplay.addEventListener('click', function () {
  document.documentElement.scrollTop = 400
})

//游戏内容部分
new Vue({
  el: '#app',
  data: {
    gameOn: true,  // 为true才可以操作，否则停止
    board: [],  // 整个游戏框
    rows: 9,  // 行数
    cols: 9,  // 列数
    mines: 10,  // 雷数
    noMine: 0,  // 不是雷的数量
    safeRemain: 0,  // 当前等待被挖开的数量
    marked: 0,  // 当前除标记外剩余的雷数（可以为负）
    markedStr: '000',  // 剩余雷数字符串格式（用于展示）
    wrongIndex: [-1, -1],  // 当前踩到雷的位置（展示用）
    selectedLevel: 'level1',  // 游戏等级
    time: 0,  // 计时变量
    timeStr: '000',  // 计时字符串（展示用）
    timecount: null, // 计时进程
    sentTimeToServer: false
  },
  mounted() {
    this.startGame()
  },
  methods: {
    suitMobile() {
      // 兼容手机平板
      const mediaQueryList = window.matchMedia('(max-width: 1200px)');
      if (mediaQueryList.matches) {
        // @media属性匹配时的处理逻辑（手机端）
        if (this.selectedLevel == 'level1') return 'board-simple';
        else if (this.selectedLevel == 'level2') return 'board-medium';
        else return 'board-hard';
      } else {
        // @media属性不匹配时的处理逻辑（电脑端）
        return 'board';
      }

    },
    // 设置游戏等级
    handleSelection() {
      switch (this.selectedLevel) {
        case 'level1':
          this.rows = 9;
          this.cols = 9;
          this.mines = 10;
          break;
        case 'level2':
          this.rows = 16;
          this.cols = 16;
          this.mines = 40;
          break;
        case 'level3':
          this.rows = 16;
          this.cols = 30;
          this.mines = 99;
          break;
      }
      this.startGame();
    },
    // 重新开始游戏,重置各项参数
    startGame() {
      clearInterval(this.timecount)  // 停止计时
      this.board = this.generateBoard();
      this.safeRemain = this.rows * this.cols - this.mines;
      this.noMine = this.safeRemain;
      this.marked = this.mines;
      this.markedStr = this.getStr(this.marked);
      this.gameOn = true;
      this.wrongIndex = [-1, -1];
      this.time = 0;
      this.timeStr = '000';
      this.sentTimeToServer = false
    },
    // 按照行数、列数、雷数生成地图
    generateBoard() {
      const board = [];
      for (let i = 0; i < this.rows; i++) {
        const row = [];
        for (let j = 0; j < this.cols; j++) {
          row.push({
            isMine: false,  // 是不是雷
            revealed: false,  // 是否被挖开
            marked: false,  // 是否被标记
            adjacentMines: 0  // 周围的雷数
          });
        }
        board.push(row);
      }
      // this.placeMines(board);
      // this.calculateAdjacentMines(board);
      return board;
    },
    // 随机放置雷
    placeMines(board, click_row, click_col) {
      let minesToPlace = this.mines;
      while (minesToPlace > 0) {
        const row = Math.floor(Math.random() * this.rows);
        const col = Math.floor(Math.random() * this.cols);
        if (!board[row][col].isMine && !(click_col == col && click_row == row)) {
          board[row][col].isMine = true;
          minesToPlace--;
        }
      }
      this.calculateAdjacentMines(board);
    },
    // 计算周围雷数
    calculateAdjacentMines(board) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          if (!board[i][j].isMine) {
            let count = 0;
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                if (i + x >= 0 && i + x < this.rows && j + y >= 0 && j + y < this.cols) {
                  if (board[i + x][j + y].isMine) {
                    count++;
                  }
                }
              }
            }
            board[i][j].adjacentMines = count;
          }
        }
      }
    },
    // 传入坐标进行挖掘（点击左键）
    revealCell(row, col) {
      if (this.gameOn) {  // 只在游戏进行中可以操作
        if (this.safeRemain == this.noMine) {  // 第一次点击时生成雷，保证不会开局挂
          this.placeMines(this.board, row, col);
          let _this = this;  // 开始计时
          this.timecount = setInterval(function () {
            _this.time += 1;
            _this.timeStr = _this.getStr(_this.time);
          }, 1000)
        }

        const cell = this.board[row][col];
        if (!cell.revealed && !cell.marked) {  // 未被翻开也未被标记
          cell.revealed = true;
          if (cell.isMine) {
            this.wrongIndex = [row, col]
            this.showDetail();
            clearInterval(this.timecount)  // 停止计时
            alert('Game Over!');
            this.gameOn = false;
          } else if (cell.adjacentMines === 0) {
            this.revealAdjacentCells(row, col);
          }
          this.safeRemain -= 1;
          if (this.safeRemain == 0) {
            this.showDetail();
            clearInterval(this.timecount)  // 停止计时
            alert('You Won!');
            this.gameOn = false;
          }
        }
      }
    },
    // 标记雷（点击右键）
    markupCell(row, col) {
      event.preventDefault(); // 阻止默认的右键菜单弹出
      if (this.gameOn) {
        const cell = this.board[row][col];
        if (!cell.revealed) {  // 只对未翻开的方块进行标记
          if (!cell.marked) {
            this.marked -= 1;
          } else {
            this.marked += 1;
          }
          this.markedStr = this.getStr(this.marked);  // 将剩余雷数转换为字符串
          cell.marked = !cell.marked;
        }
      }
    },
    // 挖掘临近的其它块（递归DFS）
    revealAdjacentCells(row, col) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (row + x >= 0 && row + x < this.rows && col + y >= 0 && col + y < this.cols) {
            const cell = this.board[row + x][col + y];
            if (!cell.revealed && !cell.isMine) {
              cell.revealed = true;
              this.safeRemain -= 1;
              if (cell.adjacentMines === 0) {
                this.revealAdjacentCells(row + x, col + y);
              }
            }
          }
        }
      }
    },
    // 结算
    showDetail() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          const cell = this.board[i][j];
          if (cell.isMine) {  // 所有的雷都挖开
            cell.revealed = true;

          }
          if (cell.marked && !cell.isMine) {  // 标错的挖开
            cell.revealed = true;
          }
        }
      }
      if (!this.sentTimeToServer) { // 添加一个标志位，避免重复发送时间
        $.ajax({
          url: "UpdataGoal",
          method: "POST",
          data: {
            action:"sendtime",
            username: userinfotext1.innerHTML,
            time: this.time,
            // selectedLevel的属性值为: level1,2,3
            selectedLevel: this.selectedLevel
          },
          success: function (response) {
            console.log("Time sent to the backend successfully");
          },
          error: function (error) {
            console.error("Failed to send time to the backend");
          }
        });
        this.sentTimeToServer = true; // 设置标志位，表示已经发送过时间了
      }
    },
    // 将剩余雷数转换为字符串
    getStr(num) {
      let result;
      let _num = String(num)
      if (_num.length == 1) {
        result = '00' + _num;
      } else if (_num.length == 2) {
        result = '0' + _num;
      } else {
        result = _num;
      }
      return result;
    }
  }
});


//排行榜表格传参
function populateTable(id, data) {
  // 找到指定id的表格容器
  var container = document.getElementById(id);

  // 找到表格的tbody元素
  var tbody = container.querySelector('tbody');

  // 遍历数据数组对象
  data.forEach(function (item) {
    // 创建新行
    var newRow = document.createElement('tr');

    // 创建单元格并添加数据
    var cell1 = document.createElement('td');
    cell1.textContent = item.name;
    var cell2 = document.createElement('td');
    cell2.textContent = item.time;

    // 将单元格添加到新行中
    newRow.appendChild(cell1);
    newRow.appendChild(cell2);

    // 将新行添加到tbody中
    tbody.appendChild(newRow);
  });
}

// 使用示例：
var tableDataEasy = [];
var tableDataMid = [];
var tableDataHard = [];
window.addEventListener('load', function () {
  // 获取easy表数据
  $.ajax({
    url: "GetEasyServlet",
    method: "GET",
    data: {
      action: "gettableDataEasy",
    },
    success: function (response1) {
      // 遍历传来的数据数组，将每个对象转换为 tableDataEasy 数组中的元素
      var resJson1 = JSON.parse(response1)
      populateTable('tableeasy', resJson1);
      console.log(resJson1)
      getMid()
    },
    error: function () {
      console.log("AJAX请求出错");
    }
  });
function getMid(){
  // 获取mid表数据
  $.ajax({
    url: "GetMidServlet",
    method: "GET",
    data: {
      action: "gettableDataMid",
    },
    success: function (response2) {
      // 遍历传来的数据数组，将每个对象转换为 tableDataMid 数组中的元素
      const resJson2 = JSON.parse(response2);
      populateTable('tablemid', resJson2);
      console.log(resJson2)
      getHard()
    },
    error: function () {
      console.log("AJAX请求出错");
    }
  });
}

function getHard(){
  // // 获取hard表数据
  $.ajax({
    url: "GetHardServlet",
    method: "GET",
    data: {
      action: "gettableDataHard",
    },
    success: function (response3) {
      // 遍历传来的数据数组，将每个对象转换为 tableDataHard 数组中的元素
      var resJson3 = JSON.parse(response3)
      console.log(resJson3)
      populateTable('tablehard', resJson3);
      getComment()
    },
    error: function () {
      console.log("AJAX请求出错");
    }
  });
}
function getComment(){
  $.ajax({
    url: "getComment",
    method: "POST",
    data: {
      action: "getComment",
    },
    success: function (response) {
        //此次写返回的字符串数组渲染
  if (response) {
    // 使用 filter 方法过滤掉空值和重复值，并得到一个去重后的数组
    console.log(response)
    // 使用逗号将数据切分成数组
    var dataArray = response.split(',');

    // 遍历数组并渲染到页面
    dataArray.forEach(function (event) {
      // 创建 p 标签
      var p = document.createElement('p');

      // 设置 p 标签的文本内容为事件信息
      p.textContent = event.trim();  // trim() 用于去除字符串两端的空格

      // 将p标签添加到div容器中
      expresscomment.appendChild(p);
    });

  }
    },
    error: function () {
      console.log("AJAX请求出错");
    }
  });
}
})


//评论
const sendcomment=document.querySelector('#sendcomment')
const commentarea=document.querySelector('#commentarea')
const expresscomment=document.querySelector('#expresscomment')
sendcomment.addEventListener('click',function (){

  if (commentarea.value!==""){
    console.log(commentarea.value)
    $.ajax({
      url: "sendComment",
      method: "POST",
      data: {
        action: "sendComment",
        username: userinfotext1.innerHTML,
        comment:commentarea.value
      },
      success: function (response) {
          //此次写返回的字符串数组渲染
    if (response) {
      // 使用 filter 方法过滤掉空值和重复值，并得到一个去重后的数组

      // 使用逗号将数据切分成数组
      var dataArray = response.split(',');

      // 遍历数组并渲染到页面
      dataArray.forEach(function (event) {
        // 创建 p 标签
        var p = document.createElement('p');

        // 设置 p 标签的文本内容为事件信息
        p.textContent = event.trim();  // trim() 用于去除字符串两端的空格

        // 将p标签添加到div容器中
        expresscomment.appendChild(p);

        commentarea.value=''
      });

    }
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });

  }
  else {
    alert('评论内容不能为空！')
  }
})