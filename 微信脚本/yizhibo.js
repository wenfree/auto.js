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


function download () {
    var url_s = "http://alidown.yizhibo.tv/android/mp/4.14.0/ws1/easylive-v4.14.0.apk";
    app.openUrl(url_s);
    var data_frequency = 0;
    while(data_frequency <= 180 ){
        if(jsclick("text","普通下载",true,2)){

        }else if(jsclick("text","安装",true,2)){
        
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


function main() {
    
    var get_sms_button = true;
    var get_password = true;

    var data_time_line = 0;
    while(data_time_line < 180){
        var UI = currentActivity()
        log("UI->",UI)
        switch(UI){
            case "com.yizhibo.video.activity.account.LoginActivity":
                jsclick("text","注册",true,2);
            break;
            case "com.yizhibo.video.activity.account.RegisterActivity":
                if (jsclick("text","手机号码",true,2)){
                    var truePhone = get_PhoneNumber();
                    // var truePhone = "17775127804";
                    if (truePhone){
                        text("手机号码").findOne(1000).setText(truePhone);
                    }
                }else if(jsclick("text","获取验证码",true,2)){
                }else if(get_password && jsclick("id","set_password_rl",false,1)){
                    setText(2,"AaDd112211")
                    get_password = false;
                }else if(jsclick("text","验证码",false,5)){
                    function sms_get_unmber(sms){
                        var check_sms = sms.match(/\【易直播\】/)
                        // log(check_sms)
                        if(check_sms[0]== "【易直播】"){
                            sms = sms.match(/\d{4,6}/)
                            log(sms[0])
                            return sms[0]
                        }
                    }
                    var sms = get_Sms();
                    // var sms = "【易直播】您的验证码是5881"
                    if (sms){
                        var sms_ = sms_get_unmber(sms);
                        if (sms_){
                            setText(1,sms_)
                            sleep(1000*2)
                        }
                    }
                }else{
                    jsclick("id","login_btn",true,5)
                }
            break;
            case "com.yizhibo.video.activity.UserInfoFirstActivity":
                if (jsclick("text","昵称:",false,1)){
                    setText(0,"llgc"+random(100,999));
                    var sex_arr = {
                        0:"user_info_sex_man",
                        1:"user_info_sex_woman"
                    }
                    var sex_key = random(0,1)
                    jsclick("id",sex_arr[sex_key],true,2)
                }
                jsclick("text","下一步",true,2)
            break;
            case "com.yizhibo.video.activity.UserInfoSecondActivity":
                jsclick("id","user_age_et",true,2)
                jsclick("text","确定",true,2)
                jsclick("text","下一步",true,2)
            break
            case "com.yizhibo.video.activity.UserInfoActivity":
                jsclick("id","user_info_portrait_iv",true,2)
                jsclick("text","拍照",true,5)
                jsclick("id","开始拍照",true,2)
                jsclick("id","v6_shutter_button_internal",true,10)
                jsclick("id","v6_btn_done",true,10)
                jsclick("id","应用",true,2)
                jsclick("id","wallpaper_apply",true,2)
                jsclick("text","完成",true,4)
            break
            case "com.yizhibo.video.activity.HomeTabActivity":
                log("注册成功")
                return true
            case "com.android.camera.Camera":
                jsclick("id","v6_shutter_button_internal",true,10)
                jsclick("id","v6_btn_done",true,10)
                jsclick("text","拍照",true,5)
                jsclick("id","应用",true,2)
            break;
            case "com.miui.gallery.app.CropImage":
                jsclick("id","v6_shutter_button_internal",true,10)
                jsclick("id","v6_btn_done",true,10)
                jsclick("text","拍照",true,5)
                jsclick("id","应用",true,2)
                jsclick("id","wallpaper_apply",true,2)
            break;
            default:
                launchApp("易直播");
                sleep(1000*5)
            break;
        }

        jsclick("text","允许",true,2)
        jsclick("text","好",true,2)
        jsclick("text","应用",true,2)
        jsclick("text","开始拍照",true,2)
        jsclick("id","wallpaper_apply",true,2)
        
        data_time_line++;
        sleep(1000); 
    }
}



function sendBroadcast(appName,data){
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


if ( download()){
    if (main()){
        sendBroadcast("YiTv",JSON.stringify({"reg":true,"password":"AaDd112211"}))
    }else{
        sendBroadcast("YiTv",JSON.stringify({"reg":false }))
    }
}














