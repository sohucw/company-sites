/**
 * @file
 * @author cjw
 * Created by cjw on 16/1/18.
 */

define([
    'handlebars',
    'text!view/common/header.html',
    'text!app/company/company.html',
    'text!view/common/footer.html',
    'text!view/common/nav.html'
], function (handlebars, header, company, footer,nav) {
    var template = handlebars.compile(company);
    var data = {
        title: '济南天源奔奔有限公司',
        src: 'public/images/company.jpg',
        shop: 'https://shop72818548.taobao.com',
        info: '济南天源奔奔有限公司是一家以经营环氧树脂AB胶为主的生产型企业，公司工厂位于山东省济南市， 主要经营大韩水晶胶、AB胶、透明胶，大韩烤瓷胶。'
        + '天园生产的大韩AB胶水晶胶产品，自消泡，自流平，高透明，高硬度，保证三年不黄变！ 一改传统AB胶不易干燥、易产生气泡、易黄变等弊端，开创了环氧树脂AB胶的新时代。'
        + '天园AB胶深知创新是立足之本、诚信乃经营之道，本着科技创造未来、技术成就领先的指导思想， 苛求卓越的产品品质，坚持技术进步、不断创新、不断超越，目前已经成为一家在化工行业颇具实力和规模的企业，屹立于AB胶行业前沿！ 您的满意就是我们的追求！欢迎广大企业、用户和消费者与我们联系，我们将本着用最好的产品， 为用户提供最好的服务为宗旨，竭诚为您服务！现诚招各区域经销商，真诚期待与您合作!'
        + '您的满意就是我们的追求！欢迎广大企业、用户与我们联系，我们将本着用最好的产品，为用户提供最好的服务为宗旨，竭诚为您服务！ 现诚招全国各区域代理经销商，真诚期待与您合作！'
         + '企业电话：0531-68817761 / 15954112111 / 15106998883 企业传真：0531-68817761',

    };
    var controller = function (options) {
        // console.log(options +' tttt');
        app.headView.html(_.template(header, {name: 'head'}));
        app.navView.html(_.template(nav, {name: 'head'}));
        app.mainView.html(template(data));
        app.footerView.html(_.template(footer, {name: 'footer'}));
    };
    return controller;
});