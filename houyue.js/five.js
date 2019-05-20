function jsclick(way,txt,clickKey,n){
    if(!n){n=1}
    var res = false;
    if(!clickKey){clickKey=false};
    if (way == "text"){
        res = text(txt).findOne(200);
    }else if(way == "id"){
        res = id(txt).findOne(200);
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
}

function killApp(appbids){
    var text = "am force-stop " + appbids
    var result = shell(text, true);
    log(result);
}


var bids = Array();
bids["抖音"] = "com.ss.android.ugc.aweme"
bids["快手"] = "com.yxcorp.gifshow"
bids["头条极速"] = "com.ss.android.article.lite"
bids["微信"] = "com.tencent.mm"

log(
    currentActivity()
)


function task_info(){
    var device_info = Array()
    device_info.service = "Task.Task_get"
    device_info.device_imei = device.getIMEI()
    device_info.device_name = device.codename
    device_info.device_mode = device.model
    device_info.device_tag = "未设置"
    device_info.whos = "流量工产"
    var liuliang_url = "http://awzcydia.com/wp-api/Public/idfa/"
    var res = http.post(liuliang_url, device_info);
    if (res){
        // log(res.body.string())
        var res = JSON.parse(res.body.string())
        log(res)
        var workdate = JSON.parse(res.data.data)
        log(workdate)
        return workdate;
    }
}
task_info()

function acitves(bids){
    var outTime = 0
    while (outTime < 50 ){
        if (currentActivity().search(bids) == 0 ){
            Tap( random(100, dwith-100), random(100,hwith-100))
            sleep(1000*5)
            jsclick("text","同意",true)
            jsclick("text","我知道了",true)
            jsclick("text","允许",true)

    
        }else{
            app.launch(bids)
            sleep(1000*5)
        }
        outTime++
        sleep(1000*2)
        toast(bids)
    }
}

dwith = device.width
hwith = device.height



function all(){
    while (true){
        for (var name in bids ){
            toast("name"+name + "活跃")
            acitves(bids[name])
            killApp(bids[name])
        }
    }
}

while (true){
    try{
        all()
    }catch(e){
        toast(e)
        sleep(2000)
    }
}







