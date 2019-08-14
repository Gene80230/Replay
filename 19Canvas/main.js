
var canvas = document.getElementById('canvas')
var content = canvas.getContext('2d');

autoSetCanvas(canvas)
listenToUse(canvas)


var eraserEnabled = false
Signingpen.onclick = function(){
  eraserEnabled = false
  Signingpen.classList = 'icon active'
  eraser.classList = 'icon'
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList = 'icon active'
  Signingpen.classList = 'icon'
}


function drawCircle(x, y, radius){
  content.beginPath();
  content.arc(x, y, radius, 0, Math.PI * 2);
  content.stroke();
}

function drawLine(x1, y1, x2 ,y2){
 content.beginPath();
  content.lineWidth = 5;
 content.moveTo(x1, y1);
 content.lineTo(x2 ,y2);
 content.stroke();
 content.closePath();
}

//自动重置宽高
function autoSetCanvas(canvas){
  setCanvasSize()
  //当视口改变后重置
  window.onresize = function(){
    setCanvasSize()
  }
  //让canvas的宽、高跟视口一致
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}


function listenToUse(canvas){
  var using = false
  var lastPoint = {x:undefined, y:undefined}
   
  if(document.body.ontouchstart !== undefined){
    //是触屏设备
    canvas.ontouchstart = function(e){   
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      using = true
      if(eraserEnabled){
        content.clearRect(x-5, y-5, 10, 10)
      }else{  
        lastPoint = {'x':x, 'y':y}
      }
    }
    canvas.ontouchmove = function(e){
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      if(!using) return
      if(eraserEnabled){
          content.clearRect(x-5, y-5, 10, 10)
      }else{
        var newPoint = {'x':x, 'y':y}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }  
    }
    canvas.ontouchend = function(e){
      using = false
    }
  }else{
    //不是触屏设备
    canvas.onmousedown = function(e){
      var x = e.clientX
      var y = e.clientY
      using = true
      if(eraserEnabled){
        content.clearRect(x-5, y-5, 10, 10)
      }else{  
        lastPoint = {'x':x, 'y':y}
      }
    }
  
    canvas.onmousemove = function(e){
      var x = e.clientX
      var y = e.clientY
      if(!using) return
      if(eraserEnabled){
          content.clearRect(x-5, y-5, 10, 10)
      }else{
        var newPoint = {'x':x, 'y':y}
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }  
    }
  
    canvas.onmouseup = function(e){
      using = false
    }
  }
  
}

