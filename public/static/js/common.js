/* 
* @Author: gaoning
* @Date:   2015-11-06 12:28:58
* @Last Modified by:   gaoning
* @Last Modified time: 2015-11-26 19:28:16
*/

'use strict';

/* 获取根目录 */
/*function getRootPath(){
  var url = window.document.location.href;
  var pathName = window.document.location.pathname;
  var pathIndex = url.indexOf(pathName);
  var localhostPath = url.substring(0, pathIndex);
  var name = pathName.substring(0, pathName.substr(1).indexOf('/')+1);
  return (localhostPath+name+'/');
}*/

/* 日期控件初始化 */
function initDatePlugin($date, num){
  var flag = arguments[2] || 0; //第三个参数默认0, -1表示需要设置maxDate, 1表示需要设置minDate
  var el; //当前元素
  for(var i=0; i<$date.length; i++){
    el = $date.get(i);
    
    if(flag == 0) {
      $(el).datepicker({
        numberOfMonths: num,
        changeMonth: true,
        changeYear: true
      });
    }else if(flag == -1) {
      $(el).datepicker({
        numberOfMonths: num,
        changeMonth: true,
        changeYear: true,
        maxDate: "+0M +0D"
      });
    }else if(flag == 1) {
      $(el).datepicker({
        numberOfMonths: num,
        changeMonth: true,
        changeYear: true,
        minDate: "+0M +0D"
      });
    }
    
    el.readOnly = true;
    if(el.value == ""){
      el.value = new Date().Format("yyyy-MM-dd");
    }
  }
}
/*
 * FBModal 1.0.0 - jQuery Plugin
 *
 * @example $(".YOURDIV").fbmodal({options}); 
 * 
 * FBModal default options
 *
 *        title: "YOUR TITLE HERE",   Dialog title text 
 *       cancel: "Cancel",            Cancel button text
 *         okay: "Okay",              Okay button text
 *   okaybutton: true,                show the ok button
 * cancelbutton: true,                Show the cancel button
 *      buttons: true,                Show the buttons
 *      opacity: 0.0,                 The opacity value for the overlay div, from 0.0 - 100.0
 *      fadeout: true,                When dialog is closed fade out
 * overlayclose: true,                Allow click on overlay to close the dialog?
 *     modaltop: "30%",               Position from top of page 0% - 100% or 0px - 99999px
 *   modalwidth: "400"                The width for the dialog container 
 * });
 *
 * SFBModal has been tested in the following browsers:
 * - IE 8
 * - Firefox 2, 3
 * - Safari 3, 4
 * - Chrome 1, 2
 *
 * @name FBModal
 * @type jQuery
 * @requires jQuery v1.4.2
 * @cat Plugins/Windows and Overlays
 * @author Barrett Palmer (http://www.sucaijiayuan.com)
 * @version 1.0.0
 *
 */
