


// 引入其它文件支持
var a = require("auto-sp");
var b = require("Wechat_text");

// 本地策略,所以需要时间格式化支持
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

//向上滑动
function upscreen(){
    var ra = new RootAutomator();
    var move_x = (device.width)/2
    var move_y = (device.height)
    for (var i=1;i<5;i++){
        ra.swipe( move_x,move_y*0.7,move_x,move_y*0.4, 50)
    }
    
}

//微信返回的按钮
function wechat_back_botton(){
    // toastLog('微信返回的按钮');
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
    }else if(a.jsclick('text','退出',true,2)){
        // 允许
    }else{
        log('没有后退');
        back()
        return true
    }
}

// 回复消息的函数
var message_lun = 0
function wecaht_message_news(){
    message_lun++
    var news = id("nf").find()
    if ( news ){
        if (news.length > 1){
            // Tap(news[1].bounds().centerX(),news[1].bounds().centerY())
            log("centerX---->",news[1].bounds().centerX(),"centerX---->",news[1].bounds().centerY())
            Tap(news[1].bounds().centerX(),news[1].bounds().centerY())
        }
    }
    if (message_lun%2 == 0 ){
        return a.jsclick('id','nf',true,3) 
    }else{
        return a.jsclick('id','mv',true,3)
    }
}

function wecaht_message_replay(){
    if (a.jsclick("id","amh",true,1)){
        // toastLog("准备输入")
        a.input_( b.rdreplay(random(2,5)) );
        className("EditText").findOne(1000).setText( b.rdreplay(random(2,5)) )
        sleep(1000*2)
        // toastLog("准备发送")
        if (a.jsclick('text','发送',true,1)){
            sleep(1000 * random(3,5))
            sleep(1000);
            wechat_back_botton();
            return true
        }
    }
}


// 微信函数1 回复点红点 编号1
function Fwechat_1(){
    var replay_times = 0 
    var weChat_times = 0
    var send_one = true;
    while ( weChat_times < 50){
        log("weChat_times-->",weChat_times);
        var wechat_bid = "com.tencent.mm"
        var UI = currentActivity()
        //开始判断
        if ( UI == 'com.tencent.mm.ui.LauncherUI'){
            // toastLog("微信")
            if (  a.jsclick('text','我',false,1) && a.jsclick('text','微信',true,1) ) {
                // 强制激活微信消息界面
                if(wecaht_message_news()){
                    // toastLog("发现新消息")
                    if (replay_times >= 3){
                        // toastLog("回复超3次,跟据策略不再回复,需下次活跃回复")
                    }else if (wecaht_message_replay()){
                        replay_times++
                    }
                }
            }else{
                wechat_back_botton()
            }
        }else if(currentActivity().search(wechat_bid) == 0){
            wechat_back_botton()
        }else{
            app.launch(wechat_bid);
            sleep(8000)
        }
 
        sleep(1000*3);
        weChat_times++;
        // toast("微信活跃中->"+ (50 - weChat_times))
    }
    // toastLog("时间到->按下home");
    Home() 
}

// 微信函数1 阅读好友请求 编号2
function Fwechat_2(){
    var replay_times = 0 
    var weChat_times = 0
    var send_one = true;
    while ( weChat_times < 50){
        log("weChat_times-->",weChat_times);
        var wechat_bid = "com.tencent.mm"
        var UI = currentActivity()
        //开始判断
        if ( UI == 'com.tencent.mm.ui.LauncherUI'){
            // toastLog("微信")
            if (  a.jsclick('text','我',false,1) && a.jsclick('text','微信',true,1) ) {
                // 强制激活微信消息界面
            
            }else{
                wechat_back_botton()
            }
        }else if(currentActivity().search(wechat_bid) == 0){
            wechat_back_botton()
        }else{
            app.launch(wechat_bid);
            sleep(8000)
        }
 
        sleep(1000*3);
        weChat_times++;
        // toast("微信活跃中")
    }
    // toastLog("时间到->按下home");
    Home() 
}


function wechat_send_news(){
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
            // upscreen()
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
            className("EditText").findOne(1000).setText( b.rdreplay(random(2,5)) )
            if (a.jsclick("text","发表",true,5)){
                return true
            }
        }
        sleep(1000*3)
        send_news_times++
        // toastLog("发新闻轮回中")
    }
    log("发腾讯新闻超时")
    return false
}

