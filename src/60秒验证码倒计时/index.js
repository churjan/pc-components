let wait=60;
let isProgress=false;
let text='免费获取验证码'
let countdown=document.getElementById('countdown');
countdown.addEventListener('click',handleCountdown);

function handleCountdown(){
  console.log('触发点击')
  if(!isProgress){
    console.log('触发倒计时')
    !function startCountdown(){
      isProgress=true;
      if(wait===0){
        countdown.classList.remove('ban');
        countdown.innerHTML='免费获取验证码';
        isProgress=false;
        wait=60;
      }else{
        countdown.classList.add('ban');
        countdown.innerHTML=`重新发送${wait}s`;
        wait--;
        setTimeout(() => {
          startCountdown();
        }, 1000);
      }
    }()
  }
}
