
// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    try{
        var taskData = getTask();
        log(taskData.task.data);

        appnamelist = JSON.parse(taskData.task.data);
        appname = appnamelist.appname;

        try{
            main(appname);
        }catch(e){
            app_info('错误日志',{'error':e})
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
    textTips["我知道了"]="desc";
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

function main(appname){

    home();
    sleep(2000);
    click(device.width/4,device.height-20)
    sleep(2000);
    jsclick('id',"clearAnimView",true,2)
    sleep(2000);

    var i__ = 0;
    while (i__ < 100) {
        i__++;
        if ( active( appinfo.bid , 8)  ){

            var UI = currentActivity();
            log('UI',UI,i__)
            switch(UI){
                case 'com.xiaomi.market.ui.MarketTabActivity':
                    log('主界面');
                    jsclick('id','search_text_switcher',true,2);
                    setText(0,appname);
                    break;
                case 'com.xiaomi.market.ui.SearchActivityPhone':
                    log('搜索页面');
                    eval("var appname_ = /" + appname + "图形.*/")
                    log(appname_)
                    var obj = textMatches(appname_).findOne(1000);
                    if(obj){
                        click__(obj);
                    }else{
                        var obj = text(appname).depth(13).findOne(500);
                        if(obj){
                            click__(obj);
                        }
                    }
                    break;
                case 'com.xiaomi.market.ui.detail.AppDetailActivityInner':
                    log('app详情页面');
                    var detail_download = id('detail_download').findOne(500);
                    if (detail_download ){
                        var detail_download_text = detail_download.desc();

                        if ( detail_download_text == '打开' ){
                            log('下载完成')
                            return true
                        }else if (detail_download_text == '安装中'){
                            log('安装中');
                            toast('安装中,会下载10分钟左右');
                        }else if (detail_download_text.search('安装') == 0  || detail_download_text == '升级' || detail_download_text == '继续' ){
                            click__(detail_download);
                        }else if (detail_download_text.search('%') == 0){
                            log('正在下载中');
                            toast('正在下载中,会下载10分钟左右');
                            sleep(1000);
                        }else{
                            log(detail_download_text);
                        }
                    }
                    break;
                default:
                    back();
            }
        }
        Tips();
        sleep(1000);
    }
}



// 正式开始编代码

log([currentPackage(),currentActivity(),device.width,device.height]);
var width = 720;
var height = 1440;
var appinfo = {}
appinfo.name = "商店下载";
appinfo.bid = "com.xiaomi.market";
var info ={}


appname = '今日头条极速版'
// main(appname);



// jsclick('text','火山极速版',true,2);

// var all_Info = textMatches(/.*/).find();
// for (var i = 0;i<all_Info.length;i++){
//     var d = all_Info[i];
//     log(i,d.id(),d.text(),d.depth())
// }


// var detail_download = id('detail_download').findOne(500);
// if (detail_download ){
//     var detail_download_text = detail_download.desc();
//     log(detail_download_text)
// }










