


// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {
    try{

        var taskData = getTask();
        log(taskData.task.data);
        if ( address()){
            callback_task(taskData.task.id,"done");
        }
   
    }catch(e){
        toast(e)
    }
    mainEngine.emit("control", i);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
    clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
});

function jspost(url,data){
    var res = http.post(url, data);
    var data = res.body.string();
    if(data){
        return data;
    }
}

function click_(x,y){
    if(x>0 && x < device.width && y > 0 && y < device.height){
        click(x,y)
    }else{
        log('坐标错误')
    }
}

function click__(obj){
    click_(obj.bounds().centerX(),obj.bounds().centerY())
}

function jsclick(way,txt,clickKey,n){
    if(!n){n=1};//当n没有传值时,设置n=1
    var res = false;
    if(!clickKey){clickKey=false}; //如果没有设置点击项,设置为false
    if (way == "text"){
        res = text(txt).findOne(200);
    }else if(way == "id"){
        res = id(txt).findOne(200);
    }else if(way == "desc"){
        res = desc(txt).findOne(200);
    }
    if(res){
        if ( clickKey ){
            log('准备点击->',txt,"x:",res.bounds().centerX(),"y:",res.bounds().centerY());
            click__(res);
            sleep(1000*n);
        }else{
            log("找到->",txt);
        }
        return true;
    }else{
        // log("没有找到->",txt)
    }
}

//基础函数
function active(pkg,n){
    if(!n){n=5}
    if(  currentPackage() == pkg ){
       log("应用在前端");
       return true;
    }else{
        app.launch(pkg);
        sleep(1000);
        sleep(1000*n);
    }
}

// 获取接口数据
function getTask() {
    var url = 'http://api.wenfree.cn/public/';
    let res = http.post(url, {
        "s": "NewsImei.Imei",
        "imei": device.getIMEI()
    });

    let json = {};
    try {
        let html = res.body.string();
        // log(html)
        json = JSON.parse(html);
        log(json)
        return json.data;
    } catch (err) {
        //在此处理错误
    }
};

function callback_task(id,state){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr["id"] = id;
    arr["state"] = state;
    var postdata = {};
    postdata["s"]="NewsRecordBack.Back"
    postdata["arr"] = JSON.stringify(arr)
    log(arr,postdata)
    log(jspost(url,postdata));
}



function opens(url){
    var i=0;
    var openKey = false
    while (i<2){

        home();
        sleep(1000);
        click(device.width/4,device.height-20)
        sleep(2000);
        jsclick('id',"clearAnimView",true,2)
        sleep(2000);
        //清理掉多余的程序

        setClip(url);
        log("准备启动");
        sleep(500);
        active(_app.bid ,6);
        sleep(1000);

        if (jsclick("text","前往",true,2) || jsclick("text","打开看看",true,2)){
            openKey = true
        }

        sleep(1000);
        var UI = currentActivity();
        log(UI)
        if (openKey && UI == 'com.ss.android.ugc.aweme.detail.ui.DetailActivity' ){
            log("正确的打开页面");
            return true
        }

        sleep(1000);
        Tips();
        i++;
    }
}

function Tips(){
    var textTips = {}
    textTips["我知道了"]="text";
    textTips["下次再说"]="text"
    textTips["打开"]="text"
    textTips["允许"]="text"
    textTips["忽略"]="text"
    textTips["同意并使用"]="text"
    textTips["确定"]="text"
    textTips["取消"]="text"
    textTips["重新启用数据"]="text"
    textTips["确定"]="desc"
    for(var k in textTips){
       if (jsclick(textTips[k],k,true,2)){
           break;
       }
    }
}

function dzan(){
    log('准备点赞')
    var title = className("android.widget.LinearLayout").find()
    if (title){
        if (title.length >= 3){
            log('可以点赞')
            click(988,784);
            sleep(1000*2);
            click(device.width/2,device.height*0.3)
            sleep(50)
            click(device.width/2,device.height*0.3)
            sleep(50)
            click(device.width/2,device.height*0.3)
            sleep(50)
            click(device.width/2,device.height*0.3)
            sleep(50)
            sleep(1000*2)
            sleep(random(1,5)*1000)
            log('完成');
            return true
        }else{
            log('内容加截失败')
        }
    }else{
        log('没有找到内容')
    }
}

function main(url){
    if (opens(url)){
        sleep(5000);
        return dzan();
    }
}

var _app ={}
_app.name = "抖音短视频";
_app.bid = "com.ss.android.ugc.aweme";

// url = 'https://v.douyin.com/JJP6CXa/';
function zanMUNber(){
    // var t = className("TextView").find();
    var t = className("android.widget.LinearLayout").find();
    for (var i=0;i<t.length;i++){
        var tt = t[i]
        log(i,tt.id(),tt.text())
    
        // if (tt.id() == 'com.ss.android.ugc.aweme:id/aly'){
        //     return tt.text()
        // }
    }
}


var url = 'https://v.douyin.com/Jevj7D5/';
// main(url)


log(currentActivity());
log(currentPackage());




var t = textMatches(".*").find()
if (t) {
    for (var i=0;i<t.length;i++){
        var tt = t[i]
        log(i,tt.id(),tt.text())
    }
}



function address(){
    if (jsclick("text","新建收货地址",true,5)){
        // setText(2,"文虹");
        // setText(3,"18128823268");
        // setText(4,"44444");

        var addressinfo = JSON.parse(jspost('https://wenfree.cn/api/app.php?s=App.Aaddress.Get',{}));
        log(addressinfo);
        setText(2,addressinfo.data.name);
        setText(3,addressinfo.data.phone);
        setText(4,addressinfo.data.sheng+addressinfo.data.shi+addressinfo.data.qu+addressinfo.data.address);
        return true;
    }
}

