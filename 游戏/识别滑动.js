
auto.waitFor()

if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}else{
    log('截图权限')
}









let ocr = $plugins.load("com.hraps.ocr");
//导入插件
// ocr = $plugins.load("com.hraps.ocr")



var ocrType = "wenfree";
imgPath = "./res/hk.png"

// showData(imgPath, ocrType);


function showData(imgPath, ocrType, ping) {
    log("显示数据 imgPath = " + imgPath);
    var img = captureScreen();
    var canvas = new Canvas(img);
    let rectanglePaint = new Paint();
    rectanglePaint.setStrokeWidth(3);
    rectanglePaint.setColor(colors.parseColor("#00ff00"));
    rectanglePaint.setStyle(Paint.Style.STROKE); //空心矩形框
  

    canvas.drawRect(77,425, 644,992, rectanglePaint);
    canvas.drawRect(91,531, 627,840, rectanglePaint);
    canvas.drawRect(91+60,531+ping.y, 91+60+70,531+ping.y+70, rectanglePaint);
    canvas.drawRect(91+ping.x,531+ping.y, 91+ping.x+70,531+ping.y+70, rectanglePaint);
  
    var image = canvas.toImage();
    let newFilename = files.getNameWithoutExtension(imgPath) + "_" + ocrType + ".png";
    let newFilepath = "/sdcard/脚本/" + ocrType + "/" + newFilename;
    files.createWithDirs(newFilepath);
    images.save(image, newFilepath);
    log("识别后的图片保存路径: " + newFilepath);
    img.recycle();
    return newFilepath;
}

// events.on("exit", function () {
// log("结束运行 模块脚本");
// });

function rgbToHsl(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
  
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
  
    h = Math.min(h * 60, 360);
  
    if (h < 0) {
      h += 360;
    }
  
    const l = (min + max) / 2;
  
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
  
    return [parseInt(h), parseInt(s * 100), parseInt(l * 100)];
}
  

var src = captureScreen();
var clip = images.clip(src, 91,531, 627-91,840-531);
images.save(clip, './wenfree/true.png', "png", 100)

color_list = []
color_hsl = []
ping = {}

for( i=1;i<150;i++){
    color = images.pixel(clip, 71, i)
    color_list[i] = [i, colors.red(color),colors.green(color),colors.blue(color),colors.alpha(color)]
    color_hsl[i] = [i, rgbToHsl([colors.red(color),colors.green(color),colors.blue(color)])]

    if ( i > 10){
        function cz(i,n){
            cz1_1 = color_list[i][1] - color_list[i-n][1]
            cz1_2 = color_list[i][2] - color_list[i-n][2]
            cz1_3 = color_list[i][3] - color_list[i-n][3]
            if ( cz1_1 > 20 && cz1_2 > 20 && cz1_3 > 20){
                return true
            }
        }

        if (  cz(i,1) && cz(i,2) && cz(i,3) ){
            log(i)
            ping.y=i
            break
        }
    }
}

for( i= 139;i<500;i++){
    color = images.pixel(clip, i, ping.y+4)
    color_list[i] = [i, colors.red(color),colors.green(color),colors.blue(color),colors.alpha(color)]
    
    if ( i > 150){
        function cz(i,n){
            cz1_1 = color_list[i-10][1] - color_list[i-n][1]
            cz1_2 = color_list[i-10][2] - color_list[i-n][2]
            cz1_3 = color_list[i-10][3] - color_list[i-n][3]
            cz1_4 = color_list[i-10][3] - color_list[i-8][3]
            if ( cz1_1 > 20 && cz1_2 > 20 && cz1_3 > 20 && cz1_4 > 20){
                return true
            }
        }

        if (  cz(i,1) && cz(i,2) && cz(i,3) ){
            log(i)
            ping.x=i-9
            break
        }
    }
}

// log(color_list)

clip.recycle();


log(ping)

showData(imgPath, ocrType, ping);