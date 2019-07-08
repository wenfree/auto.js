function jsclick(way,txt,clickKey,n){
    if(!n){n=1};
    var res = false;
    if(!clickKey){clickKey=false};
    if (way == "text"){
        res = text(txt).findOne(200);
    }else if(way == "id"){
        res = id(txt).findOne(200);
    }else if(way == "desc"){
        res = desc(txt).findOne(200);
    }
    if(res){
        log("找到->",txt)
    if (clickKey){
        log('准备点击->',txt,"x:",res.bounds().centerX(),"y:",res.bounds().centerX());
        click(res.bounds().centerX(),res.bounds().centerY());
        // Tap(res.bounds().centerX(),res.bounds().centerY());
        sleep(1000*n);
    }
        return true;
    }else{
    log("没有找到->",txt)
    }
};




function Fdy(urlss){

    opendy(urlss);
    sleep(1000*3)

    var timeLine = 0
    var dy_click_mun = 1

    while (timeLine < 50){
        log("timeLine--->",timeLine)
        var UI = currentActivity();
        log("UI->",UI)

        switch(UI){
            case "com.ss.android.ugc.aweme.main.MainActivity":
                opendy(urlss);
                sleep(1000*3);
            break;
            case "com.android.browser.BrowserActivity":
                if (jsclick("text","生成二维码",false,1)){
                    Back();
                    Back();
                    sleep(1000*3)
                    app.openUrl(urlss);
                }else if (jsclick("desc","打开看看",false,4)){
                    var dkkk =  desc("打开看看").findOne(200)
                    if (dkkk){
                        if (dy_click_mun%2==0){
                            click( dkkk.bounds().centerX(),dkkk.bounds().centerY() + 50)
                            // Tap( dkkk.bounds().centerX(),dkkk.bounds().centerY() + 50)
                        }else{
                            click( dkkk.bounds().centerX(),dkkk.bounds().centerY())
                            // Tap( dkkk.bounds().centerX(),dkkk.bounds().centerY())
                        }
                        log(  dkkk.bounds().centerX(),dkkk.bounds().centerY() )
                    }
                }
            break;
            case "com.ss.android.ugc.aweme.detail.ui.DetailActivity":
                if (className("EditText").findOne(500)){
                    log("喜欢就要说出来")
                    var open = className("EditText").findOne(500)
                    if (open){
                        click(988,784);
                        // Tap(988,784)
                        sleep(1000*2)
                        click(device.width/2,device.height/2)
                        sleep(50)
                        click(device.width/2,device.height/2)
                        sleep(50)
                        click(device.width/2,device.height/2)
                        // Tap(1005,956)
                        sleep(1000*2)
                        log('完成')
                        return true
                    }
                }else{
                    back();
                }
            break;
            default:
                // launch(app_bid);
                sleep(1000*5);
                back();
            break;
        }

        if (jsclick("text","保存安装包文件",false,1)){
            jsclick("text","取消",true,3)
        }

        jsclick("desc","下次再说",true,2)
        jsclick("text","下次再说",true,2)
        jsclick("text","打开",true,2)
        jsclick("desc","打开",true,2)
        jsclick("desc","忽略",true,2)
        jsclick("desc","同意并使用",true,2)
        jsclick("desc","确定",true,2)
        jsclick("text","确定",true,2)




        sleep(1000 * 2);
        dy_click_mun++
        timeLine++;
        log('--')
    }
}

function commnet(commnet_txt){
    
    var timeLine = 0
    var dy_click_mun = 1

    while (timeLine < 50){

        log("timeLine--->",timeLine)
        var UI = currentActivity();
        log("UI->",UI)

        jsclick("desc","忽略",true,2)
        jsclick("text","同意并使用",true,2)
        jsclick("text","确定",true,2)


        switch(UI){
            case "com.ss.android.ugc.aweme.detail.ui.DetailActivity":

                if (jsclick("text","评论并转发",false,2)){
                    className("EditText").findOne(1000).setText(commnet_txt)
                    sleep(1000)
                    jsclick("id","u6",true,2)
                    sleep(1000*2)
                    return true
                }else if (className("EditText").text("喜欢就要说出来").findOne(500)){
                    log("喜欢就要说出来")
                    var open = className("EditText").findOne(500)
                    if (open){
                        log('完成')
                        open.click()
                    }
                }else if (className("EditText").text("留下你的精彩评论吧").findOne(500)){
                    log("留下你的精彩评论吧")
                    var open = className("EditText").findOne(500)
                    if (open){
                        log('完成')
                        open.click()
                    }
                }else{
                    back();
                }
            break;
            default:
                // launch(app_bid);
                sleep(1000*5);
                back();
            break;
        }

        jsclick("desc","下次再说",true,2)
        jsclick("text","下次再说",true,2)
        jsclick("desc","忽略",true,2)
        jsclick("desc","同意并使用",true,2)
        jsclick("desc","确定",true,2)

        sleep(1000 * 2);
        dy_click_mun++
        timeLine++;
        log('--')
    }
}

function sendBroadcast(appName,data){
    app.launchPackage( "com.flow.factory");
    sleep(2000)
    var mapObject = {
            appName:appName,
            data:data
        }
    app.sendBroadcast(
        {
            packageName: "com.flow.factory",
            className: "com.flow.factory.trafficfactory.broadcast.TaskBroadCast",
            extras:mapObject
        }   
    );
}



var app_name = "抖音短视频"
var url = "6707099975974718727";
var commnet_txt = "小姐姐真好看";


function get_task(){
    var s = storages.read();
    var ss = s.get("task");
    if (ss.mesg == "今天没有任务"){
        return false;
    }else if(ss.mesg == "暂时没有任务"){
        return false;
    }else{
        return ss.data;
    }
}

function opendy(vodieid){
    app.startActivity({ 
        action: "android.intent.action.VIEW", 
        data:"snssdk1128://aweme/detail/"+vodieid+"?refer=web&gd_label=click_wap_detail_download_feature&appParam=%7B%22__type__%22%3A%22wap%22%2C%22position%22%3A%22900718067%22%2C%22parent_group_id%22%3A%226553813763982626051%22%2C%22webid%22%3A%226568996356873356814%22%2C%22gd_label%22%3A%22click_wap%22%7D&needlaunchlog=1", 
        packageName: "com.ss.android.ugc.aweme", 
    });
}



var info = {}
var data = get_task()
var url = data.worksPath;
var commnet_txt = data.extend4;

if (Fdy(url)){
    sleep(1000*2)
    commnet(commnet_txt)
    sleep(1000*2);
    back();
    sleep(1000*2)
    home();
    info["state"]="ok";
    sendBroadcast("抖音",JSON.stringify(info))
}else{

    sleep(1000*10)
    home();
    info["state"]="no";
    sendBroadcast("抖音",JSON.stringify(info))
}


