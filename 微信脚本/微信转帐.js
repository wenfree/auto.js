log(currentActivity())
log(currentPackage())

var my_app = {};
my_app.name = "微信";
my_app.Package = "com.tencent.mm";
my_app.pay_pwd = "147258";
my_app.pay_id = "kevin_wu99";
my_app.pay_nickname = "";

var all_Info = idMatches(/.*/).find();
for (var i = 0;i<all_Info.length;i++){
    var d = all_Info[i]
    log(i,d.text(),d.depth(),d.desc(),d.className(),d.id());
}




mian()

function mian(){
    while (true) {
        if ( active(my_app.Package) ){
            var UI = currentActivity();
            log('UI',UI)
            switch(UI){
                case "com.tencent.mm.ui.LauncherUI":
                    log("微信主界面");
                    if(jsclick("id","c2",true,2)){
                        setText(0,my_app.pay_id);
                    }else if(jsclick("text","通讯录",true,2)){
                    }else if(jsclick("text","微信",true,2)){
                    }else{
                        back();
                        sleep(1000);
                        home();
                    }
                    break;
                case "com.tencent.mm.plugin.fts.ui.FTSMainUI":
                    if(jsclick("id","com.tencent.mm:id/rc",false,0)){
                        my_app.pay_nickname = id("com.tencent.mm:id/rc").findOne().text()
                        log(my_app.pay_nickname);
                        if(jsclick("text","微信号: "+my_app.pay_id,true,2)){
                        }else{
                            setText(0,my_app.pay_id);
                        }
                    }
                    break;
                case "com.tencent.mm.ui.chatting.ChattingUI":
                    log("聊天界面");
                    if (jsclick("text",my_app.pay_nickname,false,0)){
                        if(jsclick("text","转账",true,2)){
                        }else if(jsclick("desc","更多功能按钮，已折叠",true,2)){
                        }
                    }else{
                        log("不是目标聊天界面");
                        back();
                    }
                    break;
                case "com.tencent.mm.plugin.remittance.ui.RemittanceUI":
                    log("转帐界面");
                    setText(0,0.01);
                    if(jsclick("id","fsq",true,3)){
                    }else if(jsclick("id","fsk",true,3)){
                    }
                    break;
                case "com.tencent.mm.plugin.wallet.pay.ui.WalletPayUI":
                    if (jsclick("text","支付方式",false)){
                        input_pay_password(my_app.pay_pwd);
                    }
                    break;
                case "com.tencent.mm.plugin.remittance.ui.RemittanceResultNewUI":
                    if (jsclick("text","完成",true,5)){
                        return true
                    }
                    break;
            }
            
        }
        sleep(1000*2);
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
