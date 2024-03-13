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

//事件委托切换用户
const changeUser = document.querySelector('.exterior .indexcontent .changeUser')
const changeadmin = document.querySelector('#changeadmin')
const changeuser = document.querySelector('#changeuser')
changeUser.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    changeadmin.classList.remove('active')
    changeuser.classList.remove('active')
    e.target.classList.add('active')
  }
})

//li点击跳转事件
const index = document.querySelector('.sidebar .index')
const userManagement = document.querySelector('.sidebar .userManagement')
const logManagement = document.querySelector('.sidebar .logManagement')
const userlogManagement = document.querySelector('.sidebar .userlogManagement')
index.addEventListener('click', function () {
  location.href = 'adminindex.html'
})
userManagement.addEventListener('click', function () {
  location.href = 'userManagement.html'
})
logManagement.addEventListener('click', function () {
  location.href = 'logManagement.html'
})
userlogManagement.addEventListener('click', function () {
  location.href = 'userlogManagement.html'
})

//刷新页面
// 获取刷新按钮元素
var refreshBtn = document.getElementById('refreshBtn');

// 定义节流函数
function throttle(func, delay) {
  let timerId;
  return function () {
    if (!timerId) {
      timerId = setTimeout(function () {
        func();
        timerId = null;
      }, delay);
    }
  }
}

// 创建节流函数的实例
var throttledReload = throttle(function () {
  location.reload();
}, 0); // 设置延迟时间为2秒

// 添加点击事件监听器
refreshBtn.addEventListener('click', throttledReload);


