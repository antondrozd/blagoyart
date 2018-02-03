$(function () {

  var isTablet = 768 <= $(window).width() && $(window).width() <= 1200,
      subLists = $('ul[class*="main-nav__sub-list"]') || null,
      body = $('body');

  function clearStyles() {
    if (subLists && subLists.attr('style')) {
      subLists.removeAttr('style');
    }
  }

  function menuHandler() {
    var subBtnsLvl1 = $('.main-nav__item--with-sub-list'),
        subBtnsLvl2 = $('.main-nav__sub-item--with-sub-list'),
        isOpenedSomeList = false;

    function openSubMenu(list) {
      list.css({
        'display': 'block'
      });
      isOpenedSomeList = true;
    }

    function closeSubMenus() {
      subLists.css({
        'display': 'none'
      });
      isOpenedSomeList = false;
    }

    var checkTarget = () => {
      target = event.target;

      if (!$(target).is($('.main-nav__item > a')) && !$(target).is(subBtnsLvl1.find('a'))) {
        closeSubMenus();
      }
      if ($(target).is($('.main-nav__item > a')) && isOpenedSomeList) {
        closeSubMenus();
      }
      if ($(target).is(subBtnsLvl1.find('a') || subBtnsLvl2.find('a'))) {
        var listToOpen = $(target).next('ul[class*="main-nav__sub-list"]');
        openSubMenu(listToOpen);
      }
    }

    body.on('click', (event) => {
      checkTarget();
    });
  }

  if (isTablet) {
    menuHandler();
  }

  $(window).resize(() => {
    isTablet = 768 <= $(window).width() && $(window).width() <= 1200;;
    if (isTablet) {
      console.log('tablet');
      menuHandler();
    } else {
      console.log('no-tablet');
      clearStyles();
      body.off('click');
    }
  });

});
