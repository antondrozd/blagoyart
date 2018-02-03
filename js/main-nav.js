$(function () {

  var isTablet = 768 < $(window).width() && $(window).width() < 1200,
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

    body.on('click', function (event) {
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
    });
  }

  menuHandler();

  $(window).resize(() => {
    isTablet = 768 < $(window).width() && $(window).width() < 1200;;
    if (isTablet) {
      menuHandler();
    } else {
      clearStyles();
      body.off('click');
    }
  });

});
