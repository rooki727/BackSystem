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
const productinformation = document.querySelector('#product-information')
const helpcenter = document.querySelector('#help-center')
const aboutus = document.querySelector('#about-us')
const footerinfomation = document.querySelector('#footerinfomation')
const footerhelp = document.querySelector('#footerhelp')
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


//登陆过滤器


// window.addEventListener('load', function () {
//   if (!isLoggedin()) {
//     window.location.href = "/index.html";
//   }
// })

//赋值用户信息
const userinfotext1 = document.querySelector('#userinfotext1')
// window.addEventListener('load', function () {
//   userinfotext1.innerHTML = accsearch
//   userinfotext2.innerHTML = accsearch
// })


// 退出登陆监听器
const exit = document.querySelector('.info .exit')
exit.addEventListener('click', function () {
  if (confirm('你确定要退出登陆吗？')) {
    location.href = "index.html"
  }
})

// 电梯导航
// const elevator = document.querySelector('.xtx-elevator')
// const tofooter = document.querySelector('.xtx-elevator .tofooter')
// const footer = document.querySelector('.project')
// window.addEventListener('scroll', function () {
//   const n = document.documentElement.scrollTop
//   if (n >= introduce.offsetTop) {
//     elevator.style.opacity = 1
//   }
//   else {
//     elevator.style.opacity = 0
//   }
// })
// topgo.addEventListener('click', function () {
//   document.documentElement.scrollTop = 0
// })
// tointroduce.addEventListener('click', function () {
//   document.documentElement.scrollTop = introduce.offsetTop
// })
// touse.addEventListener('click', function () {
//   document.documentElement.scrollTop = entry.offsetTop
// })
// tofooter.addEventListener('click', function () {
//   document.documentElement.scrollTop = footer.offsetTop
// })
