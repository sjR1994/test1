// 笑脸优差评
$('.comment>.comCenter>ul>li').click(function () {
    $('.comment>.comCenter>ul>li').find('span').css('borderColor','#000000')
    $('.comment>.comCenter>ul>li').find('span').html('');
    $('.comment>.comCenter>ul>li').find('i').css('color','#000000')
    $(this).find('span').css('borderColor','#ff0000');
    $(this).find('span').html('✔');
    $(this).find('i').css('color','#ff0000');
})

// 打星
$('#star>p>i').click(function () {
    // console.log($(this).index());
    // $(this).prevAll('i').html('★');
    // $(this).html('★');
    // $(this).nextAll('i').html('☆');
    $(this).prevAll('i').find('img').attr('src','img/starON.png');
    $(this).find('img').attr('src','img/starON.png');
    $(this).nextAll('i').find('img').attr('src','img/starIN.png');
})

// 上传
$('.filePic>label').change(function () {
    if($(this).children('input[type=file]').val()!=""){
        $(this).children('img').attr('src','img/px.jpg');
    }else{
        $(this).children('img').attr('src','img/comPic02.png');
    }

})
// 提交
$('#submit01').click(function () {
    var stars=$('#star>p').eq(2).children('i').find('img');
    var strnum=0;
    for(var i=0;i<stars.length;i++){
        if(stars.eq(i).attr('src')=='img/starIN.png'){
            strnum=i;
            break;
        }else{
            strnum=5;
        }
    }
    var strtext;
    switch (strnum){
        case 0:
            strtext="☆☆☆☆☆";
            break;
        case 1:
            strtext="★";
            break;
        case 2:
            strtext="★★";
            break;
        case 3:
            strtext="★★★";
            break;
        case 4:
            strtext="★★★★";
            break;
        case 5:
            strtext="★★★★★";
            break;
    }

    var data1=new Date();
    var year=data1.getFullYear();
    var mon=data1.getMonth()+1;
    if(mon<10){
        mon='0'+mon;
    }
    var day=data1.getDate()
    if(day<10){
        day='0'+day;
    }

    var obj={
        test:$('#textArea').val(),
        star:strtext,
        time:year+'-'+mon+'-'+day
    }
    LsyStorage.setItem('pinlun',obj)
    window.location.href='index.html'
})