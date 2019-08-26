var sum = threads.disposable();
//启动子线程计算
threads.start(function(){
    while (true){
        var s = new Date();
        //通知主线程接收结果
        sleep(2000);
        sum.setAndNotify(s);
    }
});
//blockedGet()用于等待结果

while (true){
    log("sum = " + sum.blockedGet());
    sleep(2000);
}
