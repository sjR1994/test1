
$('#menu4>ul>li').eq(8).css('marginRight','300px')
function array(arr) {
    $('.main-content>ul>li').remove();
    var box=''
    for(var i=0;i<arr.length;i++){
        box += '<li><a href="pro_details.html?' + LsyStorage.getItem("uu_" + (arr[i])).id + '"><img src=' + LsyStorage.getItem("uu_" + (arr[i])).imgSrc + '><p>' + LsyStorage.getItem("uu_" + (arr[i])).titles + '</p><span>￥<b>' + LsyStorage.getItem("uu_" + (arr[i])).golding + '</b>.00</span></a></li>'
    }
    $('.main-content>ul').append(box);
    $('.title>p>span').html(LsyCookie.getItem('val'));
}
var arr=LsyCookie.getItem('search')
console.log(arr);
if(arr!=undefined && arr.length>0){
    console.log(1);
    array(arr)
}else if(arr!=null && arr.length==0){
    console.log(2);
    $('.title>p>span').html(LsyCookie.getItem('val')+'>没有搜索到相关项');
}


var ind=LsySession.getItem('n')
    if(ind==undefined || ind==null){
        ind=0;
    }

    list(ind);
    function list(index) {
        $('.main-content>ul>li').remove();
        var box = '';
        for (var i =(index*10); i<((index+1)*10); i++) {
            box += '<li><a href="pro_details.html?' + LsyStorage.getItem("uu_" + (i + 1)).id + '"><img src=' + LsyStorage.getItem("uu_" + (i + 1)).imgSrc + '><p>' + LsyStorage.getItem("uu_" + (i + 1)).titles + '</p><span>￥<b>' + LsyStorage.getItem("uu_" + (i + 1)).golding + '</b>.00</span></a></li>'
            $('.main-content>.main-btn>ul li').eq(index).addClass('on').siblings().removeClass('on');
        }
        $('.main-content>ul').append(box);
    }

    var downArr=getArray();
    //console.log(downArr);

// 导航栏跟随
var $n=LsySession.getItem('n');
for(var i=1; i<=6; i++){
    var $data=$('.headed-bottom>.nav>ul>li>a').eq(i).attr('data-index');
    console.log($data);
    if($n&&$data==$n) {
        $('.headed-bottom>.nav>ul>li>a').eq(i).addClass('on').siblings('a').removeClass('on');
        }
    }


 // 下方按钮点击换图
    $('.main-content>.main-btn>ul>li').click(function() {
        list($(this).index());
        LsySession.setItem('n',$(this).index());
        $('.list>.screen>a').eq(0).addClass('on').siblings().removeClass('on')
        downArr=getArray();
        console.log(downArr);
    });

    // 首页按钮
    $('.main-content>.main-btn>a').eq(0).click(function () {
        list(0);
        LsySession.setItem('n',0);
        $('.list>.screen>a').eq(0).addClass('on').siblings().removeClass('on')
        downArr=getArray()
        console.log(downArr);
    });

    // 上一页按钮
    $('.main-content>.main-btn>a').eq(1).click(function () {
        var lis=$('.main-content>.main-btn>ul>li')
        for(var i=0;i<lis.length;i++){
            if(lis.eq(i).attr('class')=='on'){
                var index=i;
            }
        }
        if(index<1){
            index=1;
            alert("已经到头了")
        }
        LsySession.setItem('n',index-1);
        $('.list>.screen>a').eq(0).addClass('on').siblings().removeClass('on')
        list(index-1)
        downArr=getArray()
        console.log(downArr);
    });

    // 下一页按钮
    $('.main-content>.main-btn>a').eq(2).click(function () {
        var lis=$('.main-content>.main-btn>ul>li')
        for(var i=0;i<lis.length;i++){
            if(lis.eq(i).attr('class')=='on'){
                var index=i;
            }
        }
        if(index>4){
            alert("没了，别点了")
            index=4;
        }
        LsySession.setItem('n',index+1);
        $('.list>.screen>a').eq(0).addClass('on').siblings().removeClass('on')
        list(index+1)
        downArr=getArray()
        console.log(downArr);
    })
