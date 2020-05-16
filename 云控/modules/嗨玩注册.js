importClass(android.content.ContentResolver);
importClass(android.database.Cursor);
importClass(android.net.Uri);


// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    var taskData = getTask();
    log(taskData.task.data);

    main();

    callback_task(taskData.task.id,"done");

    
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

//读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        return storage.get(key);
    };
    //默认返回undefined
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


//uri
function get_sms_by_time(name,timeline){
    var smsUri = "content://sms/inbox";
    function xxxx( body ,date){
        var sms_arr ={};
        var cursor=context.getContentResolver().query(Uri.parse(smsUri), ["body"], "body like ? and date > ?",["%"+body+"%",date], "date desc");
        if (cursor != null) {
            let i=0;
            while(cursor.moveToNext()){
                var sms_content = cursor.getString(cursor.getColumnIndex("body")); 
                console.log("短信", sms_content);
                sms_arr[i]=sms_content;
                i++
            }
        }
        return sms_arr;
    } 
    if(!timeline){
        timeline = 0;
    }
    return xxxx(name,timeline);
}
var datetime =new Date().getTime();
log(datetime)

// log(get_sms_by_time("嗨玩",datetime -60*60*13*1000));
function getsms(){
    var sms = get_sms_by_time("嗨玩",datetime -60*60*13*1000);
    var sms = sms[0];
    log(sms)
    var sms = sms.match(/\d{4,5}/)[0];
    log(sms);
    if (sms ){
        return sms;
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

function main(){
    var timeLine = 0
    while (timeLine < 50){
        log("timeLine--->",timeLine)
        var UI = currentActivity();
        log("UI->",UI)
        switch(UI){
            case "com.jiayuan.havafun.login.shanyan.activity.HWLoginHomeActivity":
                if (jsclick("id","bt_login",true,4)){}
                if (jsclick("text","手机验证码登录",false,2)){
                    var phone = getStorageData(device.getIMEI(), "phone");
                    setText(0,phone);
                    sleep(1000);
                    if (jsclick('text',"获取验证码",true,5)){
                        var smsi = 0
                        while (smsi < 30){
                            smsi++;
                            var sms__ = getsms();
                            if (sms__){
                                setText(1,sms__);
                                return true
                            }else{
                                sleep(3000);
                            }
                        }
                    }
                }
            default:
                log("其它界面,启动抖音")
                launch('com.jiayuan.havefun');
                sleep(1000*5);
                // back();
            break;
        }
        Tips();
        sleep(1000 * 2);
        timeLine++;
        log('--')
    }
}




log(currentActivity());
