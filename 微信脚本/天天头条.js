
function click_(x,y){
    if(x>0 && x < device.width && y > 0 && y < device.height){
        click(x,y)
    }else{
        log('坐标错误')
    }
}

function click__(obj){
    click(obj.bounds().centerX(),obj.bounds().centerY())
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
    sleep(random(1000,2500));
}

function newPage(){
    log("下拉刷新")
    swipe(device.width/2,device.height*1/5,device.width/2,device.height*3/7,random(1000,3000));
    sleep(random(1000,2500));
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
    var check_sms = sms.match(/\【天天头条\】/)
    // log(check_sms)
    if(check_sms[0]== "【天天头条验证码】"){
        sms = sms.match(/\d{4,6}/)
        log(sms[0])
        return sms[0]
    }
}

/////////////////////////////////////////////////////////


function Tips(){
    log("查询弹窗");
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

function other(){
    log('app可能未启动')
    back();
    sleep(1000);
    home();
    sleep(1000);
    launchApp(appName);
    sleep(1000*6)
}

function reg() {

    launchApp(appName);
    sleep(1000*6)
    var get_sms_button = true;
    var get_password = true;
    var tips_times = 0;
    var login = true
    var loginTimes = 0
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
            case "com.color365.headlines.ui.activity.ReuseActivity":
                log('登录注册界面')
                if(jsclick("text","登录",false,4) && jsclick("id","btn_register",false,4)){
                    if (login){
                        log("已经注册过帐号");
                        // var truePhone = get_PhoneNumber();
                        var truePhone = '17775127804';
                        setText(0,truePhone);
                        sleep(1000);
                        setText(1,"AaDd112211");
                        sleep(1000);
                        if (jsclick("id","btn_login",true,5)){
                            loginTimes++
                            if (loginTimes > 3){
                                login = false;
                            }
                        };
                        info["password"] = "AaDd112211";
                    }else{
                        jsclick("id","btn_register",true,4)
                    }
                }else if (jsclick("text","手机号",false,2)){
                    // var truePhone = "17775127804";
                    var truePhone = get_PhoneNumber();
                    if (truePhone){
                        setText(0,truePhone);
                        sleep(1000);
                        setText(2,"AaDd112211");
                        info["password"] = "AaDd112211";
                    }
                }else if(jsclick("text","获取验证码",true,4)){
                }else if(jsclick("text","请输入验证码",false,4)){
                    // var sms = "【"+app_name+"验证码】验证码743534"
                    var sms_ = get_Sms();
                    if (sms_){
                        var sms_ = sms_get_unmber(sms);
                        if (sms_){
                            setText(1,sms_);
                            sleep(1000*2);
                            // sleep(1000*30)
                        }
                    }else{
                        sleep(1000*5)
                    }
                }else if(jsclick("text","注册并领取红包",true,5)){
                }else{
                    back();
                }
                break;
            case "com.color365.headlines.ui.activity.MainActivity":
                if(jsclick("text","天天",true,2)){
                }else if (jsclick("text","赚钱",true,2)){
                    if (jsclick("id","user_id",false,2)){
                        var d = className("TextView").id("today_icon").findOne(2000);
                        if(d){
                            info["gold"] = Number(d.text().replace(/\D/g,""));
                            log(info["gold"]);
                        }
                        var d = className("TextView").id("user_money").findOne(2000);
                        if(d){
                            info["money"] = d.text().replace(/[\u4e00-\u9fa5]/g,"");
                            log(info["money"])
                            log("注册成功");
                            newsappinfoback();
                            return true
                        }
                    }
                }else if (jsclick("text","未登录",true,2)){
                }else{
                    back();
                }
                break;
            default:
                other()
                break;
        }

        Tips()

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
            case "com.color365.headlines.ui.activity.NewsActivity":
                if(look_times < look_timesKey ){
                    log("阅读文章","继续", look_timesKey-look_times );
                    jsclick("text","展开全文",true,2);
                    nextPage();
                    if (jsclick("text","发送",false,0)){
                        back();
                        sleep(1000);
                        back();
                        nextPage();
                    }
                    look_times++
                }else{
                    log("非主动进入阅读,退出");
                    back();
                }
                break;
            case "com.color365.headlines.ui.activity.MainActivity":
                if( jsclick("text","赚钱",false,2) && jsclick("text","推荐",true,1) && jsclick("text","头条",false,5)){
                    nextPage();
                    sleep(1000*8);
                    var title = id('news_title').find();
                    if (title){

                        for (var i=0;i<title.length;i++){
                            log(i,title[i].text(),title[i].id())
                        }

                        var rd = random(0,title.length);
                        click__(title[rd]);
                        check_look = true
                        look_timesKey = random(10,14)
                        look_times = 0
                        sleep(random(3000,5000))
                        look_news++
                    }
                }else if( text("头条").depth(9).findOne(500) ){
                    log('准备点击头条');
                    var d = text("头条").depth(9).findOne(500);
                    if (d){
                        click__(d);
                    }
                    sleep(2000);
                }else{
                    back();
                }
                break;
            case "com.color365.headlines.ui.activity.MainActivity":
                back();
                break;
            case "com.color365.headlines.ui.activity.ReuseActivity":
                back();
                break;
            default:
                other();
                break;
        }

        Tips()

        data_time_line++;
        sleep(1000); 
    }
    log("阅读完成");
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

var apkUrl = "img.wenfree.cn/apk/com.color365.tttt.apk"
var appName = "天天头条";
var appBid = "com.color365.tttt"
var info={};


function main(){
    if (launchApp(appName) ){
        if (reg()){
            log(info);
            read();
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


// if(!launchApp(app_name) ){
//     download(apk_url)
// }

log(
    currentActivity()
)

main();


var title = id('news_title').find();
if (title){
    for (var i=0;i<title.length;i++){
        log(i,title[i].text(),title[i].id())
    }
}