// 微信函数1 发腾讯新闻 编号3
function Fwechat_3(){
    var replay_times = 0 
    var weChat_times = 0
    var send_one = true;
    while ( weChat_times < 50){
        log("weChat_times-->",weChat_times);
        var wechat_bid = "com.tencent.mm"
        var UI = currentActivity()
        //开始判断
        if ( UI == 'com.tencent.mm.ui.LauncherUI'){
            // toastLog("微信")
            if (  a.jsclick('text','我',false,1) && a.jsclick('text','微信',true,2) ) {
                // 强制激活微信消息界面
                if (a.jsclick("text","腾讯新闻",true,3)){
                    if (wechat_send_news()){
                        return true
                    }
                }
            }else{
                wechat_back_botton()
            }
        }else if(currentActivity().search(wechat_bid) == 0){
            wechat_back_botton()
        }else{
            app.launch(wechat_bid);
            sleep(8000)
        }
 
        sleep(1000*3);
        weChat_times++;
        // toast("微信活跃中")
    }
    // toastLog("时间到->按下home");
    Home() 
}

// 加好友流程
function wecaht_add_friends(){
    var send_news_times = 0
    var add_times = 0
    while (send_news_times < 30){
        var wechat_res = currentActivity()
        log(currentActivity());

        if (wechat_res == "com.tencent.mm.ui.LauncherUI"){
            if (a.jsclick("text","流量为王",true,3)){

            }else if (a.jsclick("id","amh",false,1)){
               Tap( (device.width)*0.95, device.height*0.05)
               log( (device.width)*0.95 , (device.height)*0.05)
               sleep(2000)
            }

        }else if(wechat_res == "com.tencent.mm.chatroom.ui.ChatroomInfoUI"){
            var imgs = id("e3x").find()
            if (imgs){
                var click_key = random(1,imgs.length-1)
                Tap( imgs[click_key].bounds().centerX(),imgs[click_key].bounds().centerY() )
                sleep(2000)
            }
        }else if(wechat_res == "com.tencent.mm.plugin.profile.ui.ContactInfoUI"){
            // toastLog("个人消息界面")
            if ( a.jsclick("text","添加到通讯录",true,3) ){
                
            }
        }
        sleep(1000*3)
        send_news_times++
        // toastLog("添加好友中")
    }
    log("添加好友超时")
    return false
}

// 微信函数1 流量为王添加好友
function Fwechat_4(){
    var replay_times = 0 
    var weChat_times = 0
    var send_one = true;
    while ( weChat_times < 50){
        log("weChat_times-->",weChat_times);
        var wechat_bid = "com.tencent.mm"
        var UI = currentActivity()
        //开始判断
        if ( UI == 'com.tencent.mm.ui.LauncherUI'){
            // toastLog("微信")
            if (  a.jsclick('text','我',false,1) && a.jsclick('text','微信',true,2) ) {
                // 强制激活微信消息界面
               if( a.jsclick("text","流量为王",true,2) ){
                
               }
            }else{
                wechat_back_botton()
            }
        }else if(currentActivity().search(wechat_bid) == 0){
            wechat_back_botton()
        }else{
            app.launch(wechat_bid);
            sleep(8000)
        }
 
        sleep(1000*3);
        weChat_times++;
        // toast("微信活跃中")
    }
    // toastLog("时间到->按下home");
    Home() 
}

// 朋友圈点赞
function wechat_zan(){
    var send_news_times = 0
    var zan_times = 0
    while (send_news_times < 30){
        var wechat_res = currentActivity()
        log(currentActivity());
        if (zan_times >= 3 ){
            // toastLog("点赞超过3次,退出")
            return true
        }

        if (wechat_res == "com.tencent.mm.ui.LauncherUI"){
            if( a.jsclick('text',"朋友圈",true,2)){

            }
        }else if(wechat_res == "com.tencent.mm.plugin.sns.ui.SnsTimeLineUI"){
            // toastLog("朋友圈页面")
            var zan = desc("评论").findOne(500)
            if (zan){
                Tap(zan.bounds().centerX(),zan.bounds().centerY())
                sleep(1000*4)
                if ( a.jsclick("text","赞",true,2) ) {
                    zan_times++
                }else{
                    upscreen()
                }
            }else{
                upscreen()
            }


        }
        sleep(1000*3)
        send_news_times++
        // toastLog("朋友圈点赞中")
    }
    log("朋友圈点赞超时")
    return false
}

// 微信函数5 朋友圈点赞
function Fwechat_5(){
    var replay_times = 0 
    var weChat_times = 0
    var send_one = true;
    while ( weChat_times < 50){
        log("weChat_times-->",weChat_times);
        var wechat_bid = "com.tencent.mm"
        var UI = currentActivity()
        //开始判断
        if ( UI == 'com.tencent.mm.ui.LauncherUI'){
            // toastLog("微信")
            if (  a.jsclick('text','我',false,1) && a.jsclick('text','发现',true,2) ) {
                // 强制激活微信消息界面
                if ( a.jsclick('text',"朋友圈",true,2)){
                    wechat_zan()
                    return true
                }
            }else{
                wechat_back_botton()
            }
        }else if(currentActivity().search(wechat_bid) == 0){
            wechat_back_botton()
        }else{
            app.launch(wechat_bid);
            sleep(8000)
        }
        sleep(1000*3);
        weChat_times++;
        // toast("微信活跃中")
    }
    // toastLog("时间到->按下home");
    Home() 
}


