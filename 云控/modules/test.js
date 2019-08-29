// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (index, mainEngine) {
   main();
   log("index",index)

   mainEngine.emit("control", index);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
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