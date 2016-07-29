'use strict';
(function (win) {
    /*
     * 文件依赖
     */
    var config = {
        baseUrl: '',           //依赖相对路径
        paths: {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
            director: 'libs/director',
            handlebars: 'bower_components/handlebars/handlebars.amd',
            jquery: 'bower_components/jquery/dist/jquery',
           /* 'backbone-route': 'libs/backbone-route',*/
            underscore: 'bower_components/underscore/underscore',
            'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
       /*     angular: 'bower_components/angular/angular',
            'angular-route': 'libs/angular-route',
            'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',*/
            text: 'bower_components/text/text'
        },
        shim: {                     //引入没有使用requirejs模块写法的类库。
            underscore: {
                exports: '_'
            },
            jquery: {
                exports: '$'
            },
            bootstrap: {
                exports: 'bootstrap',
                deps: ['jquery']
            },
            director: {
                exports: 'Router'
            }

        }
    };

    require.config(config);

    require(['jquery', 'router', 'underscore'], function($, router, _){
        win.app = {};
       // app.appView = $('#container');      //用于各个模块控制视图变化

        app.headView = $('#header');
        app.navView = $('#nav');
        app.mainView = $('#main');
        app.footerView = $('#footer');

        win.$ = $;                          //暴露必要的全局变量，没必要拘泥于requirejs的强制模块化
        win._ = _;
        router.init();                      //开始监控url变化


        function backToTop () {
            $(window).scroll(function(){
                if ($(this).scrollTop() > 100) {
                    $('#back-to-top').fadeIn();
                } else {
                    $('#back-to-top').fadeOut();
                }
            });
            $('#back-to-top').on('click', function(e){
                e.preventDefault();
                $('html, body').animate({scrollTop : 0},1000);
                return false;
            });
        }
        backToTop();
    });


})(window);
