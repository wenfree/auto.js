



let a = require("auto-sp");
let wechat_txt = require("Wechat_text");


// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: meizz
    var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) 
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    for(var k in o)
    if(new RegExp("("+ k +")").test(fmt)) 
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
    return fmt; 
};

function replay(){
    if (a.jsclick("id","amh",true,1)){
        log('找到,编辑')
        a.input_( wechat_txt.rdreplay(random(2,5)) );
        sleep(1000*2)
        if (a.jsclick('text','发送',true,1)){
            sleep(1000 * random(3,5))
            sleep(1000);
        }
    }
    back_bottom();
}

function wechat_send(){
    var ret = false
    if (a.jsclick("id","amh",true,1)){
        log('找到,编辑')
        var replayText = wechat_txt.rdreplay(random(2,10))
        a.input_( replayText );
        sleep(1000*2)
        if (a.jsclick('text','发送',true,1)){
            sleep(1000 * random(3,5))
            sleep(1000);
            ret = true
        }
    }
    back_bottom();
    return ret
}

var message_lun = 0
function news_message(){
    message_lun++
    if (message_lun%2 == 0 ){
        return a.jsclick('id','nf',true,3) 
    }else{
        return a.jsclick('id','mv',true,3)
    }
}

function back_bottom(){
    log('search back');
    if (a.jsclick('id',"kx",true,2)){
        // 小米6 腾讯新闻后退
    }else if(a.jsclick('id','km',true,2)){
        //小米6后退
    }else if(a.jsclick('id','k1',true,2)){
        // google 后退
    }else if(a.jsclick('id','kb',true,2)){
        // google 新闻后退
    }else if(a.jsclick('text','我知道了',true,2)){
        // 弹出来我知道的了提示
    }else if(a.jsclick('text','允许',true,2)){
        // 允许
    }else{
        log('没有后退');
        return true
    }
}

function upscreen(){
    var ra = new RootAutomator();
    var move_x = (device.width)/2 + random(-50,50)
    var move_y = (device.height)/2
    ra.swipe( move_x,move_y,move_x,move_y - 300, 2000)
}

function look_news_photo(){
    var send_news_times = 0
    var look_news_times = 0
    while (send_news_times < 30){
        var wechat_res = currentActivity()
        log(currentActivity());
        if (wechat_res == "com.tencent.mm.ui.LauncherUI"){
            if (a.jsclick("text","腾讯新闻",true,3)){}
        }else if(wechat_res == "com.tencent.mm.plugin.readerapp.ui.ReaderAppUI"){
            Tap(random(200,800),random(400,800))
        }else if(wechat_res == "com.tencent.mm.plugin.webview.ui.tools.WebViewUI"){
            upscreen()
            look_news_times = look_news_times + 1
            if (look_news_times > 5){
                log("准备分享")
                var share = className("android.support.v7.widget.LinearLayoutCompat").findOne(200)
                if (share){
                    Tap(share.bounds().centerX(),share.bounds().centerY())
                }else{
                    a.jsclick("text","分享到朋友圈",true,5)
                }
            }
        }else if(wechat_res == "com.tencent.mm.plugin.sns.ui.SnsUploadUI"){
            //准备发表到朋友圈
            if (a.jsclick("text","发表",true,5)){
                return true
            }
        }
        sleep(1000*2)
        send_news_times++
    }
    log("发腾讯新闻超时")
    return false
}

// 读微信信息
function readInfo(){
    var timeLine = 0
    var outTimes = 50
    while ( timeLine < outTimes ){
        if ( a.jsclick("text","设置",false,1) && a.jsclick("text","我",false,1) ){
            log('我的界面');
            var nikename = id('dcf').findOne(200).text()
            log(nikename)
            return nikename;
        }else if(a.jsclick("text","我",true,1)){
        }else{
            back_bottom();
        }
        sleep(1000);
        timeLine++
    }
}

