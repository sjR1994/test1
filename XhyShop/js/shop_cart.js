$('.cart-title>.close>ul>li:last-child').css('width','300px')
var i=$('.headed-middle>.shopcar>a>b').html()
console.log(i);
$('.cart-title>p>b>span').html(i);






// 动态创建购物车的物品详情
    for(var i=0; i<LsyStorage.getArr('uu').length; i++){
        for(var j=1;j<=12;j++){
            if(LsyStorage.getItem('cc_'+i+"-"+j)){
                // console.log(LsyStorage.getItem('cc_' + i).imgSrc);
                var box1='<li data-i='+i+'-'+j+'><label><p class="pBtn"></p><input type="checkbox" class="ckbox"></label><a class="putUrl" href=pro_details.html?'+LsyStorage.getItem('cc_'+i+'-'+j).id+'><img src='+LsyStorage.getItem('cc_'+i+'-'+j).imgSrc+'><span>'+LsyStorage.getItem('cc_'+i+'-'+j).titles+' / '+LsyStorage.getItem('cc_'+i+'-'+j).tp+'</span></a><i>￥<em>'+LsyStorage.getItem('cc_'+i+'-'+j).golding+'.00</em></i><button class="btn1">-</button><input type="text" class="txt" value='+LsyStorage.getItem('cc_'+i+'-'+j).num+'><button class="btn2">+</button><b>库存：<i>666</i></b><em>￥<i>'+Number(LsyStorage.getItem('cc_'+i+'-'+j).golding)*Number(LsyStorage.getItem('cc_'+i+'-'+j).num)+'.00</i></em><a class="aDelete" href="javascript:;">删除</a><a class="aStar" href="javascript:;">移到我的收藏</a></li>'
                $('.cart-title>.cart-main>ul').append(box1);
            }
        }
    }





