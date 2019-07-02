function jsclick(way,txt,clickKey,n){
    if(!n){n=1};
    var res = false;
    if(!clickKey){clickKey=false};
    if (way == "text"){
        res = text(txt).findOne(200);
    }else if(way == "id"){
        res = id(txt).findOne(200);
    }else if(way == "desc"){
        res = desc(txt).findOne(200);
    }
    if(res){
        log("找到->",txt)
    if (clickKey){
        log('准备点击->',txt);
        log("x:",res.bounds().centerX(),"y:",res.bounds().centerX());
        // click(txtddd.bounds().centerX(),txtddd.bounds().centerY());
        Tap(res.bounds().centerX(),res.bounds().centerY());
        sleep(1000*n);
    }
        return true;
    }else{
    log("没有找到->",txt)
    }
};


function download (url_s) {
    // var url_s = "img.wenfree.cn/apk/ttdd.apk";
    app.openUrl(url_s);
    var data_frequency = 0;
    while(data_frequency <= 180 ){
        if(jsclick("text","普通下载",true,2)){
        }else if(jsclick("text","安装",true,2)){
        }else if(jsclick("text","立即下载",true,2)){ 
        }else if(jsclick("text","确定",true,2)){
        }else if(jsclick("text","仅允许一次",true,2)){    
        }else if(jsclick("text","完成",false,2)){
            return true;
        }else{
            jsclick("text","允许",true,2);
            jsclick("text","授权",true,2);
        }
        data_frequency++;
        sleep(1000); 
    }
}

function remove_Sms(){
    var storage = storages.read();
    storage.remove("sms");
}
function get_PhoneNumber(){
    var storage = storages.read();
    return storage.get("phoneNumber");
}
function get_Sms(){
    try {
        var storage = storages.read();
        var res= storage.get("sms");
        if (res){
            remove_Sms();
            var content = res.content;
            return content;
        }
    } catch (error) {

    }
}


function reg() {

    

    launchApp(app_name);
    sleep(1000*6)
    var get_sms_button = true;
    var get_password = true;
    // var app_bid = "com.ss.android.article.lite"

    var data_time_line = 0;
    while(data_time_line < 180){
        var UI = currentActivity()
        log("UI->",UI)
        switch(UI){
            case "com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI":
                jsclick("text","确认登录",true,2)
                jsclick("text","同意",true,3)
            break;
            case "com.ttdd.contents.BrowserActivity":
                if(jsclick("text","未登录",true,2)){
                }else if(jsclick("text","手机号码：",true,2)){
                    if (jsclick("text","输入手机号",false,2)){
                        // var truePhone = "17775127804";
                        var truePhone = get_PhoneNumber();
                        if (truePhone){
                            text("输入手机号").findOne(1000).setText(truePhone);
                        }
                    }else if(jsclick("text","获取校验码",true,4)){
                    }else if(jsclick("text","输入校验码",false,2)){
    
                        // var sms = "【头条多多】验证码1666"
                        var sms = get_Sms();
                        if (sms){
                            var sms_ = sms_get_unmber(sms);
                            if (sms_){
                                setText(1,sms_)
                                sleep(1000*2)
                                // sleep(1000*30)
                            }
                        }else{
                            sleep(1000*5)
                        }
                    }else{
                        var d = text("登录").find()
                        if (d){
                            Tap(d[1].bounds().centerX(),d[1].bounds().centerY())
                            sleep(1000*5)
                        }
                    }
                }else if(jsclick("text","我的",false,2)){
                    if (jsclick("text","我的",true,2) && textMatches("/活力.*/").findOne(200)  ){
                        log("登录成功")
                        var all_Info = className("TextView").find()
                        if (all_Info){
                            for (var i = 0;i<all_Info.length;i++){
                                log(i,all_Info[i].text())
                                if (all_Info[i].text() == "金币"){
                                    var money = all_Info[i+1].text()
                                    var gold = all_Info[i-1].text()
                                    var gift = all_Info[i-4].text()
                                    log(money,gold,gift)
                                    info["money"]=money;
                                    info["gold"]=gold;
                                    info["gift"]=gift;
                                    log("注册成功");
                                    return true
                                }
                            }
                        }
                    }
                    var d = className("ImageView").findOne(200)
                    if (d){
                        d.click()
                    }

                }else {
                    log("预计有弹窗")
                    var d = className("ImageView").findOne(200)
                    if (d){
                        d.click()
                    }
                    Back();
                }
            break;
            default:
                log("预计有弹窗");
                launchApp(app_name);
                sleep(1000*5);
                jsclick("text","一键登录",true,2);
                Back();
            break;
        }

        // jsclick("text","一键登录",true,2);
        jsclick("text","允许",true,2)
        jsclick("text","好",true,2)
        
        data_time_line++;
        sleep(1000); 
    }
}


