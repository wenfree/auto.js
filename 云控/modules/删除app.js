


// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    try{
        click(device.width/4,device.height-20)
        sleep(2000);
        jsclick('id',"clearAnimView",true,2)
        sleep(2000);

        var taskData = getTask();
        log(taskData.task.data);

        var bid_ = JSON.parse(taskData.task.data);
        var bid = bid_.bid;
        uninstall_app(bid);

        callback_task(taskData.task.id,"done");
        app.launch('com.wenfree.cn');
    }catch(e){
        toast(e)
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
            if ( res.bounds().centerX() < 0 || res.bounds().centerX()> width || res.bounds().centerY() < 0 || res.bounds().centerY() > height ){
                return false
            }
            log('准备点击->',txt,"x:",res.bounds().centerX(),"y:",res.bounds().centerY());
            click__(res);
        }else{
            log("找到->",txt);
        }
        sleep(1000*n);
        return true;
    }else{
        // log("没有找到->",txt)
    }
}

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


function uninstall_app(packageName) {
    let i = 0
    while (i < 20) {
        let activity = currentActivity()
        log(activity)
        switch (activity) {
            case "com.android.packageinstaller.UninstallerActivity":
                if(jsclick("text","未找到应用",false,0)){
                    click("确定");
                    return true;
                }
                click("确定");
                break;
            case "com.android.packageinstaller.UninstallAppProgress":
                click("立即清理");
                break;
            case "com.miui.optimizecenter.MainActivity":
                if(jsclick("id","button_clean",false,3))return true;
                break;
            default:
                log("页面:other")
                back();
                sleep(2000);
                app.uninstall(packageName);
                sleep(5000);
        };
        i++;
        sleep(2000);
        jsclick("text","我知道了",true,2);
    }
}

var app_name = "删APP";



