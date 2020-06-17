
main()
info ={}
info['state'] = 'ok'
sendBroadcast('测试',JSON.stringify(info))

//-------------------------------------------------------------------------------------------------------------------------
//打开截图
function open_img(){
    var thread = threads.start(function(){
        while (true){
            if(click("立即开始")){
                log("立即开始");
            }
            sleep(1000);
        }
    })
    requestScreenCapture(true);
    sleep(1000*5);
    thread.interrupt();
    log("open end")
}
//执行主程序
function main() {
    open_img();
   console.show();

   function getStorageData(name, key) {
        const storage = storages.create(name);  //创建storage对象
        if (storage.contains(key)) {
            return storage.get(key);
        };
            //默认返回undefined
    }
    task_info = getStorageData(device.getIMEI(),"task_info")
    toastLog("est");
    toastLog(task_info);
    toastLog("------------");

   var times = 0;
   while (times < 100) {
      toastLog("脚本 1 计数:" + times)
      sleep(1000)
      times++;
   };

   console.hide();
};


function jspost(url,data){
    var res = http.post(url, data);
    var data = res.body.string();
    if(data){
        return data;
    }
}

function app_info(name,data){
    var url = "http://news.wenfree.cn/phalapi/public/";
    var postdata = {};
    postdata["s"]="App.ZllgcAppInfo.App_info";
    postdata["imei"]= device.getIMEI();
    postdata["app_name"]= name;
    postdata["whos"]= "ouwen000";
    postdata["app_info"]= JSON.stringify(data);
    log(jspost(url,postdata));
}

function callback_task(id,state){
    var url = "http://news.wenfree.cn/phalapi/public/";
    var arr = {};
    arr["id"] = id;
    arr["task_state"] = state;
    var postdata = {};
    postdata["s"]="App.Zllgcimeicallback.Callback_task"
    postdata["arr"] = JSON.stringify(arr)

    log(arr,postdata)
    log(jspost(url,postdata));
}