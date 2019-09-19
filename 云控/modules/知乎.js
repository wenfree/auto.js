importClass(android.content.ContentResolver);
importClass(android.database.Cursor);
importClass(android.net.Uri);

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

function get_data() {
    try {
        log("----canshu"+db.taskParam());
        return JSON.parse(db.taskParam());
    } catch (error) {
        log("异常 " + error);
    }
}

//uri
function get_sms_by_time(name,timeline){
    var smsUri = "content://sms/inbox";
    function xxxx( body ,date){
        var sms_arr ={};
        var cursor=context.getContentResolver().query(Uri.parse(smsUri), ["body"], "body like ? and date > ?",["%"+body+"%",date], "date desc");
        if (cursor != null) {
            let i=0;
            while(cursor.moveToNext()){
                var sms_content = cursor.getString(cursor.getColumnIndex("body")); 
                console.log("短信", sms_content);
                sms_arr[i]=sms_content;
                i++
            }
        }
        if (sms_arr['0']){
            return sms_arr['0'];
        }
    } 
    if(!timeline){
        timeline = 0;
    }
    return xxxx(name,timeline);
}

//发流量工厂的广播
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

function sms_get_unmber(sms){
    var check_sms = sms.match(/\【知乎\】/)
    // log(check_sms)
    if(check_sms[0]== "【知乎】"){
        sms = sms.match(/\d{4,6}/)
        log(sms[0])
        return sms[0]
    }
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




/**
从应用商店下载APP,仅支持小米手机
@version  20190822
@author   飞云<283054503@qq.com> 
@param    appName 程序名
@param    is_update 是否更新
@return   Boolean 是否执行成功
*/

function download_market(app_name,is_update) {
    if (!is_update && getPackageName(app_name)) {
        log("该应用已安装,无需下载")
        return true;
    };
    let packageName = "com.xiaomi.market"
    let i = 0
    while (i < 50) {
        let activity = currentActivity()
        log("页面地址：" + activity)
        switch (activity) {
            case "com.xiaomi.market.ui.MarketTabActivity":
                log("页面:小米应用商店")
                //设置输入框焦点
                if(jsclick("desc", "搜索框",true,2)){ 
                    sleep(500)
                    setText(app_name);
                    sleep(2000)
                };
                break;
            case "com.xiaomi.market.ui.SearchActivityPhone":
                log("页面:搜索结果列表页")
                let object = className("Image").text(app_name).findOne(1000)   //寻找大图标
                if (object != null) {
                    log("已找到大图标")
                    let x = object.bounds().centerX()
                    let y = object.bounds().centerY()
                    if (x > 0 & y > 0) {
                        if (click(parseInt(x), parseInt(y))) {
                            log("进入详情页")
                        }
                    } else {
                        log("不在屏幕可视范围")
                    }

                } else {
                    log("没找到大图标")
                    let object = text(app_name).find();
                    if (!object.empty()) {
                        if (object.length > 1) {
                            if (object[1].click()) {
                                log("点击搜索结果列表项")
                            }
                        }
                    } else {
                        back();
                    }
                };
                break;
            case "com.android.providers.downloads.activity.SizeLimitActivity":
            case "com.xiaomi.market.ui.AppDetailActivityInner":
                log("页面:APP详情页")
                if (jsclick("text", "流量保护提醒",false,0)) {
                    if (jsclick("text", "立即下载",true,2)) {
                        toastLog("4G流量立即下载")
                    } else {
                        log("无法使用流量下载")
                    }
                } else if (jsclick("text", app_name,false,0)) {
                    let BtnObj = className("EditText").find()   //底部按钮
                    let BtnName = "", x = 0, y = 0
                    if (!BtnObj.empty()) {
                        if (BtnObj.length >= 1) {
                            BtnName = BtnObj[BtnObj.length - 1].text()   //按钮标题,并不是最顶层的标题
                            x = BtnObj[BtnObj.length - 1].bounds().centerX()
                            y = BtnObj[BtnObj.length - 1].bounds().centerY()
                            // log(x, y)
                        }
                    };
                    log("BtnName-2:" + BtnName);
                    if (BtnName == "安装" || BtnName == "继续") {
                        log("BtnName-1:" + BtnName)
                        if (x > 0 & y > 0) {
                            if (click(parseInt(x), parseInt(y))) {
                                toastLog(app_name + ":开始下载")
                            }
                        } else {
                            log("不在屏幕可视范围")
                        }
                    } else if (BtnName == "暂停") {
                        sleep(5000)
                        log("正在下载")
                    } else if (BtnName == "更新") {
                    } else if (BtnName == "安装中") {
                        sleep(5000)
                        log("正在安装")
                        //安装完成后,按钮的标题不是"打开",而是始终保持在"安装中".所以不能用按钮标题来判断下载/安装状态. 换一种方式,用取包名来判断.
                    } else if(BtnName == "打开"){
                        if(is_update){
                            toastLog(app_name + ":安装完毕");
                            back();
                            sleep(2000);
                            back();
                            sleep(2000);
                            return true
                        }
                    } else {
                        log("BtnName-2:" + BtnName)
                    };
                } else {
                    log("当前不是指定APP,不能执行下载")
                };

                break;
            case "com.miui.hybrid.VendorLauncherActivity$Launcher0":
                log("页面:弹出卡片")
                if (jsclick("text", "7天之内不再提醒",false,0)) {
                    jsclick("text", "取消",true,2)
                } else {
                    back();
                };
                break;
            case "com.xiaomi.market.ui.AppDetailActivityInner":
                log("页面:弹出广告")
                break;
            default:
                log("页面:other")
                app.launchPackage(packageName)  //打开小米应用商店
        }

        if (jsclick("text","声明与条款",false,0)) {
            //小米应用商店-首次打开
            jsclick("text","同意并免费使用",true,2)
        } else if (jsclick("text", "关闭",true,0)) {
            //弹窗广告
        }

        // 用取包名的方式,来判断是否安装完成
        if (!is_update && getPackageName(app_name)) {
            toastLog(app_name + ":安装完毕");
            back();
            sleep(2000);
            back();
            sleep(2000);
            return true
        };
        i++;
        sleep(1000)
    }
};

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



function reg(){
    var info_read_key = true
    var into_page_info = false
    var see_vidoe = 0
    var see_times = 0
    var install = true
    var sms_time = new Date().getTime();

    var time_line = 0
    while (time_line < 60 ) {
        
        var currenapp = currentPackage()
        if( currenapp == my_app.packageName ){
            var UI = currentActivity();
            log('UI',UI,time_line)
            switch(UI){
                case "com.zhihu.android.app.ui.activity.HostActivity":
                    log("知乎欢迎页");
                    if(jsclick("text","输入验证码",false,2)){
                        var sms_ = get_sms_by_time("知乎",sms_time-1*60*60*1000);
                        log(sms_);
                        if(sms_){
                            log("取到短信");
                            var sms_ = sms_get_unmber(sms_);
                            for(var i=0;i<sms_.length;i++){
                                // id("com.zhihu.android:id/passcode_input_"+(i+1)).findOne(200).setText(sms_.substring(i,i+1));
                                // jsclick("id","com.zhihu.android:id/passcode_input_"+(i+1),false,2);
                                var d = id("com.zhihu.android:id/passcode_input_"+(i+1)).findOne(200);
                                if(d){
                                   input(sms_.substring(i,i+1));
                                   sleep(100);
                                }
                            }
                        }
                    }else
                    if(jsclick("text","我同意",true,2)){
                    }else{
                        var d = id("cl_item_container").find();
                        if(d){
                            if(d.length > 10){
                                for (var i=0;i<d.length;i++){
                                    if(random(1,100) < 60){
                                        click__(d[i]);
                                    }
                                }
                            }
                        }
                        jsclick("id","txt_next_step",true,2);
                    }
                    break;
                case "com.zhihu.android.app.ui.activity.MainActivity":
                    log("知乎首页");
                    swipe(width*0.5,height*3/10,width*0.5,height*5/10,1500);
                    if(jsclick("id","wechat_login_btn",true,2)){
                    }else
                    if(jsclick("text","未登录",true,2)){
                    }else 
                    if( jsclick("text","我同意",true,2)){
                    }else if(jsclick("text","我的",true,2)){
                        if(jsclick("text","个人主页",false,2)){

                            var d = id("com.zhihu.android:id/name").findOne(200)
                            if(d){
                                info["nick_name"] = d.text();
                            }
                            var d = id("data_view").findOne(500);
                            if(d){
                                var dd = d.children();
                                log(dd.length)
                                for(var i=0;i<dd.length;i++){
                                    log(i,dd[i].text(),dd[i].id())
                                }
                                info["我的创作"]=dd[0].text();
                                info["关注"]=dd[2].text();
                                info["收藏"]=dd[4].text();
                                info["最近浏览"]=dd[6].text();
                            }
                            log(info);
                            app_info(my_app.name,info);
                            return true
                        }
                    }
                    break;
                case "com.zhihu.android.wxapi.WXEntryActivity":
                    log("绑定手机页面");
                    jsclick("text","请输入手机号码",true,2);
                    setText(0,"17160153581");
                    sleep(1000);
                    jsclick("text","发送验证码",true,2);
                    break;
                case "com.zhihu.android.app.ui.activity.SocialOauthActivity":
                    log("设置个人信息");
                    if(jsclick("text","设置个人信息",false,2)){
                        jsclick("text","进入",true,2)
                    }else if(jsclick("text","微信登录",true,2)){
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
        }else if(currenapp == "com.tencent.mm"){
            log("微信在前端");
            jsclick("text","同意",true,2);
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
    textTips["知道了"]="text";
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



log(currentPackage());
log(currentActivity());
log(device.width,device.height)

var my_app = {}
my_app.packageName = "com.zhihu.android";
my_app.name = "知乎";
var info = {}
info['model'] = my_app.name;
var width = 720;
var height = 1440;


if (download_market(my_app.name)){
    reg();
}










