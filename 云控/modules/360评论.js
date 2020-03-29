



// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    try{
        var my_app = {}
        my_app.packageName = "com.ss.android.ugc.aweme";
        my_app.name = "360评论";
        my_app.link = undefined

        var taskData = getTask();
        log(taskData.task.data);
        var taskall = JSON.parse(taskData.task.data);

        // var url = 'https://v.douyin.com/VwdkrN/';
        // var name = '老张的深夜酒吧';
        var appurl = taskall.url
        var appname = taskall.appname

        // if (opens(appurl,appname)){
        // }

        // sleep(1000*3)
        // jsclick("text","确定",true,2)
        // active("com.android.providers.downloads.ui",5)


        main();


        callback_task(taskData.task.id,"done");
        
    }catch(e){
        log(e)
    }
    
    mainEngine.emit("control", i);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
    clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
});

var my_app = {}
my_app.packageName = "com.qihoo.appstore";
my_app.name = "360评论";
my_app.link = undefined
        

// main();
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

function jspost(url,data){
    var res = http.post(url, data);
    var data = res.body.string();
    if(data){
        return data;
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

function app_info(name,data){
    var url = "http://api.wenfree.cn/public/";
    var postdata = {};
    postdata["s"]="App.ZllgcAppInfo.App_info";
    postdata["imei"]= device.getIMEI();
    postdata["imei_tag"]= getStorageData(device.getIMEI(), "tag");;
    postdata["app_name"]= name;
    postdata["whos"]= "ouwen000";
    postdata["link"]= my_app.link;
    postdata["app_info"]= JSON.stringify(data);
    log(jspost(url,postdata));
}

log(currentPackage());
log(currentActivity());
log(device.width,device.height)

function getDyUrl(){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr['s']= 'DyUrl.url'
    arr["imei_tag"]= getStorageData(device.getIMEI(), "tag");
    var res = jspost(url,arr);
    if (res){
        res =  JSON.parse(res)
        return res.data
    }
}

function getCommnet(){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr['s']= 'NewsCommnet.get';
    arr['name']= 'default';
    arr['type']= 'lun';
    var res = jspost(url,arr);
    if (res){
        res =  JSON.parse(res)
        log(res);
        return res.data
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

function opens(url){
    app.openUrl(url);
}



function main(url,name){
  
    var time_line = 0
    var setp = '';
    while (time_line < 100 ) {
        
        var currenapp = currentPackage();
        if(currenapp == "com.qihoo.appstore"){

            var talk = getCommnet();
            setText(0,talk.txt);
            return true
            var UI = currentActivity();
            log('UI',UI,time_line)
            switch(UI){
                case "com.qihoo.appstore.home.MainActivity":
                    setp = '主页';
                    if (jsclick("id","btn_search",true,2)){

                    }
                    break;
                case "com.qihoo.appstore.search.SearchActivity":
                    setText(0,"易昇证券");
                    break;
                case "com.qihoo.appstore.home.LauncherActivity":
                    
                    var talk = getCommnet();
                    setText(0,talk.txt);
                    return true
                    jsclick("text","评论",true,2);
                    break;
                case "com.qihoo360.accounts.ui.v.UplineLoginActivity":
                    jsclick("text","输入帐号登录",true,8);
                    break;
                case "com.qihoo360.accounts.ui.v.UCActivity":
                    if (jsclick("text","注册",false,2)){

                        function getStorageData(name, key) {
                            const storage = storages.create(name);  //创建storage对象
                            if (storage.contains(key)) {
                                return storage.get(key);
                            };
                            //默认返回undefined
                        }
                        var imei = device.getIMEI();
                        var phone = getStorageData(imei, "phone");

                        setText(0,phone);
                        sleep(500);
                        setText(1,"AaDd112211");

                        return true
                    }else{
                        jsclick("text","快速注册",true,2);
                    }

                    break;
                default:
                    setp = 'other';
                    back();
                    sleep(1000);
                    back();
                    sleep(1000);
                    setClip(url)
            }

        }else{
            active(my_app.packageName,5)
        }

        log(setp);
        sleep(1000*1);
        Tips();
        time_line++
    }  
}

function Tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["暂不"]="text";
    textTips["允许"]="text";
    textTips["保存"]="text";
    textTips["立即升级"]="text";
    // textTips["设置"]="text";
    textTips["好的"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    log('查询弹窗-end')
    return true
}


function clearApp(bid) {

    var packageName = bid
    let i = 0
    while (i < 10) {
        let activity = currentActivity()
        switch (activity) {
            case "com.miui.appmanager.ApplicationsDetailsActivity":
                if (click("清除数据")) {
                } else if (click("清除全部数据")) {
                } else if (click("确定")) {
                    desc("返回").click();
                    sleep(2000);
                    back();
                    sleep(2000);
                    return true
                }
                break;
            default:
                log("页面:other")
                back()  //返回
                if (!openAppSetting(packageName)) {
                    log("找不到应用，请检查packageName");
                }
                break;
        };
        i++;
        sleep(1000)
    }
    back();
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
        click(x,y)
    }else{
        log('坐标错误')
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
    key_xy[1]=[device.width*0.3,device.height*7/10]
    key_xy[2]=[device.width*0.5,device.height*7/10]
    key_xy[3]=[device.width*0.8,device.height*7/10]
    key_xy[4]=[device.width*0.3,device.height*7.5/10]
    key_xy[5]=[device.width*0.5,device.height*7.5/10]
    key_xy[6]=[device.width*0.8,device.height*7.5/10]
    key_xy[7]=[device.width*0.3,device.height*8/10]
    key_xy[8]=[device.width*0.5,device.height*8/10]
    key_xy[9]=[device.width*0.8,device.height*8/10]
    key_xy[0]=[device.width*0.5,device.height*9/10]
    // 清除其它字符
    password = password.replace(/\D/g,"")
    for(var i=0;i<password.length;i++){
        var numbers = password.substring(i,i+1);
        click_(key_xy[numbers][0],key_xy[numbers][1])
        sleep(300)
    }
}


// log(getClip());
// var url = 'https://v.douyin.com/XWEQTF/'

// back();
// sleep(1000);
// back();
// sleep(1000);
// back();
// sleep(1000);
// setClip(url);
// log("准备启动");
// log(Date())
// active(my_app.packageName,6);
// log("启动完成");
// log(Date())
// sleep(1000);

// if (jsclick("text","前往",true,2) || jsclick("text","打开看看",true,2)){
//     openKey = true
// }










