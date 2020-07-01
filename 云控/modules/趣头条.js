
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

function moveTo(x,y,x1,y1,times){
    swipe(x,y,x1,y1,times);
    sleep(1000);
}

function Tips(){
   if( jsclick("text","允许",true,2) ){

   }else if( jsclick("text","好",true,2) ){

   }
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
    var readtimes_end = random(2,3)
    var detail2 = 0;

    var i__ = 0;
    while (i__ < 200) {
        i__++;
        if ( active( appinfo.bid , 20)  ){

            var UI = currentActivity();
            log('UI',UI,i__)
            switch(UI){
                case 'com.jifen.qkbase.main.MainActivity':
                    log('首页');
                    if ( fristbox ){
                       if( jsclick('text',"任务",true,5) || jsclick('text',"去签到",true,5)){
                            var bgv = textMatches(/领\d+金币/).findOne(2000);
                            if(bgv){
                                click__(bgv);
                                sleep(5000);
                            }
                            var bgv = textMatches(/看视频\+\d+/).findOne(2000);
                            if(bgv){
                                click__(bgv);
                                sleep( 1000* 60 );
                            }
                            fristbox = false;
                        }
                    }else
                    if ( jsclick("text","我的",false,1) && jsclick("text","刷新",false,1) ){
                        var home_selected = text('推荐').selected(true).findOne(1000);
                        if (home_selected){

                            moveTo(width/2,height*0.8,width/2,height*0.3,random(500,4000));

                            var titleTextArr = className("TextView").find();
                            for (var i=0;i<titleTextArr.length;i++){
                                var d = titleTextArr[i]
                                log(i,d.id(),d.text(),d.text().length)
                                if ( i>6 && d.text().length > 12 && d.bounds().centerY() > 300) {
                                    log("文章标题")
                                    if (readtimes > readtimes_end ){
                                        return true
                                    }
                                    click__(d);
                                    readtimes++;
                                    sleep(random(2000,6000));
                                    detail2 = 0
                                    break;
                                }
                            }
                        }else{
                            jsclick("text","头条",true,2)
                            moveTo(width/2,height*0.2,width/2,height*0.8,random(500,4000));
                        }
                    }else{
                        back();
                    }
                    break;
                case "com.jifen.qukan.content.newsdetail.news.NewsDetailNewActivity":
                    log([readtimes,'文章页面']);
                    moveTo(width/2,height*0.8,width/2,height*0.3,random(300,2000));
                    moveTo(width/2,height*0.8,width/2,height*0.3,random(300,2000));
                    if (jsclick("text","没有更多咯~",false,2)){
                    }else{
                        if (jsclick("text","首条评论很容易获赞哦~",true,2)){
                            setText(0,'非常支持');
                            sleep(1000);
                            jsclick("text","发布",true,2);
                            back();
                        }
                    }
                    if (jsclick("text","回复TA",false,2)){
                        detail2++
                    }
                    if (detail2 > 10 ){
                        back();
                        sleep(500);
                        back();
                    }else
                    if (detail2>3){
                        back();
                    }
                    break
                default:
                    back();
            }
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
                case 'com.jifen.qkbase.main.MainActivity':
                    log('首页');
                    if(jsclick('text',"我的",true,2)){
                        if(jsclick("text","查看个人主页",false,2)){
                            var bgv = textMatches(/约.+元/).findOne(2000);
                            if (bgv){
                                info['钱']=bgv.text().replace(/[\u4e00-\u9fa5]/g,"");
                            }
                            var bgv = textMatches(/.*\n.*/).findOne(2000);
                            if (bgv){
                                info['金币']=bgv.text().replace(/[\u4e00-\u9fa5]/g,"");
                                info['金币']=info['金币'].replace(/\n/,"")
                            }
                            var nameArr = text('查看个人主页').findOne(2000);
                            if(nameArr){
                                var 昵称 = nameArr.parent().parent().parent().children()
                                info['昵称']=昵称[1].text()
                            }
                            log(info);
                            app_info(appinfo.name,info);
                            return true
                        }
                    }
                    break;
                default:
                    back();
            }
        }
        Tips();
        sleep(500);
    }
}

// var all_Info = textMatches(/.*/).find();
// for (var i = 0;i<all_Info.length;i++){
//     var d = all_Info[i];
//     log(i,d.id(),d.text(),d.depth())
// }

// 正式开始编代码
log([currentPackage(),currentActivity(),device.width,device.height]);
var width = 720;
var height = 1440;
var appinfo = {}
appinfo.name = "趣头条";
appinfo.bid = "com.jifen.qukan";