// 添加通讯录好友
function addfriends(){
    var timeLine = 0
    var outTimes = 20
    var sendKey = false

    while ( timeLine < outTimes ){
        if ( a.jsclick("text","通讯录",true,1) && a.jsclick("text","新的朋友",false,1) ){
            log('通讯录界面');
            a.jsclick("text","新的朋友",true,1)
        }else if( a.jsclick('text',"手机联系人",true,5) ){
        }else if( sendKey && a.jsclick('text',"发送",true,3) ){
        }else if( a.jsclick('text',"查看手机通讯录",false,2) ){
            log('查看手机通讯录')
            var uc = className("TextView").find();
            for(var i = 0; i < uc.length; i++){
                var tv = uc[i];
                if (wechatInfo['addTimes'] < wechatInfo['addmunber']){
                    if(tv.text() == "添加"){
                        log(tv.text());
                        click(tv.bounds().centerX(),tv.bounds().centerY());
                        sleep(1000*3)
                        if ( className("EditText").findOne(1000)) {
                            className("EditText").findOne(1000).setText(arrRadom(sendText))
                            a.jsclick('text',"发送",true,3)
                            back_bottom();
                        }
                        wechatInfo['addTimes']++
                    }else{
                        log(tv.text() )
                    }
                }else{
                    wechatInfo['addKey'] = false;
                    return true
                }
            }
        }else if( a.jsclick("text","新的朋友",false,1) &&  a.jsclick("text","添加朋友",false,1)  ){
            a.jsclick("text","添加朋友",true,2)
        }else{
           if( back_bottom() ){
            a.jsclick("text","允许",true,2)
           }
        }
        sleep(1000);
        timeLine++
    }
}

// 发朋友圈
function addphoto(){
    var timeLine = 0
    var outTimes = 50
    var sendKey = false
    while ( timeLine < outTimes ){
        if ( a.jsclick("text","发现",true,1) && a.jsclick("text","朋友圈",false,1) ){
            log('朋友圈界面');
            a.jsclick("text","朋友圈",true,1)
        }else if(  a.jsclick('text',"发表",false,2) ){
            className("EditText").findOne(1000).setText(arrRadom(photoText))
            sleep(random(1000,2000))
            if (a.jsclick('text',"发表",true,random(5,15))){
                sendKey = true
            }
        }else if(  a.jsclick('text',"从相册选择",true,2) ){
        }else if(  a.jsclick('text',"图片和视频",false,2) ){
            var uc = id("bou").find();
            var maxLength = 8
            if (uc.length > maxLength){
                maxLength = 8
            }else{
                maxLength = uc.length
            }
            for(var i = 0; i < maxLength; i++){
                var tv = uc[i];
                log(tv.click())
                sleep(random(1000,2000))
            }
            textMatches("/完成.*/").findOne(200).click()
            sleep(random(3000,5000))
        }else if( descMatches("/.*我的头像,再点一次可以进入我的相册/").findOne(200) && className('android.support.v7.widget.LinearLayoutCompat').findOne(200) ){
            log('有相机按钮')
            if (sendKey ){
                wechatInfo['addphotoKey'] = false
                return true
            }
            var crarra = className('android.support.v7.widget.LinearLayoutCompat').findOne(200)
            if (crarra){
                // click(crarra.bounds().centerX(),crarra.bounds().centerY())
                Tap(crarra.bounds().centerX(),crarra.bounds().centerY())
                sleep(1000)
            }
        }else{
           if( back_bottom() ){
            a.jsclick("text","允许",true,2)
           }
        }
        sleep(1000);
        timeLine++
    }
}





toast("wen");
var wechat_record_file_path = "/sdcard/Download/LLGC/wechat_recode.txt";
var wechat_config = Array();

function wechat_config_init(){
    if(files.exists(wechat_record_file_path)){
        var data = files.read(wechat_record_file_path);
        log("记录文件存在");
        log(data);
        wechat_config = JSON.parse(data)
    }else{
        files.ensureDir(wechat_record_file_path);
        log("文件不存在,创建一个新的")
        var text = {
            "date":(new Date()).Format("yyyy-M-d"),
            "look_news":0,
            "weektimes":7,
            "sleeptimes":23,
            "sendphoto":0,
            "addfriends":0
            } 
        text = JSON.stringify(text);
        log(text);
        //写入文件
        files.write(wechat_record_file_path, text);
        wechat_config = {
            "date":(new Date()).Format("yyyy-M-d"),
            "look_news":0,
            "weektimes":7,
            "sleeptimes":23,
            "sendphoto":0,
            "addfriends":0
        }
        log(wechat_config);
    }
}
function wechat_config_save(){
    if(files.exists(wechat_record_file_path)){
        log("记录文件存在");
        var text = JSON.stringify(wechat_config);
        log(text);
        //写入文件
        files.write(wechat_record_file_path, text);
    }
}