//多选添加样式   
    $('.menu>.other>button').click(function(){
    	if($(this).hasClass('btnOn')){
    		$(this).removeClass('btnOn');
    		$(this).parent().siblings('ul').find('li').removeClass('on');
    	}else{
    		$(this).addClass('btnOn');
    		$(this).parent().siblings('ul').find('li').removeClass('on');
    	}
        downArr=getArray()
        console.log(downArr);
    })



//品牌实现 样式
    $('#menu1>ul>li').click(function(){
    	var btn=$('#menu1>.other>button');
    	var that=$(this);
    	danORshuang(btn,that);

    })
    
//风格实现样式
	$('#menu2>ul>li').click(function(){
        var btn=$('#menu2>.other>button');
        var that=$(this);
        danORshuang(btn,that);

	})

// 款式实现样式
$('#menu3>ul>li').click(function(){
    var btn=$('#menu3>.other>button');
    var that=$(this);
    danORshuang(btn,that);

})
// 规格实现功能
$('#menu4>ul>li').click(function(){
    var btn=$('#menu4>.other>button');
    var that=$(this);
    danORshuang(btn,that);

})



$('.menu>ul>li').on('click',function () {
    var obj=LsyStorage.getArr('uu');
    var menuArr01=[];
    var menuArr02=[];
    var menuArr03=[];
    var menuArr04=[];
    var impArr;
    var failArr;
    if($('#menu1>ul>li.on').size()>0){
        for(var i=0;i<$('#menu1>ul>li.on').size();i++){
            var re01=new RegExp($('#menu1>ul>li.on').eq(i).find('a').html(),'i');
            for(var j=0;j<obj.length;j++){
                if(re01.test(obj[j].brand)){
                    menuArr01.push(obj[j].id);
                }
            }
        }
    }
    if($('#menu2>ul>li.on').size()>0){
        for(var i=0;i<$('#menu2>ul>li.on').size();i++){
            var re02=new RegExp($('#menu2>ul>li.on').eq(i).find('a').html(),'i');
            for(var j=0;j<obj.length;j++){
                if(re02.test(obj[j].brand)){
                    menuArr02.push(obj[j].id);
                }
            }
        }
    }if($('#menu3>ul>li.on').size()>0){
        for(var i=0;i<$('#menu3>ul>li.on').size();i++){
            var re03=new RegExp($('#menu3>ul>li.on').eq(i).find('a').html(),'i');
            for(var j=0;j<obj.length;j++){
                if(re03.test(obj[j].brand)){
                    menuArr03.push(obj[j].id);
                }
            }
        }
    }
    if($('#menu4>ul>li.on').size()>0){
        for(var i=0;i<$('#menu4>ul>li.on').size();i++){
            var re04=new RegExp($('#menu4>ul>li.on').eq(i).find('a').html(),'i');
            for(var j=0;j<obj.length;j++){
                if(re04.test(obj[j].brand)){
                    menuArr04.push(obj[j].id);
                }
            }
        }
    }
    // 第1.2栏筛选
    impArr=menuArr01.concat(menuArr02)
    failArr=menuArr01.length<=0?menuArr02:menuArr01;
    impArr=res(impArr,failArr);
    // 第1.2.3栏筛选
    failArr=menuArr01.length<=0&&menuArr02.length<=0?menuArr03:impArr;
    impArr=impArr.concat(menuArr03);
    impArr=res(impArr,failArr);
    // 第1.2.3.4栏筛选
    failArr=menuArr01.length<=0&&menuArr02.length<=0&&menuArr02.length<=0?menuArr04:impArr;
    impArr=impArr.concat(menuArr04);
    impArr=res(impArr,failArr);
    array(impArr);
    downArr=getArray()
    console.log(downArr);

})


// 数组取重函数
function res(array,oldArray) {
    var newArr=[];
    // 先让原数组进行大小排序
    array.sort(function (a,b) {
        return a-b;
    });
    // console.log(array) [1, 1, 1, 2, 2, 2, 2, 3, 4, 7, 8, 10, 10, 15];
    // 然后运用循环遍历,筛选一次重复项
    for(var i=0;i<array.length;i++){
        if(array[i]==array[i+1]){
            newArr.push(array[i])
        }
    }
    // 如果数组中没有重复项则直接返回原数组
    if(newArr.length<=0){
        return oldArray;
    }

    // console.log(newArr)  [1, 1, 2, 2, 2, 10];
    // 创建一个新的数组,并先赋予它排好后数组的第一个值
    var winArr=[newArr[0]];
    // console.log(winArr) [1];
    // 双重循环开始遍历
    for(var i=0;i<newArr.length;i++){
        for(var j=0;j<winArr.length;j++){
            var flag=false;
            // 运用闭合开关提取和新数组不相同的项
            if(newArr[i]!=winArr[j]){
                flag=true;
            }
        }
        if(flag){
            // 然后添加至新数组当中
            winArr.push(newArr[i]);
        }
    }
    return winArr;
}






    function danORshuang(btn,that) {
        if(btn.hasClass('btnOn')){
            if(that.hasClass('on')){
                that.removeClass('on');
            }else{
               that.addClass('on');
            }
        }else{
            that.addClass('on').siblings('li').removeClass('on');


        }
    }




    

