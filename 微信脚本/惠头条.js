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
        }else if(jsclick("text","完成",true,2)){
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
    var check_sms = sms.match(/\【惠头条\】/)
    // log(check_sms)
    if(check_sms[0]== "【惠头条】"){
        sms = sms.match(/\d{4,6}/)
        log(sms[0])
        return sms[0]
    }
}


function reg() {

    // launchApp(app_name);
    launch(app_bid);
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
            case "com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI":
                jsclick("text","确认登录",true,2)
                jsclick("text","同意",true,3)
            break;
            case "com.cashtoutiao.common.ui.SplashActivity":
                jsclick("text","手机号一键登录",true,3)
            break;
            case "com.cashtoutiao.account.ui.LoginOneKeyActivity":
                if (jsclick("text","请输入11位手机号",false,2)){
                    var truePhone = "17775127804";
                    // var truePhone = get_PhoneNumber();
                    if (truePhone){
                        setText(0,truePhone);
                    }
                }else if(jsclick("text","获取短信验证码",true,4)){
                }else if(jsclick("text","绑定",true,4)){
                }
            break;
            case "com.cashtoutiao.account.ui.LoginActivity":
                jsclick("text","手机号一键登录",true,3)
            case "com.cashtoutiao.account.ui.main.MainTabActivity":
                if (jsclick("text","我的",true,2)){
                    if (jsclick("text","未绑定手机",true,2)){
                    }else if (jsclick("text","兑换提现",false,2)){
                        var d = className("TextView").find();
                        for (var i=0;i<d.length;i++){
                            log(i,d[i].text())
                            sleep(50)
                            if (d[i].text() == "历史总金币"){
                                info["gold"] = d[i+1].text();
                                info["gift"] = d[i-2].text();
                                log("注册成功");
                                return true
                            }
                        }
                    }
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
            case "com.cashtoutiao.account.ui.setting.MyAccountActivity":
                var d = id("my_account_current_telephone").findOne(200)
                if (d){
                    if (d.text().length>5){
                        Back();
                    }else{
                        jsclick("text","手机号",true,2)
                    }
                }
            break;
            case "com.cashtoutiao.account.ui.BoundPhoneActivity":
                if (jsclick("text","请输入11位手机号",false,2)){
                    var truePhone = "17775127804";
                    // var truePhone = get_PhoneNumber();
                    if (truePhone){
                        setText(0,truePhone);
                    }
                }else if(jsclick("text","获取短信验证码",true,4)){
                }else if(jsclick("text","绑定",true,4)){
                }
            break;
            case "com.cashtoutiao.account.ui.VerificationCodeActivity":
                var sms = "【惠头条】验证码743534"
                // var sms = get_Sms();
                if (sms){
                    var sms_ = sms_get_unmber(sms);
                    if (sms_){
                        for (var i=0;i<6;i++){
                            log(i,sms_.substring(i,i+1))
                            setText(i,sms_.substring(i,i+1))
                            sleep(500)
                        }
                        sleep(1000*2)
                        sleep(1000*45)
                    }
                }else{
                    sleep(1000*5)
                }
                break;
            case "com.cashtoutiao.account.ui.PasswordActivity":
                setText(0,"AaDd112211")
                sleep(2000)
                setText(1,"AaDd112211")
                sleep(2000)
                jsclick("text","确定",true,5)
            break;
            default:
                log("预计有弹窗");
                Back();
                sleep(2000)
                launch(app_bid);
                sleep(1000*6);
                tips_times++;
                if (tips_times > 10){
                    killApp(app_bid)
                    tips_times = 0;
                }else if(tips_times%3 ==0){
                    Tap(device.width*1/2,device.height*5/10)
                    sleep(2000)
                }   
                
            break;
        }

        // jsclick("text","一键登录",true,2);
        jsclick("text","允许",true,2)
        jsclick("text","好",true,2)

        jsclick("id","iv_close",true,2)
        jsclick("text","忽略",true,2)

        
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
    var tips_times = 0

    var data_time_line = 0;
    while(data_time_line < 40){
        var UI = currentActivity()
        log("UI->",UI,"data_time_line->",data_time_line)
        switch(UI){
            case "com.cashtoutiao.account.ui.main.MainTabActivity":
                if( jsclick("text","我的",false,2)&&jsclick("text","头条",false,2) && jsclick("text","刷新",true,5)){
                    var titlett = className("TextView").find();
                    var longtitle = 0
                    if (titlett){
                        for (var i=0;i<titlett.length;i++){
                            log(i,titlett[i].text(),titlett[i].text().length)
                            if (titlett[i].text().length >= 15 ){
                                longtitle++
                                if (longtitle>2){
                                    var news_mun = i
                                    break;
                                }
                            }
                            sleep(50)
                        }
                        Tap(titlett[news_mun].bounds().centerX(),titlett[news_mun].bounds().centerY())
                        check_look = true
                        look_timesKey = random(15,25)
                        look_times = 0
                        sleep(1000*random(3,5))
                        look_news++
                    }
                    sleep(1000*3)
                }else if(jsclick("text","头条",true,5)){
                    Tap(device.width*1/10,device.height*9.8/10)
                    sleep(2000)
                }else{
                    Back();
                }
            break;
            case "com.cashtoutiao.news.ui.NewsDetailActivity":
                if( check_look && look_times < look_timesKey ){
                    if(look_times < look_timesKey){
                        log("阅读文章","继续", look_timesKey-look_times );
                        jsclick("text","展开全文",true,2);
                        Swipe(device.width/2,device.height*2/3,device.width/2,device.height/3)
                        sleep(1000 * random(2,5))
                        look_times++
                    }
                }else{
                    log("非主动进入阅读,退出")
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
        jsclick("id","iv_close",true,2)
        jsclick("text","忽略",true,2)

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

var apk_url = "img.wenfree.cn/apk/com.cashtoutiao.apk"
var app_name = "惠头条";
var app_bid = "com.cashtoutiao";
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


// download(apk_url)

log(
    currentActivity()
)


// reg()
// read()

// var d = textMatches("/用户.*/").findOne(1000);
// log(d.text().length)

// var sms = "123456";
// for (var i=0;i<6;i++){
//     log(i,sms.substring(i,i+1))
//     sleep(100)
//     setText(i,sms.substring(i,i+1))
// }


var titlett = className("TextView").find();
var longtitle = 0
if (titlett){
    for (var i=0;i<titlett.length;i++){
        log(i,titlett[i].text(),titlett[i].text().length)
        sleep(50)
    }
}
