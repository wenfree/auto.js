

function jsclick(way,txt,clickKey,n){
    if(!n){n=1}
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


function download(){
    // 先打开下载地址
    var urls_ = "http://www.jobi5.com/down+101.html?c=208104"
    app.openUrl(urls_)

    // 判断下载完成否
    var down_time_line = 0
    while (down_time_line < 120){
        log("查询一次")
        if (jsclick("text","确定",true,2)){
        }else if(jsclick("text","仅允许一次",true,2)){
        }else if(jsclick("text","安装",true,2)){
        }else if(jsclick("text","立即下载",true,2)){
        }else if(jsclick("text","打开",false,2)){
            return true
        }else{
            jsclick("text","允许",true,2)
            jsclick("text","授权",true,2)
        }
        down_time_line++
        sleep(1000)
    }
}


function reg(){
    var rhxc_App_bid = "com.lehai.ui"
    var get_sms_button = true

    var reg_times_line = 0
    while ( reg_times_line < 180 ){
        var UI = currentActivity();
        if (UI == "com.showself.ui.login.LoginListActivity"){
            jsclick("id","iv_login_list_phone_icon",true,2)
        }else if(UI == "com.showself.ui.PhoneRegActivity"){

            var truePhone = get_PhoneNumber();
            // var truePhone = "18128823268";
            if (truePhone){
                if (jsclick("text","请输入手机号",true,2)){
                    text("请输入手机号").findOne(1000).setText(truePhone)
                }else if(get_sms_button && jsclick("id","btn_reg_get_pin",true,1)){
                    get_sms_button = false;
                }else if(jsclick("text","请输入验证码",false,8)){
                    var sms = get_Sms();
                    // var sms = "1234"
                    function sms_get_unmber(sms){
                        // var sms = "【乐嗨】您好,您刚刚申请乐嗨手机帐号，验证码：368408，验证成功后，手机号将成为您的帐号。感谢您的使用"
                        var check_sms = sms.match(/\【乐嗨\】/)
                        log(check_sms)
                        if(check_sms[0]== "【乐嗨】"){
                            sms = sms.match(/\d{4,6}/)
                            log(sms[0])
                            return sms[0]
                        }
                    }
                    if (sms){
                        sms = sms_get_unmber(sms);
                        if (sms){
                            text("请输入验证码").findOne(1000).setText(sms)
                            sleep(1000*3)
                        }
                    }

                }else{
                    jsclick("id","btn_phone_reg",true,5)
                }
            }
        }else if(UI == "com.showself.ui.HomeActivity"){
            log("登录成功,进到首页")
            return true
        }else{
            launch(rhxc_App_bid);
            sleep(5000)
        }

        jsclick("text","允许",true,2)

        reg_times_line++
        sleep(2000)
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


if (download()){
    sleep(2000);
    log("安装成功");
    if ( reg() ){
        sendBroadcast("LeHaiTv",JSON.stringify({"reg":true}))
    }else{
        sendBroadcast("LeHaiTv",JSON.stringify({"reg":false}))
    }
}


// // var sms = "1234"
// var sms = "【乐嗨】您好,您刚刚申请乐嗨手机帐号，验证码：368408，验证成功后，手机号将成为您的帐号。感谢您的使用"
// function sms_get_unmber(sms){
//     // var sms = "【乐嗨】您好,您刚刚申请乐嗨手机帐号，验证码：368408，验证成功后，手机号将成为您的帐号。感谢您的使用"
//     var check_sms = sms.match(/\【乐嗨\】/)
//     log(check_sms)
//     if(check_sms[0]== "【乐嗨】"){
//         sms = sms.match(/\d{4,6}/)
//         // log(sms[0])
//         return sms[0]
//     }
// }
// sms = sms_get_unmber(sms);
// log(sms)