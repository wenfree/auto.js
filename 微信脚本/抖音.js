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

    var timeLine = 0
    var dy_click_mun = 1
    app.openUrl(urlss);
    sleep(1000*6)
    while (timeLine < 50){
        log("timeLine--->",timeLine)
        var UI = currentActivity();
        log("UI->",UI)

        jsclick("desc","忽略",true,2)
        jsclick("text","同意并使用",true,2)
        jsclick("text","确定",true,2)

        if (dy_click_mun%10 == 0 ) {
            app.openUrl(urlss);
            sleep(1000*6)
        }

        switch(UI){
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
                        click(988,784)
                        // Tap(988,784)
                        sleep(1000*2)
                        click(1005,956)
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

function commnet(){
    
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
                    className("EditText").findOne(1000).setText("一个漂亮的姑娘2")
                    sleep(1000)
                    jsclick("id","u6",true,2)
                    sleep(1000*2)
                    return true
                }else if (className("EditText").text("喜欢就要说出来").findOne(500)){
                    log("喜欢就要说出来")
                    var open = className("EditText").findOne(500)
                    if (open){
                        click(988,784)
                        // Tap(988,784)
                        sleep(1000*2)
                        click(1005,956)
                        // Tap(1005,956)
                        sleep(1000*2)
                        log('完成')
                        // Home();
                        open.click()
                    }
                }else if (className("EditText").text("留下你的精彩评论吧").findOne(500)){
                    log("留下你的精彩评论吧")
                    var open = className("EditText").findOne(500)
                    if (open){
                        click(988,784)
                        // Tap(988,784)
                        sleep(1000*2)
                        click(1005,956)
                        // Tap(1005,956)
                        sleep(1000*2)
                        log('完成')
                        // Home();
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



var app_name = "抖音短视频"
var url = "http://v.douyin.com/h3oqyT/";


function get_task(){
    var s = storages.read();
    var ss = s.get("task");
    if (ss.mesg == "今天没有任务"){
        return false;
    }else if(ss.mesg == "暂时没有任务"){
        return false;
    }else{
        return ss.data.worksPath;
    }
}

var info = {}
// var url = get_task()



if (Fdy(url)){
    sleep(1000*2)
    commnet()
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

log(
    "7",
    currentActivity()
)

// // log(className("EditText").findOne(500))
// app.openUrl(url);
// sleep(4000)
// desc("打开看看").findOne(200).click()
// sleep(1000)
// var d = text("确定").findOne(200)
// if(d){
//     d.click()
// }