// 事件委托,左右按钮购买加减数量和总金额事件事件
    var lisBtn=$('.cart-title>.cart-main>ul>li');
    lisBtn.click(function (event) {
        var e=event||window.event;
        // 减
        if(e.target.className=='btn1'){
            var inputTxt=$(this).children('input[type="text"]').val();
            if(inputTxt<2){
                $(this).children('input[type="text"]').val(1)
                $(this).children('.btn1').css('cursor','not-allowed');
            }else{
                inputTxt=Number(inputTxt)-1;
                $(this).children('input[type="text"]').val(inputTxt);
            }
            var num= Number($(this).children('input[type="text"]').val());
            var obj=LsyStorage.getItem('cc_'+$(this).attr('data-i'));
            obj.num=num;
            LsyStorage.setItem('cc_'+$(this).attr('data-i'),obj)
            var index=$(this).attr('data-i')
            var cost1=Number(LsyStorage.getItem("cc_"+index).golding)*Number(LsyStorage.getItem("cc_"+index).num)
            $(this).children('em').children('i').html(parseFloat(cost1).toFixed(2))


        }
        if(e.target.className=='btn1' && $(this).children('label').children('input[type=checkbox]').attr('checked')){
            ff();
        }

    // 加


        if(e.target.className=='btn2'){
            $(this).children('.btn1').css('cursor','pointer');
            var inputTxt=$(this).children('input[type="text"]').val()
            inputTxt=Number(inputTxt)+1;
            if(inputTxt>=666){
                inputTxt=666;
            }
            $(this).children('input[type="text"]').val(inputTxt);
            var num= Number($(this).children('input[type="text"]').val());
            var obj=LsyStorage.getItem('cc_'+$(this).attr('data-i'));
            obj.num=num;
            LsyStorage.setItem('cc_'+$(this).attr('data-i'),obj)
            var index=$(this).attr('data-i')
            var cost1=Number(LsyStorage.getItem("cc_"+index).golding)*Number(LsyStorage.getItem("cc_"+index).num)
            $(this).children('em').children('i').html(parseFloat(cost1).toFixed(2))
        }
        if(e.target.className=='btn2' && $(this).children('label').children('input[type=checkbox]').attr('checked')){
            ff();
        }

        // 键盘按下购买数量和总金额事件
        if(e.target.className=='txt'){
            $(this).children('input[type=text]').keyup(function () {
                if($(this).val()=="" ||$(this).val()<=1 ){
                    $(this).val(1)
                }else if($(this).val()>=666){
                    $(this).val(666)
                }
                if(typeof $(this).val()!='number'){
                    $(this).val(parseInt($(this).val()));
                    var num=Number($(this).val());
                    console.log(num);
                    var obj=LsyStorage.getItem('cc_'+$(this).parent().attr('data-i'));
                    obj.num=num;
                    LsyStorage.setItem('cc_'+$(this).parent().attr('data-i'),obj)
                    var perice=Number($(this).parent().children('i').find('em').html());
                    $(this).parent().children('em').find('i').html(parseFloat(num*perice).toFixed(2));
                }
                if($(this).parent().children('label').children('input[type=checkbox]').attr('checked')){
                    ff();
                }

            })
        }


    // 单个删除数据
        if(e.target.className=='aDelete'){
            var flag=false;
            var ps=$(this).siblings().children('label').children('p');
            var fg=confirm('是否要删除宝贝?');
            if(fg){
                for(var i=0;i<ps.length;i++){
                    if(ps.eq(i).html()=="✔"){
                        flag=true;
                    }else{
                        flag=false;
                    }
                }
                if(flag){
                $('.close ul li>label input[type=checkbox]').attr('checked','checked');
                $('.item ul li>label input[type=checkbox]').attr('checked','checked');
                $('.item>ul>li>label>p').html('✔');
                $('.close>ul>li>label>p').html('✔');
            }
            var index=$(this).attr('data-i');
            LsyStorage.removeItem('cc_'+index);
            $(this).remove();
            var sum=LsyStorage.getArr("cc").length;
            LsyStorage.setItem('shopSum',sum,24*3600*5);
            $('.headed-middle>.shopcar>a>b').html(LsyStorage.getItem('shopSum'));
            if($(this).children('label').children('input[type=checkbox]').attr('checked')){
               // console.log( typeof  $('.cart-title>.close>ul li>i').html());
                $('.cart-title>.close>ul li>i').html(Number($('.cart-title>.close>ul li>i').html())-1);
               var thisStr=Number($(this).children('em').children('i').html());
               var downStr=Number($('.cart-title>.close>ul li>b').html().replace('￥',""));
               $('.cart-title>.close>ul li>b').html('￥'+(downStr-thisStr)+'.00');
                var index=$(this).attr('data-i');
                LsyStorage.removeItem('cc_'+index);
                $(this).remove();
            }
            //alert("删除宝贝成功");
            var i=$('.headed-middle>.shopcar>a>b').html()
            //console.log(i);
            $('.cart-title>p>b>span').html(i);
            }
        }

        // 点击各个多选框整体事件
        if(e.target.className=='ckbox'){
            var index=$(this).attr('data-i');
            var oldG=Number(LsyStorage.getItem('cc_'+index).golding)*Number(LsyStorage.getItem('cc_'+index).num);
            var downG=Number($('.cart-title>.close>ul li>b').html().replace("￥",""));
            var sum=Number($('.cart-title>.close>ul li>i').html());
            if($(this).children('label').children('input[type=checkbox]').attr('checked')=='checked'){
              $(this).children('label').children('p').html("✔")
              $('.cart-title>.close>ul li>i').html(sum+1)
              $('.cart-title>.close>ul li>b').html('￥'+(oldG+downG)+'.00')
            }else{
              $(this).children('label').children('p').html("")
              if(sum-1<0){
                  sum=1;
              }
              $('.cart-title>.close>ul li>i').html(sum-1)
              $('.cart-title>.close>ul li>b').html('￥'+(downG-oldG)+'.00')
            }
        }
    });
    lisBtn.on('click','input[type=checkbox]',function(){
        //console.log($(this).prop('checked'));
        if($(this).siblings('p').html()==''){
            $(this).siblings('p').html('✔');
        }else{
            $(this).siblings('p').html('');
        }
        console.log($(this).attr('checked'));
    })

// 底部大删除商品事件执行
    $('#bigDelete').click(function () {
        var fg=confirm('是否要删除选中宝贝?');
        if(fg){
        var arr=[];
        for (var i = 0; i < lisBtn.length; i++) {
            if (lisBtn.eq(i).children('label').children('input[type=checkbox]').attr('checked')) {
                arr.push(lisBtn.eq(i).attr('data-i'));
                lisBtn.eq(i).remove();
                $('.cart-title>.close>ul li>i').html(0)
                $('.cart-title>.close>ul li>b').html('￥0.00')
            }
        }
        for(var i=0;i<arr.length;i++){
            LsyStorage.removeItem("cc_"+arr[i]);
            var sum=LsyStorage.getArr("cc").length;
            LsyStorage.setItem('shopSum',sum,24*3600*5);
            $('.headed-middle>.shopcar>a>b').html(LsyStorage.getItem('shopSum'))
        }
        //alert("删除宝贝成功");
        var i=$('.headed-middle>.shopcar>a>b').html()
        console.log(i);
        $('.cart-title>p>b>span').html(i);
        }
    })

// 全选底部显示数量和总价
    $('.cart-title>.item>ul li>label>input[type=checkbox]').on('click',fn1);
    $('.cart-title>.close>ul li>label>input[type=checkbox]').on('click',fn1);
    //计算底部商品数量和总价格的方法

// 底部全选项的函数
    function fn1(){
        var big=0;
        var obj=0;
        if($(this).attr('checked')){
            obj=LsyStorage.getArr('cc').length;
            for(var i=0;i<obj;i++){
                big+=Number(LsyStorage.getArr('cc')[i].golding)*Number(LsyStorage.getArr('cc')[i].num);
            }
        }
        $('.cart-title>.close>ul li>i').html(obj)
        $('.cart-title>.close>ul li>b').html('￥'+big+'.00')
    }
