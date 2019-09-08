// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i,task_info, mainEngine) {
    log("task_info",task_info);
    log("id=>",task_info.id)
    
    var task_data = JSON.parse(task_info.task_data);
    task_dyid = task_data.userid
    task_nickname = task_data.nicename


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

var my_app = {}
my_app.packageName = "com.ss.android.ugc.aweme";
my_app.name = "抖音";
var info = {}
var width = 720;
var height = 1440;

var task_dyid = "1011723321";
var task_nickname = "希望之光网红店";

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
    task_dyid = data.dyid;
    task_nickname = data.nickname;
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

function callback_task(id,state){
    var url = "http://news.wenfree.cn/phalapi/public/";
    var arr = {};
    arr["id"] = id;
    arr["task_state"] = state;
    var postdata = {};
    postdata["s"]="App.Zllgcimeicallback.Callback_task"
    postdata["arr"] = JSON.stringify(arr)
    log(arr,postdata)
    log(jspost(url,postdata));
}

log(currentPackage());
log(currentActivity());
log(device.width,device.height)
// var d = id("ah1").findOne(1000);
// log(d.bounds().centerX(),d.bounds().centerY());

// info["state"] = "fail";
// if(main()) info["state"] ="ok";
// app_info("抖音包月",info);
// sendBroadcast(my_app.name, JSON.stringify(info));