/* 弹窗插件 */
(function($){
  $.fn.fbmodal = function(options, callback){  
    var defaults = {
      title: "提示",
      cancel: "取消",
      okay: "确定",
      okaybutton: true,
      cancelbutton: false,
      buttons: true,
      opacity: 0.3,
      fadeout: true,
      overlayclose: true,
      modaltop: "35%",
      modalwidth: "300",
      modalheight: "auto",
      // 新增 有的页面不计算左侧菜单栏宽度
      middle: true
    };
    var options = $.extend(defaults, options);
    var fbmodalHtml='\
      <div id="fbmodal">\
        <div class="popup">\
          <table>\
            <tbody>\
              <tr>\
                <td class="tl"/><td class="b"/><td class="tr"/>\
              </tr>\
              <tr>\
                <td class="b"/>\
                <td class="body">\
                  <div class="title"></div>\
                  <div class="container">\
                    <div class="fbmodal-content"></div>\
                    <div class="footer">\
                      <div class="right">\
                        <div class="button_outside_border_blue" id="ok">\
                          <div class="button_inside_border_blue" id="okay"></div>\
                        </div>\
                        <div class="button_outside_border_grey" id="close">\
                          <div class="button_inside_border_grey" id="cancel"></div>\
                        </div>\
                      </div>\
                      <div class="clear"></div>\
                    </div>\
                  </div>\
                </td>\
                <td class="b"/>\
              </tr>\
              <tr>\
                <td class="bl"/><td class="b"/><td class="br"/>\
              </tr>\
            </tbody>\
          </table>\
        </div>\
      </div>';

    /* 边框 */
    /*var preload = [ new Image(), new Image() ]
    $("#fbmodal").find('.b:first, .bl, .br, .tl, .tr').each(function() {
      preload.push(new Image())
      preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1')
    })  */
    $("body").append(fbmodalHtml);
    var dat = this.html();
    var $fbmodal = $("#fbmodal");
    /*$("#fbmodal .fbmodal-content").append('<div class="loading"><img src="images/loading.gif"/></div>');*/
    $fbmodal.css("top", options.modaltop)
            .css("top", parseFloat($fbmodal.css('top'))+$(window).scrollTop()+'px')
            .find('.title').append(options.title)
            .end().find('.fbmodal-content').append(dat).css("width", options.modalwidth).css('padding', '10px')
            .end().find('#okay').append(options.okay)
            .end().find('#cancel').append(options.cancel);
    
    if (options.okaybutton == false || options.buttons == false) {
      $fbmodal.find('#ok').hide();
    }
    if (options.cancelbutton == false || options.buttons == false) {
      $fbmodal.find('#close').hide();
    }
    
    /*$("#fbmodal .loading").remove();*/
    $("body").append('<div id="fbmodal_overlay" class="fbmodal_hide"></div>');
    var $fbmodal_overlay = $("#fbmodal_overlay");
    $fbmodal_overlay.addClass("fbmodal_overlay").fadeTo(0, options.opacity);
    
    var fbWidth = function() {
      var windowWidth, fbmodalWidth, wid;
      windowWidth = $(window).width();
      fbmodalWidth = $fbmodal.width();
      wid = options.middle ? (windowWidth/2-fbmodalWidth/2) : (windowWidth/2-fbmodalWidth/2+230/2);
      $fbmodal.css("left", wid);
    }
    var fbHeight = function() {
      if(options.modalheight != "auto"){
        $fbmodal.find('.fbmodal-content').css('height', +options.modalheight).css('overflow-y', "auto");
      }
    }
    fbWidth();
    fbHeight();
    $(window).bind("resize", function() {
      fbWidth();
    });

    var closeWindow = function() {
      if (options.fadeout) {
        $fbmodal.fadeOut(function() {
          $fbmodal.remove();
          $fbmodal_overlay.removeClass("fbmodal_overlay");
        });
      } else {
        $fbmodal.remove();
        $fbmodal_overlay.removeClass("fbmodal_overlay");
      }
    }
    if (options.close) {
      closeWindow();
    }
    var overlay = options.overlayclose ? "ok, #close, .fbmodal_hide" : "ok, #close";
    $("#" + overlay).click(function() {
      closeWindow();
    });
    $fbmodal.find('#okay').click(function() {
      callback(1);
    });
    $fbmodal.find('#cancel').click(function() {
      callback(2);
    });
  }
})(jQuery); 

/**   
 * @说明 对Date的扩展，将 Date 转化为指定格式的String，
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param fmt
 * @author LWZ
 * @returns  
 */ 
Date.prototype.Format = function(fmt) {  
  var o = { 
    "M+" : this.getMonth() + 1, // 月份 
    "d+" : this.getDate(), // 日 
    "h+" : this.getHours(), // 小时  
    "m+" : this.getMinutes(), // 分  
    "s+" : this.getSeconds(), // 秒   
    "q+" : Math.floor((this.getMonth() + 3) / 3), // 季度 
    "S" : this.getMilliseconds()   // 毫秒 
  };  
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
    for ( var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
      }
    } 
    return fmt; 
  }
};

