// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {
    try{
        home();
        sleep(2000);
        click(device.width/4,device.height-20)
        sleep(2000);
        jsclick('id',"clearAnimView",true,2)
        sleep(2000);

        var taskData = getTask();
        main();
        callback_task(taskData.task.id,"done");
    }catch(e){
        log(e);
    }
    mainEngine.emit("control", i); //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
    clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
});

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


function Tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["允许"]="text";
    textTips["我知道了"]="text";
    textTips["保存"]="text";
    textTips["立即升级"]="text";
    textTips["好的"]="text";
    // textTips["取消"]="text";
    // textTips["设置"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,1)){
            return false
        }
    }
    log('查询弹窗-end')
    return true
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


function main(){
    var install = true
    var follow_ = true
    var sendtimes = 20
    var sendtimes_ = 0

    var time_line = 0
    while (time_line < 60 ) {
        
        var currenapp = currentPackage()
        if( currenapp == info.bid ){
            var UI = currentActivity();
            log('UI',UI,time_line)
            switch(UI){
                case "com.ss.android.ugc.aweme.search.activity.SearchResultActivity":
                    log('搜索页面')
                    if(jsclick('text',"抖音号:"+nameid,true,2)){

                    }else{
                        setText(0,nameid);
                        sleep(2000);
                        var nameidArr = text(nameid).depth(11).findOne(1000);
                        if (nameidArr){
                            click__(nameidArr);
                            follow_ = true
                        }
                    }
                    break;
                case "com.ss.android.ugc.aweme.profile.ui.UserProfileActivity":
                    log("被关注主页详情")
                    if (follow_ ){
                        if (jsclick('text','粉丝',true,2)) follow_ = false
                    }else{
                        jsclick('text',"#  关注",true,2)
                        if (jsclick('text',"私信",true,2)){
                            sendtimes_++
                            if (sendtimes_ > sendtimes){
                                return true
                            }
                        }else{
                            back();
                        }
                    }
                    break;
                case "com.ss.android.ugc.aweme.following.ui.FollowRelationTabActivity":
                    log('粉丝关注界面');
                    var followkey = text("关注").findOne(1000);
                    if( followkey ){
                        click(device.width/2,followkey.bounds().centerY())
                        sleep(random(1000,3000))
                    }else{

                    }
                    break;
                case "com.ss.android.ugc.aweme.main.MainActivity":
                    log("抖音首页");
                    if(jsclick("desc","搜索",true,2)){
                    }
                    break;
                case "com.ss.android.ugc.aweme.im.sdk.chat.ChatRoomActivity":
                    log('私信界面');
                    if (jsclick("text","已送达",false,2)){
                        back()
                        sleep(random(1000,3000))
                        back()
                    }else{
                        var msginput = className('android.widget.EditText').findOne(2000);
                        if(msginput){
                            click__(msginput);
                            sleep(random(1000,3000))
                            setText(0,sendmsg)
                            sleep(random(1000,3000))
                        }
                        jsclick('desc','发送',true,2)
                        back();
                        sleep(random(1000,3000))
                        back()
                        sleep(random(1000,3000))
                        back()
                    }
                    break
                default:
                    log("可能没有启动设置");
                    back();
                    break;
            }
        }else if(currenapp == "com.android.settings"){
            jsclick("text","允许来自此来源的应用",true,2);
            back();
        }else if(currenapp == "com.miui.packageinstaller"){
            log("安装app");
            if(jsclick("text","应用商店安装",true,2)){
            }else if(jsclick("text","设置",true,2)){
            }else{
                if(install && jsclick("text","安装",true,2) ){
                    install = false;
                }else{
                    jsclick("text","打开",true,2)
                }
            }
        }else{
            active(info.bid,5)
        }

        sleep(1000*1);
        Tips();
        time_line++
    }
}

log([currentPackage(),currentActivity(),device.width,device.height]);
var info = Array()
info.name = '抖音'
info.bid = 'com.ss.android.ugc.aweme'
var nameid = 'qianyuan131'
var sendmsg = '算命+v badou6699'


// main();