function main(){
    var info_read_key = true
    var into_page_info = false
    var see_vidoe = 0
    var see_times = 0
    var install = true

    var time_line = 0
    while (time_line < 60 ) {
        
        var currenapp = currentPackage()
        if( currenapp == my_app.packageName ){
            var UI = currentActivity();
            log('UI',UI,time_line)
            switch(UI){
                case "com.ss.android.ugc.aweme.detail.ui.DetailActivity":
                    if(into_page_info){
                        if (see_vidoe < random(2,3)){
                            click(720/2,1440/2);
                            sleep(100);
                            click(720/2,1440/2);
                            sleep(100);
                            click(720/2,1440/2);
                            sleep(1000);
                            if(random(1,100)> 50){
                                see_vidoe++
                                swipe(device.width/2, device.height*0.8, device.width/2, device.height*0.2, random(200,2000) );
                                sleep(random(1000,3000));
                            }
                        }else{
                            if (see_times > 10){
                                back();
                                sleep(1000);
                                back();
                                sleep(1000);
                                back();
                                sleep(1000);
                                back();
                                sleep(1000);
                                back();
                                sleep(1000);
                                return true
                            } 
                        }
                        see_times++
                    }else{
                        back();
                    }
                    break;
                case "com.ss.android.ugc.aweme.profile.ui.UserProfileActivity":
                    log("被关注主页详情")
                    var d = descMatches("/点赞数.*/").find();
                    if(d){
                        for (var i=0;i<d.length;i++){
                            var dd = d[i]
                            log(dd.text())
                        }
                        click__(d[0]);
                        into_page_info = true
                    }else{
                        click_(38,1232);
                    }
                    break;
                case "com.ss.android.ugc.aweme.following.ui.FollowRelationTabActivity":
                    log('粉丝关注界面');
                    jsclick("text","搜索用户备注或昵称",true,3)
                    setText(0,task_dyid);
                    sleep(2000);
                    if( jsclick("text",task_nickname,true,2) ){
                        
                    }else{
                        log("没有关注博主");
                        follow();
                    }
                    break;
                case "com.ss.android.ugc.aweme.main.MainActivity":
                    log("抖音首页");
                    if( jsclick("text","我",true,2)){
                        if(jsclick("text","编辑资料",false,1)){
                            if(info_read_key && info_read()){
                                info_read_key = false;
                            }else{
                                jsclick("text","关注",true,2);
                            }
                        }else{
                            jsclick("text","我",true,2);
                        }
                    }else{
                        jsclick("text","首页",true,random(4,6))
                        var like_key = random(1,100);
                        if (like_key > 50){
                            var d = textMatches(/.*w/).findOne(1000);
                            if(d){
                                click__(d);
                                sleep(2000);
                            }
                        }
                        swipe(device.width/2, device.height*0.8, device.width/2, device.height*0.2, random(200,2000) );
                        sleep(random(1000,3000))
                    }
                    break;
                default:
                    log("可能没有启动设置");
                    back();
                    sleep(2000);
                    home();
                    sleep(2000);
                    break;
            }
        }else if(currenapp == "com.android.settings"){
            jsclick("text","允许来自此来源的应用",true,2);
            back();
        }else if(currenapp == "com.miui.packageinstaller"){
            log("安装app");
            if(jsclick("text","应用商店安装",true,2)){
            }else if(jsclick("text","设置",true,2)){
            }else{
                if(install && jsclick("text","安装",true,2) ){
                    install = false;
                }else{
                    jsclick("text","打开",true,2)
                }
            }
        }else{
            active(my_app.packageName,5)
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
    textTips["我知道了"]="text";
    textTips["保存"]="text";
    textTips["立即升级"]="text";
    textTips["取消"]="text";
    // textTips["设置"]="text";
    textTips["好的"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    log('查询弹窗-end')
    return true
}


function info_read(){
    var d = textMatches(/抖音号.*/).findOne(1000);
    if(d){
        info["username"]=d.text().replace('抖音号: ','');
        var d = d.parent().parent().parent();
        if (d) {
            var d = d.children()
            d.forEach(function (child, index) {
                log(index, child.text(),child.id());
            });
            info["nick_name"] = d[1].text();
        }
    }
    var d = text("获赞").findOne(1000);
    if(d){
        var d = d.parent().parent();
        if (d) {
            var d = d.children()
            d.forEach(function (child, index) {
                log(index, child.text(),child.id());
            });
            var dykeylist = []
            for (var i=0;i<d.length;i++){
                var dd = d[i].children()
                log(dd[1].text())
                var txt = dd[1].text()
                if (txt == "获赞"){
                    info["zan"] = dd[0].text()
                }else if(txt == "关注"){
                    info["follow"] = dd[0].text()
                }else if( txt == "粉丝"){
                    info["fen"] = dd[0].text()
                }
            }

            var d = id("text1").find()
            if(d){
                var dykeylist = ["作品","动态","喜欢"]
                for( var i=0;i<d.length;i++){
                    var dd = d[i];
                    info[dykeylist[i]]=dd.text().replace(/\D/g,"");
                    log(dd.text());
                }
            }

            log(info);
            return true
        }
    }
}


function follow(){
    
    var f_time_line = 0
    while (f_time_line < 30 ) {
        
        var currenapp = currentPackage()
        if( currenapp == my_app.packageName ){
            var UI = currentActivity();
            log('UI',UI,f_time_line)
            switch(UI){
                case "com.ss.android.ugc.aweme.discover.activity.SearchResultActivity":
                    if(jsclick("text",task_dyid,false,0)){
                        if(jsclick("text","关注",true,2)){
                        }else if(jsclick("text","已关注",false,2)){
                            back();
                            sleep(2000);
                            return true;
                        }else{
                            back();
                            sleep(2000);
                        }
                    }
                    break;
                case "com.ss.android.ugc.aweme.discover.ui.DiscoverActivity":
                    var d = className("EditText").findOne(1000);
                    if (d){
                        click__(d);
                        setText(0,task_dyid)
                        sleep(1000);
                        jsclick("text","搜索",true,2)
                    }
                    break;
                case "com.ss.android.ugc.aweme.main.MainActivity":
                    if(jsclick("text","推荐",false,0)){
                        click(56,102)
                    }else if(jsclick("text","首页",true,2)){
                    }else{
                        back();
                    }
                    break;
                default:
                    log("可能没有启动设置");
                    back();
                    sleep(2000);
                    break;
            }
        }else if(currenapp == "com.android.settings"){
            jsclick("text","允许来自此来源的应用",true,2);
            back();
        }else if(currenapp == "com.miui.packageinstaller"){
            log("安装app");
            if(jsclick("text","应用商店安装",true,2)){
            }else if(jsclick("text","设置",true,2)){
            }else{
                jsclick("text","安装",true,2);
            }
        }else{
            active(my_app.packageName,5)
        }

        sleep(1000*2);
        Tips();
        f_time_line++
    }

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
                    log("找不到应用，请检查packageName");
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
    key_xy[1]=[width*0.3,height*7/10]
    key_xy[2]=[width*0.5,height*7/10]
    key_xy[3]=[width*0.8,height*7/10]
    key_xy[4]=[width*0.3,height*7.5/10]
    key_xy[5]=[width*0.5,height*7.5/10]
    key_xy[6]=[width*0.8,height*7.5/10]
    key_xy[7]=[width*0.3,height*8/10]
    key_xy[8]=[width*0.5,height*8/10]
    key_xy[9]=[width*0.8,height*8/10]
    key_xy[0]=[width*0.5,height*9/10]
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