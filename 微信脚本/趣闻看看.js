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
    var check_sms = sms.match(/\【趣闻看看\】/)
    // log(check_sms)
    if(check_sms[0]== "【趣闻看看】"){
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
            case "com.ironman.zzxw.activity.LoginActivity":

                if (jsclick("text","请输入手机号",false,2)){
                    // var truePhone = "17775127804";
                    var truePhone = get_PhoneNumber();
                    if (truePhone){
                        setText(0,truePhone);
                    }
                }else if(jsclick("text","获取验证码",true,4)){
                }else if(jsclick("text","短信验证码",false,2)){

                    // var sms = "【趣闻看看】验证码1666"
                    var sms = get_Sms();
                    if (sms){
                        var sms_ = sms_get_unmber(sms);
                        if (sms_){
                            setText(1,sms_)
                            sleep(1000*2)
                            // sleep(1000*45)
                        }
                    }else{
                        sleep(1000*5)
                    }
                }else{
                    jsclick("id","btn_login_or_register_login_activity",true,5)
                }

            break;
            case "com.ironman.zzxw.activity.LoginGuideActivity":
                jsclick("text","注册/登录 领1-10元红包",true,3)
            break;
            case "com.ironman.zzxw.activity.HomeActivity":
                if (jsclick("text","我",true,2)){
                    if (jsclick("text","今日金币",false,2)){
                        var d = id("tv_today_coin_my_fragment").findOne(200)
                        if (d) {
                            var gold = d.getText()
                            info["gold"]=gold;
                            log( d.getText() )
                        }
                        var d = id("tv_total_coin_my_fragment").findOne(200)
                        if (d) {
                            var total = d.getText()
                            info["total"]=total;
                            log( d.getText() )
                        }
                        var d = id("tv_my_invite_code").findOne(200)
                        if (d) {
                            var gift = d.getText()
                            info["gift"]=gift;
                            log( d.getText() )
                        }
                        log("注册成功");
                        return true
                    }
                }else{
                    Back();
                    tips_times++;
                    if (tips_times > 10){
                        killApp(app_bid)
                        tips_times = 0;
                    }
                }
            break;
            default:
                log("预计有弹窗");
                launchApp(app_name);
                sleep(1000*3);
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
            case "com.ironman.zzxw.activity.HomeActivity":
                if( jsclick("text","我",false,2)&&jsclick("text","推荐",false,2) && jsclick("text","首页",false,5)){
                    Swipe(765,device.height*1/3,765,device.height*2/3)
                    sleep(1000*(3+random(1,3)));
                    var titlett = className("TextView").find();
                    if (titlett){
                        for (var i=0;i<titlett.length;i++){
                            log(i,titlett[i].text(),titlett[i].text().length)
                            if (titlett[i].text().length >= 25 ){
                                var news_mun = i
                                break;
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
                }else if(jsclick("text","首页",true,5)){
                }else{
                    Back();
                }
            break;
            case "com.ironman.zzxw.activity.NewsDetailActivity":
                log("阅读文章");
                if( check_look && look_times < look_timesKey ){
                    if(look_times < look_timesKey){
                        log("阅读文章","继续", look_timesKey-look_times );
                        jsclick("desc","展开全文 ",true,2);
                        jsclick("text","继续阅读",true,2);
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

var apk_url = "img.wenfree.cn/apk/com.ironman.zzxw.apk"
var app_name = "趣闻看看";
var app_bid = "com.ironman.zzxw"
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