//计算出当前时间
var today = (new Date()).Format("yyyy-M-d")
log(today)

var do_table = [
    true,
    true,
    true,
    true,
    true,
    true
]

function all(){
    while ( true ) {

        if ( today == (new Date()).Format("yyyy-M-d") ){
            log("时间相同,不做更新")
        }else{
            do_table = [
                true,
                true,
                true,
                true,
                true,
                true
            ]
            today = (new Date()).Format("yyyy-M-d")
        }
        
        var time_today = new Date()
        var time_hour = time_today.getHours()
        var time_min = time_today.getMinutes()
        // toastLog( "小时:"+ time_hour + " 分:"+ time_min )
        
        log( currentActivity() )
        // toastLog( currentActivity() )
        
        if (time_hour >= 7 && time_hour < 8  ){
            if ( do_table[0] ){
                Fwechat_1()
                do_table[0] = false
            }
        }else if( time_hour >= 10 && time_hour < 11 ){
            if ( do_table[1] ){
                Fwechat_1()
                Fwechat_3()
                do_table[1] = false
            }
        }else if( time_hour >= 12 && time_hour < 13 ){
            if ( do_table[2] ){
                Fwechat_1()
                Fwechat_5()
                do_table[2] = false
            }
        }else if( time_hour >= 16 && time_hour < 19 ){
            if ( do_table[3] ){
                Fwechat_1()
                do_table[3] = false
            }
        }else if( time_hour >= 20 && time_hour < 21 ){
            if ( do_table[4] ){
                Fwechat_1()
                Fwechat_3()
                do_table[4] = false
            }
        }else if( time_hour >= 22 && time_hour < 23 ){
            if ( do_table[5] ){
                Fwechat_1()
                Fwechat_5()
                do_table[5] = false
            }
        }else{
            // toastLog("微信脚本,休息中")
            Home();
            sleep(1000*5)
        }
    }    
}


function time_less(n){
    var n_ = 0
    while (n_ - n < 0){
        if (n_%30 == 0 ){
            var text = new Date();
            files.write("/sdcard/1.txt", text);
        }
        if ( n_%5==0 ){
            // toastLog("今日无任务")
        }
        sleep(1000)
        n_++
    }
}


function get_task(){
    var imei = 3585245552582215
    var imei = device.getIMEI()
    var liuliang_url = "http://test.hiei.xin/api/Task/get_task?imei=" + imei
    log(liuliang_url);
    var res = http.get(liuliang_url);
    if (res){
        // log(res.body.string())
        var res = JSON.parse(res.body.string())
        log(res)
        // if (res.state == 0 ){
        //     var time_today = new Date()
        //     var time_hour = time_today.getHours()
        //     var time_min = time_today.getMinutes()
        //     //休息到今天结束
        //     time_less(  ((24-time_hour)*60 + (60-time_min))* 60  )  
        //     // toastLog( "休息到明天0点:"+((24-time_hour)*60 + (60-time_min)) * 60 )
        //     return false
        // } 
        if (res.mesg == "今天没有任务"){
            return false
        }else if (res.mesg == "暂时没有任务"){
            return false
        }else{
            var workdata = res.data
            log(workdata)
            return workdata;
        }
    }
}

function back_task(task_id,status){
    var imei = 3585245552582215
    var imei = device.getIMEI()
    var liuliang_url = "http://test.hiei.xin/api/Task/back_task?imei="+imei+"&task_id="+task_id+"&status="+status
    log(liuliang_url);
    var res = http.get(liuliang_url);
    if (res){
        // log(res.body.string())
        var res = JSON.parse(res.body.string())
        log(res)
        if (res.ret == 200){
            return true;
        }
    }
}

//  all()

function main_wecaht(){
    var workdata = get_task()
    if (workdata){
        if (workdata.code == "WX01"){
            Fwechat_1()
            back_task(workdata.task_id,1)
        }else if(workdata.code == "WX02"){
            Fwechat_3()
            back_task(workdata.task_id,1)
        }else if(workdata.code == "WX03"){
            Fwechat_5()
            back_task(workdata.task_id,1)
        }
    }else{
        var time_today = new Date()
        var time_hour = time_today.getHours()
        var time_min = time_today.getMinutes()
        // toastLog( "当前时间:"+ time_hour + "时 "+ time_min + "分" )
        sleep(3*1000)
        // toastLog( "暂无任务" )
        sleep(3*1000)
        // toastLog( "休息30秒" )
        time_less(35)
        Home()
    }
}


while(true){
    // main_wecaht()
    try{
        main_wecaht()
    }catch(e){
        log(e)
        sleep(10*1000)
    }
}








































