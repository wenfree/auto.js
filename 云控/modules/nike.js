


// 保持脚本运行
// var ID = setInterval(() => { }, 1000)
// // 监听主脚本消息
// events.on("prepare", function (i, mainEngine) {
//     var my_app = {}
//     my_app.packageName = "com.nike.omega";
//     my_app.name = "nike";

//     mainEngine.emit("control", i);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
//     clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
// });

log(currentPackage());
log(currentActivity());
log(device.width,device.height)

var my_app = {}
my_app.packageName = "com.nike.omega";
my_app.name = "nike";

var info = {}
var nikes ={}
nikes.account={}
while (true){
    try{
        clearApp()
        login();
    }catch(err){
    }
}


function jspost(url,data){
    var res = http.post(url,data);
    var data = res.body.string();
    if(data){
        return data;
    }
}

//读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        return storage.get(key);
    };
    //默认返回undefined
}

function app_info(name,data){
    var url = "http://api.wenfree.cn/public/";
    var postdata = {};
    postdata["s"]="App.ZllgcAppInfo.App_info";
    postdata["imei"]= device.getIMEI();
    postdata["imei_tag"]= getStorageData(device.getIMEI(), "tag");;
    postdata["app_name"]= name;
    postdata["whos"]= "ouwen000";
    postdata["link"]= my_app.link;
    postdata["app_info"]= JSON.stringify(data);
    log(jspost(url,postdata));
}

function callback_task(id,state){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr["id"] = id;
    arr["task_state"] = state;
    var postdata = {};
    postdata["s"]="App.Zllgcimeicallback.Callback_task"
    postdata["arr"] = JSON.stringify(arr)
    log(arr,postdata)
    log(jspost(url,postdata));
}

function getDyUrl(){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr['s']= 'DyUrl.url'
    arr["imei_tag"]= getStorageData(device.getIMEI(), "tag");
    var res = jspost(url,arr);
    if (res){
        res =  JSON.parse(res)
        return res.data.url
    }
}

function getPhone_(){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr['s']= 'NewsImei.getPhone'
    arr["imei"]= device.getIMEI();
    log(arr)
    var res = jspost(url,arr);
    if (res){
        res =  JSON.parse(res)
        return res.data.imei_phone
    }
}

function get(url){
    var r = http.get(url);
    if (r){
        return JSON.parse(r.body.string())
    }
}

function updateNikeLog(workstate){
	var url__ = 'http://zzaha.com/phalapi/public/'
	var Arr={}
	Arr.s = 'Nikesave.Save'
	Arr.address_mail = nikes.account.address_mail
	Arr.workstate = workstate
	jspost(url__,Arr)
}

function backId(){
	var postUrl = 'http://zzaha.com/phalapi/public/'
	var postArr = {}
	postArr.s = 'Nikeback.Back'
	postArr.id = nikes.account.id
	log(jspost(postUrl,postArr))
}

function disable(){
	var postUrl = 'http://zzaha.com/phalapi/public/'
	var postArr = {}
	postArr.s = 'Nikeback.disable'
	postArr.id = nikes.account.id
	log(jspost(postUrl,postArr))
}

