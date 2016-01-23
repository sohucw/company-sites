/* 
* @Author: gaoning
* @Date:   2015-11-06 17:18:25
* @Last Modified by:   gaoning
* @Last Modified time: 2015-11-24 11:46:34
*/

'use strict';

function startSlide() {
  setInterval(function(){
    $.fn.fullpage.moveSlideRight();
  }, 5000);
}

$(function(){
  // 幻灯片
  if($('#fullpage').length > 0) {
    $('#fullpage').fullpage({
      anchors: ['page1', 'page2','page3', 'page4', 'page5'],
      // fixedElements: '#fullpageMenu',
      // scrollingSpeed: 700,
      verticalCentered: true,
      resize: true,
      navigation: true,
      navigationTooltips: ['首页', '产品介绍','产品展示', '关于我们', '联系我们'],
      menu: '#fullpageMenu',
      slidesNavigation: true,
      controlArrows: false, //幻灯片左右箭头
      scrollBar: false
    });

    // 幻灯片自动播放
    setTimeout('startSlide()', 20000);
  }

  $('.lazy').lazyload({
    effect: "fadeIn",
    threshold: 10
  });
});