function read(){

    var loginKey = true
    var call_back_key = false
    var check_look = false
    var look_timesKey = 0
    var look_times = 0
    var look_news = 0
    var zan = true

    var data_time_line = 0;
    while(data_time_line < 40){
        var UI = currentActivity()
        log("UI->",UI,"data_time_line->",data_time_line)
        switch(UI){
            case "com.ttdd.contents.BrowserActivity":
                if( jsclick("text","50金币",false,2) ){
                    log("阅读文章");
                    if( check_look && look_times < look_timesKey ){
                        if( look_times < look_timesKey ){
                            log("阅读文章","继续", look_timesKey-look_times );
                            Swipe(device.width/2,device.height*2/3,device.width/2,device.height/3)
                            sleep(1000 * random(1,2))
                            look_times++
                        }
                    }else{
                        log("非主动进入阅读,退出")
                        Back()
                    }

                }else if( jsclick("text","我的",false,2)&&jsclick("text","推荐",false,2) && jsclick("text","首页",true,5)){
                    log("首页")
                    // Swipe(765,device.height*2/3,765,device.height/3)
                    // sleep(1000*3)
                    var titlett = className("TextView").find();
                    if (titlett){
                        for (var i=0;i<titlett.length;i++){
                            log(i,titlett[i].text())
                            // sleep(200)
                        }
                        var news_mun = 9
                        if (titlett[news_mun].text() != '' && titlett[news_mun].text() != "广告" && titlett[news_mun].text() != "首页" ){
                            Tap(titlett[news_mun].bounds().centerX(),titlett[news_mun].bounds().centerY())
                            check_look = true
                            look_timesKey = random(15,25)
                            look_times = 0
                            sleep(1000*random(3,5))
                            look_news++
                        }
                    }
                    sleep(1000*3)
                }else {
                    jsclick("text","首页",true,5)
                    var d = className("ImageView").findOne(200)
                    if (d){
                        d.click()
                    }
                    Back();
                }
            break;
            default:
                launchApp(app_name);
                sleep(1000*5)
                Back();
            break;
        }

        jsclick("text","允许",true,2)
        jsclick("text","好",true,2)
        
        data_time_line++;
        sleep(1000); 
    }
    log("阅读完成")
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

function sms_get_unmber(sms){
    var check_sms = sms.match(/\【头条多多\】/)
    // log(check_sms)
    if(check_sms[0]== "【头条多多】"){
        sms = sms.match(/\d{4,6}/)
        log(sms[0])
        return sms[0]
    }
}

var apk_url = "img.wenfree.cn/com.lite.infoflow.apk";
var app_name = "头条多多";
var app_bid = "com.lite.infoflow";
var info={};

if (launchApp(app_name) ){
    if (reg()){
        log(info)
        read()
        sendBroadcast(app_name,JSON.stringify(info))
    }else{
        sendBroadcast(app_name,JSON.stringify(info))
    }
}else if ( download(apk_url) ){
    if (reg()){
        read()
        sendBroadcast(app_name,JSON.stringify(info))
    }else{
        sendBroadcast(app_name,JSON.stringify(info))
    }
}






// if (jsclick("text","输入手机号",false,2)){
//     var truePhone = "17775127804";
//     // var truePhone = get_PhoneNumber();
//     if (truePhone){
//         text("输入手机号").findOne(1000).setText(truePhone);
//     }
// }


// reg()







