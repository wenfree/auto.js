
// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    try{
        var taskData = getTask();
        log(taskData.task.data);

        if (main()) {
            readInfo()
        }

        callback_task(taskData.task.id,"done");
        launch('com.wenfree.cn');
    }
    catch(err){
        log(err)
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

//读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        return storage.get(key);
    };
    //默认返回undefined
}

function app_info(name,data){
    var url = "http://api.wenfree.cn/public/";
    var postdata = {};
    postdata["s"]="App.NewsAppInfo.App_info";
    postdata["imei"]= device.getIMEI();
    postdata["imei_tag"]= getStorageData(device.getIMEI(), "tag");;
    postdata["app_name"]= name;
    postdata["whos"]= "ouwen000";
    postdata["app_info"]= JSON.stringify(data);
    log(jspost(url,postdata));
}

//基础函数
function active(pkg,n){
    if(!n){n=5}
    if(  currentPackage() == pkg ){
       log("应用在前端");
       return true;
    }else{
        app.launch(pkg);
        sleep(1000*n);
    }
}
//准备点击
function click_(x,y){
    if(x>0 && x < 720 && y > 0 && y < 1440){
        click(x,y);
        return true
    }else{
        log('坐标错误');
        return false
    }
}
//点击obj
function click__(obj){
    click_(obj.bounds().centerX(),obj.bounds().centerY())
}
//普通封装
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
            if ( res.bounds().centerX() < 0 || res.bounds().centerX()> width || res.bounds().centerY() < 0 || res.bounds().centerY() > height ){
                return false
            }
            log('准备点击->',txt,"x:",res.bounds().centerX(),"y:",res.bounds().centerY());
            click__(res);
        }else{
            log("找到->",txt);
        }
        sleep(1000*n);
        return true;
    }else{
        // log("没有找到->",txt)
    }
}
//随机数
function rd(min,max){
    if (min<=max){
        return random(min,max)
    }else{
        return random(max,min)
    }
}

function moveTo(x,y,x1,y1,times){
    swipe(x,y,x1,y1,times);
    sleep(1000);
}

function Tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["允许"]="text";
    textTips["保存"]="text";
    textTips["我知道了"]="text";
    textTips["免费阅读"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    log('查询弹窗-end')
    return true
}

// [500,1044,692,1238]

function main(){

    home();
    sleep(2000);
    click(device.width/4,device.height-20)
    sleep(2000);
    jsclick('id',"clearAnimView",true,2)
    sleep(2000);

    var fristbox = true
    var readtimes = 0
    var readtimes_end = random(20,30)
    var detail2 = 0;
    var movetoTimes = 0
    var readkey = false

    var i__ = 0;
    while (i__ < 50) {
        i__++;
        if ( active( appinfo.bid , 8)  ){

            var UI = currentActivity();
            log('UI',UI,i__)
            switch(UI){
                case 'com.lechuan.mdwz.ui.activity.NovelMainActivity':
                    log('主界面');
                    if(fristbox){
                        if (jsclick('text','福利',true,2)){
                            if (jsclick('text','立即签到',true,2)){
                                jsclick('text','白给钱也不要',true,2)
                            }else{
                                fristbox = false;
                            }
                        }
                    }else{
                        var gold100 = textMatches(/再领.*金币/).findOne(500);
                        if (gold100){
                            click__(gold100);
                        }else
                        if ( jsclick('text','福利',true,2) ){
                            if (jsclick('text','立即阅读',true,2) ){
                                readkey = true
                            }
                        }else{
                            var reads = textMatches(/去阅读解锁.*/).findOne(500);
                            if ( reads ){
                                click__(reads);
                            }
                        }
                    }
                    break;
                case "com.lechuan.midunovel.reader.ui.activity.ReaderActivity":
                    log([readtimes,'阅读页面',"readkey",readkey]);
                    if (jsclick('text','看小视频翻倍领取红包',false,2)){
                        click((251+469)/2,(736+954)/2)
                        sleep(1000*65+rd(1000,5000));
                    }
                    if ( readkey ){
                        moveTo( width*0.8,height*0.8,width*0.2,height*0.8,rd(500,2000) );
                        sleep(1000*rd(3,10));
                        readtimes++;
                    }else{
                        back();
                    }

                    if ( readtimes > readtimes_end ) {
                        return true
                    }

                    break
                case 'com.iclicash.advlib.ui.front.InciteADActivity':
                    log('正在看广告');
                    sleep(1000*65+rd(1000,5000));
                    back();
                    break
                case 'com.bytedance.sdk.openadsdk.activity.TTRewardVideoActivity':
                    log('关闭广告');
                    back();
                    jsclick('id',"tt_video_ad_close",true,2);
                    break
                case "com.android.systemui.recents.RecentsActivity":
                    home();
                    break;
                default:
                    log('other');
                    back();
                    sleep(1000);
            }
        }
        Tips();
        sleep(1000);
    }
}

function readInfo(){
    info = {};
    var i__ = 0;
    while (i__ < 30) {
        i__++;
        if ( active( appinfo.bid , 8)  ){

            var UI = currentActivity();
            log('readInfo->UI',UI,i__)
            switch(UI){
                case 'com.lechuan.mdwz.ui.activity.NovelMainActivity':
                    log('首页');
                    if(jsclick('text',"我的",true,2)){
                        if(jsclick("text","总余额",false,2)){
                            var titleTextArr = className("TextView").find();
                            for (var i=0;i<titleTextArr.length;i++){
                                var d = titleTextArr[i]
                                // log(i,d.id(),d.text(),d.text().length)
                                if ( d.text() == '总余额'){
                                    info['钱'] = titleTextArr[i-2].text();
                                    info['昵称'] = titleTextArr[i-6].text();
                                    info['金币'] = titleTextArr[i-1].text();
                                    info['邀请码'] = titleTextArr[i-4].text();
                                    log(info);
                                    app_info(appinfo.name,info);
                                    return true
                                }
                            }
                        }
                    }
                    break;
                case 'com.lechuan.midunovel.reader.ui.activity.ReaderActivity':
                    log('阅读页面');
                    back();
                    break;
                case 'com.lechuan.mdwz.ui.activity.NovelSplashActivity':
                    log('正在启动');
                    break;
                default:
                    home();
                    sleep(2000);
                    click(device.width/4,device.height-20)
                    sleep(2000);
                    jsclick('id',"clearAnimView",true,2)
                    sleep(2000);
            }
        }
        Tips();
        sleep(500);
    }
}

// var all_Info = textMatches(/.*/).find();
// for (var i = 0;i<all_Info.length;i++){
//     var d = all_Info[i];
//     log(i,d.id(),d.text(),d.depth())
// }

// 正式开始编代码

log([currentPackage(),currentActivity(),device.width,device.height]);
var width = 720;
var height = 1440;
var appinfo = {}
appinfo.name = "米读极速版";
appinfo.bid = "com.lechuan.mdwz";
info ={}











