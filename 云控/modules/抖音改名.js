

// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    try{
        var taskData = getTask();
        if ( _makename() ){
            callback_task(taskData.task.id,"done");
            home();
            sleep(1000);
            home();
        }
    }catch(e){
        log(e);
    }

    mainEngine.emit("control", i);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
    clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
});


function jspost(url,data){
    var res = http.post(url, data);
    var data = res.body.string();
    if(data){
        return data;
    }
}

function click_(x,y){
    if(x>0 && x < device.width && y > 0 && y < device.height){
        click(x,y)
    }else{
        log('坐标错误')
    }
}

function click__(obj){
    click_(obj.bounds().centerX(),obj.bounds().centerY())
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
            click__(res);
            sleep(1000*n);
        }else{
            log("找到->",txt);
        }
        return true;
    }else{
        // log("没有找到->",txt)
    }
}

function callback_task(id,state){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr["id"] = id;
    arr["state"] = state;
    var postdata = {};
    postdata["s"]="NewsRecordBack.Back"
    postdata["arr"] = JSON.stringify(arr)
    log(arr,postdata)
    log(jspost(url,postdata));
}

// 获取接口数据
function getTask() {
    var url = 'http://api.wenfree.cn/public/';
    let res = http.post(url, {
        "s": "NewsImei.Imei",
        "imei": device.getIMEI()
    });

    let json = {};
    try {
        let html = res.body.string();
        // log(html)
        json = JSON.parse(html);
        log(json)
        return json.data;
    } catch (err) {
        //在此处理错误
    }
};

function Tips(){
    var textTips = {}
    textTips["我知道了"]="text";
    textTips["下次再说"]="text"
    textTips["打开"]="text"
    textTips["允许"]="text"
    textTips["忽略"]="text"
    textTips["同意并使用"]="text"
    textTips["确定"]="text"
    textTips["确定"]="desc"
    for(var k in textTips){
       if (jsclick(textTips[k],k,true,2)){
           break;
       }
    }
}

function _makename(){
    var timeLine = 0
    while (timeLine < 60){
        if (currentPackage() == app_info['bid']){
            var UI = currentActivity();
            log("UI->",UI)
            var setpui = ''
            switch(UI){
                case "com.ss.android.ugc.aweme.main.MainActivity":
                    if (jsclick('text','编辑资料',true,2)){
                    }else{
                        jsclick('text','我',true,2);
                    }
                    break;
                case "com.ss.android.ugc.aweme.profile.ui.ProfileEditActivity":
                    if (jsclick("text","修改名字",false,1)){
                        setText(0,_nickname());
                        sleep(1000);
                       if( jsclick("text",'保存',true,2) ){
                           return true
                       }
                    }else{
                        jsclick('text',"名字",true,2)
                    }
                    break;
                default:
                    log("其它界面,后退");
                    back();
                    break;
            }
        }else{
            app.launch(app_info['bid']);
            sleep(1000*5);
        }

        Tips()
        sleep(1000 * 2);
        timeLine++;
        log('--' + setpui + '--')
    }
}


// 获取nickname
function _nickname(){
    var _url = 'http://api.wenfree.cn/public/'
    var _postArr = {}
    _postArr['s'] = 'App.Anickname.Nickname'
    var res = JSON.parse(jspost(_url,_postArr));
    return res['data']['nickname'];
}

var app_info ={}
app_info['name'] = "抖音短视频";
app_info['bid'] = "com.ss.android.ugc.aweme";

log( [currentPackage(),currentActivity()] )
// log( _nickname() )
// _makename();




