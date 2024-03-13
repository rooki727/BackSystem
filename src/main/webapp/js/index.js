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

// 电梯导航
// 电梯导航
const elevator = document.querySelector('.xtx-elevator')
const tofooter = document.querySelector('.xtx-elevator .tofooter')
const footer = document.querySelector('.project')
const topgo = document.querySelector('.topgo')
const left = document.querySelector('.content .left')
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
  document.documentElement.scrollTop = left.offsetTop
})

//开始游戏按钮事件
const startgame = document.querySelector('#startgame')
const remind = document.querySelector('#remind')
function remindlogin() {
  remind.style.display = "block"
}
startgame.addEventListener('click', remindlogin)
remind.addEventListener('click', function (e) {
  if (e.target.tagName === 'I') {
    remind.style.display = "none"
  }
})