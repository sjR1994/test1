
// 给购买指南导航添加背景图
$('.title ul li').eq(0).addClass('confirmBG1');
$('.title ul li').eq(1).addClass('confirmBG2');
$('.title ul li').eq(1).css('width','190px');
$('.title ul li').eq(2).addClass('confirmBG3');
$('.title ul li').eq(3).addClass('confirmBG4');
$('.pay ul li').click(function () {
    $(this).addClass('payOn').siblings().removeClass('payOn')
})
var a = 0;

$('.save>input').on('click',function () {
    $('.save>input').eq(a).focus();
});
$('.save>input').on('focus',function () {
    $(this).on('keyup',fn);
});
$('.save>input').on('blur',function () {
    $(this).off('keyup',fn);
})
function fn() {
    if (!isNaN($(this).val()) && $(this).val().length != 0) {
        if (a < 5) {
            a += 1;
        }

        $('.save>input')[a].focus();
    }else if($(this).val().length == 0){
        if (a > 0) {
            a -= 1;
        }

        $('.save>input')[a].focus();
    }
}
var pay=LsyCookie.getItem('pay').replace('￥',"")
var randomTips=Math.floor(Math.random()*1000000000000000)
$('.tips>p').html('订单提交成功，请您尽快支付！订单号：'+randomTips+'<span>应付金额：<b>'+pay+'元</b></span>');

// 支付
$('#payBtn').click(function () {
    if($('#pw1').val()!=''&&$('#pw2').val()!=''&&$('#pw3').val()!=''&&$('#pw4').val()!=''&&$('#pw5').val()!=''&&$('#pw6').val()!=''){
        var box='<div class="happy"><img src="img/happy.png"/><p>支付成功！</p><span>已付款：<i>￥'+pay+'</i><b>|</b>订单正在处理中...</span><b>收货地址：广东省广州市天河区五山路中公教育大厦371号</b><a href="order.html" class="look">查看订单</a><a href="index.html">继续购买>></a></div>'
        $('.paybk').append(box);
        $('.paybk').css('display','block')
    }else{
        var box='<div class="cry"><img src="img/cry.png"/><p>支付失败！</p><span>付款失败：<i>卡内余额不足！</i></span><a href="order.html" class="look">查看订单</a><a href="pay.html">返回支付>></a></div>'
        $('.paybk').append(box);
        $('.paybk').css('display','block')
    }
})
