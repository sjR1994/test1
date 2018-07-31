
// 给购买指南导航添加背景图
$('.title ul li').eq(0).addClass('confirmBG1');
$('.title ul li').eq(1).addClass('confirmBG2');
$('.title ul li').eq(1).css('width','190px');
$('.title ul li').eq(2).addClass('confirmBG3');
$('.title ul li').eq(3).addClass('confirmBG4');
// 给结算栏下的li定位
$('.close ul li').eq(0).css('marginTop','16px')
$('.close ul li').eq(1).css('marginLeft','110px')
$('.close ul li').eq(2).css('marginLeft','110px')
$('.close ul li').eq(3).css({'marginLeft':'74px','marginTop':'12px'})


if(LsySession.getItem('buy')){
    var i=LsySession.getItem('buy');
    var num=Number(LsySession.getItem('buyNum'));
    var yunFei=Number(LsySession.getItem('yunFei'))
    var box01='<li><img src="'+LsyStorage.getItem('uu_'+i).imgSrc+'"/><p>'+LsyStorage.getItem('uu_'+i).titles+'</p><span>￥'+LsyStorage.getItem('uu_'+i).golding+'</span><i>'+num+'</i><b>￥'+(Number(LsyStorage.getItem('uu_'+i).golding)*num)+'</b></li>'
    var box02='<ul><li>共<i>1</i>件商品，总商品金额：￥'+(Number(LsyStorage.getItem('uu_'+i).golding)*num)+'</li><li>运费：￥'+yunFei+'.00</li><li>优惠：￥0.00</li><li>应付总金额：<b>￥'+((Number(LsyStorage.getItem('uu_'+i).golding)*num)+yunFei)+'.00</b></li><li><a href="pay.html">确认订单</a></li></ul>'
    $('.main>ul').append(box01);
    $('.main>.close').append(box02)
    LsySession.removeItem('buy');
}else{
    var arr=LsySession.getItem('shopsArr');
    var sum=LsySession.getItem('shopsnum');
    var sumG=LsySession.getItem('shopsgold');
    var box1=''
    for(var i=0;i<arr.length;i++){
        box1+='<li><img src="'+LsyStorage.getItem('cc_'+arr[i]).imgSrc+'"/><p>'+LsyStorage.getItem('cc_'+arr[i]).titles+'</p><span>￥'+LsyStorage.getItem('cc_'+arr[i]).golding+'.00</span><i>'+LsyStorage.getItem('cc_'+arr[i]).num+'</i><b>￥'+(Number(LsyStorage.getItem('cc_'+arr[i]).golding)*Number(LsyStorage.getItem('cc_'+arr[i]).num))+'.00</b></li>'
    }
    var box2='<ul><li>共<i>'+sum+'</i>件商品，总商品金额：￥'+sumG+'.00</li><li>运费：￥ 0.00</li><li>优惠：￥0.00</li><li>应付总金额：<b>￥'+sumG+'.00</b></li><li><a href="pay.html">确认订单</a></li></ul>'
    $('.main>ul').append(box1);
    $('.main>.close').append(box2);
}

// 点击结算时的的判断跳转
$('.main>.close>ul>li>a').click(function () {
    var str=$('.headed>.headed-top>.name>p').text()
    //console.log(str);
    if(str==' '){
        alert('请登录您的账户');
        $(this).attr('href','javascript:;')
    }

    LsyCookie.setItem('pay',$('.main>.close>ul>li>b').html(),30*60)

})

