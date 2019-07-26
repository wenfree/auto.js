
log(currentPackage())
log(currentActivity())

var my_app = {};
my_app.name = "支付宝";
my_app.Package = "com.eg.android.AlipayGphone";
my_app.pay_pwd = "147258";
my_app.pay_id = "w_yaming@126.com";
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
                case "com.eg.android.AlipayGphone.AlipayLogin":
                    log("支付宝主界面");
                    if(jsclick("desc","搜索",true,2)){
                    }else if(jsclick("text","朋友",true,2)){
                    }else if(jsclick("text","首页",true,2)){
                    }else{
                        back();
                        sleep(1000);
                        home();
                    }
                    break;
                case "com.alipay.android.phone.businesscommon.globalsearch.ui.MainSearchActivity":
                    setText(0,my_app.pay_id);
                    sleep(1000*3)
                    var textstr = "转账: "+my_app.pay_id
                    jsclick("text",textstr,true,3)
                    break;
                case "com.alipay.mobile.transferapp.ui.TFToAccountConfirmActivity_":
                    log("转帐界面");
                    if (jsclick("id","tf_receiveAccountTextView",false,1)){
                        if (id("tf_receiveAccountTextView").findOne(200).text()==my_app.pay_id){
                            setText(0,0.01);
                            sleep(1000*2);
                            jsclick("text","确认转账",true,5);
                        }
                    }
                    break;
                case "com.alipay.android.msp.ui.views.MspContainerActivity":
                    log("确认界面");
                    if(jsclick("text","立即付款",true,5)){
                    }else if(jsclick("text","请输入支付密码",false,1)){
                        input_pay_password(my_app.pay_pwd);
                        sleep(1000)
                    }else if(jsclick("id","nav_right_textview",false,2)){
                        if(jsclick("text","完成",true,2)){
                            back();
                            return true
                        }
                    }
                    break;
                case "com.alipay.mobile.chatapp.ui.PersonalChatMsgActivity_":
                    log("聊天界面");
                    back();
                    break;
                default:
                    back();
                    
            }
            Tips()
        }
        sleep(1000*2);
    }
}











function Tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["放弃红包"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    return true
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