wechat_config_init()
var Home_Time_Line = Math.round(new Date())
function Fwechat(){
    
    var Task_Day = new Date()
    var Task_hour = Task_Day.getHours()
    var Task_minutes = Task_Day.getMinutes()
    var weChat_times = 0
    var send_one = false;
    
    // wechat_config_init();
    // if (wechat_config.date != (new Date()).Format("yyyy-M-d") ){
    //     wechat_config.date = (new Date()).Format("yyyy-M-d");
    //     wechat_config.look_news = 0;
    //     wechat_config_save();
    // }

    if ( Task_hour >= wechat_config.weektimes &&  Task_hour <= wechat_config.sleeptimes ){
        //微信小时数成立
        // while ( weChat_times < 50){
            log("weChat_times-->",weChat_times);
            var wechatBid = "com.tencent.mm"
            if ( currentActivity().search(wechatBid) == 0 ){
                // 微信在前端
                if (a.jsclick('text','我',false,1) && a.jsclick('text','微信',true,1) ){
                    // 微信首页
                    log("微信首页");
                    if ( wechat_config.look_news <= 0 ){
                       if( look_news_photo() ){ wechat_config.look_news = 1; wechat_config_save(); task_back() }
                    // }else if ( wechatInfo['addKey'] ){
                    //     addfriends();
                    // }else if( wechatInfo['addphotoKey'] ) {
                    //     addphoto();
                    }else if(send_one){
                        Tap(540,random(480,960))
                        sleep(1000*3)
                        if (wechat_send()){
                            send_one = false;
                        }
                    }else if (news_message()){
                        replay();
                    }
                }else{
                    if (back_bottom()){
                        Tap(50,100);
                    }
                }
            }else{
                log("启动App");
                app.launch(wechatBid);
                sleep(1000*5)
            }
            if ( Math.round(new Date()) - Home_Time_Line > 60*1000+random(1000,5000) ){
                home();
                Home_Time_Line = Math.round(new Date())
                sleep(1000*random(5,15))
            }
            sleep(1000*1);
            weChat_times++;
        // }
        log("超时");
    }else{
        log("时间不符合");
        home();
        sleep(1000*10)
    }
    wechat_config_save();
}


// wechat_config_init();
// wechat_config.sendphoto = 0
// wechat_config_save();





function task_info(){
    var device_info = Array()
    device_info.service = "Task.Task_get"
    device_info.device_imei = device.getIMEI()
    device_info.device_name = device.codename
    device_info.device_mode = device.model
    device_info.device_tag = "未设置"
    device_info.whos = "流量工产"
    var liuliang_url = "http://awzcydia.com/wp-api/Public/idfa/"
    var res = http.post(liuliang_url, device_info);
    if (res){
        // log(res.body.string())
        var res = JSON.parse(res.body.string())
        log(res)
        var workdate = JSON.parse(res.data.data)
        log(workdate)
        return workdate;
    }
}

function task_back(){
    var device_info = Array()
    device_info.service = "Task.Task_back"
    device_info.device_imei = device.getIMEI()
    device_info.device_name = device.codename
    device_info.device_mode = device.model
    device_info.device_tag = "未设置"
    device_info.whos = "流量工产"
    var liuliang_url = "http://awzcydia.com/wp-api/Public/idfa/"
    var res = http.post(liuliang_url, device_info);
    if (res){
        return true;
    }
}



function all(){
    while (true){
        var task_data = task_info()
        if (task_data){
            wechat_config = task_data;
            Fwechat()
        }
        log("end")
        sleep(1000*5)
    }
}


while (true){
    try{
        all()
    }catch(e){
        sleep(1000*2)
        toast("error")
    }
}



























