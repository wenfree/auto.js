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
            click(res.bounds().centerX(),res.bounds().centerY());
            sleep(1000*n);
        }else{
            log("找到->",txt);
        }
        return true;
    }else{
        // log("没有找到->",txt)
    }
}

function nextPage(){
    if (random(1,100)> 50){
        log("滑动1次")
        swipe(device.width/2,device.height*4/5,device.width/2,device.height*2/7,random(1000,3000));
    }else{
        log("滑动2次")
        swipe(device.width/2,device.height*4/5,device.width/2,device.height*2/7,random(1000,3000));
        swipe(device.width/2,device.height*4/5,device.width/2,device.height*2/7,random(1000,3000));
    }
}

function newPage(){
    log("下拉刷新")
    swipe(device.width/2,device.height*1/5,device.width/2,device.height*4/5,random(1000,3000));
}

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
    var check_sms = sms.match(/\【点点新闻\】/)
    // log(check_sms)
    if(check_sms[0]== "【点点新闻】"){
        sms = sms.match(/\d{4,6}/)
        log(sms[0])
        return sms[0]
    }
}

function Tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["允许"]="text";
    textTips["好"]="text";
    textTips["确定"]="text";
    textTips["确定"]="desc";
    textTips["忽略"]="text";
    textTips["iv_close"]="id";
    textTips["一键登录"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    return true
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
            case "com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI":
                log('微信sdk界面');
                jsclick("text","确认登录",true,2);
                jsclick("text","同意",true,3);
                break;
            case "com.yingliang.clicknews.MainActivity":
                log('点点新闻主界面');
                if (jsclick("text","我的",true,2)){
                    var loginButton = textMatches("/登录.*注册/").findOne(1000);
                    if (loginButton){
                        click(loginButton.bounds().centerX(),loginButton.bounds().centerY());
                        sleep(1000);
                    }else if (jsclick("text","金币",false,2)){
                        var ids = idMatches("/.*/").find();
                        if (ids){
                            for (var i=0;i<ids.length;i++){
                                // log(i,ids[i].text(),ids[i].id())
                                if (ids[i].id() == 'com.yingliang.clicknews:id/tv_id'){
                                    info["gift"] = ids[i].text();
                                }else if(ids[i].id() == 'com.yingliang.clicknews:id/tv_gold'){
                                    info["gold"] = Number(ids[i].text());
                                }else if(ids[i].id() == 'com.yingliang.clicknews:id/tv_balance'){
                                    info["money"] = Number(ids[i].text());
                                    return true
                                }
                            }
                        }
                    }
                }else if(jsclick("text","绑定微信",true,2)){
                }else if(jsclick("text","微信登录",true,2)){
                }else if(jsclick("text","取消",true,2)){
                }else{
                    click(device.width/2,device.height/2)
                    sleep(2000);
                    back();
                    sleep(1000);
                    home();
                    sleep(2000);
                }
                break;
            case "com.yingliang.clicknews.module.login.LoginActivity":
                log('手机登录界面')
                if (jsclick("id","tv_login_wx",true,2)){
                }else
                if (jsclick("text","手机号",false,2)){
                    // var truePhone = "17775127804";
                    var truePhone = get_PhoneNumber();
                    if (truePhone){
                        setText(0,truePhone);
                    }
                }else if(jsclick("text","获取验证码",true,4)){
                }else if(jsclick("text","验证码",false,2)){
                    // var sms = "【点点新闻】验证码1666"
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
                }else if(jsclick("id","login_btn",true,5)){
                }else{
                    back();
                    sleep(1000*3)
                }
                break;
            case "com.yingliang.clicknews.activity.NewsActivity":
                log('文章页面')
                back();
                break;
            default:
                log("准备启动app");
                back();
                sleep(1000);
                home();
                sleep(2000);
                launchApp(app_name);
                sleep(1000*3);
                break;
        }
        Tips();
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
            case "com.yingliang.clicknews.MainActivity":
                if( jsclick("text","我的",false,2)&&jsclick("text","推荐",false,2) && jsclick("text","资讯",true,5)){
                    var titlett = className("TextView").find();
                    if (titlett){
                        for (var i=0;i<titlett.length;i++){
                            log(i,titlett[i].text(),titlett[i].text().length)
                            if (titlett[i].text().length >= 25 ){
                                click(titlett[i].bounds().centerX(),titlett[i].bounds().centerY())
                                check_look = true
                                look_timesKey = random(15,18)
                                look_times = 0
                                sleep(random(3000,5000))
                                look_news++
                                break;
                            }
                            sleep(50);
                        }
                    }
                    sleep(1000*3);
                }else if(jsclick("text","资讯",true,5)){
                }else{
                    back();
                }
            break;
            case "com.yingliang.clicknews.activity.NewsActivity":
                if( check_look ){
                    if(look_times < look_timesKey){
                        log("阅读文章","继续", look_timesKey-look_times );
                        var show = className("android.view.View").find()
                        if (show){
                            for (var i=0;i<show.length;i++){
                                if (show[i].text() == "热点内容 "){
                                    log(i,show[i].id(),show[i].text(),show[i].bounds().centerX(),show[i].bounds().centerY());
                                    if (show[i-5].text().length < 1){
                                        click(show[i-5].bounds().centerX(),show[i-5].bounds().centerY())
                                    }
                                    break;
                                }
                            }
                        }
                        jsclick("text","点击阅读全文",true,2)
                        jsclick("desc","点击阅读全文",true,2)
                        nextPage()
                        sleep(random(200,2000));
                        look_times++
                    }else{
                        log('单编文章,阅读超时');
                        back();
                    }
                }else{
                    log("非主动进入阅读,退出");
                    back();
                }
            break;
            default:
                back();
                sleep(1000);
                home();
                sleep(2000);
                launchApp(app_name);
                sleep(1000*5);
                break;
        }

        Tips()
        
        data_time_line++;
        sleep(1000); 
    }
    log("阅读完成 时间结束");
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

var apk_url = "img.wenfree.cn/apk/com.yingliang.clicknews.apk"
var app_name = "点点新闻";
var app_bid = "com.qtoutiao.newsapp"
var info={};


function main(){
    if ( launchApp(app_name) ){
        if (reg()){
            log(info)
            read()
            reg()
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
}



log(
    currentActivity()
)


main()
// reg()

// var title = textMatches("/.*/").find();

// if (title){
//     for (var i=0;i<title.length;i++){
//         log(i,title[i].text())
//     }
// }


// var title = idMatches("/.*/").find();

// if (title){
//     for (var i=0;i<title.length;i++){
//         log(i,title[i].text())
//         log(i,title[i].id())
//     }
// }



