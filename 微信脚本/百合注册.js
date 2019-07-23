function click_(x,y){
    if(x>0 && x < device.width && y > 0 && y < device.height){
        click(x,y)
    }else{
        log('坐标错误')
    }
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
            click_(res.bounds().centerX(),res.bounds().centerY());
            sleep(1000*n);
        }else{
            log("找到->",txt);
        }
        return true;
    }else{
        // log("没有找到->",txt)
    }
}


function Tips(){
    log('查询系统弹窗');
}

function reg() {

    var data_time_line = 0;
    while(data_time_line < 180){
        var UI = currentActivity()
        log("UI->",UI)
        switch(UI){
            case "com.baihe.libs.login.activity.LGIndexActivity":
                if (jsclick("text","由极验提供技术支持",false,2)){
                    log("出现了验证码");
                    swipe((172+452)/2,(1359+1635)/2,device.width*3/4,(1359+1635)/2,2000)
                    sleep(1000);
                }else{
                    jsclick("text","注册",true,2)
                    if (jsclick("text",'我是男士',false,2)){
                        setText(3,'18128823268')
                        if(random(1,100) < 70){
                            accountInfo['sex']='男'
                            jsclick('text',"我是男士",true,2)
                        }else{
                            accountInfo['sex']='女'
                            jsclick('text',"我是女生",true,2)
                        }
                    }
                }
                break;
            case "com.baihe.index.activity.StartActivity":
                log('启动界面');
                break;
            default:
                log("app未启动");
                back();
                sleep(1000);
                home();
                sleep(2000);
                launchApp(appName);
                sleep(1000*8);
                break;
        }

        Tips();
        data_time_line++;
        sleep(1000); 
    }
}



var appName = '百合婚恋';
var appBid = 'com.baihe';
var accountInfo = [];



log(
    currentActivity()
)

reg();

var title = textMatches(/.*/).find();
if (title){
    for (var i=0;i<title.length;i++){
        log(i,title[i].text())
    }
}


///流量工厂   


//