/* 添加replaceAll方法 */
String.prototype.replaceAll = function(s1, s2){
  return this.replace(new RegExp(s1, "gm"), s2);
};

String.prototype.cntStr = function() {
  return this.replace(/@+/g, "@");
};

String.prototype.trim = function(){
  return this.replace(/(^\s*)|(\s*$)|\r|\n/g, "");
};

(function($){
  $.extend({
    /* 设置侧边栏高度 */
    setHeight: function($sidebar) {
      $sidebar.height($sidebar.parent().height());
    },

    /* 2015-09-09 -> 20150909 */
    dateToNumber: function(str) {
      return parseInt(str.replaceAll('-', ''));
    },

    /* 获取根目录 */
    getRootPath: function() {
      // var url = window.document.location.href;
      // var pathName = window.document.location.pathname;
      // var pathIndex = url.indexOf(pathName);
      // var localhostPath = url.substring(0, pathIndex);
      // var name = pathName.substring(0, pathName.substr(1).indexOf('/')+1);
      // return (localhostPath+name+'/');
      return $('base').attr('href');
    }
  });
})(jQuery);


$(function(){

  // $.setHeight($("#left_nav")); // 侧边栏高度
  
  /* 左侧菜单栏切换-new */
  /*$('#left_nav').on('click', '.nav_head', function(){
    $(this).addClass('nav_active')
           .next().css('display', 'block')
           .parent().addClass('li_active')
           .siblings().removeClass('li_active')
           .children('.nav_head').removeClass('nav_active')
           .next().css('display', 'none');
  });*/
  
  /* 左侧菜单栏切换-old */
 /* $("#left_nav .nav_head").click(function(){
    var $this = $(this);
    $this.addClass('nav_active')
    .parent().siblings().children('.nav_head').removeClass('nav_active');
    $this.next().toggle(
      0,
      function(){
        if($(this).is(':hidden')){
          $this.children('img').attr('src', 'static/image/arrow-up.png');
        }else{
          $this.children('img').attr('src', 'static/image/arrow-down.png');
        }
      }
    );
  });*/
  

  /* 顶部导航栏位置 */
  // var w2 = $(".wrap").offset().left;
  // $("#h_nav").css("left", w2);
  /* 窗口大小变化时,导航栏跟着移动 */
  // $(window).resize(function(){
  //   var w2 = $(".wrap").offset().left;
  //   $("#h_nav").stop().animate({left: w2}, 500);
  // });
  
  /* 日期控件初始化 如果没有设置默认值 则设为当前日期 */
 /* var time = new Date().Format("yyyy-MM-dd");
  var el; //当前元素*/

  /* 日期控件初始化 */
  if($('#passengers').length > 0) {
    initDatePlugin($('.p_birthday'), 1, -1);
  }
  initDatePlugin($('.ipt-date-1'), 1);
  initDatePlugin($('.ipt-date-2'), 2, 1);

  /* 退改签信息 */
  $(".refund, .refund-searchResult").on('mouseover', function() {
    var $this = $(this);
    $this.find('.backrule').show().css('top', $this.position().top + $this.height());
  }).on('mouseout', function() {
    $(this).find('.backrule').hide();
  });

  // 导航菜单
  $('#fullpageMenu > li').on('mouseover', function() {
    $(this).find('ul').show();
  }).on('mouseout', function() {
    $(this).find('ul').hide();
  }).on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  // if($('.body-log').length > 0) {
  //   $('#fullpageMenu').on('click', 'li', function(){
  //     location.href = 'home.html#page' + ($('#fullpageMenu > li').index($(this)) + 1);
  //   });
  // }
  // $('#fullpageMenu').click(function(){
  //   location.href = 'home.html#page' + ($('#fullpageMenu > li').index($(this)) + 1);
  // })
});
