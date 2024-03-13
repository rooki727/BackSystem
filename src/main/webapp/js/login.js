const account = document.querySelector('#account')
const password = document.querySelector('#password')

// 验证码
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const canvas = document.querySelector('.captcha')
const canvasp = document.querySelector('.captcha p')
const codeinput = document.querySelector('.loginpage .vcode .codeinput')
const codespan = document.querySelector('.loginpage .vcode span')
const accpass = document.querySelector('.loginpage .accpass')
// 生成验证码用于测试功能,实用需要后端生成
// function generateCaptcha() {
//   var captcha = '';
//   for (var i = 0; i < 4; i++) {
//     captcha += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return captcha;
// }
//
// function updateCaptcha() {
//   canvasp.innerHTML = generateCaptcha();
// }

canvas.addEventListener('click', function () {
  //点击重新获取验证码
    $.ajax({
      url: "CodeServlet",
      method: "GET",
      data: {
        action: "getCaptcha",

      },
      success: function (data) {
        canvasp.innerHTML = data
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
});

// 初始化时生成验证码
// updateCaptcha();

// 后端获取验证码
window.addEventListener('load', function () {
  $.ajax({
    url: "CodeServlet",
    method: "GET",
    data: {
      action: "getCaptcha",

    },
    success: function (data) {
      canvasp.innerHTML = data
    },
    error: function () {
      console.log("AJAX请求出错");
    }
  });
})

//用户名密码光标事件
account.addEventListener('focus', function () {
  this.classList.add('active')
})
password.addEventListener('focus', function () {
  this.classList.add('active')
})
account.addEventListener('blur', function () {
  this.classList.remove('active')
})
password.addEventListener('blur', function () {
  this.classList.remove('active')
})

// 验证码输入框监听器
codeinput.addEventListener('focus', function () {
  this.classList.add('active')
})
codeinput.addEventListener('blur', function () {
  this.classList.remove('active')
  if (codeinput.value !== canvasp.innerHTML && codeinput.value != '') {
    codespan.style.display = 'inline-block'
  }
  else {
    codespan.style.display = 'none'
  }
})


// button监听器
const reg = /^[0-9-_]{5,12}$/
const reg2 = /^[a-zA-Z0-9-_]{6,16}$/
const agreementcheck = document.querySelector('.agreement .agreementcheck')
const submit = document.querySelector('#submit')
const logindiv = document.querySelector('.logindiv')

submit.addEventListener('click', function (e) {
  console.log(account.value);
  console.log(password.value);
  if (account.value === '' || password.value === '' || codeinput.value === '') {
    alert('输入完整的账号密码、验证码信息')
    e.preventDefault()
  }
  else if (codeinput.value != canvasp.innerHTML) {
    alert('验证码不正确！')
    e.preventDefault()
  }
  else if (!agreementcheck.checked) {
    alert('请勾选同意协议！')
    e.preventDefault()
  }
  else {
    e.preventDefault()
    //ajax请求
    $.ajax({
      url: "LoginServlet",
      method: "GET",
      data: {
        action: "login",
        username: account.value,
        password: password.value
      },
      success: function (data) {
        if (data === "successadmin") {
          alert('登陆成功！即将跳转管理主页面!')
          location.href = "adminindex.html"
        }
        else if (data === "successuser") {
          alert('登陆成功！即将跳转用户主页面!')
          location.href = "successindex.html"
        }
        else {
          alert('登陆失败！请检查账号密码是否正确!')
        }
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });

  }
})

