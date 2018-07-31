$(function(){
    // 获取目标和事件源
   var li_Width= $(".lbt .lbtMain ul li").width();
   var len = $(".lbt .lbtMain ul li").length;
    $(".lbt .lbtMain ul").width(li_Width*len);
    var index =0;
    var timer=null;
    // 添加下方按钮
   var btn="<div class='lbtBtn'>";
   for(var i=0;i<len;i++){
       btn+="<span></span>";
   }
   // 添加左右指示
   btn+="</div><div class='BtnLeft BtnLR'></div><div class='BtnRight BtnLR'></div>";
    // 将按钮添加到页面中
    $(".lbt .lbtMain").append(btn);
    // 给下方按钮1添加默认的样式
    $(".lbt .lbtMain .lbtBtn span").eq(0).addClass("BtnOn");

    // 给左右指示按钮添加事件
    $(".lbt .lbtMain .BtnLeft").click(function(){
        index--;
        if(index<0) {
            index = len - 1;
        }
        lbt1();
     })
    $(".lbt .lbtMain .BtnRight").click(function(){
        index++;
        if(index>=len) {
            index = 0;
        }
        lbt1();
     })

    // 添加鼠标划上和划下事件
    $(".lbt .lbtMain").hover(function () {
        $(".lbt .lbtMain .BtnLR").show();
        clearInterval(timer);
    },function () {
        $(".lbt .lbtMain .BtnLR").hide();
        timer=setInterval(function () {
            lbt1();
            index++;
            if(index>=len){
                index=0;
            }
        },3000)
    }).on("mouseleave");

    // 鼠标放在下方按钮时,banner换图
    $(".lbt .lbtMain .lbtBtn span").mouseover(function () {
        index=$(this).index();
        lbt1();
    })

// 添加定时器让图片滚动
//     timer=setInterval(function () {
//        lbt1();
//        index++;
//        if(index>=len){
//           index=0;
//        }
//    },1000)

// 轮播图的方法
    function lbt1(){
           var Left =li_Width*-index;
           $(".lbt .lbtMain ul").stop(true).animate({
               "marginLeft":Left
           },300)
           $(".lbt .lbtMain .lbtBtn span").eq(index).addClass("BtnOn").siblings().removeClass("BtnOn")
        }

})