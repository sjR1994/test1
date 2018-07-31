$('.res>.res-right>ul>li').click(function () {
    var ids=$(this).children('a').attr('data-id');
    var newUrls='pro_details.html?'+ids;
    $(this).find('a').attr('href',newUrls);
})
$('.pro-main>.main-left>ul>li').click(function () {
    var ids=$(this).children('a').attr('data-id');
    var newUrls='pro_details.html?'+ids;
    $(this).find('a').attr('href',newUrls);
})

if(LsyStorage.getItem('pinlun')!=null){
    console.log(1);
    var a=Math.floor(Math.random()*10);
    var box88='<li><span>x******'+a+'（匿名）</span><p>用户评分：<b>'+LsyStorage.getItem('pinlun').star+'</b><span>['+LsyStorage.getItem('pinlun').time+']</span></p><p>评价详情：<i>'+LsyStorage.getItem('pinlun').test+'</i></p></li>'
    $('#pinlun>ul').prepend(box88)
    $('.title>.moreSpeak>i').html(Number($('.title>.moreSpeak>i').html())+1)
}




// 获取网址

var urls=Number(window.location.href.slice(window.location.href.indexOf('?')+1));


// 正则判断网址项
if(typeof urls!=="number" || isNaN(urls)){
    urls=1;
}
//console.log(urls);
// 动态添加物品到详情页
// 左侧图片项
var box1='<span><img src='+LsyStorage.getItem('uu_'+urls).imgSrc+'></span><div class="res-left-btn"><span id="btnL"><img src="img/pro-btn-l.png"/></span><div class="ulBox"><ul><li><img src='+LsyStorage.getItem('uu_'+urls).imgSrc+'></li><li><img src="img/pro02.png"></li><li><img src="img/pro03.png"></li><li><img src="img/pro04.png"></li><li><img src="img/pro05.png"></li><li><img src="img/pro-details08.jpg"></li><li><img src="img/pro-details03.jpg"></li><li><img src="img/pro-details02.jpg"></li><li><img src="img/pro-details07.jpg"></li></ul></div><span id="btnR"><img src="img/pro-btn-r.png"</span></div>';
console.log(LsyStorage.getItem('uu_' + urls).imgSrc);


$('.res>.res-left').append(box1);
var box2='<h5>'+LsyStorage.getItem('uu_'+urls).titles+'</h5>'

/// / 右侧价格项
var box3='<div class="sale"><p>原价<s>'+LsyStorage.getItem('uu_'+urls).golding+'.00</s></p><p>活动价<b>￥'+LsyStorage.getItem('uu_'+urls).sale+'.00</b></p><p>促销优惠<em>满19999元免运费</em><a href="#">更多优惠∨</a></p></div>';
$('.res>.res-center>span').before(box2);
$('.res>.res-center>span').after(box3);

// 左侧下方图片点击换图
$('.res-left-btn ul li').click(function(){
    var sr=$(this).find('img').attr('src');
    $('.res-left>span>img').attr('src',sr);
})
// 点击左右按钮进行换图
var liIndex=0;
$('#btnR').click(function () {
    var uls=$('.res .res-left .res-left-btn>.ulBox>ul');
    $('#btnL').css('cursor','pointer')
    liIndex++
    if(liIndex>4){
        liIndex=4;
        $(this).css('cursor','not-allowed')
    }
    uls.animate({
        marginLeft:(-60*liIndex)+'px'
    })
    console.log(liIndex);
})

$('#btnL').click(function () {
    var uls=$('.res .res-left .res-left-btn>.ulBox>ul');
    $('#btnR').css('cursor','pointer')
    liIndex--
    if(liIndex<0){
        liIndex=0;
        $(this).css('cursor','not-allowed')
    }
    uls.animate({
        marginLeft:(-60*liIndex)+'px'
    })
    console.log(liIndex)
})



// 物品详情和评论转化
$('.title>a').click(function () {
    $(this).addClass('titleOn').siblings('a').removeClass('titleOn');
    $('.page_details').toggle();
    $('.page_critic').toggle();
})

// 物品购买加减项
$('#buyAdd').click(function(){
    var num =Number($('.buy>input').val());
    $('#buySub').css('cursor','pointer');
    num+=1;
    $('.buy>input').val(num);
})
$('#buySub').click(function(){
    var num =Number($('.buy>input').val());
    num-=1;
    if(num<=1){
        num=1;
        $(this).css('cursor','not-allowed');
    }
    $('.buy>input').val(num);
})
// 购买数量框的数量
$('.res>.res-center>.buy>input[type=text]').keyup(function () {
    if($(this).val()=='' || $(this).val()<=0){
        $(this).val(1)
    }else{
        $(this).val(parseInt($(this).val()));
    }


})

// 改变地区运费项
$('.res>.res-center>p>span>select').change(function(){
    $('.res>.res-center>p>span>b').html($(this).children('option:selected').attr('data-gold'));
})

// 添加购物车

$('#shopCar').click(function () {
    // 获取个数
    var num=Number($('.res-center>.buy>input').val());
    //console.log(LsyStorage.getItem('cc_8').num);
    // 获取型号和自定义的属性
    var tp=$('.size>ul>li.on').text();
    var tpNum=$('.size>ul>li.on').attr("data-tp");
    console.log(tpNum);
    console.log(tp);
    // 提取已存的指定数据项
    var old=LsyStorage.getItem('uu_'+urls);

    if(num>0) {
        alert('已添加购物车');
        if (LsyStorage.getItem('cc_' + urls+tpNum) == null) {
            old.num = num;
            old.tp=tp;
            LsyStorage.setItem('cc_' + urls+tpNum, old);
        } else {
            old.num = num + Number(LsyStorage.getItem('cc_' + urls+tpNum).num);
            LsyStorage.setItem('cc_' + urls+tpNum, old);
        }
        var sum=LsyStorage.getArr("cc").length;
        LsyStorage.setItem('shopSum',sum)
        $('.headed-middle>.shopcar>a>b').html(LsyStorage.getItem('shopSum'))
    }else{
            alert("请输入正确的数量")
        }
})

// 评论的分类点击
$('#tab>ul>li').click(function () {
    $(this).find('a').addClass('on');
    $(this).siblings().find('a').removeClass('on')
})

// 物品的详情分类
$('.res-center>.size>ul>li').click(function () {
    $(this).addClass('on').siblings().removeClass('on')
})

// 立即购买登录判定
var buyBtn=$('.res>.res-center>.btn');
buyBtn.click(function () {
    var str=$('.headed>.headed-top>.name>p').text()
    var num= $('.res>.res-center>.buy>input[type=text]').val();
    var yunFei=$('.res>.res-center>p>span>b').html();
    //console.log(str);
    if(str==' '){
       alert('请登录您的账户')
    }else{
        LsySession.setItem('yunFei',yunFei)
        LsySession.setItem('buyNum',num)
        LsySession.setItem('buy',urls)
        window.location.href='confirm_order.html';
    }

})









