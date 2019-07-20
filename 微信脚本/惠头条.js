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
    var check_sms = sms.match(/\【惠头条\】/)
    // log(check_sms)
    if(check_sms[0]== "【惠头条】"){
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
    textTips["继续赚钱"]="text";
    textTips["确定"]="desc";
    textTips["忽略"]="text";
    textTips["iv_close"]="id";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    return true
}


function reg() {

    launchApp(appName);
    sleep(1000*6)
    var get_sms_button = true;
    var get_password = true;
    var tips_times = 0;

    var data_time_line = 0;
    while(data_time_line < 180){
        var UI = currentActivity()
        log("UI->",UI)
        switch(UI){
            case "com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI":
                log('微信登录')
                jsclick("text","确认登录",true,2)
                jsclick("text","同意",true,3)
                break;
            case "com.cashtoutiao.common.ui.SplashActivity":

                jsclick("text","手机号一键登录",true,3)
                break;
            case "com.cashtoutiao.account.ui.LoginOneKeyActivity":
                log('填入手机号界面')
                if (jsclick("text","请输入11位手机号",false,2)){
                    var truePhone = "18128823268";
                    // var truePhone = get_PhoneNumber();
                    if (truePhone){
                        setText(0,truePhone);
                    }
                }else if(jsclick("text","获取短信验证码",true,4)){
                }else if(jsclick("text","绑定",true,4)){
                }
                break;
            case "com.cashtoutiao.account.ui.LoginActivity":
                jsclick("text","微信一键登录",true,2);
                // jsclick("text","手机号一键登录",true,3)
                break;
            case "com.cashtoutiao.mall.ui.activity.MarketActivity":
                log("兑换提现页面");
                var gold = id("tv_tips_gold_coin").findOne(500);
                if(gold){
                    info['gold']=Number(gold.text().replace(/\D/g,""));
                    log("注册成功 -ok");
                    newsappinfoback();
                    return true
                }
                break;
            case "com.cashtoutiao.account.ui.main.MainTabActivity":
                log('惠头条主界面')
                if (jsclick("text","我的",true,2)){
                    if (jsclick("text","未绑定手机",true,2)){
                    }else if (jsclick("text","兑换提现",false,2)){
                        if ( jsclick('text',"历史总金币",false,2) ){
                            var gift = id("tv_code").findOne(1000);
                            if (gift){
                                info["gift"]=gift.text().replace(/\D/g,"");
                            }
                            jsclick("text","兑换提现",true,3)
                        }
                    }
                }else{
                    back();
                    tips_times++;
                }
                break;
            case "com.cashtoutiao.account.ui.setting.MyAccountActivity":
                log('设置界面')
                var d = id("my_account_current_telephone").findOne(200)
                if (d){
                    if (d.text().length>5){
                        back();
                    }else{
                        jsclick("text","手机号",true,2)
                    }
                }
                break;
            case "com.cashtoutiao.account.ui.BoundPhoneActivity":
                log('填手机号界面')
                if (jsclick("text","请输入11位手机号",false,2)){
                    var truePhone = "18128823268";
                    // var truePhone = get_PhoneNumber();
                    if (truePhone){
                        setText(0,truePhone);
                    }
                }else if(jsclick("text","获取短信验证码",true,4)){
                }else if(jsclick("text","绑定",true,4)){
                }
                break;
            case "com.cashtoutiao.account.ui.VerificationCodeActivity":
                log('短信验证界面');
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
                log('设置密码界面')
                setText(0,"AaDd112211")
                sleep(2000)
                setText(1,"AaDd112211")
                sleep(2000);
                info['password']="AaDd112211";
                jsclick("text","确定",true,5)
                break;
            case "com.cashtoutiao.news.ui.NewsDetailActivity":
                back();
                break;
            default:
                log("app未启动");
                back();
                sleep(1000*3);
                home();
                sleep(1000*3);
                launchApp(appName);
                sleep(1000*5);
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
    log('开始阅读')

    var data_time_line = 0;
    while(data_time_line < 40){
        var UI = currentActivity()
        log("UI->",UI,"data_time_line->",data_time_line)
        switch(UI){
            case "com.cashtoutiao.account.ui.main.MainTabActivity":
                log('惠头条主页')
                if( jsclick("text","我的",false,2)&&jsclick("text","头条",false,2) && jsclick("text","刷新",true,5)){
                    var titlett = className("TextView").find();
                    var longtitle = 0
                    if (titlett){
                        for (var i=0;i<titlett.length;i++){
                            log(i,titlett[i].text(),titlett[i].text().length)
                            if (titlett[i].text().length >= 15 ){
                                longtitle++
                                if (longtitle>2){
                                    click(titlett[i].bounds().centerX(),titlett[i].bounds().centerY())
                                    check_look = true
                                    look_timesKey = random(15,18)
                                    look_times = 0
                                    sleep(1000*random(3,5))
                                    look_news++
                                    break;
                                }
                            }
                            sleep(50)
                        }
                    }
                    sleep(1000*3)
                }else if(jsclick("text","任务中心",false,5)){
                    log('任务中心');
                    if (device.model == 'Pixel XL'){
                        click(device.width*5/100,device.height*90/100);
                    }else{
                        click(device.width*5/100,device.height*97/100);
                    }
                }else{
                    back();
                }
                break;
            case "com.cashtoutiao.news.ui.NewsDetailActivity":
                log('文章页面')
                if( check_look  ){
                    if(look_times < look_timesKey){
                        log("阅读文章","继续", look_timesKey-look_times );
                        var d = textMatches(/展开全文.*/).findOne(200)
                        if (d){
                            click(d.bounds().centerX(),d.bounds().centerY())
                        }
                        if (jsclick('text','发送',false,2)){
                            back();
                            sleep(1000);
                        }
                        nextPage()
                        sleep(random(800,3000))
                        look_times++
                    }else{
                        log('阅读文章超时');
                        back();
                    }
                }else{
                    log("非主动进入阅读,退出")
                    back();
                }
                break;
            case "com.cashtoutiao.mall.ui.activity.MarketActivity":
                back();
                break;
            default:
                log("app未启动");
                back();
                sleep(1000*3);
                home();
                sleep(1000*3);
                launchApp(appName);
                sleep(1000*5);
                break;
        }

        Tips();

        data_time_line++;
        sleep(1000); 
    }
    log("阅读完成 - end");
    // home();
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

var apkUrl = "img.wenfree.cn/apk/com.cashtoutiao.apk"
var appName = "惠头条";
var appBid = "com.cashtoutiao";
var info={};

function main(){
    if (launchApp(appName) ){
        if (reg()){
            log(info)
            read()
            reg();
            sendBroadcast(appName,JSON.stringify(info))
        }else{
            sendBroadcast(appName,JSON.stringify(info))
        }
    }else if ( download(apkUrl) ){
        if (reg()){
            log(info)
            read()
            sendBroadcast(appName,JSON.stringify(info))
        }else{
            sendBroadcast(appName,JSON.stringify(info))
        }
    }
}

function newsappinfoback(){
    try{
        var url = "http://news.wenfree.cn/phalapi/public/";
        r = http.post(url, {
            "s": "App.Newsimeiapp.Imei",
            "imei": device.getIMEI(),
            "imei_tag": 'pixel xl',
            "app_name": appName,
            "app_data": JSON.stringify(info),
            "whos": 'ouwen000',
        });
        return r.body.string();
    }catch(err){
        toastLog(err);
    } 
}


log(
    currentActivity()
)

main()

// reg()


var title = textMatches(/.*/).find();
if (title){
    for (var i=0;i<title.length;i++){
        // log(i,title[i].text(),title[i].id())
    }
}


var d=text("头条").findOne(1000);
if (d){
    // log(d.bounds().centerX(),d.bounds().centerY())
}


// jsclick("text","头条",true,5)

// log(device.model)













