
function click_(x,y){
    if(x>0 && x < device.width && y > 0 && y < device.height){
        click(x,y)
    }else{
        log('坐标错误')
    }
}

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
    swipe(device.width/2,device.height*1/5,device.width/2,device.height*3/7,random(1000,3000));
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
    var check_sms = sms.match(/\【悦头条\】/)
    // log(check_sms)
    if(check_sms[0]== "【悦头条】"){
        sms = sms.match(/\d{4,6}/)
        log(sms[0])
        return sms[0]
    }
}

function Tips(){
    log("非正常页面");
    var textTips = {}
    textTips["允许"]="text";
    textTips["好"]="text";
    textTips["确定"]="text";
    textTips["继续赚钱"]="text";
    textTips["确定"]="desc";
    textTips["忽略"]="text";
    textTips["ll_quit"]="id";
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
                jsclick("text","确认登录",true,2);
                jsclick("text","同意",true,3);
            case "com.expflow.reading.activity.AdsDetailActivity":
                back();
                sleep(2000);
            case "com.expflow.reading.activity.MainActivity":
                if (jsclick("text","我的",true,2)){
                    if (jsclick("text","登录看资讯，随手赚零花",true,3)){
                        jsclick("text","微信登录",true,2)
                    }else if (jsclick("text","今日金币",false,2)){
                        var d = className("TextView").id("txt_totoal_gold").findOne(2000);
                        if(d){
                            info["gold"] = Number(d.text());
                            log(d.text())
                            log("注册成功");
                            return true
                        }
                    }
                }else{
                    back();
                    sleep(1000*2);
                    home();
                    sleep(1000*2);
                }
                break;
            case "com.expflow.reading.activity.LoginSmsActivity":
                if (jsclick("text","请输入手机号",false,2)){
                    // var truePhone = "17775127804";
                    var truePhone = get_PhoneNumber();
                    if (truePhone){
                        setText(0,truePhone);
                        sleep(2000)
                    }
                }else if(jsclick("text","获取验证码",true,4)){
                }else if(jsclick("text","请输入验证码",true,4)){
                    // var sms = "【悦头条】验证码743534"
                    var sms_ = get_Sms();
                    if (sms_){
                        var sms_ = sms_get_unmber(sms_);
                        if (sms_){
                            setText(1,sms_)
                            sleep(1000*2)
                            // sleep(1000*45)
                        }
                    }else{
                        sleep(1000*5)
                    }
                }else if(jsclick("text","登录领取红包",true,2)){
                }
                break;
            default:
                log("预计有弹窗");
                back();
                sleep(1000*3);
                home();
                sleep(1000*3);
                launchApp(app_name);
                sleep(1000*3);
                jsclick("text","一键登录",true,2);              
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
    var tips_times = 0

    var data_time_line = 0;
    while(data_time_line < 40){
        var UI = currentActivity()
        log("UI->",UI,"data_time_line->",data_time_line)
        switch(UI){
            case "com.expflow.reading.activity.MainActivity":
                log("悦头条首页")
                if( jsclick("text","我的",false,2) && jsclick("id","ll_tab",false,2) && jsclick("text","头条",true,5)){
                    var title = textMatches(/.*/).find();
                    if (title){
                        for (var i=0;i<title.length;i++){
                            if (title[i].text().length > 15 ){
                                log(i,title[i].text())
                                click(title[i].bounds().centerX(),title[i].bounds().centerY());
                                check_look = true
                                look_timesKey = random(15,25)
                                look_times = 0
                                sleep(1000*random(3,5))
                                look_news++
                                break;
                            }
                        }
                    }
                    sleep(1000*3)
                }else if(jsclick("text","头条",true,5)){
                    click(device.width*1/10,device.height*9.8/10)
                    sleep(2000)
                }else{
                    back();
                }
            break;
            case "com.expflow.reading.activity.AdsDetailActivity":
                back();
                sleep(2000)
            case "com.expflow.reading.activity.DetailNewsActivity":
                log("悦头条 文章页面")
                if( check_look ){
                    if(look_times < look_timesKey){
                        log("阅读文章","继续", look_timesKey-look_times );
                        jsclick("desc","点击阅读全文",true,2);
                        jsclick("text","点击阅读全文",true,2);
                        jsclick("text","取消分享",true,2);
                        nextPage();
                        sleep(random(200,2000))
                        look_times++
                    }else{
                        log("阅读超时");
                        back();
                    }
                }else{
                    log("非主动进入阅读,退出");
                    back();
                }
                break;
            default:
                back();
                sleep(1000*2);
                home();
                sleep(1000*2);
                launchApp(app_name);
                sleep(1000*6)
                break;
        }

        Tips();

        data_time_line++;
        sleep(1000); 
    }
    log("阅读完成-end");
    home();
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

var apk_url = "img.wenfree.cn/apk/com.expflow.reading.apk"
var app_name = "悦头条";
var app_bid = "com.expflow.reading"
var info={};

function main(){
    if (launchApp(app_name) ){
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
            reg()
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

var title = textMatches(/.*/).find();
if (title){
    for (var i=0;i<title.length;i++){
        log(i,title[i].text())
    }
}
