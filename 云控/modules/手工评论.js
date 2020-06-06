


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
        var dyid_ = JSON.parse(taskData.task.data);
        var dyid = dyid_.dyid;
        var commnet_key = dyid_.key;

        var category = dyid_.category;
        if (main(dyid,category,commnet_key)){
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

function zan(){
    var title = className("android.widget.LinearLayout").find()
    if (title){
        if (title.length >= 3){
            click(988,784);
            sleep(1000*2);
            click(device.width/2,device.height*0.3)
            sleep(50)
            click(device.width/2,device.height*0.3)
            sleep(50)
            click(device.width/2,device.height*0.3)
            sleep(50)
            click(device.width/2,device.height*0.3)
            sleep(50)
            sleep(1000*2)
            log('完成');
            return true
        }
    }
}

function Fdy(urlss){
    opendy(urlss);
    sleep(1000*5)
    jsclick("text","允许",true,2)
    var timeLine = 0;
    var step_ = '';
    while (timeLine < 50){
        log("timeLine--->",timeLine)
        var UI = currentActivity();
        log("UI->",UI)
        switch(UI){
            case "com.ss.android.ugc.aweme.main.MainActivity":
                step_ = '主界面';
                opendy(urlss);
                sleep(1000*6);
                break;
            case "com.ss.android.ugc.aweme.detail.ui.DetailActivity":
                step_ = '视频界面';
                return zan();
            default:
                step_ = '其它界面';
                log("其它界面,启动抖音")
                launchApp(app_name);
                sleep(1000*5);
                // back();
            break;
        }

        Tips()
        if (jsclick("text","保存安装包文件",false,1)){
            jsclick("text","取消",true,3)
        }

        sleep(1000 * 2);
        timeLine++;
        log('--')
    }
}

function getCommnet(category){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr['s']= 'NewsCommnet.get';
    arr['category']= category;
    arr['type']= 'lun';
    var res = jspost(url,arr);
    if (res){
        res =  JSON.parse(res)
        log(res);
        return res.data.txt
    }
}

function commnet_do(category,commnet_key){
    if (jsclick("text","评论并转发",false,2)){
        var d = className("EditText").findOne(1000)
        if (d){
        var commnetTxt = getCommnet(category);
         d.setText(commnetTxt);
         setClip(commnetTxt);
         sleep(1000);

        if ( commnet_key == 'true' ){
            jsclick("text","评论并转发",true,2)
        }

        //  点击发送
        // click((device.width)*0.92,d.bounds().centerY());
        sleep(1000*2);
        return true

        }
     }else{
        var title = className("android.widget.LinearLayout").find();
        if (title){
            if (title.length >= 3){
                click_(device.width*2/5,device.height*88/100)
            }
        }
     }
}


function commnet(category,commnet_key){
    var timeLine = 0
    while (timeLine < 50){
        log("timeLine--->",timeLine)
        var UI = currentActivity();
        log("UI->",UI)
        switch(UI){
            case "com.ss.android.ugc.aweme.detail.ui.DetailActivity":
                if (commnet_do(category,commnet_key)){
                    return true
                }
                break;
            case "com.ss.android.ugc.aweme.main.MainActivity":
                if (commnet_do(category,commnet_key)){
                    return true
                }
                break;
            default:
                // launch(app_bid);
                sleep(1000*5);
                back();
            break;
        }

        Tips()
        sleep(1000 * 2);
        timeLine++;
        log('--')
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


var app_name = "抖音短视频";
var app_bid = "com.ss.android.ugc.aweme";


function opendy(vodieid){
    app.startActivity({ 
        action: "android.intent.action.VIEW", 
        data:"snssdk1128://aweme/detail/"+vodieid+"?refer=web&gd_label=click_wap_detail_download_feature&appParam=%7B%22__type__%22%3A%22wap%22%2C%22position%22%3A%22900718067%22%2C%22parent_group_id%22%3A%226553813763982626051%22%2C%22webid%22%3A%226568996356873356814%22%2C%22gd_label%22%3A%22click_wap%22%7D&needlaunchlog=1", 
        packageName: "com.ss.android.ugc.aweme", 
    });
}

var info = {}

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

// log(currentActivity())
// log(currentPackage())
// opendy("6831849799571016964");