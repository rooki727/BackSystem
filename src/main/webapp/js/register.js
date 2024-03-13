const repassword = document.querySelector('.registerpage .repassword')
const account = document.querySelector('#account')
const password = document.querySelector('#password')
const warnaccount = document.querySelector('.registerpage .warnaccount')
const warnpassword = document.querySelector('.registerpage .warnpassword')
const checkname = document.querySelector('#checkname')
const accpass = document.querySelector('.registerpage .accpass')

// 账号密码输入提示监听器
account.addEventListener('focus', function () {
  warnaccount.style.display = 'block'
  checkname.style.display = 'none'
  this.classList.add('active')
})


account.addEventListener('blur', function () {
  this.classList.remove('active')
  warnaccount.style.display = 'none'
  checkname.style.display = 'inline-block'

  if (account.value === '') {
    checkname.innerHTML = '用户名不能为空'
    checkname.style.color = 'blue'
  }
  else {
    checkname.innerHTML = ''
    // var username = account.value
    console.log(account.value);
    $.ajax({
      url: "CheckNameServlet",
      method: "POST",
      data: {
        action: "checkName",
        username: account.value

      },
      success: function (data) {
        if (data === "canuse") {
        console.log(data);
         checkname.innerHTML = '用户名可用'
         checkname.style.color = 'bule'
        } else {
          checkname.innerHTML = '用户名已存在'
          checkname.style.color = 'red'
        }
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
  }
})
password.addEventListener('focus', function () {
  this.classList.add('active')
  warnpassword.style.display = 'block'
})
password.addEventListener('blur', function () {
  this.classList.remove('active')
  warnpassword.style.display = 'none'
})
// 再次确认密码监听器

const notice = document.querySelector('.registerpage .notice')
repassword.addEventListener('focus', function () {
  this.classList.add('active')
})
repassword.addEventListener('blur', function () {
  this.classList.remove('active')
  if (repassword.value !== password.value) {
    notice.style.display = 'inline-block'
  }
  else {
    notice.style.display = 'none'
  }
})

// 验证码
const canvas = document.querySelector('.captcha')
const canvasp = document.querySelector('.captcha p')
const codeinput = document.querySelector('.registerpage .vcode .codeinput')
const codespan = document.querySelector('.registerpage .vcode span')

//后端获取验证码
window.addEventListener('load', function () {
  $.ajax({
    url: "CodeServlet",
    method: "GET",
    data: {
      action: "getCaptcha",

    },
    success: function (data) {
      console.log(data)
      canvasp.innerHTML = data
    },
    error: function () {
      console.log("AJAX请求出错");
    }
  });
})

canvas.addEventListener('click', function () {
 // 点击重新获取验证码
    $.ajax({
      url: "CodeServlet",
      method: "GET",
      data: {
        action: "getCaptcha",

      },
      success: function (data) {
console.log(data)
         canvasp.innerHTML = data
      },
      error: function () {
        console.log("AJAX请求出错");
      }
    });
});




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
const registerbutton = document.querySelector('.registerpage .registerdiv')

// 表单事件
const submit = document.querySelector('#submit')
submit.addEventListener('click', function (e) {
  console.log(account.value);
  console.log(password.value);
  if (account.value === '' || password.value === '' || repassword.value === '' || codeinput.value === '') {
    e.preventDefault()
    alert('输入完整的账号密码、验证码信息')
  }
  else
    if (!reg.test(account.value)) {
      alert('输入的账号不满足规则')
      e.preventDefault()
    }
    else
      if (!reg2.test(password.value)) {
        alert('输入的密码不满足规则')
        e.preventDefault()
      }
      else if (password.value !== repassword.value) {
        alert('请确认两次输入密码一致')
        e.preventDefault()
      }
      else if (codeinput.value !== canvasp.innerHTML) {
        alert('请确认输入正确的验证码')
        e.preventDefault()
      }
      else {
        e.preventDefault()

        console.log(password);

        $.ajax({
          url: "RegisterServlet",
          method: "POST",
          data: {
            action: "register",
            username: account.value,
            password: password.value
          },
          success: function (data) {
            if (data === "successregister") {
              alert('注册成功！即将跳转登陆页面!')
              location.href = "login.html"
            }
            else {
              alert('注册失败!请检查注册格式是否正确!')
            }
          },
          error: function () {
            console.log("AJAX请求出错");
          }
        });

      }
})