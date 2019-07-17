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
                    back();
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
            case "com.ss.android.article.base.feature.detail2.view.NewDetailActivity":
                log("判断错误")
                back();
                sleep(1000);
                home();
            break;
            default:
                back();
                sleep(1000);
                launch(app_bid);
                sleep(1000*5);
                jsclick("text","一键登录",true,2);
            break;
        }

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
                    if (random(1,100)> 50 ){
                        swipe(device.width/2,device.height*4/5,device.width/2,device.height*2/7,random(1200,2500));
                    }else{
                        swipe(device.width/2,device.height*4/5,device.width/2,device.height*2/7,random(1200,2500));
                        swipe(device.width/2,device.height*4/5,device.width/2,device.height*2/7,random(1200,2500));
                    }
                    sleep(1000*3);
                    var title = className("TextView").find();
                    if (title){
                        var title_times = 0
                        for (var i=0;i<title.length;i++){
                            log(i,title[i].text())
                            if (title[i].text().length > 15){
                                title_times++;
                                if (title_times>2){
                                    click(title[i].bounds().centerX(),title[i].bounds().centerY());
                                    check_look = true;
                                    look_times = 0;
                                    look_timesKey = random(15,25);
                                    sleep(1000*random(3,5));
                                    look_news++
                                    break;
                                }
                            }
                            sleep(50)
                        }
                    }
                    sleep(1000*3)
                }else if(jsclick("text","首页",true,5)){
                }else {
                    var d = className("ImageView").findOne(200)
                    if(d){
                        d.click()
                    }
                    back();
                }
            break;
            case "com.ss.android.article.base.feature.detail2.view.NewDetailActivity":
                log("阅读文章");
                if( check_look ){
                    if (look_times < look_timesKey){
                        if ( textMatches("/写评论.*/").findOne(200) ){
                            log("阅读文章","继续", look_timesKey-look_times );
                            if (random(1,100)> 50){
                                log("滑动1次")
                                swipe(device.width/2,device.height*4/5,device.width/2,device.height*2/7,random(1000,3000));
                            }else{
                                log("滑动2次")
                                swipe(device.width/2,device.height*4/5,device.width/2,device.height*2/7,random(1000,3000));
                                swipe(device.width/2,device.height*4/5,device.width/2,device.height*2/7,random(1000,3000));
                            }
                            sleep(random(200,2000));
                            if (jsclick("text","已显示全部评论",false,2)){
                                back();
                            }
                            look_times++;
                        }else{
                            log("不是文章,退出");
                            back();
                        }
                    }else{
                        log("阅读超时,退出");
                        back();
                    }
                }else{
                    log("非主动进入阅读,退出")
                    back()
                }
            break;
            case "com.ss.android.article.base.feature.detail2.view.NewVideoDetailActivity":
                log("播放视频");
                back();
            break;
            case "com.ss.android.wenda.answer.list.AnswerListActivity":
                log("问答");
                back();
            break;
            default:
                back();
                sleep(1000);
                launch(app_bid);
                sleep(1000*5);
            break;
        }

        jsclick("text","允许",true,2)
        jsclick("text","好",true,2)
        
        data_time_line++;
        sleep(1000); 
    }
    log("阅读完成,")
}

function money() {
    var money_times = 0;
    while(money_times < 60){
        var UI = currentActivity()
        log("UI->",UI)
        switch(UI){
            case "com.bytedance.polaris.browser.PolarisBrowserActivity":
                log("提现页面");
                if (jsclick("text","输入提现账号",false,2)){
                    sleep(1000*2)
                    setText(0,"文虹");
                    sleep(1000);
                    setText(1,"honghongdesign@gmail.com");
                    sleep(1000);
                    jsclick("text","确认提现",true,2)
                }else if(jsclick("desc","立即提现",true,2)){
                }else if(jsclick("text","立即提现",true,2)){
                }else if(jsclick("text","提现成功",false,2)){
                    info["cash"] = 0.1
                    return true;
                }else if( jsclick("text","明天可再次提现",false,2) || jsclick("desc","明天可再次提现",false,2) ){
                    back();
                    sleep(1000);
                    return false;
                }else{
                    if (jsclick("text",'提现',false,2) || jsclick("desc","马上邀请好友赚钱",false,2) ){
                        log("提现0.1");
                        click((507+934)/2,(934+1200)/2);
                        sleep(1000*3);
                    }else{
                        back();
                        sleep(1000);
                        home();
                    }
                }
                break;
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
                        // return true
                    }
                    if (!jsclick("text","提现兑换",true,5)){
                        back();
                        sleep(1000);
                        home();
                    }
                }else {
                    var d = className("ImageView").findOne(200)
                    if(d){
                        d.click()
                    }
                    back();
                }
                break;
            case "com.ss.android.article.base.feature.detail2.view.NewDetailActivity":
                log("判断错误");
                back();
                sleep(1000);
                home();
                break;
            default:
                back();
                sleep(1000);
                launch(app_bid);
                sleep(1000*5);
                break;
        }
        jsclick("text","允许",true,2);
        jsclick("text","好",true,2);
        money_times++;
        sleep(1000); 
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

function sms_get_unmber(sms){
    var check_sms = sms.match(/\【今日头条极速版\】/)
    log(check_sms)
    if(check_sms[0]== "【今日头条极速版】"){
        sms = sms.match(/\d{4,6}/)
        log(sms[0])
        return sms[0]
    }
}


var appName = "今日头条极速版";
var app_bid = "com.ss.android.article.lite";
var info={};

function main(){
    if (launchApp("今日头条极速版") ){
        if (reg()){
            log(info)
            log(JSON.stringify(info))
            read()
            reg()
            money()
            sendBroadcast("今日头条极速版",JSON.stringify(info))
        }else{
            sendBroadcast("今日头条极速版",JSON.stringify(info))
        }
    }else if ( download() ){
        if (reg()){
            sendBroadcast("今日头条极速版",JSON.stringify(info))
        }else{
            sendBroadcast("今日头条极速版",JSON.stringify(info))
        }
    }    
}

log(currentActivity())

var title = textMatches(/.*/).find();
if (title){
    for (var i=0;i<title.length;i++){
        log(i,title[i].text())
    }
}

// money()
main()