function login(){
  
    var time_line = 0
    var setp_ = ''
    var setp__ = 0;

    var getUrl = 'http://zzaha.com/phalapi/public/?s=Nikeagain.Again&again=0'
    var snkrs_account = get(getUrl);
    log(snkrs_account);
    nikes.account.address_mail = snkrs_account.data.address_mail
    nikes.account.address_pwd = snkrs_account.data.address_pwd
    nikes.account.address_phone = snkrs_account.data.address_phone
    nikes.account.id = snkrs_account.data.id
    nikes.account.address_country= snkrs_account.data.address_country
    nikes.account.address_xin = snkrs_account.data.address_xin
    nikes.account.address_ming = snkrs_account.data.address_ming

    updateNikeLog('redmi-登录');

    while (time_line < 100 ) {
        
        var currenapp = currentPackage()
        log("currenapp->"+currenapp)
        if ( active(my_app.packageName) ){
            var UI = currentActivity();
            log('UI',UI,time_line)
            switch(UI){
                case "com.nike.mynike.ui.LoginActivity":
                    setp_ = '加入，登录';
                    if(  jsclick("text","登录",true,2) )
                    break;
                case "com.nike.mynike.ui.MyNikeSocialUniteActivity":
                    setp_ = '登录NIKE帐号';
                    if(jsclick("text","您输入的电子邮件或密码不正确。",false,2)){
                        updateNikeLog('redmi-密码不正确')
                        disable();
                        return false;
                    }else
                    if(jsclick("text","验证你的手机号码",false,2)){
                        updateNikeLog('redmi-验证你的手机号码')
                        disable();
                        return false;
                    }else
                    if (jsclick("text","使用手机号码登录。",false,1)){
                        setText(0,nikes.account.address_mail);
                        setText(1,nikes.account.address_pwd);
                        jsclick("text","登录",true,5);
                    }else
                    if (jsclick("text","使用电子邮件登录。",true,1)){}
                    else if(jsclick("text","请使用其他帐户",true,2))
                    break;
                case "com.nike.mynike.ui.onboarding.OnBoardingActivity":
                    setp_ = '立即开始';
                    if(jsclick("text","您无法更新您的国家/地区，请访问 nike.com。",false,1)){
                        updateNikeLog('无法转区');
                        return false;
                    }else
                    if(jsclick("text","立即开始",true,2)){
                    }else if(jsclick("text","首选产品",false,1)){
                        if (rd(1,100)< 80){
                            jsclick("text","男子",true,2)
                        }else{
                            jsclick("text","女子",true,2)
                        }
                    }else if(jsclick("text","选择感兴趣的内容",false,2)){
                        jsclick("id","item_content_check",true,2)
                    }else
                    if(jsclick("text","请使用其他帐户",true,2)){}
                    else if( jsclick("text","继续",true,2)){}
                    else if( jsclick("text","同意",true,2)){}
                    else if( jsclick("text","确定",true,2)){}

                    if( jsclick("text","中国",true,2)){
                        nikes.account.address_country = 'CN'
                    }
                    jsclick("text","下一步",true,2)
                    jsclick("text","跳过",true,2)
                    break
                case "com.nike.mynike.ui.MainActivity":
                    setp_ = '主界面';
                    if (jsclick("text","设置",true,2)){
                    }else if(jsclick("desc","开放",true,2)){
                    }
                    break
                case "com.nike.mynike.ui.SettingsActivity":
                    setp_ = '设置界面';
                    var all_info = id('widgetText').depth(14).find();
                    if(all_info){
                        for (var i=0;i<all_info.length;i++){
                            var obj = all_info[i];
                            log(i,obj.text())
                            if (i == 0 ){
                                nikes.account.address_mail = obj.text();
                            }else if(i==2){
                                nikes.account.birthday = obj.text();
                                var strs = new Array(); //定义一数组
                                strs = nikes.account.birthday.split("/"); //字符分割
                                log(strs);
                                nikes.account['moon'] = strs[1];
                                updateNike();
                                backId();
                                return true;
                            }
                        }
                    }
                    break
                default:
                    setp_ = '未知界面'
                    setp__++;
                    if ( setp__ > 10 ){
                        setp__ = 0;
                        back();
                        sleep(2000);
                        home();
                        sleep(2000);
                    }
            }
            log(setp_)
        }

        sleep(1000*1);
        Tips();
        time_line++
    }  
}

function Tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["拒绝"]="text";
    textTips["暂不"]="text";
    textTips["允许"]="text";
    textTips["保存"]="text";
    textTips["下一步"]="text";
    // textTips["设置"]="text";
    textTips["好的"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    log('查询弹窗-end')
    return true
}


// nikes.account.address_mail = '9a34ab7878zop53@vvccb.com';
// nikes.account.address_pwd = 'CNDXet5vrpw965';
// nikes.account.birthday = '1993/7/14';
// nikes.account.address_country = 'CN';

// updateNike();


function updateNike(){
	var url_ = 'http://zzaha.com/phalapi/public/'
	var Arr_={}
	Arr_.s = 'Nikesave.Save'
	Arr_.address_mail = nikes.account.address_mail
	Arr_.address_pwd = nikes.account.address_pwd
	Arr_.address_phone = nikes.account.address_phone
	Arr_.address_sheng = '广东省'
	Arr_.address_shi = '深圳市'
	Arr_.address_qu = '罗湖区'
	Arr_.address_country = nikes.account.address_country
	Arr_.birthday = nikes.account.birthday
	Arr_.moon = nikes.account['moon']
	Arr_.imei = device.getIMEI();
	Arr_.iphone = 'Redmi';
	log(Arr_)
	jspost(url_,Arr_)
}

// info_read()
// Tips()
// clearApp()

/*
    清除app数据，无需root权限
    备注:仅适用小米手机
    @author：飞云
    @packageName：包名
    返回值：Boolean，是否执行成功
*/
function clearApp() {
    var appName = "nike"
    var packageName = "com.nike.omega"

    let i = 0
    while (i < 10) {
        let activity = currentActivity()
        switch (activity) {
            case "com.miui.appmanager.ApplicationsDetailsActivity":
                if ( jsclick("text","清除全部数据",true,2) ){}
                else if ( jsclick("text","清除数据",true,2) ){} 
                else if ( jsclick("text","确定",true,2) ) {
                    jsclick("desc","返回",true,2);
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
                    log("找不到应用，请检查packageName");
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
    if(x>0 && x < 720 && y > 0 && y < 1440){
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
            click__(res);
        }else{
            log("找到->",txt);
        }
        sleep(1000*n);
        return true;
    }else{
        // log("没有找到->",txt)
    }
}
//随机数
function rd(min,max){
    if (min<=max){
        return random(min,max)
    }else{
        return random(max,min)
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
dm.sid = '11521';
dm.action = 'loginIn';
dm.name = '6g0hHGsmhqaTd';
dm.password = 'yangmian121';
dm.url = 'http://api.duomi01.com/api';
dm.token = '7b75c50b1bd00e9d07758fe38e92f562';
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

// dm_login()
// dm_get_phone()
// dm_get_message()