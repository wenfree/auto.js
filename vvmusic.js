



function taps(obj){
    Tap(obj.bounds().centerX(),obj.bounds().centerY())
    sleep(1000*1)
}
function upscreen(){
    var ra = new RootAutomator();
    ra.swipe( 600 + random(-50,50), 1300, 600 + random(-50,50), 1300-300, 500,1)
    sleep(1000*2)
}
function jsclick(way,txt,clickKey,n){
    if(!n){n=1}
    if(!clickKey){clickKey=false}
    if (way == "text"){
        var txtddd = text(txt).findOne(200);
    }else if(way == "id"){
        var txtddd = id(txt).findOne(200);
    }
    if(txtddd){
        // log(txtddd);
        // log(txtddd.id());
        // log(txtddd.text());
        log("找到->", txt)
        if (clickKey){
            log('准备点击->',txt)
            log("x:",txtddd.bounds().centerX(),"y:",txtddd.bounds().centerX())
            // click(txtddd.bounds().centerX(),txtddd.bounds().centerY());
            Tap(txtddd.bounds().centerX(),txtddd.bounds().centerY());
            sleep(1000*n)
        }
        return true
    }else{
        log("没有找到->",txt)
    }
}

var g_info = Array();
g_info["准备进去人数"] = 20
g_info["麦序小于人数"] = 20









var UII = currentActivity();
log(

    UII

)


var 主界面 = "com.vv51.mvbox.MainActivity"
var 直播间界面 = "com.vv51.mvbox.kroom.show.ShowActivity"

var 直播间节点组 = Array();
直播间节点组["关闭直播间"] = "kroom_iv_menu_seven"
直播间节点组["麦序"] = "k_tv_show_mic_req_queue"


while ( true ){
    
    var UII = currentActivity();
    if ( UII == 主界面 ){

        // jsclick("text","歌房",true,1)

        var mic_mun = id("tv_square_online_mic").findOne(100);
        if ( mic_mun ){
            if(mic_mun.text() >= g_info["准备进去人数"] ){
                taps(mic_mun)
            }else{
                log("上滑");
                upscreen();
            }
        }
    }else if(UII == 直播间界面  ){
        var mic_mun = id(直播间节点组["麦序"]).findOne(100);
        if (mic_mun){
            var mic_mun_ = mic_mun.text().match(/\d+/)[0]
            log(mic_mun_)
            if ( mic_mun_ > g_info["麦序小于人数"] ){
                toast("继续挂机");
                sleep(1000*2)
            }else{
                jsclick("id",直播间节点组["关闭直播间"],true,3)
                upscreen();
            }

        }


    }

    sleep(1000*2)
}





















