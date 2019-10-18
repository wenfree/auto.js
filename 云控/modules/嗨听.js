log(currentPackage());
log(currentActivity());


// var all_Info = textMatches(/.*/).find();
// for (var i = 0;i<all_Info.length;i++){
//     var d = all_Info[i]
//     log(i,d.text(),d.depth(),d.desc(),d.className(),d.id());
// }



/*
清除app数据，无需root权限
备注:仅适用小米手机
@author：飞云
@packageName：包名
返回值：Boolean，是否执行成功
*/
function clearApp() {
    var appName = "星巴克"
    var packageName = "com.starbucks.cn"

    let i = 0
    while (i < 10) {
        let activity = currentActivity()
        switch (activity) {
            case "com.miui.appmanager.ApplicationsDetailsActivity":
                if (click("清除数据")) {
                } else if (click("清除全部数据")) {
                } else if (click("确定")) {
                    desc("返回").click();
                    sleep(2000);
                    back();
                    sleep(2000);
                    return true
                }
                break;
            default:
                log("页面:other")
                back()  //返回
                if (!openAppSetting(packageName)) {
                    log("找不到应用，请检查packageName")
                }
                break;
        };
        i++;
        sleep(1000)
    }
    back();
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

var dm={}
dm.sid = '23797';
dm.action = 'loginIn';
dm.name = 'APIak7LKwM4sSFAj';
dm.password = 'AaDd112211';
dm.url = 'http://api.smskkk.com/api/do.php';
dm.token = '0km6b00q06nwvw66cokq7aonoq660m6w';
dm.phone = "";
dm.sms = "";

//登录
function dm_login(){
    let arr = {}
	arr.action = 'loginIn'
	arr.name = dm.name
    arr.password = dm.password
    var res = http.post(dm.url, arr);
    var data = res.body.string();
    if(data){
        var data_arr = data.split("|")
        if(data_arr[0]=='1'){
            dm.token = data_arr[1]
            log('token',dm.token);
            return true;
        }
    }
}


//取手机号
function dm_get_phone(){
    let arr = {}
	arr.action = 'getPhone';
	arr.sid = dm.sid;
    arr.token = dm.token;
    arr.vno = '0';
    var res = http.post(dm.url, arr);
    var data = res.body.string();
    if(data){
        var data_arr = data.split("|")
        if(data_arr[0]=='1'){
            dm.phone = data_arr[1];
            log('phone',dm.phone);
            return true;
        }
    }
}

//取手机号
function dm_get_message(){
    let arr = {}
	arr.action = 'getMessage';
    arr.sid = dm.sid;
    arr.phone = dm.phone;
    arr.token = dm.token;
    var res = http.post(dm.url, arr);
    var data = res.body.string();
    if(data){
        log(data);
        var data_arr = data.split("|")
        if(data_arr[0]=='1'){
            sms = data_arr[1];
            let sms = sms.match(/\d{4,6}/)[0]
            dm.sms = sms
            log('sms',dm.sms);
            return true;
        }
    }
}

dm_login()
// dm_get_phone()
// dm_get_message()

//登录
function up_idfa888(){
    let arr = {}
	arr.service = "Idfa.Idfa";
	arr.name = my_app.name;
	arr.idfa = dm.phone;
    arr.password = "AaDd112211";
    var url = "http://idfa888.com/Public/idfa/";
    var res = http.post(url, arr);
}


var my_app={};
my_app.packageName = 'com.plugsever.crazychat';
my_app.name = '嗨听';

function mian(){
    var phone_input = true
    var password_input = true
    var sms_input = true
    var sms_times = 0
    var reg_ok = false

    var time_line = 0
    while (time_line < 200 ) {

        if(active(my_app.packageName,5)){
            var UI = currentActivity();
            log('UI',UI)
            switch(UI){
                case "com.plugsever.crazychat.MainActivity":
                    log("嗨听首页");
                    if (jsclick("text","设置",false,2)){
                        jsclick("text","退出登录",true,2)
                        return true
                    }else
                    if(jsclick("text","我",true,2)){
                        if(reg_ok){
                            up_idfa888();
                        }
                        (jsclick("text","设置",true,2))

                    }else if(jsclick("text","手机注册",false,2)){
                        if(phone_input && jsclick("text","手机号",false,1)){
                            if(dm_get_phone()){
                                setText(0,dm.phone);
                                sleep(1000);
                                phone_input = false;
                            }
                        }else
                        if(jsclick("text","获取验证码",true,2)){
                        }else 
                        if (password_input && jsclick("text","密码设置",false,2)){
                            setText(2,"AaDd112211");
                            sleep(1000);
                            password_input = false;
                        }else
                        if(sms_input && jsclick("text","验证码",false,2)){
                            if(dm_get_message()){
                                setText(1,dm.sms);
                                sleep(1000);
                                sms_input = false;
                            }
                        }else{
                            if(jsclick("text","注册",true,2)){
                                reg_ok = true
                            }
                        }
                    }else if(jsclick("text","立即注册",true,2)){
                    }
                    break;
                default:
                    log("可能没有启动设置");
                    break;
            }
        }

        sleep(1000*1);
        Tips();
        time_line++
    }
}

function Tips(){
    log("查询弹窗");
    var textTips = {}
    if (jsclick("text","第 3 项权限（共 3 项）",false,1)){
        click("拒绝");
        sleep(2000);
    }
    textTips["允许"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    return true
}


mian()