//表格数据
let tableData1 = [];
let tableData2 = [];
let tableData3 = [];
let tableData4 = [];
// 赋值用户信息
const userinfotext1 = document.querySelector('#userinfotext1')
window.addEventListener('load', function () {
  // 登陆过滤器
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
      getadminData()
    },
    error: function () {
      console.log("AJAX请求出错");
    }
  });

  function  getadminData(){
    // 获取admin和user的表格数据
    $.ajax({
      url: "getAdminerData",
      method: "GET",
      data: {
        action: "gettableadmin",
      },
      success: function (response) {
        // 遍历传来的数据数组，将每个对象转换为 tableData1 数组中的元素
        var resadminjson=JSON.parse(response)
        console.log(resadminjson)

        initPagination(tables[0], paginations[0], resadminjson);
        getUserData()


      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });

  }


  function getUserData(){
    $.ajax({
      url: "getUserData",
      method: "GET",
      data: {
        action: "gettableuser",
      },
      success: function (response1) {
        // 遍历传来的数据数组，将每个对象转换为 tableData3 数组中的元素
        var resuserjson=JSON.parse(response1)
        console.log(resuserjson)

        initPagination(tables[2], paginations[2], resuserjson);
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
  }

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

//测试用户名可用情况
// admin
const admincheckname = document.querySelector('#admincheckname')
const adminuname = document.querySelector('.addinfo  .adminuname')
const adminpassword = document.querySelector('.addinfo  .adminpassword')
adminuname.addEventListener('blur', function () {
  // 写ajax内容
  if (adminuname.value === "") {
    admincheckname.innerHTML = ""
  }
  else {
    $.ajax({
      url: "CheckNameadmin",
      method: "POST",
      data: {
        action: "checkadminname",
        username: adminuname.value
      },
      success: function (data) {
        if (data === "canuse") {
          admincheckname.innerHTML = "用户名可用"
          admincheckname.style.color = "blue"
        }
        else {
          admincheckname.innerHTML = "用户名已存在"
          admincheckname.style.color = "red"
        }
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
  }

})
// user
const usercheckname = document.querySelector('#usercheckname')
const useruname = document.querySelector('.useraddinfo  .useruname')
const userpassword = document.querySelector('.useraddinfo  .userpassword')
useruname.addEventListener('blur', function () {
  // 写ajax内容
  if (useruname.value === "") {
    usercheckname.innerHTML = ""
  }
  else {
    $.ajax({
      url: "CheckNameServlet",
      method: "POST",
      data: {
        action: "checkusername",
        username: useruname.value
      },
      success: function (data) {
        if (data === "canuse") {
          usercheckname.innerHTML = "用户名可用"
          usercheckname.style.color = "blue"
        }
        else {
          usercheckname.innerHTML = "用户名已存在"
          usercheckname.style.color = "red"
        }
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
  }

})

// 录入按钮监听事件
//admin
const addadmin = document.querySelector('#addadmin')
addadmin.addEventListener('click', function (e) {
  e.preventDefault()
  // 写ajax
  if (adminuname.value !== "" && adminpassword.value !== "") {
    $.ajax({
      url: "insertAdminer",
      method: "POST",
      data: {
        action: "addadmin",
        adminuname: adminuname.value,
        adminpassword: adminpassword.value
      },
      success: function (data) {
        if (data === "successadd") {
          alert('添加成功!')
        }
        else {
          alert('添加失败！')
        }
        location.reload();
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
  }
})
// user
const adduser = document.querySelector('#adduser')
adduser.addEventListener('click', function (e) {
  e.preventDefault()
  if (useruname.value !== "" && userpassword.value !== "") {
    $.ajax({
      url: "insertPlayer",
      method: "POST",
      data: {
        action: "adduser",
        username: useruname.value,
        userpassword: userpassword.value
      },
      success: function (data) {
        if (data === "successadd") {
          alert('添加成功!')
        }
        else {
          alert('添加失败！')
        }
        location.reload();
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
  }
})


//搜索引擎覆盖功能
// admin
const search = document.querySelector('.search')
const searchbtn = document.querySelector('#searchbtn')
const expressall = document.querySelector('#expressall')
const searchout = document.querySelector('#searchout')
const searchinput = document.querySelector('.searchbyname .searchinput')
searchbtn.addEventListener('click', function () {
  if (searchinput.value !== "") {
    searchout.style.transform = "translateY(0)"
    expressall.style.display = "none"
    expressall.style.transform = "translateY(-330px)"
    adminreturnall.style.display = "inline-block"
    //查找admin
    $.ajax({
      url: "Adminersearch",
      method: "GET",
      data: {
        action: "searchadminbyname",
        searchname: searchinput.value
      },
      success: function (response) {
        //       // 遍历传来的数据数组，将每个对象转换为 tableData2 数组中的元素
        if(response){
          var ressearchadmin=JSON.parse(response)
          initPagination(tables[1], paginations[1], ressearchadmin);
        }
         else {
           alert('没有这个用户')
        }
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });

  }
})
searchinput.addEventListener('blur', function () {
  if (searchinput.value === "") {
    searchout.style.transform = "translateY(330px)";
    expressall.style.display = "block"
    expressall.style.transform = "translateY(0)";
    adminreturnall.style.display = "none"
    tableData2 = []
  }
})
//返回按钮监听
const adminreturnall = document.querySelector('#adminreturnall')
adminreturnall.addEventListener('click', function () {
  searchout.style.transform = "translateY(330px)";
  expressall.style.display = "block"
  expressall.style.transform = "translateY(0)";
  adminreturnall.style.display = "none"
  searchinput.value = ""
  tableData2 = []
})

//搜索引擎覆盖功能
// user板块
const userexpressall = document.querySelector('#userexpressall')
const usersearchout = document.querySelector('#usersearchout')
const usersearchinput = document.querySelector('.usersearchbyname .usersearchinput')
const usersearchbtn = document.querySelector('#usersearchbtn')
usersearchbtn.addEventListener('click', function () {
  if (usersearchinput.value !== "") {
    usersearchout.style.transform = "translateY(0)";
    userexpressall.style.display = "none"
    userexpressall.style.transform = "translateY(-330px)";
    userreturnall.style.display = "inline-block"
    //搜索user
    $.ajax({
      url: "Playersearch",
      method: "GET",
      data: {
        action: "searchuserbyname",
        searchname: usersearchinput.value
      },
      success: function (response) {
        //       // 遍历传来的数据数组，将每个对象转换为 tableData4 数组中的元素
        if (response){
          console.log(response)
          var ressearchuser=JSON.parse(response)
          initPagination(tables[3], paginations[3], ressearchuser);
        }
        else {
          alert('没有这个用户')
        }
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });

  }
})
usersearchinput.addEventListener('blur', function () {
  if (usersearchinput.value === "") {
    usersearchout.style.transform = "translateY(330px)";
    userexpressall.style.display = "block"
    userexpressall.style.transform = "translateY(0)";
    userreturnall.style.display = "none"
    tableData4 = []
  }
})
//返回按钮监听
const userreturnall = document.querySelector('#userreturnall')
userreturnall.addEventListener('click', function () {
  usersearchout.style.transform = "translateY(330px)";
  userexpressall.style.display = "block"
  userexpressall.style.transform = "translateY(0)";
  userreturnall.style.display = "none"
  usersearchinput.value = ""
  tableData4 = []
})

//删除按钮监听事件

function deteleUser(button) {
  const row = button.parentElement.parentElement;
  const cells = row.getElementsByTagName('td');
  const rowData = {};

  for (let i = 0; i < 3; i++) {
    const cell = cells[i];
    let columnName = '';
    switch (i) {
      case 0:
        columnName = 'no';
        break;
      case 1:
        columnName = 'username';
        break;
      case 2:
        columnName = 'password';
        break;
      default:
        break;
    }
    const cellData = cell.innerText.trim();
    rowData[columnName] = cellData;
    cell.setAttribute('contenteditable', 'false');
  }
  // 从行中找到包含表格的容器元素
  var container = row.closest('table');

  // 获取表格的 ID
  var tableId = container.id;

  // 输出表格的 ID
  console.log("Table ID:", tableId);
  if (confirm('你确定要删除该行数据吗？')) {
    // 发送数据给后端
    console.log(rowData);
    $.ajax({
      url: "deleteServlet",
      method: "POST",
      data: {
        action: "detele",
        tableId:tableId,
        username:rowData.username
      },
      success: function (data) {
        if (data === "successdetele") {
          alert('删除成功!')
        }
        location.reload()
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
  }

}

// 点击修改使得表格可编辑
function makeRowEditable(button) {
  const row = button.parentElement.parentElement;
  const cells = row.getElementsByTagName('td');

  for (let i = 2; i < 3; i++) {
    cells[i].setAttribute('contenteditable', 'true');
  }


  // 设置焦点在当前行的第一个可编辑单元格上
  const firstEditableCell = row.querySelector('td[contenteditable="true"]');
  firstEditableCell.focus();
}

function saveRowChanges(button) {
  const row = button.parentElement.parentElement;
  const firstEditableCell = row.querySelector('td[contenteditable="true"]');

  // 如果当前行尚未处于编辑状态，则不执行保存操作
  if (!firstEditableCell) {
    return;
  }

  const cells = row.getElementsByTagName('td');
  const rowData = {};

  for (let i = 0; i < 3; i++) {
    const cell = cells[i];
    let columnName = '';
    switch (i) {
      case 0:
        columnName = 'no';
        break;
      case 1:
        columnName = 'username';
        break;
      case 2:
        columnName = 'password';
        break;
      default:
        break;
    }
    const cellData = cell.innerText.trim();
    rowData[columnName] = cellData;
    cell.setAttribute('contenteditable', 'false');
  }
  // 从行中找到包含表格的容器元素
  var container = row.closest('table');

  // 获取表格的 ID
  var tableId = container.id;

  // 输出表格的 ID
  console.log("Table ID:", tableId);
  // 发送数据给后端
  console.log(rowData.no);
  console.log(rowData.username);
  console.log(rowData.password);
  $.ajax({
    url: "ChangeUser",
    method: "POST",
    data: {
      action: "update",
      no:rowData.no,
      username:rowData.username,
      password:rowData.password,
         tableId:tableId
    },
    success: function (data) {
      if (data === "successupdate") {
        alert('修改成功!')
      }
      location.reload()
    },
    error: function () {
      console.log("AJAX请求出错");
    }
  });
}

function saveRowChangesPlayer(button) {
  const row = button.parentElement.parentElement;
  const firstEditableCell = row.querySelector('td[contenteditable="true"]');

  // 如果当前行尚未处于编辑状态，则不执行保存操作
  if (!firstEditableCell) {
    return;
  }

  const cells = row.getElementsByTagName('td');
  const rowData = {};

  for (let i = 0; i < 3; i++) {
    const cell = cells[i];
    let columnName = '';
    switch (i) {
      case 0:
        columnName = 'no';
        break;
      case 1:
        columnName = 'username';
        break;
      case 2:
        columnName = 'password';
        break;
      default:
        break;
    }
    const cellData = cell.innerText.trim();
    rowData[columnName] = cellData;
    cell.setAttribute('contenteditable', 'false');
  }

}

//表格分页
// 分页逻辑函数
// 每页显示的行数
const rowsPerPage = 10;

// 获取所有表格和分页控件的引用
//获得tbody
const tables = document.querySelectorAll('tbody');
const paginations = document.querySelectorAll('.pagination');

// 初始化分页
function initPagination(table, pagination, tableData) {
  let currentPage = 1; // 当前页码

  // 计算总页数
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  // 更新表格内容
  function updateTable() {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const dataToShow = tableData.slice(startIndex, endIndex);

    // 清空表格内容
    table.innerHTML = '';

    // 添加数据到表格
    dataToShow.forEach(rowData => {
      const row = document.createElement('tr');

      // 根据rowData生成表格行的内容
      // 创建单元格并设置内容
      row.innerHTML = `
      <td>${rowData.id}</td>
      <td>${rowData.name}</td>
      <td>${rowData.password}</td>
      <td><button onclick="deteleUser(this)" type="button">删除</button></td>
      <td><button onclick="makeRowEditable(this)" type="button">编辑</button></td>
      <td><button onclick="saveRowChanges(this)" type="button">保存</button></td>
     `


      table.appendChild(row);
    });
  }

  // 更新分页控件
  function updatePagination() {
    pagination.innerHTML = '';

    // 添加上一页按钮
    const prevButton = createPageButton('Prev', () => {
      if (currentPage > 1) {
        currentPage--;
        updateTable();
        updatePagination();
      }
    });
    pagination.appendChild(prevButton);
    let startPage = currentPage - 4;
    let endPage = currentPage + 3;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, 8);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - 7);
    }
    // 添加页码按钮
    for (let i = startPage; i <= endPage; i++) {
      // 创建页码按钮并添加到页面
      const pageButton = createPageButton(i, () => {
        currentPage = i;
        updateTable();
        updatePagination();
      });

      if (i === currentPage) {
        pageButton.classList.add('active');
      }

      pagination.appendChild(pageButton);
    }

    // 添加下一页按钮
    const nextButton = createPageButton('Next', () => {
      if (currentPage < totalPages) {
        currentPage++;
        updateTable();
        updatePagination();
      }
    });
    pagination.appendChild(nextButton);
  }

  // 创建页码按钮
  function createPageButton(label, onClick) {
    const button = document.createElement('a');
    button.classList.add('page-link');
    button.innerText = label;
    button.addEventListener('click', onClick);
    return button;
  }

  updateTable();
  updatePagination();
}
// 初始化所有表格和分页控件
// for (let i = 0; i < tables.length; i++) {
//   const table = tables[i];
//   const pagination = paginations[i];
//   initPagination(table, pagination, tableData1);
// }
