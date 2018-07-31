


// 判断是否已经登录
    if(LsySession.getItem('myName')==undefined){
        $('.headed>.headed-top>.name>p>a').html(" ")
        $('.headed>.headed-top>.name>a').hide()
        $('.headed>.headed-top>.name>span').html("<a href='login.html'>登录</a>/<a href='register.html'>注册</a>")
    }else{
        $('.headed>.headed-top>.name>a').show()
        $('.headed>.headed-top>.name>p>a').html('Hi,'+LsySession.getItem('myName'));
        $('#spanID').html(LsySession.getItem('myName'));
    }

if(LsyStorage.getItem('shopSum')!=null){

    $('.headed-middle>.shopcar>a>b').html(LsyStorage.getItem('shopSum'))
}


// 退出登录
    $('.headed>.headed-top>.name>span>a').click(function () {
        $('.headed>.headed-top>.name>p>a').html(" ")
        $('.headed>.headed-top>.name>a').html(" ")
        $('.headed>.headed-top>.name>span').html("<a href='login.html'>登录</a>/<a href='register.html'>注册</a>")
        LsySession.removeItem('myName');
    })



    // 我的宝贝栏的隐藏与显示
    $('.headed .headed-top>ul li:first-child').click(function (event) {
        var e=event||window.event;
        e.stopPropagation();
        // console.log(ccArray);
        if($('.headed-middle>.shopcar>a>b').html()!='0'){
            console.log(1);
            $('.headed>.headed-top>ul>li:first-child>span').html("");
            var babyBox="";
            var ccArray=LsyStorage.getArr('cc');
            for(var i=0;i<ccArray.length;i++){
                babyBox+='<b><a href="pro_details.html?'+ccArray[i].id+'"><img src='+ccArray[i].imgSrc+'><i>'+ccArray[i].titles+'</i></a></b>'
            }
            $('.headed>.headed-top>ul>li:first-child>span').append(babyBox);

        }else{
            $('.headed>.headed-top>ul>li>span').html('请先添加宝贝到您的购物车当中');
        }
        // console.log(babyBox);
        $('.headed>.headed-top>ul>li:first-child>span').toggle()

    })
    $(document).click(function () {
        $('.headed .headed-top>ul>li:first-child>span').hide();
    })

// 隐藏栏的各项跳转
    $('.headed-bottom>.nav>.nav-main>ul li>h3>a').click(function () {
        LsySession.setItem('n',$(this).attr('data-index'))
    })
    $('.headed-bottom>.nav>.nav-main>ul li>.more>ul>li>a').click(function () {
        LsySession.setItem('n',$(this).attr('data-index'))
    })


   // 搜索栏下的热门搜索跳转
    $('.headed-middle>.search>ul>li>a').click(function () {
        LsySession.setItem('n',$(this).attr('data-index'))
    })

    // 导航栏的各项跳转
    $('.headed-bottom>.nav>ul li>a').click(function(){
        LsySession.setItem('n',$(this).attr('data-index'))
    })



