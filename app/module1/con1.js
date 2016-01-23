/**
 * @file
 * @author cjw
 * Created by cjw on 16/1/17.
 */

define([
    'text!view/common/header.html',
    'text!view/common/main.html',
    'text!view/common/footer.html',
    'text!view/common/nav.html'
], function (header, main, footer,nav) {

    var controller = function (options) {
        console.log(options +' tttt');
        app.headView.html(_.template(header, {name: 'head'}));
        app.navView.html(_.template(nav, {name: 'head'}));
        app.mainView.html(_.template(main, {name: 'main'}));
        app.footerView.html(_.template(footer, {name: 'footer'}));
    };
    return controller;
});