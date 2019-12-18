


// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    var taskData = getTask();
    log(taskData.task.data);
    var dyid = JSON.parse(taskData.task.data);
    var url = dyid.url;
    log(url)

    try
    {
        main(url);
        callback_task(taskData.task.id,"done");
    }
    catch(err)
    {
        log(err);
        log("遇到错误");
        sleep(1000*60);
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

var dm={}
dm.sid = '11521';
dm.action = 'loginIn';
dm.name = '6g0hHGsmhqaTd';
dm.password = 'yangmian121';
dm.url = 'http://api.duomi01.com/api';
dm.token = '7b75c50b1bd00e9d07758fe38e92f562';
dm.phone = "";
dm.sms = "";

//登录
function dm_login(){
    let arr = {}
	arr.action = 'loginIn'
	arr.name = dm.name
    arr.password = dm.password
    var res = http.post(dm.url, arr);
    var data = res.body.string();
    if(data){
        var data_arr = data.split("|")
        if(data_arr[0]=='1'){
            dm.token = data_arr[1]
            log('token',dm.token);
            return true;
        }
    }
}
//取手机号
function dm_get_phone(){
    let arr = {}
	arr.action = 'getPhone';
	arr.sid = dm.sid;
    arr.token = dm.token;
    arr.vno = '0';
    var res = http.post(dm.url, arr);
    var data = res.body.string();
    if(data){
        var data_arr = data.split("|")
        if(data_arr[0]=='1'){
            dm.phone = data_arr[1];
            log('phone',dm.phone);
            return true;
        }
    }
}

//取手机号
function dm_get_message(){
    let arr = {}
	arr.action = 'getMessage';
    arr.sid = dm.sid;
    arr.phone = dm.phone;
    arr.token = dm.token;
    var res = http.post(dm.url, arr);
    var data = res.body.string();
    if(data){
        log(data);
        var data_arr = data.split("|")
        if(data_arr[0]=='1'){
            sms = data_arr[1];
            let sms = sms.match(/\d{4,6}/)[0]
            dm.sms = sms
            log('sms',dm.sms);
            return true;
        }
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
    textTips["下次再说"]="text"
    textTips["打开"]="text"
    textTips["允许"]="text"
    textTips["忽略"]="text"
    textTips["同意并使用"]="text"
    textTips["确定"]="text"
    textTips["确定"]="desc"
    for(var k in textTips){
       if (jsclick(textTips[k],k,true,2)){
           break;
       }
    }
}

function zan(){
    var title = className("android.widget.LinearLayout").find()
    if (title){
        if (title.length == 3){
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
            log('完成');
            return true
        }
    }
}



function opens(urlss){
    var i=0;
    while (i<20){
        home();
        sleep(1000);
        home();
        sleep(1000);
        setClip(urlss);
        active(app_bid,5);
        sleep(1000);
        if (jsclick("text","前往",true,2) || jsclick("text","打开看看",true,2)){
            return true
        }
        sleep(1000);
        Tips();
    }
}

function follow(){
    var timeLine = 0
    while (timeLine < 50){
        log("timeLine--->",timeLine)
        var UI = currentActivity();
        log("UI->",UI)
        switch(UI){
            case "com.ss.android.ugc.aweme.profile.ui.UserProfileActivity":
                if(jsclick("text","关注",true,2))
                if(jsclick("text","取消关注",false,2)){
                    return true
                }
                break
            default:
                log("其它界面,启动抖音")
                launchApp(app_name);
                sleep(1000*5);
                // back();
            break;
        }
        Tips()
        sleep(1000 * 2);
        timeLine++;
        log('--')
    }
}

function commnet_do(commnet_txt){
    if (jsclick("text","评论并转发",false,2)){
        var d = className("EditText").findOne(1000)
        if (d){
         d.setText(commnet_txt);
         sleep(1000)
         //  点击发送
         click((device.width)*0.92,d.bounds().centerY())
         sleep(1000*2)
         return true
        }
     }else{
        var title = className("android.widget.LinearLayout").find()
        if (title){
            if (title.length == 3){
                click_(device.width*2/5,device.height*88/100)
            }
        }
     }
}


function commnet(commnet_txt){
    var timeLine = 0
    while (timeLine < 50){
        log("timeLine--->",timeLine)
        var UI = currentActivity();
        log("UI->",UI)
        switch(UI){
            case "com.ss.android.ugc.aweme.detail.ui.DetailActivity":
                if (commnet_do(commnet_txt)){
                    return true
                }
                break;
            case "com.ss.android.ugc.aweme.main.MainActivity":
                if (commnet_do(commnet_txt)){
                    return true
                }
                break;
            default:
                // launch(app_bid);
                sleep(1000*5);
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
// var dyid = "6768528115078614286";
var commnet_txt = "666";


var info = {}
// var data = get_task()
// var url = data.worksPath;
// var commnet_txt = data.extend4;


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


