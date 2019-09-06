






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
open_img()















