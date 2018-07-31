
$('.main-btn ul li:last-child a').css('borderColor','transparent');
$('.orderMain>ul>li>.btns>button:first-child').click(function () {
    var pay=$(this).parent().parent().find('a').find('i').html();
    LsyCookie.setItem('pay',pay);
    window.location.href='pay.html'
})
$('.orderMain>ul>li>.btns>button:last-child').click(function () {
    $(this).parent().parent().hide();
})