// 综合
$('.list>.screen>a').eq(0).click(function () {
    var that=$(this)
    upORdown(that,'zh',getArray())
    $('#priceOne').val("")
    $('#priceTwo').val("")
})
//销量
$('.list>.screen>a').eq(1).click(function () {
    var that=$(this)
    upORdown(that,'xl',getArray())
    $('#priceOne').val("")
    $('#priceTwo').val("")
})
//价格
$('.list>.screen>a').eq(2).click(function () {
    var that=$(this);
    upORdown(that,'golding',getArray())
    $('#priceOne').val("")
    $('#priceTwo').val("")
})

// 价格区间的搜索
var btns=$('.list>.screen>.price>button')
btns.click(function () {
    var newArr=downArr;
    array(downArr);
    var downGold=Number($('#priceOne').val());
    var upGold=Number($('#priceTwo').val());
    if(downGold==""&&upGold==""){
        downGold=0;
        upGold=99999;
    }else if(downGold==""){
        downGold=0;
    }else if(upGold==""){
        upGold=99999;
    }
    //console.log(newArr);
    var newArr77=[]
    for(var i=0;i<newArr.length;i++){
        var golds=Number(LsyStorage.getItem('uu_'+newArr[i]).golding)
        if(golds>=downGold && golds<=upGold ||golds<=downGold && golds>=upGold ){
            newArr77.push(newArr[i]);
        }
    }
    array(newArr77);
})
    
    // 获取页面内容的数组
    function getArray(){
        var arr=[];
        var ullis=$('.main-content>ul>li>a');
        ullis.each(function () {
            var it=Number($(this).attr('href').substr(-2).replace('?', ""));
            arr.push(it);
        })
        return arr;
    }

// 价格销量函数
    function upORdown(that,sx,newArr) {
        that.addClass('on').siblings().removeClass('on')
        var objA=[]
        // console.log(newArr);
        for(var i=0;i<newArr.length;i++){
            objA.push(LsyStorage.getItem('uu_'+newArr[i]));
        }
        var array01=[]
        for(var i=0;i<objA.length;i++){
            array01.push(objA[i][sx]);
        }
        array01.sort(function (a, b) {
            return a-b;
        })
        var newArr99=[]

        for(var i=0; i<array01.length;i++){
            for(var j=0; j<array01.length;j++){
                if(array01[i]==objA[j][sx]&& newArr99.indexOf(objA[j].id)==-1){
                    newArr99.push(objA[j].id);
                }
            }
        }
        array(newArr99)
        console.log(newArr99);
    }


// 展开按钮
var flag=false;
var flag01=false;
$('.menu>.other>a').eq(0).click(function () {
    if(flag){
        $(this).parent().parent().children('ul').css('height','38px')
        $(this).parent().css('height','38px')
        $(this).parent().siblings('p').css('height','38px')
        flag=false;
    }else{
        $(this).parent().parent().children('ul').css('height','76px')
        $(this).parent().css('height','76px')
        $(this).parent().siblings('p').css('height','76px')
        flag=true;
    }
})
$('.menu>.other>a').eq(1).click(function () {
    if(flag01){
        $(this).parent().parent().children('ul').css('height','38px')
        $(this).parent().css('height','38px')
        $(this).parent().siblings('p').css('height','38px')
        flag01=false;
    }else{
        $(this).parent().parent().children('ul').css('height','76px')
        $(this).parent().css('height','76px')
        $(this).parent().siblings('p').css('height','76px')
        flag01=true;
    }
})
    
    
    
    
    
    
    
    
    
    
    
    

