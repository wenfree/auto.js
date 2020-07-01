
// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    try{
        var taskData = getTask();
        log(taskData.task.data);

        if (main()) {
            readInfo()
        }

        callback_task(taskData.task.id,"done");
        launch('com.wenfree.cn');
    }
    catch(err){
        log(err)
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

//读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        return storage.get(key);
    };
    //默认返回undefined
}

function app_info(name,data){
    var url = "http://api.wenfree.cn/public/";
    var postdata = {};
    postdata["s"]="App.NewsAppInfo.App_info";
    postdata["imei"]= device.getIMEI();
    postdata["imei_tag"]= getStorageData(device.getIMEI(), "tag");;
    postdata["app_name"]= name;
    postdata["whos"]= "ouwen000";
    postdata["app_info"]= JSON.stringify(data);
    log(jspost(url,postdata));
}


//基础函数
function active(pkg,n){
    if(!n){n=5}
    if(  currentPackage() == pkg ){
       log("应用在前端");
       return true;
    }else{
        app.launch(pkg);
        sleep(1000*n);
    }
}
//准备点击
function click_(x,y){
    if(x>0 && x < 720 && y > 0 && y < 1440){
        click(x,y);
        return true
    }else{
        log('坐标错误');
        return false
    }
}
//点击obj
function click__(obj){
    click_(obj.bounds().centerX(),obj.bounds().centerY())
}
//普通封装
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
//随机数
function rd(min,max){
    if (min<=max){
        return random(min,max)
    }else{
        return random(max,min)
    }
}
//输入密码
function input_pay_password(password){
    var key_xy = {}
    key_xy[1]=[width*0.3,height*7/10]
    key_xy[2]=[width*0.5,height*7/10]
    key_xy[3]=[width*0.8,height*7/10]
    key_xy[4]=[width*0.3,height*7.5/10]
    key_xy[5]=[width*0.5,height*7.5/10]
    key_xy[6]=[width*0.8,height*7.5/10]
    key_xy[7]=[width*0.3,height*8/10]
    key_xy[8]=[width*0.5,height*8/10]
    key_xy[9]=[width*0.8,height*8/10]
    key_xy[0]=[width*0.5,height*9/10]
    // 清除其它字符
    password = password.replace(/\D/g,"")
    for(var i=0;i<password.length;i++){
        var numbers = password.substring(i,i+1);
        click_(key_xy[numbers][0],key_xy[numbers][1])
        sleep(300)
    }
}

function moveTo(x,y,x1,y1,times){
    swipe(x,y,x1,y1,times);
    sleep(1000);
}

function Tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["允许"]="text";
    textTips["保存"]="text";
    textTips["我知道了"]="text";
    textTips["暂不升级"]="text";
    textTips["好的"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    log('查询弹窗-end')
    return true
}

// [500,1044,692,1238]

function main(){

    home();
    sleep(2000);
    click(device.width/4,device.height-20)
    sleep(2000);
    jsclick('id',"clearAnimView",true,2)
    sleep(2000);

    var fristbox = true
    var readtimes = 0
    var readtimes_end = random(5,10)
    var detail2 = 0;

    var i__ = 0;
    while (i__ < 50) {
        i__++;
        if ( active( appinfo.bid , 8)  ){

            var UI = currentActivity();
            log('UI',UI,i__)
            switch(UI){
                case 'com.ss.android.ugc.live.main.MainActivity':
                    if (fristbox){
                        if(jsclick('text','红包',true,2)){
                            var tasktimes = 0
                            var boxbx = 0
                            while (tasktimes < 30 ){

                                var img = text('图片').findOne(100);
                                if (img){
                                    var img_p = img.parent();
                                    if (img_p){
                                        var img_p_c = img_p.children()
                                        if (img_p_c){
                                            click__(img_p_c[1]);
                                        }
                                    }
                                }else
                                if (jsclick("text","开宝箱得金币",true,4)){
                                    boxbx++;

                                    if (boxbx > 6){
                                        break;
                                    }else
                                    if (boxbx >= 3){
                                        back();
                                        back();
                                        break;
                                    }
                                    if (jsclick('text',"看视频 金币翻4倍",true,60)){
                                        sleep(2000);
                                        back()
                                    }
                                    break
                                }
                                tasktimes++;
                                sleep(1000);
                            }
                            fristbox = false
                        }
                    }else
                    if ( jsclick("text","我的",false,1) && jsclick("text","首页",true,rd(3,8)) ){
        
                        moveTo(width/2,height*0.8,width/2,height*0.3,random(500,4000));
                        sleep(1000*rd(1,10))
                        readtimes++;
                        if (readtimes >  readtimes_end ){
                            return true
                        }
                        
                    }else{
                        back();
                    }
                    break;
                case "com.ss.android.ugc.live.commerce.ExcitingVideoAdActivity":
                    log('看广告页面');
                    break
                default:
                    back();
            }
        }else{
            fristbox = true
        }
        Tips();
        sleep(1000);
    }
}

function readInfo(){
    info = {};
    var i__ = 0;
    while (i__ < 30) {
        i__++;
        if ( active( appinfo.bid , 8)  ){

            var UI = currentActivity();
            log('UI',UI,i__)
            switch(UI){
                case 'com.ss.android.ugc.live.main.MainActivity':
                    log('首页');
                    if(jsclick('text','我的',true,2)){
                        var tasktimes = 0
                        while (tasktimes < 60 ){
                            if (jsclick("text","现金金额",false,2)){
                                var titleTextArr = textMatches(/.*/).find();
                                for (var i=0;i<titleTextArr.length;i++){
                                    var d = titleTextArr[i]
                                    log(i,d.id(),d.text(),d.text().length)
                                    if ( d.text() == '现金金额'){
                                        info['现金金额'] = titleTextArr[i-2].text();
                                        info['金币金额'] = titleTextArr[i+1].text();
                                        app_info(appinfo.name,info);
                                        return true
                                    }
                                }
                            }
                            tasktimes++
                        }
                    }
                    break;
                case 'com.android.systemui.recents.RecentsActivity':
                    home();
                    break;
                default:
                    back();
            }
        }
        Tips();
        sleep(500);
    }
}



// 正式开始编代码

log([currentPackage(),currentActivity(),device.width,device.height]);
var width = 720;
var height = 1440;
var appinfo = {}
appinfo.name = "火山极速版";
appinfo.bid = "com.ss.android.ugc.livelite";
var info ={}

// main();
// readInfo()

// var all_Info = textMatches(/.*/).find();
// for (var i = 0;i<all_Info.length;i++){
//     var d = all_Info[i];
//     if ( d.bounds().centerY() < height/4 ){
//         log(i,d.id(),d.text(),d.selected(),d.depth(),d.bounds().centerX(),d.bounds().centerY());
//     }
// }






