// 单个选中判断的删除项函数
    function ff() {
        var big=0;
        var arr=[];
        var index=0;
        lisBtn=$('.cart-title>.cart-main>ul>li');
        console.log(lisBtn.length);
        for(var i=0; i<lisBtn.length; i++){
            if(lisBtn.eq(i).children('label').children('input[type=checkbox]').attr('checked')){
                console.log(lisBtn.eq(i));;
                index=lisBtn.eq(i).attr('data-i');
                arr.push(LsyStorage.getItem('cc_'+index))
                big+=Number(LsyStorage.getItem('cc_'+index).golding)*Number(LsyStorage.getItem('cc_'+index).num);
            }
        }

        $('.cart-title>.close>ul li>i').html(arr.length)
        $('.cart-title>.close>ul li>b').html('￥'+big+'.00')
        return arr
    }

// 多选框全选判断事件
//     item上方的全选项控制

    $('.item ul li>label input[type=checkbox]').click(function(){
        if($('.item ul li>label input[type=checkbox]').attr('checked')=='checked'){
            $('.cart-main ul li>label>input[type=checkbox]').attr('checked','checked');
            $('.close ul li>label input[type=checkbox]').attr('checked','checked');
        }else {
            $('.cart-main ul li>label>input[type=checkbox]').removeAttr('checked');
            $('.close ul li>label input[type=checkbox]').removeAttr('checked');
        }
    })

// 点击全选文字控制

    // close下方的全选项控制
    $('.close ul li>label input[type=checkbox]').click(function(){
        if($('.close ul li>label input[type=checkbox]').attr('checked')=='checked'){
            $('.cart-main ul li>label>input[type=checkbox]').attr('checked','checked');
            $('.item ul li>label input[type=checkbox]').attr('checked','checked');
        }else {
            $('.cart-main ul li>label>input[type=checkbox]').removeAttr('checked');
            $('.item ul li>label input[type=checkbox]').removeAttr('checked');
        }
    })
$('.close ul li').on('click','input[type=checkbox]',function(){
   // console.log($(this).prop('checked'));
    if($(this).siblings('p').html()==''){
        $(this).siblings('p').html('✔');
        $('.item>ul>li>label>p').html('✔');
        $('.cart-main>ul>li>label>p').html('✔');
    }else{
        $('.item>ul>li>label>p').html('');
        $('.cart-main>ul>li>label>p').html('');
        $(this).siblings('p').html('');
    }
    //console.log($(this).attr('checked'));
})

$('.item ul li').on('click','input[type=checkbox]',function(){
    //console.log($(this).prop('checked'));
    if($(this).siblings('p').html()==''){
        $(this).siblings('p').html('✔');
        $('.close>ul>li>label>p').html('✔')
        $('.cart-main>ul>li>label>p').html('✔');
    }else{
        $(this).siblings('p').html('');
        $('.close>ul>li>label>p').html('')
        $('.cart-main>ul>li>label>p').html('');
    }
    //console.log($(this).attr('checked'));
})




    // 中间所有单独选框的控制
    $('.cart-main ul li>label>input[type=checkbox]').click(function(){
        var len=$('.cart-main ul li>label>input[type=checkbox]').length;
        var ch=$('.cart-main ul li>label>input:checked').length;
        if(len==ch){
            $('.close ul li>label>input[type=checkbox]').attr('checked','checked');
            $('.item ul li>label>input[type=checkbox]').attr('checked','checked');
            $('.close ul li>label>p').html('✔')
            $('.item ul li>label>p').html('✔')
        }else {
            $('.close ul li>label>input[type=checkbox]').removeAttr('checked');
            $('.item ul li>label>input[type=checkbox]').removeAttr('checked');
            $('.close ul li>label>p').html('')
            $('.item ul li>label>p').html('')
        }
    })


    // 结算跳转到支付
    $('#btn123').click(function () {
        var shopsArr=[];
        var ckbox=$('.cart-main>ul>li>label>input[type=checkbox]');
        var shopsnum=$('.cart-title>.close>ul>li>i').html();
        var shopsgold=$('.cart-title>.close>ul>li.spes02>b').html().replace('￥','');
        if(shopsnum>0) {
            for (var i = 0; i < ckbox.length; i++) {
                if (ckbox.eq(i).attr('checked') == 'checked') {
                    shopsArr.push(ckbox.eq(i).parent().parent().attr('data-i'));
                }
            }
            LsySession.setItem('shopsnum', shopsnum);
            LsySession.setItem('shopsgold', shopsgold);
            LsySession.setItem('shopsArr', shopsArr);
            window.location.href='confirm_order.html';
        }else{
            alert('请选择您所要购买的商品')
        }
    })
















