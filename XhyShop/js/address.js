
// 分页最后的..变透明边框
$('.main-btn ul li:last-child a').css('borderColor','transparent');
// 设为默认地址选项
$('.main>.adds>ul>li>span>button').click(function () {
    $('.main>.adds>ul>li>span>button').removeClass('addsON').html('设为默认')
    $(this).addClass('addsON').html('默认地址')
})
// 删除分页项
$('.main>.adds>ul>li>span>a:odd').click(function () {
    var tip=confirm("确定要删除此地址吗？");
    if(tip){
    $(this).parent().parent().hide();
    }
})