


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
        log("x:",res.bounds().centerX(),"y:",res.bounds().centerY());
        click(res.bounds().centerX(),res.bounds().centerY());
        // Tap(res.bounds().centerX(),res.bounds().centerY());
        sleep(1000*n);
    }
        return true;
    }else{
    log("没有找到->",txt)
    }
};

function delay(n){
    if (!n){
        n = 1
    }
    sleep(n*1000)
}

log(
    "7",
    currentActivity()
)



var appName = "抖音短视频"

// app.launchApp(appName)
delay(3)
click("允许")
click("我知道了")


//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}


function main(){
    
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
            case "com.ss.android.ugc.aweme.following.ui.FollowRelationTabActivity":
                log("---------------------------------------------------------------加粉界面")
                // jsclick("id","dd6",true,2)
                var follow = id("dd6").depth(11).findOne(1000)
                if (follow){
                    log(follow)
                    follow.click()
                }

            break;
            case "com.ss.android.ugc.aweme.main.MainActivity":
                log("---------------------------------------------------------------主页面")
                if (jsclick("text","粉丝",true,2)){

                }else{
                    var header = className("ImageView").id("df3").findOne(500)
                    if (header){
                        header.click()
                    }
                }
            break;
            default:
                back();
                sleep(1000*2);
                app.launchApp(appName);


            break;
        }

        jsclick("desc","以后再说",true,2)
        jsclick("text","以后再说",true,2)
        jsclick("desc","忽略",true,2)
        jsclick("desc","同意并使用",true,2)
        jsclick("desc","确定",true,2)

        sleep(1000 * 2);
        dy_click_mun++
        timeLine++;
        log('--')
    }
}


log(
    "dy",
    currentActivity()
)


main()