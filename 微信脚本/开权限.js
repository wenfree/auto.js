
log(currentPackage());
log(currentActivity());

// openAppSetting("com.flow.factory")

function autoactive_(){
    var d = id('am_switch').findOne(200);
    log(d.checked())
    if (d.checked()){
        return false
    }else{
        d.click();
        return true
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
                log(ddd[1].text())
                var txt = ddd[1].text()
                if( txt != "15项允许"){
                    click__(ddd[1])
                }else if(txt == "15项允许"){
                    log('权限管理->15项允许')
                    management = false;
                    home();
                    return true;
                }
            }
        }
    }
}



var my_app = {};
my_app.name = "流量工厂";
my_app.Package = "com.miui.securitycenter";

mian()

function mian(){
    var autoactive = true;
    var battery = true;
    var install = true;
    var management = true;
    var other = 0
    var time_line = 0


    while (time_line < 200 ) {

        var UI = currentActivity();
        log('UI',UI)
        switch(UI){
            case "com.miui.appmanager.ApplicationsDetailsActivity":
                log("流量工厂设置主界面");
                swipe(device.width*0.5,device.height*8/10,device.width*0.5,device.height*3/10,1500);
                sleep(500);

                if (autoactive_()){
                }else if(battery_()){
                }else if(install_()){
                }else if(management_()){
                    return true
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
                swipe(device.width*0.5,device.height*8/10,device.width*0.5,device.height*3/10,1500);
                sleep(2000);
                swipe(device.width*0.5,device.height*8/10,device.width*0.5,device.height*3/10,1500);
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
                if(jsclick("text","显示悬浮窗",false,2)){
                    back();
                }
                break;
            case "com.android.settings.Settings$ManageAppExternalSourcesActivity":
                log("安装未知应用")
                var d = id('widget_frame').findOne(200);
                if(d){
                    click__(d)
                    sleep(1000);
                    back();
                }else{
                    back();
                }
                break;
            case "com.miui.powerkeeper.ui.HiddenAppsConfigActivity":
                log('省电限制');
                if(jsclick('text','无限制',true,2)){
                    back();
                }
                break;
            default:
                log("可能没有启动设置");
                other++
                if(other%5==0){
                    home();
                    sleep(1000*2);
                }
                openAppSetting("com.flow.factory");
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


function sendBroadcast(appName,data){
    app.launchPackage( "com.flow.factory");
    sleep(2000)
    var mapObject = {
            appName:appName,
            data:data
        }
    app.sendBroadcast(
        {
            packageName: "com.flow.factory",
            className: "com.flow.factory.trafficfactory.broadcast.TaskBroadCast",
            extras:mapObject
        }   
    );
}






















