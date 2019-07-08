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

function killApp(appbids){
    var text = "am force-stop " + appbids
    var result = shell(text, true);
    log(result);
}

function download(url_) {
    app.openUrl(url_);
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

function sms_get_unmber(sms){
    var check_sms = sms.match(/\【大众头条\】/)
    // log(check_sms)
    if(check_sms[0]== "【大众头条】"){
        sms = sms.match(/\d{4,6}/)
        log(sms[0])
        return sms[0]
    }
}


function reg() {

    launchApp(app_name);
    sleep(1000*6)
    var get_sms_button = true;
    var get_password = true;
    var tips_times = 0;
    // var app_bid = "com.ss.android.article.lite"

    var data_time_line = 0;
    while(data_time_line < 180){
        var UI = currentActivity()
        log("UI->",UI)
        switch(UI){
            case "com.build.dazhong.activity.account.App_LoginActivity":
                jsclick("id","chat_auth",true,3)
            break;
            case "com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI":
                jsclick("text","确认登录",true,2)
                jsclick("text","同意",true,3)
            case "com.news.hotheadlines.framwork.CoreActivity":
                if (jsclick("text","我的",true,2)){
                    var d = textMatches("/用户.*/").findOne(1000);
                    if (d && d.text().length == 10){
                        var d = className("ImageView").findOne()
                        if (d){
                            log(d)
                            Tap(d.bounds().centerX(),d.bounds().centerY())
                        }
                    }else if (jsclick("text","金币收入",false,2)){
                        var d = className("TextView").find();
                        for (var i=0;i<d.length;i++){
                            log(i,d[i].text())
                            sleep(50)
                            if (d[i].text() == "金币收入"){
                                info["gold"] = d[i-2].text();
                                info["money"] = d[i+2].text();
                                log("注册成功");
                                return true
                            }
                        }
                    }
                }else if(jsclick("text","绑定微信",true,2)){
                }else if(jsclick("text","微信登录",true,2)){
                }else if(jsclick("text","取消",true,2)){
                }else{
                    Back();
                    tips_times++;
                    if (tips_times > 10){
                        killApp(app_bid)
                        tips_times = 0;
                    }else if(tips_times%3 ==0){
                        Tap(device.width*1/2,device.height*5/10)
                        sleep(2000)
                    }    
                }
            break;
            default:
                log("预计有弹窗");
                launchApp(app_name);
                sleep(1000*3);
                jsclick("text","一键登录",true,2);
                tips_times++;
                if (tips_times > 10){
                    killApp(app_bid)
                    tips_times = 0;
                }else if(tips_times%3 ==0){
                    Tap(device.width*1/2,device.height*5/10)
                    sleep(2000)
                }   
                Back();
            break;
        }

        // jsclick("text","一键登录",true,2);
        jsclick("text","允许",true,2)
        jsclick("text","好",true,2)
        jsclick("text","确定",true,2)
        
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
            case "com.news.hotheadlines.framwork.CoreActivity":
                if( jsclick("text","我的",false,2)&&jsclick("text","推荐",false,2) && jsclick("text","刷新",true,5)){
                    // Swipe(765,device.height*1/3,765,device.height*2/3)
                    // sleep(1000*(3+random(1,3)));
                    Tap(device.width/2,device.height/2)
                    check_look = true
                    look_timesKey = random(15,25)
                    look_times = 0
                    sleep(1000*random(3,5))
                    look_news++
                    sleep(1000*3)
                }else if( check_look && look_times < look_timesKey ){
                    if(look_times < look_timesKey){
                        log("阅读文章","继续", look_timesKey-look_times );
                        jsclick("text","点击阅读全文",true,2);
                        Swipe(device.width/2,device.height*2/3,device.width/2,device.height/3)
                        sleep(1000 * random(2,5))
                        look_times++
                    }
                }else if(jsclick("text","头条",true,5)){
                }else{
                    Back();
                }
            break;
            default:
                launchApp(app_name);
                sleep(1000*5)
                /////////////////////////
                tips_times++;
                if (tips_times > 10){
                    killApp(app_bid)
                    tips_times = 0;
                }else if(tips_times%3 ==0){
                    Tap(device.width*1/2,device.height*5/10)
                    sleep(2000)
                }   
                ///////////////////////////
                Back();
            break;
        }

        jsclick("text","允许",true,2)
        jsclick("text","好",true,2)
        
        data_time_line++;
        sleep(1000); 
    }
    log("阅读完成");
    killApp(app_bid);
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

var apk_url = "https://img.wenfree.cn/apk/com.qtoutiao.newsapp.apk"
var app_name = "Q头条";
var app_bid = "com.qtoutiao.newsapp"
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
        log(info)
        read()
        sendBroadcast(app_name,JSON.stringify(info))
    }else{
        sendBroadcast(app_name,JSON.stringify(info))
    }
}




// log(
//     currentActivity()
// )


// reg()
// read()

// var d = textMatches("/用户.*/").findOne(1000);
// log(d.text().length)








