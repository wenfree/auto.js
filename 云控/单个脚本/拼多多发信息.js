"ui";

var commnet = getStorageData(device.getIMEI(),'text');
if (!commnet){
    setStorageData(device.getIMEI(),'text','你好，我是大宝直播间，现在拥有31万粉丝，你们店铺在官方直播选品池，想跟你们合作直播，如需代播请联系18964979491');
    commnet = getStorageData(device.getIMEI(),'text');
}
log(commnet);


ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar background="#333333">
                <toolbar id="toolbar" title="拼多多喊话脚本" />
                <tabs id="tabs" />
            </appbar>
            <input id="ad" type='textLongMessage' text="{{ commnet }}" hint="请输入姓名"/>

            <linear>
                <Switch layout_weight="5" id="taskMonitor" text="启动脚本（按音量向上可以停止）" w="auto" textStyle="bold" />
            </linear>

            
            


        </vertical>

    </drawer>
);



function setStorageData(name, key, value) {
    const storage = storages.create(name);  //创建storage对象
    storage.put(key, value);
}
//读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        return storage.get(key);
    };
    //默认返回undefined
}
//删除本地数据
function delStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        storage.remove(key);
    };
}

//基础函数
function active(pkg,n){
    if(!n){n=5}
    if(  currentPackage() == pkg ){
       log("应用在前端");
       return true;
    }else{
        app.launch(pkg);
        sleep(1000*n)
    }
}

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
        return true
    }else{
        log('坐标错误')
        return false
    }
}

function click__(obj){
    return click_(obj.bounds().centerX(),obj.bounds().centerY())
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
            if (click__(res) ){
                sleep(1000*n);
            }else{
                return false
            }
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




function main(){

    while (true){
        if (active(info.bid,5)){
            if (jsclick("id","w-GoToApp",false,2)){
                log('正常打开');
                if (findname()){
                    _sendtext();
                }else{
                    swipe(device.width/2,device.height*3/4,device.width/2,device.height*2/4,3000);
                    sleep(1000);
                }
            }else if(jsclick("text","客服",false,1) || jsclick("text","此消息由机器人发送",false,1)){
                back();
                sleep(1000);
            }else{
                app.openUrl('https://mobile.yangkeduo.com/promotion_op.html?type=48&id=138092&page_id=57918_1591339544790_tifrd8ch1o&list_id=promotion_op_tobhe7&hash=')
                sleep(5000);
            }
                sleep(1000);
            }
    }

}

function _sendtext(){
    jsclick("text","客服",true,5);
    jsclick("id","input-content",true,5);
    setText(1,commnet);
    sleep(1000);
    jsclick("text","发送",true,5);
    back();
    sleep(1000);
    back();
    sleep(1000);
}

function findname(){
    var Arr = text("进店逛逛").find();
    for (var _dp = 0;_dp< Arr.length;_dp++ ){
        var __dp = Arr[_dp];
        log(_dp,__dp.id(),__dp.text())

        var All = __dp.parent().parent().children();
        var 店铺名 = All[2].text();
        log(店铺名);

        var 是否点击 = true
        for (var _i=0;_i<dodp.length;_i++ ){
            log('---',dodp[_i]);
            if ( dodp[_i] == 店铺名  ){
                是否点击 = false
            }
        }
        if ( 是否点击 ){
            var dpname = text(店铺名).findOne();
            var depthCenterY = dpname.bounds().centerY()
            log(["depthCenterY",depthCenterY])
            if ( depthCenterY > 1200){
                swipe(device.width/2,device.height*3/4,device.width/2,device.height*2/4,3000);
                sleep(1000);
            }else if(depthCenterY < 0){
                swipe(device.width/2,device.height*2/4,device.width/2,device.height*3/4,3000);
                sleep(1000);
            }else{
                jsclick('text',店铺名,true,5);
                dodp.push(店铺名);
                setStorageData(device.getIMEI(),'dp',dodp);
                return true
            }
        }
    }
}


log(currentActivity())
log(currentPackage())
log(device.width,device.height)

var info = {}
info.name = "浏览器";
info.bid = "com.android.browser";
// app.openUrl('https://mobile.yangkeduo.com/promotion_op.html?type=48&id=138092&page_id=57918_1591339544790_tifrd8ch1o&list_id=promotion_op_tobhe7&hash=')

var dodp = getStorageData(device.getIMEI(),'dp');
if (!dodp){
    var dodp = Array()
}
log('dodp',dodp)

log("Redmi 7a");
log("拼多多喊话脚本");
log("第一次运行，请运行到页面时停止，手工登录一个拼多多的帐号");
// var comnnet = rawInput("请在下面输入要喊的话");
// var comnnet = "你好，我是大宝直播间，现在拥有31万粉丝，你们店铺在官方直播选品池，想跟你们合作直播，如需代播请联系18964979491";
// main()

// 启动任务监控
var execution;
ui.taskMonitor.on("check", function (checked) {
    if (checked) {
        toastLog("开始喊话");
        commnet = ui.ad.getText();
        log("commnet",commnet)
        // setStorageData(device.getIMEI(),"text",commnet)
        var thread = threads.start(function(){
            main()
        });
    } else {
        //停止任务监控
        toastLog("停止喊话")
        thread.shutDownAll();
        // threads.shutDownAll();
    };
});






















