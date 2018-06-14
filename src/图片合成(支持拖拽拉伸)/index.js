  let poster = document.getElementById("poster"),//海报
      dot=document.getElementById("dot"),//拖拽点
      posterWidth=poster.offsetWidth,//海报宽度
      posterHeight=poster.offsetHeight,//海报高度
      uploadFileBtn=document.getElementById("uploadFileBtn"),//上传图片按钮
      pic = document.getElementById("pic"),//显示的上传图片
      uploadImg;//上传图片


function drag() {
  pic.onmousedown = function (e) {
    console.log('pic')
    let startX = e.clientX,
        startY = e.clientY,
        picX = pic.offsetLeft,
        picY = pic.offsetTop,
        picWidth = pic.offsetWidth,
        picHeight = pic.offsetHeight;
    document.onmousemove = function (e) {
      let moveX = e.clientX,
          moveY = e.clientY,
          resultX = picX + moveX - startX,
          resultY = picY + moveY - startY;

      if (resultX < 0) {
        resultX = 0;
      } else if (resultX > posterWidth - picWidth) {
        resultX = posterWidth - picWidth;
      }
      if (resultY < 0) {
        resultY = 0;
      } else if (resultY > posterHeight - picHeight) {
        resultY =posterHeight - picHeight;
      }
      pic.style.left = resultX + "px";
      pic.style.top = resultY + "px";
    }
  }
  pic.onmouseup = function () {
    document.onmousemove = null;

  }
}


function scale(){
  dot.onmousedown=function(e) {
    console.log('dot')
    e.stopPropagation();
    let startX = e.clientX,
        picX = pic.offsetLeft,
        picWidth = pic.offsetWidth,
        picHeight = pic.offsetHeight,
        ratio=picHeight/picWidth;
    document.onmousemove=function(e){
      let moveX = e.clientX,
          resultX = picX + moveX - startX,
          resultWidth=picWidth+ moveX - startX;
          if (resultWidth < 0) {
            resultWidth = 0;
          } else if (resultX > posterWidth- picWidth) {
            resultWidth = picWidth + posterWidth- picWidth-picX;
          }

          pic.style.width = resultWidth + "px";
          pic.style.height = resultWidth*ratio + "px";
    }
  }
  document.onmouseup = function () {
    document.onmousemove = null;

  }
}
window.onload=function(){
  drag();
  scale();
}


//监听上传图片
uploadFileBtn.addEventListener('change', (e) => {
  let reader = new FileReader();
  let file = e.target.files[0];
  reader.onload = function (e) {
      let base64Url = e.target.result;
      if (base64Url.length > 1024 * 1024 * 50) {
          alert('图片尺寸请小于5M');
          return;
      } else {

        uploadImg=new Image();
        uploadImg.onload=function() {
          if(uploadImg.naturalWidth>posterWidth || uploadImg.naturalHeight>posterHeight){
            alert('上传图片宽或高不能大于海报的宽或高');
            return;
          }
            pic.style.cssText=`
            visibility: visible;
            opacity: 1;
            left:0;
            top:0;
            width:${uploadImg.naturalWidth}px;
            height:${uploadImg.naturalHeight}px;
            background:url('${base64Url}') center/100% no-repeat;
            `

        }
        uploadImg.src=base64Url;

      }
  }
  reader.readAsDataURL(file);
})

//图片合成
generateBtn.addEventListener('click',()=>{
  let url=pic.style.backgroundImage.replace('url("','').replace('")','');
  if(!url){
    alert('请先上传图片');
    return;
  }
  let canvas = document.createElement('canvas');
  canvas.width=posterWidth;
  canvas.height=posterHeight;
  let ctx = canvas.getContext('2d');
  let img1=new Image();
  img1.src='./poster.jpg';
  img1.onload=function(){
    ctx.drawImage(img1,0,0,posterWidth,posterHeight);
    console.log(pic.style.left);
    let left=parseInt(pic.style.left);
    let top=parseInt(pic.style.top);
    let width=parseInt(pic.style.width);
    let height=parseInt(pic.style.height);
    ctx.drawImage(uploadImg,left,top,width,height);
    let resultImg=document.createElement('img');
    resultImg.src=canvas.toDataURL('image/jpeg');
    document.body.appendChild(resultImg);

  }

})
