var inputs=$('.headed-middle>.search>input[type=text]')
var button1=$('.headed-middle>.search>button');
var arr=[];

    inputs.focus(function () {
        inputs.val('');
    });
    button1.click(function () {
        if(inputs.val()==""||inputs.val()=='请输入要搜索的关键词'){
            alert('请输入正确的关键词')
        }else{
            arr=[]
            var cont=inputs.val();
            var re=new RegExp(cont,'gi')
            var Ls=LsyStorage.getArr('uu');
            var url='shop_list.html'
            window.location.href=url;
            for(var i=0;i<Ls.length;i++){
                if(re.test(Ls[i].titles)){
                    arr.push(Ls[i].id)
                }
            }
        }
        LsyCookie.setItem('val',inputs.val(),10)
        LsyCookie.setItem('search',arr,10);
    })


