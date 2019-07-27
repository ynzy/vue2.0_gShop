window.onload = function () {
  var contentList = document.querySelectorAll('#app .content>div')
  var guideItems = document.querySelectorAll('#app .guide_item')
  var profileLink = document.querySelector('#app .profile-link')
  var loginOrRegister = document.querySelectorAll('.login_content>form>div')
  var loginA = document.querySelectorAll('.login_header_title>a')
  var switchCircle = document.querySelector('.switch_circle')
  var switchButton = document.querySelector('.switch_button')
  var switchText = document.querySelector('.switch_text')
  var goBack = document.querySelector('.go_back')
  var login = document.querySelector('#app>div')
  var headerLogin = document.querySelector('.header_login')

  //swiper
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination'
    }
  })

  //footer tab切换
  for (var i = 0; i < guideItems.length; i++) {
    guideItems[i].index = i
    guideItems[i].addEventListener('touchend', function () {
      for (var i = 0; i < guideItems.length; i++) {
        guideItems[i].className = 'guide_item'
        contentList[i].className = ''
      }
      this.className = 'guide_item on'
      contentList[this.index].className = 'on'
    })
  }
  //切换手机号登陆/密码登陆
  for (var i = 0; i < loginA.length; i++) {
    loginA[i].index = i
    loginA[i].addEventListener('touchend', function () {
      for (var i = 0; i < loginOrRegister.length; i++) {
        loginA[i].className = ''
        loginOrRegister[i].className = ''
      }
      this.className = 'on'
      loginOrRegister[this.index].className = 'on'
    })
  }
  //登陆界面切换密码明/暗文
  var isSwitch = false
  switchButton.addEventListener('touchend', function () {
    if (!isSwitch) {
      switchCircle.style.transform = 'translateX(27px)'
      this.className = 'switch_button on'
      switchText.innerText = 'abc'
    } else {
      switchCircle.style.transform = 'translateX(0)'
      this.className = 'switch_button off'
      switchText.innerText = '...'
    }
    isSwitch = !isSwitch
  })

  //控制登陆界面的on/off
  profileLink.addEventListener('touchend', function () {
    login.className = 'on'
  })
  goBack.addEventListener('touchend', function () {
    login.className = 'off'
  })

  //点击首页的登录注册 跳转到登录注册
  headerLogin.addEventListener('touchend', function () {
    login.className = 'on'
  })

}
