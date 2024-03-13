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

// 赋值用户信息
//获取数据
// 使用一个数组来存储传入的数据
var dataadminManagement = [];
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

  //获取数据
  $.ajax({
    url: "getAdminerLog",
    method: "GET",
    data: {
      action: "getdataadminManagement",

    },
    success: function (response) {
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
          expressall.appendChild(p);
        });
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

//传入日志信息
var expressall = document.getElementById('expressall');



//刷新按钮
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