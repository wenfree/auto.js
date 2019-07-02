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

function download () {
    var url_s = "https://img.wenfree.cn/apk/jukandian.apk";
    app.openUrl(url_s);
    var data_frequency = 0;
    while(data_frequency <= 180 ){
        if(jsclick("text","普通下载",true,2)){
        }else if(jsclick("text","安装",true,2)){
        }else if(jsclick("text","确定",true,2)){
        }else if(jsclick("text","仅允许一次",true,2)){    
        }else if(jsclick("text","立即下载",true,2)){    
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
            case "com.xiangzi.jukandian.activity.MainActivity":
                if (jsclick("text","微信登录",true,2)){
                }else if(jsclick("text","未登录",true,2)){
                }else if(jsclick("text","我的",true,2)){
                    if (jsclick("text","今日金币",false,2)){
                        var d = id("goldValue").findOne(200)
                        if (d) {
                            var gold = d.getText()
                            info["gold"]=gold;
                            log( d.getText() )
                        }
                        var d = id("curValue").findOne(200)
                        if (d) {
                            var money = d.getText()
                            info["money"]=money;
                            log( d.getText() )
                        }
                        var d = id("mine_user_invite_code").findOne(200)
                        if (d) {
                            var gift = d.getText()
                            info["gift"]=gift;
                            log( d.getText() )
                        }
                        log("注册成功");
                        return true
                    }
                }else {
                    className("ImageView").click()
                }
            break;
            case "com.xiangzi.jukandian.activity.LoginActivity":
                if(jsclick("text","点击这里",true,2)){}
            break
            case "com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI":
                jsclick("text","同意",true,2)
                jsclick("text","确认登录",true,2)
            break;
            case "com.cmic.sso.sdk.activity.LoginAuthActivity":
                jsclick("text","一键验证",true,5)
            break;
            default:
                log("预计有弹窗");
                launchApp(app_name);
                sleep(1000*5);
                jsclick("text","一键登录",true,2);
                jsclick("text","关闭",true,2)
                Back();
            break;
        }

        // jsclick("text","一键登录",true,2);
        jsclick("text","允许",true,2)
        jsclick("text","好的",true,2)
        jsclick("text","提现到微信",true,5)

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
            case "com.xiangzi.jukandian.activity.MainActivity":
         
                if(jsclick("text","刷新",true,5) && jsclick("text","我的",false,2) && jsclick("text","推荐",false,1)){
                    // Swipe(765,device.height*2/3,765,device.height/3)
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
                }else if(jsclick("text","看点",true,5)){
                }else if(jsclick("text","继续赚钱",true,2)){
                }else {
                    log("other")
                    Back();
                }
            break;
            case "com.xiangzi.jukandian.activity.NativeArticalDetailActivity":
                log("阅读文章");
                if(check_look && look_times < look_timesKey && textMatches("/评论得金币/").findOne(200)){
                    if(look_times < look_timesKey){
                        log("阅读文章","继续", look_timesKey-look_times );
                        Swipe(device.width/2,device.height*2/3,device.width/2,device.height/3)
                        sleep(1000 * random(2,5))
                        jsclick("text","查看全文，奖励更多",true,2)
                        look_times++
                    }
                }else{
                    log("非主动进入阅读,退出")
                    Back()
                }
            break;
            default:
                log("弹窗")
                launchApp(app_name);
                sleep(1000*5)
                Back();
            break;
        }

        jsclick("text","允许",true,2)
        jsclick("text","好的",true,2)
        jsclick("text","关闭",true,2)
        jsclick("text","一键签到",true,2)

        
        data_time_line++;
        sleep(1000); 
    }
    log("阅读完成")
    killApp(app_bid)
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


var info={};
var app_name = "聚看点"
var app_bid = "com.xiangzi.jukandian"

if (launchApp(app_name) ){
    if (reg()){
        log(info)
        read()
        sendBroadcast(app_name,JSON.stringify(info))
    }else{
        sendBroadcast(app_name,JSON.stringify(info))
    }
}else if ( download() ){
    if (reg()){
        read()
        sendBroadcast(app_name,JSON.stringify(info))
    }else{
        sendBroadcast(app_name,JSON.stringify(info))
    }
}


log(
    currentActivity()
)



// jsclick("text","同意",false,2)
// read()
// jsclick("text","请输入验证码",true,2)











