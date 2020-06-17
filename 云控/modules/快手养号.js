


// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    try{
        click(device.width/4,device.height-20)
        sleep(2000);
        jsclick('id',"clearAnimView",true,2)
        sleep(2000);

        var taskData = getTask();
        log(taskData.task.data);
 



        callback_task(taskData.task.id,"done");
    }catch(e){
        toast(e)
    }
    mainEngine.emit("control", i);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
    clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
});


function jspost(url,data){
    var res = http.post(url, data);
    var data = res.body.string();
    if(data){
        return data;
    }
}

function click_(x,y){
    if(x>0 && x < device.width && y > 0 && y < device.height){
        click(x,y)
    }else{
        log('坐标错误')
    }
}

function click__(obj){
    click_(obj.bounds().centerX(),obj.bounds().centerY())
}

function jsclick(way,txt,clickKey,n){
    if(!n){n=1};//当n没有传值时,设置n=1
    var res = false;
    if(!clickKey){clickKey=false}; //如果没有设置点击项,设置为false
    if (way == "text"){
        res = text(txt).findOne(200);
    }else if(way == "id"){
        res = id(txt).findOne(200);
    }else if(way == "desc"){
        res = desc(txt).findOne(200);
    }
    if(res){
        if ( clickKey ){
            log('准备点击->',txt,"x:",res.bounds().centerX(),"y:",res.bounds().centerY());
            click__(res);
            sleep(1000*n);
        }else{
            log("找到->",txt);
        }
        return true;
    }else{
        // log("没有找到->",txt)
    }
}

//基础函数
function active(pkg,n){
    if(!n){n=5}
    if(  currentPackage() == pkg ){
       log("应用在前端");
       return true;
    }else{
        app.launch(pkg);
        sleep(1000*n);
    }
}

function callback_task(id,state){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr["id"] = id;
    arr["state"] = state;
    var postdata = {};
    postdata["s"]="NewsRecordBack.Back"
    postdata["arr"] = JSON.stringify(arr)
    log(arr,postdata)
    log(jspost(url,postdata));
}

// 获取接口数据
function getTask() {
    var url = 'http://api.wenfree.cn/public/';
    let res = http.post(url, {
        "s": "NewsImei.Imei",
        "imei": device.getIMEI()
    });

    let json = {};
    try {
        let html = res.body.string();
        // log(html)
        json = JSON.parse(html);
        log(json)
        return json.data;
    } catch (err) {
        //在此处理错误
    }
};

function Tips(){
    var _tipsArr = [
        ["text","同意并继续"],
        ["text","允许"],
        ["id","com.smile.gifmaker:id/close_btn"],
    ]
    for (var _tipsi = 0;_tipsi<_tipsArr.length;_tipsi++){
        if(jsclick(_tipsArr[_tipsi][0],_tipsArr[_tipsi][1],true,2)) return
    }
}


function main(){
    var _timeLine = 0

    var reban = 1
    var looktimes = 8
    while ( _timeLine < 100 ){

        var currenapp = currentPackage()
        if( currenapp == info.bid ){
            var UI = currentActivity();
            switch(UI){
                case "com.yxcorp.gifshow.HomeActivity":
                    jsclick("id","com.smile.gifmaker:id/close_btn",true,2)
                    jsclick("desc","菜单",true,2)
                    jsclick("text","热榜",true,2)
                    break;
                case "com.yxcorp.plugin.search.billboard.view.KwaiHotBillboardActivity":
                    if ( jsclick('text',reban,true,random(3,8))){
                        reban = reban + random(1,3);
                        if (reban > looktimes){
                            return true
                        }
                    }
                    break;
                case "com.yxcorp.plugin.search.SearchActivity":
                    var _looktimes = 0
                    while (_looktimes < 5){
                        swipe(device.width/2, device.height*0.8, device.width/2, device.height*0.2, random(200,2000) );

                        if (random(1,100) > 10) {
                            jsclick("id","player_cover",true,random(5,20))
                            swipe(device.width/2, device.height*0.8, device.width/2, device.height*0.2, random(200,2000) );
                            back();
                        }


                        sleep(random(500,3000));
                        _looktimes++;
                    }
                    back();
                    break;
                default:
                    back();
            }
        }else{
            active(info.bid,5)
        }
        Tips()
        sleep(random(100,1000));
        
        _timeLine++;
        
    }

}



var info = {}
info.bid = 'com.smile.gifmaker'
info.name = '快手'
log([currentPackage(),currentActivity(),device.width,device.height]);


// click(device.width/4,device.height-20)
// sleep(2000);
// jsclick('id',"clearAnimView",true,2)
// sleep(2000);

main();




