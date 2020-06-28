
// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    try{
        var taskData = getTask();
        log(taskData.task.data);

        if (main()) {
            
        }
        readInfo()

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

/*
    清除app数据，无需root权限
    备注:仅适用小米手机
    @author：飞云
    @packageName：包名
    返回值：Boolean，是否执行成功
*/

function clearApp(packageName) {
    // var appName = "星巴克"
    // var packageName = "com.starbucks.cn"
    let i = 0
    while (i < 10) {
        let activity = currentActivity()
        switch (activity) {
            case "com.miui.appmanager.ApplicationsDetailsActivity":
                if (click("清除数据")) {
                } else if (click("清除全部数据")) {
                } else if (click("确定")) {
                    desc("返回").click();
                    sleep(2000);
                    back();
                    sleep(2000);
                    return true
                }
                break;
            default:
                log("页面:other")
                back()  //返回
                sleep(1000);
                if (!openAppSetting(packageName)) {
                    log("找不到应用，请检查packageName");
                    return false;
                }
                sleep(3000);
                break;
        };
        i++;
        sleep(1000)
    }
    back();
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
    textTips["好的"]="text";
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
    var readtimes_end = random(10,20)
    var detail2 = 0;

    var i__ = 0;
    while (i__ < 30) {
        i__++;
        if ( active( appinfo.bid , 8)  ){

            var UI = currentActivity();
            log('UI',UI,i__)
            switch(UI){
                case 'com.jd.jdlite.MainFrameActivity':
                    if ( fristbox ){
                        if( jsclick('desc',"首页",true,5) ){
                            var tasktimes = 0
                            while (tasktimes < 60 ){
                                if (jsclick("text","现金签到",true,2)){
                                    break
                                }
                                tasktimes++
                            }
                        }
                    }else
                    if ( jsclick("desc","我的",false,1) && jsclick("desc","赚钱",false,1) ){

                        if (readtimes > readtimes_end ){
                            return true
                        }

                        var home_selected = desc('赚钱').selected(true).findOne(1000);
                        if (home_selected){

                            if (jsclick('text',"活动任务",false,2)){
                                if (jsclick('text','去赚钱',true,2)){
                                    readtimes++;
                                }else{
                                    return true
                                }
                            }else{
                                moveTo(width/2,height*0.8,width/2,height*0.6,random(500,1000));
                            }
                        }else{
                            jsclick("desc","赚钱",true,2)
                        }
                    }else{
                        back();
                    }
                    break;
                case "com.jingdong.common.reactnative.view.JDReactMainActivity":
                    log('签到页面');
                    if(jsclick('text','立即签到领现金',true,2)){
                    }else if(jsclick('text','残忍离开',true,2)){
                        fristbox = false;
                    }else if( jsclick('text','邀请好友',true,2) || jsclick('text','邀好友解锁额外红包',false,2) ){
                        fristbox = false;
                        back();
                    }
                    break;
                case "com.jd.lib.productdetail.ProductDetailActivity":
                    log(['商品页面']);

                    sleep(1000*rd(2,6));
                    moveTo(width/2,height*0.8,width/2,height*0.1,random(500,1000));
                    sleep(1000*rd(2,6));
                    moveTo(width/2,height*0.8,width/2,height*0.1,random(500,1000));
                    sleep(1000*rd(2,6));
                    moveTo(width/2,height*0.8,width/2,height*0.1,random(500,1000));
                    sleep(1000*rd(2,6));
                    moveTo(width/2,height*0.8,width/2,height*0.1,random(500,1000));
                    back();

                    break;
                case 'com.jd.jdlite.web.WebActivity':
                    log('活动页面');
                    sleep(1000*rd(2,6));
                    moveTo(width/2,height*0.8,width/2,height*0.1,random(500,1000));
                    sleep(1000*rd(2,6));
                    moveTo(width/2,height*0.8,width/2,height*0.1,random(500,1000));
                    sleep(1000*rd(2,6));
                    moveTo(width/2,height*0.8,width/2,height*0.1,random(500,1000));
                    sleep(1000*rd(2,6));
                    moveTo(width/2,height*0.8,width/2,height*0.1,random(500,1000));
                    back();

                    break;

                case 'com.jd.lib.videolife.view.activity.VideoLifeActivity':
                    log('视频例表');
                    jsclick("id",'vl_type_video_text_title',true,2)

                    break;
                case 'com.jd.lib.videoimmersion.view.activity.VideoImmersionActivity':
                    log('视频播放');

                    sleep(1000*rd(30,60));
                    moveTo(width/2,height*0.8,width/2,height*0.1,random(500,1000));
                    sleep(1000*rd(30,60));
                    back();
                    sleep(1000);
                    back();
                    sleep(1000);

                    break;
                default:
                    back();
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
            log('UI',UI,i__)
            switch(UI){
                case 'com.jd.jdlite.MainFrameActivity':
                    log('首页');
                    if(jsclick('desc',"我的",true,2)){
                        if(jsclick("text","现金余额",false,2)){
                            var titleTextArr = id("asset_value").find();
                            if (titleTextArr){
                                info['金币'] = titleTextArr[0].text()
                                info['现金余额'] = titleTextArr[1].text()
                                info['优惠券'] = titleTextArr[2].text()
                                app_info(appinfo.name,info);
                                return true
                            }
                        }
                    }
                    break;
                default:
                    back();
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
appinfo.name = "京东极速版";
appinfo.bid = "com.jd.jdlite";



// main();
// readInfo()















