/* 
* @Author: gaoning
* @Date:   2015-11-06 12:28:58
* @Last Modified by:   gaoning
* @Last Modified time: 2015-11-26 20:06:44
*/

'use strict';

/*function savePwd() {
  if (!$("#saveid").is(':checked')) {
    $.cookie('login_name', '', {
      expires: -1
    });
    $.cookie('login_pwd', '', {
      expires: -1
    });
  }
}*/

function saveCookie() {
  if ($("#saveid").is(':checked')) {
    $.cookie('login_name', $("#user").val(), {
      expires: 7
    });
    $.cookie('login_pwd', $("#pwd").val(), {
      expires: 7
    });
  }
}

$(function() {

  var $user = $('#user');
  var $pwd = $('#pwd');

  $(".txt").keydown(function(e) {
    var curKey = e.which;
    if (curKey == 13) {
      $('#login').trigger('click');
    }
  });

  $user.focus();

  var loginname = $.cookie('login_name');
  var password = $.cookie('login_pwd');
  if (typeof(loginname) != "undefined" && typeof(password) != "undefined") {
    $user.val(loginname);
    $pwd.val(password);
    $("#saveid").prop("checked", true);
  }

  if(store.enabled){
    if(!store.get('msg')){
      // store.set('msg', "do something...");
    }
  }

  // 记住我
  $('#saveid').on('click', function(){
    if (!$(this).is(':checked')) {
      $.cookie('login_name', '', {
        expires: -1
      });
      $.cookie('login_pwd', '', {
        expires: -1
      });
    }
  });

  // 登录
  $('#login').on('click', function(){
    var $user = $('#user');
    var $pwd = $('#pwd');
    var $error = $('.error');
    $error.text("");
    if ($user.val().trim() == "") {
      $error.text("用户名和密码不能为空");
      $user.focus();
    } else if($pwd.val().trim() == ""){
      $error.text("用户名和密码不能为空");
      $pwd.focus();
    } else {
      $.ajax({
        url: 'login_login',
        type: 'POST',
        dataType: 'text',
        data: {
          "username": $user.val().trim(),
          "password": $pwd.val().trim()
        },
        // data: $("#form_login").serialize(),
        success: function(data) {
          if (data === "success") {
            saveCookie();
            location.href = $.getRootPath() + "main";
          } else if (data === "unactive") {
            location.href = $.getRootPath() + "account/mailActive";
          } else if (data === "pending") {
            location.href = $.getRootPath() + "account/pending";
          } else if (data === "hang-up") {
            $error.text("用户被挂起，请联系客服");
          } else if (data === "usererror") {
            $error.text("用户名或密码错误");
          } else {
            $error.text("未知错误");
          }
        }
      });
    }
  });
  
//登录
  $('#amadeus_login').on('click', function(){
    var $user = $('#user');
    var $pwd = $('#pwd');
    var $error = $('.error');
    $error.text("");
    if ($user.val().trim() == "") {
      $error.text("用户名和密码不能为空");
      $user.focus();
    } else if($pwd.val().trim() == ""){
      $error.text("用户名和密码不能为空");
      $pwd.focus();
    } else {
      $.ajax({
        url: 'amadeus_login_login',
        type: 'POST',
        dataType: 'text',
        data: {
          "username": $user.val().trim(),
          "password": $pwd.val().trim()
        },
        // data: $("#form_login").serialize(),
        success: function(data) {
          if (data === "success") {
            saveCookie();
            location.href = $.getRootPath() + "main";
          } else if (data === "unactive") {
            location.href = $.getRootPath() + "account/mailActive";
          } else if (data === "pending") {
            location.href = $.getRootPath() + "account/pending";
          } else if (data === "hang-up") {
            $error.text("用户被挂起，请联系客服");
          } else if (data === "usererror") {
            $error.text("用户名或密码错误");
          } else {
            $error.text("未知错误");
          }
        }
      });
    }
  });
});
