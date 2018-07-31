$('#bingo').click(function () {
    if($(this).html()==" "){
        $(this).html(" ✔")
    }else{
        $(this).html(" ");
    }
})

// 用户名验证
fn('urName',/^\w{2,20}$/,'','*用户名长度应为2到20个字符');
//密码验证
fn('urPass',/^\w{6,20}$/,'',"*密码应为6-16个大小写英文字母、符号或数字")
//2次密码验证
var b1=document.getElementById('urPass02');
var b2=document.getElementById('urPass');
var father=b1.parentElement;
var fatherB=father.parentElement;
var brother=fatherB.nextElementSibling.getElementsByTagName('input')[0];
var img=father.getElementsByTagName('img')[0];
var pTxt=fatherB.getElementsByTagName('p')[0];
b1.onfocus=function () {
    b1.value="";
    img.setAttribute('src',"");
    pTxt.innerHTML='';
}
b1.onblur=function () {
    if( b1.value==b2.value && b1.value!=""){
        img.setAttribute('src','img/true.png');
        pTxt.innerHTML="";
        pTxt.style.color='green';
        brother.removeAttribute('readonly')
    } else {
        if(this.value!=""){
            img.setAttribute('src','img/false.png');
            pTxt.innerHTML='*两次输入的密码不一致'
            pTxt.style.color='red';
            brother.setAttribute('readonly','readonly');
        }

    }
}
b2.addEventListener('focus',fn2,false)
b1.addEventListener('focus',fn2,false)
function  fn2() {
    if(this.getAttribute('readonly')!='readonly'){
        this.type='password'
    }
}
//手机号验证
fn('urPhone',/^1\d{10}$/,'','*请输入正确的手机号码');
//邮箱验证
fn('urEmail',/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,"",'请输入正确有效的邮箱')
// 短信验证
var urma=document.getElementById('urma');
var urmaA=document.getElementById('urmaA')
urma.onfocus=function () {
    urma.value="";
}
urmaA.onclick=function () {
    urma.value="";
}

function fn(id,er,trueText,falseText) {
    var a1 = document.getElementById(id);
    var inputs = document.getElementsByTagName('input');
    var father = a1.parentElement;
    var fatherB = father.parentElement;
    var brother = fatherB.nextElementSibling.getElementsByTagName('input')[0];
    var img = father.getElementsByTagName('img')[0];
    var pTxt = fatherB.getElementsByTagName('p')[0];
    var btns = document.getElementById('sub');
    btns.setAttribute('disabled', 'disabled')
    a1.onfocus = function () {
        if (this.getAttribute('readonly') != 'readonly' && this.value == "") {
            a1.value = "";
            img.removeAttribute('src');
            pTxt.innerHTML = '';
        }
    }
    a1.onblur = function () {
        if (er.test(this.value)) {
            img.setAttribute('src', 'img/true.png');
            pTxt.innerHTML = trueText;
            pTxt.style.color = 'green';
            brother.removeAttribute('readonly')
            //console.log(inputs[inputs.length - 2].getAttribute('readonly'));
            if (inputs[inputs.length - 2].getAttribute('readonly') == null&&$('#bingo').html()!="") {
                btns.removeAttribute('disabled');
                btns.style.cursor = 'pointer'
            }
        }else if (this.value == "") {
            return false;
        } else {
            img.setAttribute('src', 'img/false.png');
            pTxt.innerHTML = falseText;
            pTxt.style.color = 'red';
            brother.setAttribute('readonly', 'readonly');
        }
    }
}
$('#sub').click(function () {
    //console.log($('#urma').val());
    if($('#urma').val()=="") {
        alert('短信验证码不应为空');
        return false;
    } else if($("#bingo").html()==" "){
        alert("请先阅读并同意《新合谊注册条款》");
        return false;
    }
    var cc = {
        urName: $('#urName').val(),
        urPsw: $('#urPass').val(),
        urEmail: $('#urEmail').val(),
        urPhone: $('#urPhone').val(),
    }
    var ccArr = LsyStorage.getItem('shuju') ? LsyStorage.getItem('shuju') : [];
    console.log(ccArr);
    for (var i = 0; i < ccArr.length; i++) {
        if (ccArr[i].urName == cc.urName) {
            alert('用户名已存在')
            return false;
        }
    }
    ccArr.push(cc);
    LsyStorage.setItem('shuju', ccArr);
    alert('注册成功,请登录')
    window.location.href = 'login.html'
})

