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
        click(res.bounds().centerX(),res.bounds().centerY());
        // Tap(res.bounds().centerX(),res.bounds().centerY());
        sleep(1000*n);
    }
        return true;
    }else{
    log("没有找到->",txt)
    }
};


function download () {
    var url_s = "img.wenfree.cn/apk/jrttjsb.apk";
    app.openUrl(url_s);
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


function reg() {

    launchApp("今日头条极速版");
    sleep(1000*6)
    var get_sms_button = true;
    var get_password = true;
    var app_bid = "com.ss.android.article.lite"

    var data_time_line = 0;
    while(data_time_line < 180){
        var UI = currentActivity()
        log("UI->",UI)
        switch(UI){
            case "com.ss.android.article.lite.activity.MainActivity":
                if (jsclick("text","点击登录",true,2)){
                }else if(jsclick("text","登录领取32元红包",true,2) ){
                }else if(jsclick("text","未登录",true,2)){
                }else if(jsclick("text","我的",true,2)){
                    if (jsclick("text","提现兑换",false,2)){
                        var all_Info = className("TextView").find()
                        if (all_Info){
                            for (var i = 0;i<all_Info.length;i++){
                                log(i,all_Info[i].text())
                                if (all_Info[i].text() == "元"){
                                    var money = Number(all_Info[i-1].text())
                                    var gold = Number(all_Info[i+2].text())
                                    var gift = all_Info[i-3].text()
                                    log(money,gold,gift)
                                    info["money"]=money;
                                    info["gold"]=gold;
                                    info["gift"]=gift;
                                    break;
                                }
                            }
                        }
                        log("注册成功");
                        return true
                    }
                }else {
                    var d = className("ImageView").findOne(200)
                    if(d){
                        d.click()
                    }
                    Back();
                }
            break;
            case "com.ss.android.account.v2.view.AccountLoginActivity":
                if (jsclick("text","手机号",false,2)){
                    // var truePhone = "17775127804";
                    var truePhone = get_PhoneNumber();
                    if (truePhone){
                        text("手机号").findOne(1000).setText(truePhone);
                    }
                }else if(jsclick("text","获取验证码",true,2)){
                }else if(jsclick("text","请输入验证码",false,5)){
                    // var sms = "【今日头条极速版】验证码7435,用于手机登录,5分钟内有效.验证码提供给他人可能导致帐号被盗,请勿泄露,谨防被骗"
                    var sms = get_Sms();
                    if (sms){
                        var sms_ = sms_get_unmber(sms);
                        if (sms_){
                            setText(1,sms_)
                            sleep(1000*2)
                            sleep(1000*30)
                        }
                    }else{
                        sleep(1000*5)
                    }
                }else{
                    jsclick("text","进入头条",true,5)
                }
            break;
            default:
                launch(app_bid);
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

    var app_bid = "com.ss.android.article.lite"
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
            case "com.ss.android.article.lite.activity.MainActivity":
                if( call_back_key && jsclick("text","我的",true,2)){
                    if (jsclick("text","提现兑换",false,2)){
                        var all_Info = className("TextView").find()
                        if (all_Info){
                            for (var i = 0;i<all_Info.length;i++){
                                log(i,all_Info[i].text())
                                if (all_Info[i].text() == "元"){
                                    var money = all_Info[i-1].text()
                                    var gold = all_Info[i+2].text()
                                    var gift = all_Info[i-3].text()
                                    log(money,gold,gift)
                                    info["money"]=money;
                                    info["gold"]=gold;
                                    info["gift"]=gift;
                                    break;
                                }
                            }
                        }
                        log("阅读完成");
                        return true
                    }
                }else if(jsclick("text","首页",false,1)&& jsclick("text","我的",false,2)&&jsclick("text","推荐",true,5)){
                    // Swipe(765,device.height*2/3,765,device.height/3)
                    var titlett = className("TextView").find();
                    if (titlett){
                        for (var i=0;i<titlett.length;i++){
                            // log(i,titlett[i].text())
                            sleep(200)
                        }
                        var news_mun = random(28,titlett.length - 1)
                        var news_mun = 28
                        Tap(titlett[news_mun].bounds().centerX(),titlett[news_mun].bounds().centerY())
                        check_look = true
                        look_timesKey = random(15,25)
                        look_times = 0
                        sleep(1000*random(3,5))
                        look_news++
                    }
                    sleep(1000*3)
                }else if(jsclick("text","首页",true,5)){
                }else {
                    var d = className("ImageView").findOne(200)
                    if(d){
                        d.click()
                    }
                    Back();
                }
            break;
            case "com.ss.android.article.base.feature.detail2.view.NewDetailActivity":
                log("阅读文章");
                if(check_look && look_times < look_timesKey && textMatches("/写评论.*/").findOne(200)){
                    if(look_times < look_timesKey){
                        log("阅读文章","继续", look_timesKey-look_times );
                        Swipe(device.width/2,device.height*2/3,device.width/2,device.height/3)
                        sleep(1000 * random(2,5))
                        look_times++
                    }
                }else{
                    log("非主动进入阅读,退出")
                    Back()
                }
            break;
            default:
                launch(app_bid);
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
    var check_sms = sms.match(/\【今日头条极速版\】/)
    // log(check_sms)
    if(check_sms[0]== "【今日头条极速版】"){
        sms = sms.match(/\d{4,6}/)
        log(sms[0])
        return sms[0]
    }
}

var info={};

if (launchApp("今日头条极速版") ){
    if (reg()){
        log(info)
        log(JSON.stringify(info))
        read()
        sendBroadcast("今日头条极速版",JSON.stringify(info))
    }else{
        sendBroadcast("今日头条极速版",JSON.stringify(info))
    }
}else if ( download() ){
    if (reg()){
        read()
        sendBroadcast("今日头条极速版",JSON.stringify(info))
    }else{
        sendBroadcast("今日头条极速版",JSON.stringify(info))
    }
}
















