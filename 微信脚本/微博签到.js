var my_app = {}
var info = {}

// var data = get_data()
// var url = data.worksPath;
// var commnet_txt = data.extend4;
// var data_time = new Date().getTime();
// my_app.phone = db.phoneNumber();

function get_data() {
    try {
        return JSON.parse(db.taskParam());
    } catch (error) {
        printLog("异常" + error);
        return null;
    }
}

function sendBroadcast(appName, data) {
    app.launchPackage("com.flow.factory");
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


log(currentPackage());
log(currentActivity());
log(device.width,device.height)


my_app.packageName = "com.sina.weibo";
my_app.name = "微博";
var thread = "";


mian();
info["state"] = "ok";
// sendBroadcast(my_app.name, JSON.stringify(info))

function mian(){
    var commnet_ = false

    var time_line = 0
    while (time_line < 200 ) {
        homes();
        if(active(my_app.packageName,5)){
            var UI = currentActivity();
            log('UI',UI)
            switch(UI){
                case "com.sina.weibo.MainTabActivity":
                    log("微博主界面")
                    if(jsclick("id","redpacket_container",true,2)){
                    }else if(jsclick("desc","首页",true,2)){
                    }
                    break;  
                case "com.sina.weibo.browser.WeiboBrowser":
                    log("有可能是任务中心");
                    moneyread();
                    var d = textMatches(/领取.*积分/).findOne(200)
                    if(d){
                        click__(d);
                        sleep(2000);
                        back();
                    }else
                    if(jsclick("text","关注",true,2)){
                        var d = text("关注").depth(10).findOne(1000)
                        if(d){
                            log(d)
                            d.click()
                        }
                    }else if(jsclick("text","点赞",true,2)){
                        var d = text("点赞").depth(10).findOne(1000)
                        if(d){
                            log(d)
                            d.click()
                        }
                    }else if(jsclick("text","评论",true,2)){
                        var d = text("评论").depth(10).findOne(1000)
                        if(d){
                            log(d)
                            d.click();
                            commnet_  = true
                        }
                    }else{
                        if(jsclick("text","日常任务",false,2)){
                            return true
                        }
                    }
                    break;
                case "com.sina.weibo.page.FragmentPageActivity":
                    log("关注界面");
                    if(jsclick("text","关注",true,2)){
                        var d = text("关注").depth(13).findOne(1000)
                        if(d){
                            log(d)
                            d.parent().click()
                        }
                    }else{
                        back();
                        sleep(2000)
                        back();
                    }
                    break;
                case "com.sina.weibo.page.NewCardListActivity":
                    log("准备点赞的界面");
                    if(commnet_){
                        jsclick("id","midButton",true,2);
                    }else{
                        jsclick("id","rightButton",true,2);
                        back();
                        sleep(2000)
                        back();
                    }
                    break;
                case "com.sina.weibo.feed.DetailWeiboActivity":
                    log("评论的界面");
                    if(jsclick("text","评论",true,2)){
                    }else if(jsclick("text","同时转发",true,2)){
                        setText(0,"今天是个好天气");
                        sleep(2000);
                        jsclick("text","发送",true,2)
                        back();
                        sleep(2000)
                        back();
                    }
                    break;
                case "com.sina.weibo.feed.detail.composer.ComposerActivity":
                    log("准备评论");
                    if(jsclick("text","评论",true,2)){
                    }else if(jsclick("text","同时转发",true,2)){
                        setText(0,"今天是个好天气");
                        sleep(2000);
                        jsclick("text","发送",true,5);
                        back();
                        sleep(2000)
                        back();
                    }
                    break;
                default:
                    log("可能没有启动设置");
                    break;
            }
        }

        sleep(1000*2);
        Tips();
        time_line++
    }
}

function Tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["允许"]="text";
    textTips["保存"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    log('查询弹窗-end')
    return true
}

function moneyread(){
    var d = text("我的零钱").findOne(1000)
    if(d){
        var d = d.parent()
        if(d){
            var d= d.children()
            d.forEach(function(child,index){
                log(index,child.text());
            })
            log("------")
            for (var i=0;i<d.length;i++){
                log(i,d[i].text())
                if ( d[i].text() == "我的零钱"){
                    info.money = Number(d[i+1].text().replace("￥",""))
                    info.gold = Number(d[i+5].text())
                    break;
                }
            }
        }
    }
}

function homes(){
    thread = threads.start(function(){
        var times__ = 0
        //在新线程执行的代码
        while(times__ < 3){
            log("子线程");
            sleep(2000);
            var UII = currentActivity();
            log("UII",UII)
            switch(UII){
                case "com.sina.weibo.MainTabActivity":
                    click(72,1300)
                    sleep(2000)
                    break;
                default:
                    break;
            }
            // jsclick("desc","首页",true,2)
            sleep(2000);
            times__++;
        }
    });
}




// Tips()
// clearApp()

/*
清除app数据，无需root权限
备注:仅适用小米手机
@author：飞云
@packageName：包名
返回值：Boolean，是否执行成功
*/
function clearApp() {
    var appName = "星巴克"
    var packageName = "com.starbucks.cn"

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
                if (!openAppSetting(packageName)) {
                    log("找不到应用，请检查packageName")
                }
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
    if(x>0 && x < device.width && y > 0 && y < device.height){
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

// dm_login()
// dm_get_phone()
// dm_get_message()

















