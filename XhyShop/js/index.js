$('.main>.main-content>ul>li').click(function () {
    var ids=$(this).children('a').attr('data-id');
    var newUrls='pro_details.html?'+ids;
    $(this).find('a').attr('href',newUrls);
})
$('.main>.main-nav>a').click(function () {
    LsySession.setItem('n',$(this).attr('data-index'))
})
$('.hot>ul>li').click(function () {
    var ids=$(this).children('a').attr('data-id');
    var newUrls='pro_details.html?'+ids;
    $(this).find('a').attr('href',newUrls);
})