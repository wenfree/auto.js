


// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {
    
    try
    {
        var taskData = getTask();
        log(taskData.task.data);
        var dyid = JSON.parse(taskData.task.data);
        var url = dyid.url;
        log(url)
        if(main(url)){
            callback_task(taskData.task.id,"done");
        }
    }
    catch(err)
    {
        log(err);
        log("遇到错误");
        sleep(1000*60);
    }
    
    app.launch('com.wenfree.cn');
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
//准备点击
function click_(x,y){
    if(x>0 && x < 720 && y > 0 && y < 1440){
        click(x,y)
    }else{
        log('坐标错误')
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
//输入密码
function input_pay_password(password){
    var key_xy = {}
    key_xy[1]=[device.width*0.3,device.height*7/10]
    key_xy[2]=[device.width*0.5,device.height*7/10]
    key_xy[3]=[device.width*0.8,device.height*7/10]
    key_xy[4]=[device.width*0.3,device.height*7.5/10]
    key_xy[5]=[device.width*0.5,device.height*7.5/10]
    key_xy[6]=[device.width*0.8,device.height*7.5/10]
    key_xy[7]=[device.width*0.3,device.height*8/10]
    key_xy[8]=[device.width*0.5,device.height*8/10]
    key_xy[9]=[device.width*0.8,device.height*8/10]
    key_xy[0]=[device.width*0.5,device.height*9/10]
    // 清除其它字符
    password = password.replace(/\D/g,"")
    for(var i=0;i<password.length;i++){
        var numbers = password.substring(i,i+1);
        click_(key_xy[numbers][0],key_xy[numbers][1])
        sleep(300)
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

function Tips(){
    var textTips = {}
    textTips["我知道了"]="text";
    textTips["同意授权"]="text";
    textTips["下次再说"]="text"
    textTips["打开"]="text"
    textTips["允许"]="text"
    textTips["忽略"]="text"
    textTips["同意并使用"]="text"
    textTips["确定"]="text"
    textTips["确定"]="desc"
    textTips["好的"]="text"
    for(var k in textTips){
       if (jsclick(textTips[k],k,true,2)){
           break;
       }
    }
}

function opens(urlss){
    var i=0;
    var openKey = false
    while (i<20){

        back();
        sleep(1000);
        back();
        sleep(1000);
        back();
        sleep(1000);
        setClip(urlss);
        log("准备启动");
        log(Date())
        active(app_bid,6);
        log("启动完成");
        log(Date())
        sleep(1000);

        if (jsclick("text","前往",true,2) || jsclick("text","打开看看",true,2)){
            openKey = true
        }

        var UI = currentActivity();
        log(UI)
        if (openKey && UI == 'com.ss.android.ugc.aweme.profile.ui.UserProfileActivity' ){
            log("正确的打开页面");
            return true
        }

        sleep(1000);
        Tips();
        i++;
    }
}

function follow(){
    var timeLine = 0
    while (timeLine < 10){
        log("timeLine--->",timeLine)
        var UI = currentActivity();
        log("UI->",UI)
        switch(UI){
            case "com.ss.android.ugc.aweme.profile.ui.UserProfileActivity":
                if(jsclick("text","编辑资料",false,2)){
                    log("是本帐号")
                    return true
                }else if(jsclick("text","取消关注",false,2)){
                    return true
                }else if(jsclick("text","#  互相关注",false,2)){
                    return true
                }else{
                    var t = textMatches(/.*关注/).find();
                    for (var i=0;i<t.length;i++){
                        log(i,t[i].text())
                        if (t[i].text() == '#  关注'){
                            click__(t[i]);
                        }
                    }
                }
                break
            default:
                log("其它界面,后退");
                back();
            break;
        }
        Tips()
        sleep(1000 * 2);
        timeLine++;
        log('--')
    }
}

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


log(currentPackage());
log(currentActivity());
log(device.width,device.height);

var my_app={}
var app_name = "抖音短视频";
var app_bid = "com.ss.android.ugc.aweme";



var info = {}

// var urlss = 'https://v.douyin.com/XnEJkd/'
// if(opens(urlss)){
//     follow()
// }



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



function main(urls){
    if(opens(urls)){
        if(follow()) return true;
    }
}

// app.launch(app_bid)
// app.launchApp("QQ")
// main();

// var taskData = getTask();
// log(taskData.task.data);
// var dyid = JSON.parse(taskData.task.data);
// var dyid = dyid.dyid;

// main();
// callback_task(taskData.task.id,"done");


// var t = textMatches(/.*关注/).find();
// for (var i=0;i<t.length;i++){
//     log(i,t[i].text())
// }