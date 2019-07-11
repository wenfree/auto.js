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


////////////////////////////////////////////////////////////

function gifshow_back_bottom(){
    log('search back');
    if (jsclick('id',"back_btn",true,2)){
    }else if (jsclick('id',"left_btn",true,2)){
        // 小米6 腾讯新闻后退
    }else if(jsclick('text','我知道了',true,2)){
        // 弹出来我知道的了提示
    }else if(jsclick('text','允许',true,2)){
        // 允许
    }else{
        log('没有后退');
        back();
        return true
    }
}

///////////////////////////////////////
function Fgifshow(){
    Fgifshow_i = 0
    while (Fgifshow_i < 20){
        log("Fgifshow_i",Fgifshow_i)
        var UI = currentActivity();
        log("UI->",UI)
        
        switch(UI){
            case "com.yxcorp.plugin.live.LivePlayActivity":
                log("正在直播的界面")
                if ( gifshow_Info['SetRoom'] == gifshow_Info['room'] ){
                    if( jsclick("id","live_close",false,1) && jsclick("text","说点什么...",false,1) ){
                        log('正确的房间号')
                        jsclick("text","说点什么...",true,2)
                        var d = className("EditText").findOne(1000)
                        if (d){
                            d.setText(gifshow_Info['word'])
                            sleep(500)
                        }
                        if (jsclick("text","发送",true,random(1,5))){
                            sleep(1000*3)
                            return true
                        }
                    }
                }else{
                    if( !jsclick("id","live_close",true,1)  ) {
                        gifshow_back_bottom()
                    }
                }
            break;
            case "com.yxcorp.gifshow.HomeActivity":
                if (jsclick("id","left_btn",true,2)){
                }else if (jsclick('text',"查找",true,2)){
                }
            break;
            case "com.yxcorp.gifshow.activity.SearchActivity":
                log("搜索界面")
                if (jsclick("text","综合",false,1) && jsclick("text","用户",false,1)){
                    if(   className("EditText").findOne(200).text() == gifshow_Info['room'] ) {
                        log("正确的快手号")
                        if (jsclick("text","关注",true,1)){
                        }else if(jsclick("id","avatar",true,2)){
                            gifshow_Info['SetRoom'] = gifshow_Info['room']
                        }
                    }
                }else{
                    jsclick("id","inside_editor_hint",true,2)
                    setText(0, gifshow_Info['room'])
                    sleep(1000)
                    jsclick("id","candidates",true,2)
                }
            break;
            case "com.yxcorp.gifshow.profile.activity.UserProfileActivity":
                log("作品集界面", gifshow_Info['SetRoom'] )
                if ( gifshow_Info['SetRoom'] == gifshow_Info['room'] ){
                    jsclick("id","player_cover_container",true,3)
                }else{
                    gifshow_back_bottom()
                }
            break;
            case "com.yxcorp.gifshow.detail.PhotoDetailActivity":
                back();
            break;
            default:
                back();
                sleep(1000)
                launchApp(app_name);
                sleep(1000*5)
            break;
        }

        jsclick("text","我知道了",true,2)
        sleep(1000 * 1);
        Fgifshow_i++;
    }
}


function get_task(){
    var s = storages.read();
    var ss = s.get("task");
    if (ss.mesg == "今天没有任务"){
        return false;
    }else if(ss.mesg == "暂时没有任务"){
        return false;
    }else{
        return ss.data;
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


var app_name = "快手"
var gifshow_Info = {}
gifshow_Info['room']="40300060"
gifshow_Info['SetRoom']=""
gifshow_Info['word']="666"

var task_info = get_task();
gifshow_Info['room']=task_info.extend1;
gifshow_Info['word']=task_info.extend3;

var info={}
if (Fgifshow()){
    home();
    info["state"]="ok";
    sendBroadcast("快手",JSON.stringify(info))
}else{
    info["state"]="no";
    sendBroadcast("快手",JSON.stringify(info))
}


