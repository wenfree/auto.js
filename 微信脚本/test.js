







log(



    currentActivity()
)



function jsclick(way,txt,clickKey,n){
    if(!n){n=1};
    var res = false;
    if(!clickKey){clickKey=false};
    if (way == "text"){
        res = text(txt).findOne(200);
    }else if(way == "id"){
        res = id(txt).findOne(200);
    }else if(way == "desc"){
        res = desc(txt).findOne(200);
    }
    if(res){
        log("找到->",txt)
    if (clickKey){
        log('准备点击->',txt);
        log("x:",res.bounds().centerX(),"y:",res.bounds().centerX());
        // click(txtddd.bounds().centerX(),txtddd.bounds().centerY());
        Tap(res.bounds().centerX(),res.bounds().centerY());
        sleep(1000*n);
    }
        return true;
    }else{
    log("没有找到->",txt)
    }
};


//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}


var path = "/sdcard/Acreencapture.png";
captureScreen(path);
var src = images.read(path);
var clip = images.clip(src, 162, 1366, 952-162, 1485-1366);
images.save(clip, "/sdcard/clip.png");

