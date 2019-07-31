
log(currentPackage())
log(currentActivity())

var app_name = "星巴克";

// var d = idMatches(/.*/).find();
// var d = textMatches(/.*/).find();
// if (d){
//     for (var i=0;i<d.length;i++){
//         var dd = d[i]
//         log(i,dd.text(),dd.id(),dd.desc(),dd.bounds())
//         if(i==645){
//             // log(click__(dd))
//         }
//     }
// }

// jsclick("id","J_intallBar",true,2)

// download(app_name)

// var d = id("J_detailInstallBtn").findOne(2000);
// if (d){
//     log(d.text())
// }






function download(app_name) {
    launchApp("应用商店");
    sleep(2000);
    var data_time_line = 0;
    while (data_time_line <= 180) {
        var UI = currentActivity()
        console.log("UI->", UI)
        switch (UI) {
            case "com.xiaomi.market.ui.MarketTabActivity":
                jsclick("desc", "搜索框", true, 2)
                break;
            case "com.xiaomi.market.ui.SearchActivityPhone":
                setText(0, app_name);
                sleep(2000);
                var a = text(app_name).findOne(1000);
                if (a) {
                    console.log(a.bounds().centerX(), a.bounds().centerY());
                    click(a.bounds().centerX(), a.bounds().centerY() + 100);
                    click("立即下载");
                }
                break;
            case "com.xiaomi.market.ui.AppDetailActivityInner":
                sleep(1000);
                var has = text(app_name).findOne(1000);
                if (has) {
                    if(load && jsclick("text","安装",true,2)){
                        console.log(000)
                        console.log(load);
                        sleep(1000);
                        
                        if(device.model == "Redmi 7A"){
                            click(378,1280); 
                        }else{
                            click(556,1809);
                        }
                        load = false;
                        sleep(1000);
                        jsclick("text","立即下载",true,2)
                        back();              
                    }else if(jsclick("text","继续",true,2)){ 
                        console.log(222)  
                        sleep(1000);
                        back()          
                    }else if(jsclick("text","打开",false,2)){
                        console.log(44)
                        sleep(1000);
                        home();
                        sleep(1000);
                        // killApp(packageName);
                        return true;
                    }else{
                        back();
                        sleep(2000);
                    }                
                }
                break;
            default:
                back();
                sleep(1000);
                launchApp("应用商店");
                sleep(5000);
                    
        }
        data_time_line++;
        sleep(1000);
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

//准备点击
function click_(x,y){
    if(x>0 && x < device.width && y > 0 && y < device.height){
        click(x,y)
    }else{
        log('坐标错误')
    }
}

//点击obj
function click__(obj){
    click_(obj.bounds().centerX(),obj.bounds().centerY())
}

//普通封装
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
            click_(res.bounds().centerX(),res.bounds().centerY());
        }else{
            log("找到->",txt);
        }
        sleep(1000*n);
        return true;
    }else{
        // log("没有找到->",txt)
    }
}

//输入密码
function input_pay_password(password){
    var key_xy = {}
    key_xy[1]=[device.width*0.3,device.height*7/10]
    key_xy[2]=[device.width*0.5,device.height*7/10]
    key_xy[3]=[device.width*0.8,device.height*7/10]
    key_xy[4]=[device.width*0.3,device.height*7.5/10]
    key_xy[5]=[device.width*0.5,device.height*7.5/10]
    key_xy[6]=[device.width*0.8,device.height*7.5/10]
    key_xy[7]=[device.width*0.3,device.height*8/10]
    key_xy[8]=[device.width*0.5,device.height*8/10]
    key_xy[9]=[device.width*0.8,device.height*8/10]
    key_xy[0]=[device.width*0.5,device.height*9/10]
    // 清除其它字符
    password = password.replace(/\D/g,"")
    for(var i=0;i<password.length;i++){
        var numbers = password.substring(i,i+1);
        click_(key_xy[numbers][0],key_xy[numbers][1])
        sleep(300)
    }
}


function sendBroadcast(appName,data){
    app.launchPackage( "com.flow.factory");
    sleep(2000)
    var mapObject = {
            appName:appName,
            data:data
        }
    app.sendBroadcast(
        {
            packageName: "com.flow.factory",
            className: "com.flow.factory.trafficfactory.broadcast.TaskBroadCast",
            extras:mapObject
        }   
    );
}

