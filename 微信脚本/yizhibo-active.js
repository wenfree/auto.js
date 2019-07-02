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
        log('准备点击->',txt);
        log("x:",res.bounds().centerX(),"y:",res.bounds().centerX());
        // click(txtddd.bounds().centerX(),txtddd.bounds().centerY());
        Tap(res.bounds().centerX(),res.bounds().centerY());
        sleep(1000*n);
    }
        return true;
    }else{
    log("没有找到->",txt)
    }
};



function main() {
    
    var get_sms_button = true;
    var get_password = true;

    var data_time_line = 0;
    while(data_time_line < 180){
        var UI = currentActivity()
        log("UI->",UI)
        switch(UI){
            case "com.yizhibo.video.activity.HomeTabActivity":
                log("主界面")
                var menu_arr = {
                    0:"首页",
                    1:"发现",
                    2:"朋友",
                    3:"消息"
                }
                var menu_key = random(0,3)
                jsclick("text",menu_arr[menu_key],true,random(3,8))

            break;
            default:
                launchApp("易直播");
                sleep(1000*5)
            break;
        }

        jsclick("text","允许",true,2)
        data_time_line++;
        sleep(1000); 
    }
}
 
function sendBroadcast(appName,data){
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

log(
    currentActivity()
)

main()
sendBroadcast("YiTv",JSON.stringify({"reg":true}))