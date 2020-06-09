


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
    
        if  (main()){
            callback_task(taskData.task.id,"done");
        }

        
    }
    catch(err){
        toast(err);
    }

    app.launch('com.wenfree.cn');
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

function main(dyid,category,commnet_key){
    if (Fdy(dyid)){
        sleep(1000*2)
        if (commnet(category,commnet_key)) {
            sleep(1000*2);
            info["state"]="ok";
            return true
        }
    }else{
        sleep(1000*10)
        home();
        info["state"]="no";
    }
}



// var tt = className("android.widget.LinearLayout").find()
// for (var i=0;i<tt.length;i++){
//     var t = tt[i]
//     log(i,t.id(),t.text())
// }

log(currentActivity())
log(currentPackage())

var info = {}
info.name = "浏览器";
info.bid = "com.android.browser";
// app.openUrl('https://mobile.yangkeduo.com/promotion_op.html?type=48&id=138092&page_id=57918_1591339544790_tifrd8ch1o&list_id=promotion_op_tobhe7&hash=')



while (true){
    if (jsclick("id","w-GoToApp",false,2)){
        log('正常打开');
        if (jsclick("text","进店逛逛",true,2) || jsclick("text","进店领券",true,2)){
    
            _sendtext();
            swipe(device.width/2,device.height*3/4,device.width/2,device.height*2/4,3000);
            sleep(1000);
    
        }
    }else if(jsclick("text","客服",false,1)){
        back();
        sleep(1000);
        swipe(device.width/2,device.height*3/4,device.width/2,device.height*2/4,3000);
        sleep(1000);
    }
    sleep(1000);
}


function _sendtext(){
    jsclick("text","客服",true,5)
    jsclick("id","input-content",true,2)
    setText(1,"你好，你们参加了选品会，我是大宝直播间，粉丝数30万，想跟你们合作直播")
    sleep(1000);
    jsclick("text","发送",true,5)
    back();
    sleep(1000);
    back();
    sleep(1000);
    back();
    sleep(1000);
}








