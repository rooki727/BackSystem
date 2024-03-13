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
// 获取用户和管理员数量总和
const admintotal = document.querySelector('#admintotal')
const usertotal = document.querySelector('#usertotal')
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
      getAdminTotal()
    },
    error: function () {
      console.log("AJAX请求出错");
    }
  });


  function  getAdminTotal(){
    // 获取admin用户总量
    $.ajax({
      url: "GetToalAdminer",
      method: "POST",
      data: {
        action: "gettoaladmin",
      },
      success: function (data) {
        if (data) {
          admintotal.innerHTML = data
        }
        getUserTotal()
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
  }

  function getUserTotal(){
    //   // 获取user用户总量
    $.ajax({
      url: "GetToalPlayer",
      method: "POST",
      data: {
        action: "gettoaluser",
      },
      success: function (data) {
        if (data) {
          usertotal.innerHTML = data
        }
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
  }

});




// 退出登陆监听器
const exit = document.querySelector('.info .exit')
exit.addEventListener('click', function () {
  if (confirm('你确定要退出登陆吗？')) {
    $.ajax({
      url: "UserExitlogin",
      method: "POST",
      data: {
        action: "exitlogin",
        username: userinfotext1.innerHTML
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