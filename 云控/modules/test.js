// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i,task_info, mainEngine) {
    log("task_info",task_info);
    log("id=>",task_info.id);
   main();
   callback_task(task_info.id,"done");
   mainEngine.emit("control", i,task_info);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
   clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
});

// events.on("kill", function (index, mainEngine) {
//    mainEngine.emit("control", index);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
//    clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
//    exit();
// });

//-------------------------------------------------------------------------------------------------------------------------

//执行主程序
function main() {
   console.show();

   var times = 0;
   while (times < 10) {
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