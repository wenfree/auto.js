// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    app.openUrl("https://img.wenfree.cn/apk/yuns.apk");
    sleep(1000*3)
    jsclick("text","确定",true,2)
    active("com.android.providers.downloads.ui",5)
    sleep(1000*60*60);
    
    mainEngine.emit("control", i);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
    clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
});


var my_app = {}
my_app.packageName = "com.android.providers.downloads.ui";
my_app.name = "发视频";
my_app.link = undefined

var thread = "";
var info = {}

function jspost(url,data){
    var res = http.post(url, data);
    var data = res.body.string();
    if(data){
        return data;
    }
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
    postdata["s"]="App.ZllgcAppInfo.App_info";
    postdata["imei"]= device.getIMEI();
    postdata["imei_tag"]= getStorageData(device.getIMEI(), "tag");;
    postdata["app_name"]= name;
    postdata["whos"]= "ouwen000";
    postdata["link"]= my_app.link;
    postdata["app_info"]= JSON.stringify(data);
    log(jspost(url,postdata));
}

function callback_task(id,state){
    var url = "http://api.wenfree.cn/public/";
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

function getDyUrl(){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr['s']= 'DyUrl.url'
    arr["imei_tag"]= getStorageData(device.getIMEI(), "tag");
    var res = jspost(url,arr);
    if (res){
        res =  JSON.parse(res)
        return res.data.url
    }
}
// main()

function downs_v(){

    var time_line = 0
    var clear_ = true
    while (time_line < 100 ) {
        
        var currenapp = currentPackage()
        if( currenapp == "com.android.providers.downloads.ui" ){
            var UI = currentActivity();
            log('UI',UI,time_line)
            switch(UI){
                case "com.android.providers.downloads.ui.DownloadList":
                    log("下载界面");
                    if ( clear_ && jsclick("text","清空",true,2)){
                       if( jsclick("id","custom",true,2) && jsclick("text","确定",true,8) ){
                        clear_ = false;
                       }
                    }else if(  jsclick("text","打开",false,2) ){
                        log("下载完成")
                        return true
                    }else if(jsclick("text","暂停",false,1)){
                        sleep(1000*2)
                    }else{
                        jsclick("desc","更多",true,2)
                        jsclick("text","新建下载",true,2)
                        jsclick("text","开始下载",true,2);
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
                jsclick("text","安装",true,2);
            }
        }else{
            active("com.android.providers.downloads.ui",5)
        }

        sleep(1000*1);
        Tips();
        time_line++
    }

}



function send(){
  
    var time_line = 0
    while (time_line < 100 ) {
        
        var currenapp = currentPackage()
        log("currenapp->"+currenapp)

        if( currenapp == "com.android.providers.downloads.ui" ){
            var UI = currentActivity();
            log('UI',UI,time_line)
            switch(UI){
                case "com.android.providers.downloads.ui.DownloadList":
                    log("下载界面");
                    if(  jsclick("text","打开",false,2) ){
                        log("下载完成")
                        var idicon = id("download_icon").findOne(200);
                        if (idicon){
                            press(idicon.bounds().centerX(), idicon.bounds().centerY(),3000)
                        }
                    }else if(jsclick("text","分享",true,2)){
                        jsclick("id","always_option",true,2)
                        jsclick("text","抖音短视频",true,2)
                    }else if(jsclick("text","抖音短视频",true,2)){
                    }else{
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
        }else if(currenapp == "com.ss.android.ugc.aweme"){

            var UI = currentActivity();
            log('UI',UI,time_line)
            switch(UI){
                case "com.ss.android.ugc.aweme.shortvideo.cut.VECutVideoActivity":
                    jsclick("text","下一步",true,2)
                    break;
                case "com.ss.android.ugc.aweme.shortvideo.edit.VEVideoPublishEditActivity":
                    jsclick("text","下一步",true,2)
                    break;
                case "com.ss.android.ugc.aweme.shortvideo.ui.VideoPublishActivity":
                    log("发布")
                    jsclick("desc","发布",true,2)
                    return true
                case "com.ss.android.ugc.aweme.main.MainActivity":
                    jsclick("text","我",true,2)
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
        }else if( currenapp == "android" ){
            jsclick("id","always_option",true,2)
            jsclick("text","抖音短视频",true,2)
        }else{
            active("com.android.providers.downloads.ui",5)
        }

        sleep(1000*1);
        Tips();
        time_line++
    }  
}




function Tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["暂不"]="text";
    textTips["允许"]="text";
    textTips["保存"]="text";
    textTips["立即升级"]="text";
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

// info_read()



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