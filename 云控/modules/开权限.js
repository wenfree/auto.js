
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

function uninstall_app(packageName) {
    let i = 0
    while (i < 50) {
        let activity = currentActivity()
        log(activity)
        switch (activity) {
            case "com.android.packageinstaller.UninstallerActivity":
                if(jsclick("text","未找到应用",false,0)){
                    click("确定");
                    return true;
                }
                click("确定");
                break;
            case "com.android.packageinstaller.UninstallAppProgress":
                click("立即清理");
                break;
            case "com.miui.optimizecenter.MainActivity":
                if(jsclick("id","button_clean",false,3))return true;
                break;
            default:
                log("页面:other")
                app.uninstall(packageName);
                sleep(3000);
        };
        i++;
        sleep(2000);
        jsclick("text","我知道了",true,2);
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

//下载apk
function download_lzy(urls){
    app.openUrl(urls);
    sleep(3000);
    let open_times = 0
    var install_key = 0
    while (open_times < 60){
        open_times++;
        let activity = currentActivity()
        log("activity",activity)
        switch (activity) {
            case "com.android.browser.BrowserActivity":
                var d = textMatches(/下载\( .*/).findOne(200);
                if (d){
                    click__(d);
                }else
                if(jsclick("text","立即下载",true,2)){
                }else if(jsclick("id","submit",true,2)){
                }else{
                    // back();
                }
                break;
            case "com.android.packageinstaller.PackageInstallerActivity":
                click("设置");
                if(install_key < 5){
                    if(jsclick("text","安装",true,5)) install_key++;
                }
                break;
            case "com.android.settings.Settings$ManageAppExternalSourcesActivity":
                if(jsclick("text","允许来自此来源的应用",true,3)) back();
                break;
            case "com.android.packageinstaller.InstallAppProgress":
                if(jsclick("text","完成",true,2)){
                    back();
                    sleep(2000);
                    back();
                    return true
                }
                break;
            default:
                log("页面:other")
                app.openUrl(urls);
                sleep(3000);
        };
        sleep(2000);
    }
}


// 正式开始编代码

log(currentPackage());
log(currentActivity());
log(device.width,device.height)
// var width = device.width;
var width = 720;
// var height = device.height;
var height = 1440;

var urls = "https://file.hiei.xin/com.flowplugin.apk"
// if(!launchApp("流量工厂插件")){
//     download_lzy();
// }

function open_my_phone(){
    app.startActivity({
        packageName: "com.android.settings",
        className: "com.android.settings.MiuiSettings",
    });
}


function opens(){

    var openkey = true
    var click_times = 0
    var opreationKey = false
    var kaifakey = false

    var open_times = 0
    
    while (open_times < 100){
        let activity = currentActivity()
        log("activity",activity)
        switch (activity) {
            case "com.android.settings.MiuiSettings":
                log("设置主页")
                if(openkey){
                    if(!jsclick("text","我的设备",true,2)){
                        swipe(width*0.5,height*3/10,width*0.5,height*8/10,1500);
                    }
                }else{
                    log("准备进入开发者");
                    if(!jsclick("text","更多设置",true,2)){
                        swipe(width*0.5,height*8/10,width*0.5,height*3/10,1500);
                    }else{
                        opreationKey = true
                    }
                }
                break;
            case "com.android.settings.SubSettings":
                if(openkey){
                    if(jsclick("text","硬件版本",false,1) && jsclick("text","MIUI 版本",true,1)){
                        click_times++
                        if( click_times> 8){
                            openkey = false;
                        }
                    }else
                    if(jsclick("text","全部参数",true,2)){
                        
                    }else{
                        back();
                    }
                }else if(opreationKey){
                    swipe(width*0.5,height*8/10,width*0.5,height*3/10,1500);
                    sleep(2000);
                    if(jsclick("text","开发者选项",true,2)){
                        opreationKey = false;
                        kaifakey = true;
                    }
                }else if(kaifakey){
                    var d = id("checkbox").find();
                    if(d){
                        var dd= d[2];
                        if(dd.checked()){
                            if(jsclick("text","开启开发者选项",true,2)){
                                back();
                                sleep(2000);
                                back();
                                return true;
                            }
                        }else
                        if(jsclick("text","直接进入系统",true,2)){}
                    }
                }else{
                    back();
                }
                break;
            default:
                open_my_phone();
                sleep(3000);
        };
        sleep(1000);
        open_times++;
    }
}

// openAppSetting("com.flow.factory")

function autoactive_(){
    sleep(1000);
    var d = id('am_switch').findOne(200);
    // log(d.checked())
    if(d){
        if (d.checked()){
            return false
        }else{
            d.click();
            return true
        }
    }
}

function battery_(){
    var d = text("省电策略").findOne(100);
    if(d){
        var dd = d.parent()
        if (dd){
            var ddd = dd.children()
            if(ddd){
                log(ddd[1].text())
                var txt = ddd[1].text()
                if( txt != "无限制"){
                    click__(ddd[1])
                    return true
                }else if(txt == "无限制"){
                    log('省电策略->无限制')
                    return false
                }
            }
        }
    }  
}

function install_(){
    var d = text("安装应用未知来源").findOne(100);
    if(d){
        var dd = d.parent()
        if (dd){
            var ddd = dd.children()
            if(ddd){
                log(ddd[1].text())
                var txt = ddd[1].text()
                if( txt == "不允许"){
                    click__(ddd[1])
                    return true
                }else if(txt == "允许"){
                    log('安装应用未知来源->允许')
                    return false
                }
            }
        }
    }
}

function management_(){
    var d = text("权限管理").findOne(100);
    if(d){
        var dd = d.parent()
        if (dd){
            var ddd = dd.children()
            if(ddd){
                log(ddd[1].text());
                var txt = ddd[1].text();
                if( txt.replace(/\D/g,"") >= 4 ){
                    log('权限管理->'+txt)
                    home();
                    return true;
                }else{
                    click__(ddd[1])
                }
            }
        }
    }
}


function main(){
    var autoactive = false;
    var battery = false;
    var install = true;
    var management = false;
    var other = 0
    var time_line = 0
    var last = true

    while (time_line < 90 ) {

        var UI = currentActivity();
        log('UI',UI)
        switch(UI){
            case "com.miui.appmanager.ApplicationsDetailsActivity":
                log("流量工厂设置主界面");
                swipe(width*0.5,height*8/10,width*0.5,height*3/10,1500);
                sleep(500);
                if (autoactive_()){
                }else if(battery_()){
                }else if( install && install_()){
                }else if(management_()){
                    return true
                }else{
                    last = true
                }
                break;
            case "com.miui.permcenter.permissions.PermissionsEditorActivity":
                log("权限设置界面");
                var d = id('action').find();
                if(d){
                    for (var i=0;i<d.length;i++){
                        var dd = d[i];
                        if(dd.desc() != "允许"){
                            click__(dd);
                            sleep(2000);
                            jsclick("text","允许",true,1)
                        }
                    }
                }
                swipe(width*0.5,height*8/10,width*0.5,height*3/10,1500);
                sleep(2000);
                var d = id('action').find();
                if(d){
                    for (var i=0;i<d.length;i++){
                        var dd = d[i];
                        if(dd.desc() != "允许"){
                            click__(dd);
                            sleep(2000);
                            jsclick("text","允许",true,1)
                        }
                    }
                }
                if(jsclick("text","后台弹出界面",false,2)){
                    if(last){
                        swipe(width*0.5,height*8/10,width*0.5,height*3/10,1500);
                        sleep(2000);
                        last = false
                    }else{
                        back();
                    }
                }
                break;
            case "com.android.settings.Settings$ManageAppExternalSourcesActivity":
                log("安装未知应用");
                sleep(2000);
                if(jsclick('text','允许来自此来源的应用',true,2)){
                    install = false
                }
                back();
                break;
            case "com.miui.powerkeeper.ui.HiddenAppsConfigActivity":
                log('省电限制');
                if(jsclick('text','无限制',true,2)){
                    back();
                }
                break;
            case "com.android.settings.Settings$NotificationFilterActivity":
                back();
                break;
            default:
                log("可能没有启动设置");
                other++
                if(other%5==0){
                    home();
                    sleep(1000*2);
                }
                openAppSetting("com.flow.factory.reboot");
                sleep(5000);
                break;
        }

        sleep(1000*0.5);
        tips();
        time_line++
    }
}

function tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["确定"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    return true
}
function tipss(){
    log("查询弹窗");
    var textTips = {}
    textTips["确定"]="text";
    textTips["允许"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    return true
}

function autocj(){
    var autocj_times = 0
    while (autocj_times < 20){
        let activity = currentActivity()
        log("activity",activity)
        switch (activity) {
            case "com.android.settings.Settings$AccessibilitySettingsActivity":
                jsclick("text","关闭 / 流量工厂插件",true,2)
                break;
            case "com.android.settings.SubSettings":
                if(jsclick("text","流量工厂插件",false,2)){
                    var d = id("checkbox").findOne(1000);
                    if(d){
                        if(d.checked()){
                            back();
                            sleep(1000);
                            back();
                            sleep(1000);
                            back();
                            sleep(1000);
                            return true;
                        }else{
                            click__(d);
                        }
                    }else{
                        back();
                    }
                }
                break;
            default:
                launch("com.flow.factory.reboot");
                sleep(3000);
        };
        sleep(1000);
        tipss();
        autocj_times++
    }
}

function sendBroadcast(appName){
    sleep(2000)
    var mapObject = {
            appName:appName,
        }
    app.sendBroadcast(
        {
            packageName: "com.flow.factory",
            className: "com.flow.factory.trafficfactory.broadcast.TaskBroadCast",
            extras:mapObject
        }   
    );
}

var info = {}
info["state"]="fail";
if(download_lzy(urls)) if(opens()) if(autocj()) if(main()) info["state"]="ok";
log(info);
sendBroadcast("插件权限",JSON.stringify(info));


// var d = id("checkbox").find();
// if(d){
//     var dd= d[2];
//     if(dd.checked()){
//         if(jsclick("text","开启开发者选项",true,2)){
//             back();
//             sleep(2000);
//             back();
//         }
//     }else                
//     if(jsclick("text","直接进入系统",true,2)){}
// }