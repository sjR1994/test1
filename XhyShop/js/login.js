
// 验证码图片与验证
var code=document.querySelector('.code');
var urCode=document.getElementById('urCode');
var arr=['wsks','jgmxj','6m44nn','3n3d','m8k2','46168','dwse','uudv']
var img=code.querySelector('img')
var ran=Math.floor(Math.random()*7);
var b1=document.getElementById('urPass');
img.setAttribute('src',"img/code0"+ran+".png")
code.onclick=function (event) {
    var e=event||window.event;
    ran=Math.floor(Math.random()*7);
    if(e.target.nodeName.toLowerCase()=='a' ||e.target.nodeName.toLowerCase()=='img'){
        img.setAttribute('src',"img/code0"+ran+".png")
    }
}
$('#sub').click(function () {
    var flag=false;
    var cc={
        urName:$('#urName').val(),
        urPsw:$('#urPass').val()
    }
    var ccArr=LsyStorage.getItem('shuju');
    // console.log(ccArr);
    if(urCode.value.toLowerCase()==arr[ran]) {
        for (var i = 0; i < ccArr.length; i++) {
            if(cc.urName==ccArr[i].urName &&cc.urPsw==ccArr[i].urPsw){
                flag=true;
                if(flag){
                    LsySession.setItem('myName',cc.urName);
                    alert('登陆成功');
                    window.location.href='index.html';
                    return false;
                }
            }
        }
        if(flag==false){
            alert('账号或密码错误')
        }
    }else{
        alert('验证码错误');
        return false;
    }
})

urCode.onfocus=function () {
    this.value="";
}
// 表单点击
// 用户名验证
fn('urName',/^\w{2,20}$/,'','*用户名错误');
//密码验证
b1.addEventListener('focus',function () {
    if(this.getAttribute('readonly')!='readonly'){

        this.type='password'
    }
},false)
fn('urPass',/^\w{6,20}$/,'',"*密码格式错误");

// 表单点击事件函数
function fn(id,er,trueText,falseText){
    var a1=document.getElementById(id);
    var inputs=document.getElementsByTagName('input');
    var father=a1.parentElement;
    var fatherB=father.parentElement;
    var brother=fatherB.nextElementSibling.getElementsByTagName('input')[0];
    var img=father.getElementsByTagName('img')[0];
    var pTxt=fatherB.getElementsByTagName('p')[0];
    var btns=document.getElementById('sub');
    btns.setAttribute('disabled','disabled')
    a1.onfocus=function () {
        if(this.getAttribute('readonly')!='readonly'&& this.value==""){
            a1.value="";
            img.removeAttribute('src');
            pTxt.innerHTML='';
        }
    }
    a1.onblur=function () {
        if( er.test(this.value)){
            img.setAttribute('src','img/true.png');
            pTxt.innerHTML=trueText;
            pTxt.style.color='green';
            brother.removeAttribute('readonly')
            if(inputs[inputs.length-3].getAttribute('readonly')==null){
                btns.removeAttribute('disabled');
                btns.style.cursor='pointer'
            }
        }else if(this.value==""){
            return false;
        }
        else {
            img.setAttribute('src','img/false.png');
            pTxt.innerHTML=falseText;
            pTxt.style.color='red';
            brother.setAttribute('readonly','readonly');
        }
    }
}

