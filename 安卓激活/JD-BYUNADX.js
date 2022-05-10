auto.waitFor()



//新版基础函数
var f = {
    init:function() {
        log("程序初始化")
    },
    //post
    post : function(url,data){
        var res = http.post(url, data);
        var data = res.body.string();
        if(data){
            // log(data);
            return data;
        }
    },
    //get
    get : function(url){
        var res = http.get(url);
        var data = res.body.string();
        if(data){
            return data;
        }
    },
    //读取本地数据
    getLocal:function ( name, key) {
        const storage = storages.create(name);  //创建storage对象
        if (storage.contains(key)) {
            return storage.get(key);
        };
        //默认返回undefined
    },
    //基础函数
    active:function(pkg,n){
        if(!n){n=5}
        if(  currentPackage() == pkg ){
            log("应用在前端");
            return true;
        }else{
            log("启动一次应用");
            app.launch(pkg);
            sleep(1000)
            f.ms({"textMatches":"允许|始终允许"},true)
            sleep(1000*n)
        }
    },
    //准备点击
    click:function (x,y,sleeptime,name){
        if ( ! sleeptime ){sleeptime = 1}
        if ( name ){
            log('准备点击->'+name,"x:",x,"y:",y);
        }else{
            log('准备点击坐标->', "x:",x,"y:",y);
        }
        if( x > 0  && y > 0  ){
            threads.start(function(){
                //在新线程执行的代码
                click(x,y);
            });
            // click(x,y);
            sleep(sleeptime*1000);
            return true
        }else{
            log('坐标错误');
        }
    },
    //点击obj
    clickObj:function (obj,sleeptime,name){
        if ( ! sleeptime ){ sleeptime == 1 } 
        log(  name ? ("准备点击对象->" + name) : "点击未命名对象" )
        x = obj.bounds().centerX()
        y = obj.bounds().centerY()
        return f.click(x,y,sleeptime,name)
    },
    //穿透点击
    clickTrue:function(obj,sleeptime,name,lun){
        sleeptime ? sleeptime : 1
        let result = false;
        lun ? lun : 3
        for (let i=0;i<lun;i++){
            if (  obj && obj.clickable() ){
                obj.click();
                log(  name ? ("准备穿透点击对象->" + name) : "准备穿透点击未命名对象" )
                result = true
                break
            }
            obj = obj.parent()
        }
        if ( result ) { sleep(sleeptime * 1000) }
        return result
    },
    //正则点击
    ms:function (obj,clicks,sleeptimes,name,findtime,lun){
        if (!sleeptimes) { sleeptimes = 1}
        if (!findtime) { findtime = 200}
        if (!lun) { lun = 3}

        var txt = '';
        for(let key in obj){
            if ( key.search("Matches") > 0 ){
                eval("var matches = /" + obj[key] + "/")
                txt = txt + key+'('+matches+').'
            }else if( key ==  'boundsInside' ){
                txt = txt + key+'('+obj[key]+').'
            }else{
                txt = txt + key+'("'+obj[key]+'").'
            }
        }
        var txt = "let objs = "+txt+"findOne("+findtime+");"
        log(txt)
        eval(txt)
        if ( objs ) {
            log( '找到==>' + objs.text() || objs.desc() || objs.id() || objs.className() )
            if ( clicks ){
                name = obj['textMatches'] || obj['descMatches'] || obj['idMatches'] || obj['text'] || obj['desc'] || obj['id']
                if (lun < 1 || !f.clickTrue( objs,sleeptimes,name,lun )){
                    log('准备坐标点击')
                    return f.clickObj( objs,sleeptimes,name );
                }
            }
            return true;
        }
    },
    rd:function (min,max){
        if (min<=max){
            return random(min,max)
        }else{
            return random(max,min)
        }
    },
    moveTo:function (x,y,x1,y1,times){
        swipe(x,y,x1,y1,times);
        sleep(1000);
    }
}
f.init()



//post
function jspost(url,data){
    var res = http.post(url, data,{
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            'Connection' : 'keep-alive',
        }
    });
    var data = res.body.string();
    if(data){
        log(data);
        return data;
    }
}

//postjson
function jspostjson(url,data){
    var res = http.postJson(url, data,{
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            'Connection' : 'keep-alive',
        }
    });
    var data = res.body.string();
    if(data){
        log(data);
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
function click_(x,y,sleeptime,txt){
    if ( ! sleeptime ){sleeptime = 1}
    if ( txt ){
        log('准备点击->'+txt,"x:",x,"y:",y);
    }else{
        log('准备点击坐标->', "x:",x,"y:",y);
    }
    if(x > 0 && x < width && y > 0 && y < height ){
        click(x,y);
        sleep(sleeptime*1000);
        return true
    }else{
        log('坐标错误');
    }
}
//点击obj
function click__(objs,sleeptime,txt){
    if ( ! sleeptime ){ sleeptime == 1 } 
    
    if ( txt ){
        log('准备点击对象->' + txt)
    }else{
        log('点击未命名对象')
    }
    click_(objs.bounds().centerX(),objs.bounds().centerY(),sleeptime,txt)
}

//普通封装
function jjsclick(way,txt,clickKey,sleeptimes,height_){
    sleeptimes = sleeptimes || 1;//当n没有传值时,设置n=1
    if(!height_){height_ = height };//没有设置高度则height = 1440
    if(!clickKey){clickKey=true}; //如果没有设置点击项,设置为false

    var objs = false;
    if (way == "text"){
        objs = text(txt).findOne(200);
    }else if(way == "id"){
        objs = id(txt).findOne(200);
    }else if(way == "desc"){
        objs = desc(txt).findOne(200);
    }
    if(objs){
        if ( objs.bounds().centerX() < 0 || objs.bounds().centerX()> width || objs.bounds().centerY() < 0 || objs.bounds().centerY() > height_ ){

        }else{
            if ( clickKey ){
                log('准备点击->',txt,"x:",objs.bounds().centerX(),"y:",objs.bounds().centerY());
                click__(objs,sleeptimes,txt);
            }else{
                log("找到->",txt);
            }
            return true;
        }
    }
}
//普通封装
function jsclick(way,txt,clickKey,sleeptimes,height_){
    sleeptimes = sleeptimes || 1;//当n没有传值时,设置n=1
    height_ = height_ || height;//没有设置高度则height = 1440
    clickKey = clickKey || false; //如果没有设置点击项,设置为false

    var objs = false;
    if (way == "text"){
        objs = text(txt).findOne(200);
    }else if(way == "id"){
        objs = id(txt).findOne(200);
    }else if(way == "desc"){
        objs = desc(txt).findOne(200);
    }
    if(objs){
        if ( objs.bounds().centerX() < 0 || objs.bounds().centerX()> width || objs.bounds().centerY() < 0 || objs.bounds().centerY() > height_ ){

        }else{
            if ( clickKey ){
                log('准备点击->',txt,"x:",objs.bounds().centerX(),"y:",objs.bounds().centerY());
                if (! clickTrue(objs,sleeptimes,txt) ){
                    click__(objs,sleeptimes,txt);
                }
            }else{
                log("找到->",txt);
            }
            return true;
        }
    }
}
//强制点击
function bclick(way,txt,clickKey,sleeptimes,height){
    sleeptimes = sleeptimes || 1;//当n没有传值时,设置n=1
    height_ = height_ || height;//没有设置高度则height = 1440
    var obj = false;
    clickKey = clickKey || false; //如果没有设置点击项,设置为false
    if (way == "text"){
        obj = text(txt).findOne(200);
    }else if(way == "id"){
        obj = id(txt).findOne(200);
    }else if(way == "desc"){
        obj = desc(txt).findOne(200);
    }
    if(obj){
        if ( objs.bounds().centerX() < 0 || objs.bounds().centerX()> width || objs.bounds().centerY() < 0 || objs.bounds().centerY() > height_ ){
            return false
        }
        if ( clickKey ){
            if (! clickTrue(obj,sleeptimes,txt)){
                click__(obj,sleeptimes,txt);
            }
        }else{
            log("找到->",txt);
        }
        return true;
    }
}
//穿透点击
function clickTrue(obj,sleeptime,txt){
    log('clickTrue',txt);
    if (! sleeptime ){ sleeptime = 1}
    let result = false;
    if ( obj && obj.clickable() ){
        obj.click();
        result = true
    }else{
        log('组件不能穿透');
        let obj_ = obj.parent();
        if ( obj_ && obj_.clickable() ){
            obj_.click();
            log('父组件能穿透')
            result = true
        }else{
            log('父组件不能穿透');
        }
    }

    if ( result ) { sleep(sleeptime * 1000) }
    return result;
}
//正则点击
function ms(obj,clicks,sleeptimes,height,txts){
    if (!sleeptimes) { sleeptimes = 1}
    // height_ = height_ || height;//没有设置高度则height = 1440
    var txt = '';
    for(let key in obj){
        if (key == "textMatches"){
            eval("var matches = /" + obj[key] + "/")
            txt =txt + key+'('+matches+').'
        }else{
            txt =txt + key+'("'+obj[key]+'").'
        }
    }
    var txt = "let objs = "+txt+"findOne(200);"
    log(txt)
    eval(txt)
    log(objs)
    if ( objs ) {
        if (clicks){
            if (! clickTrue(objs,sleeptimes,txts)){
                click__(objs,sleeptimes,txts);
            }
        }
        return true;
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

//滑动函数
function moveTo(x,y,x1,y1,times){
    swipe(x,y,x1,y1,times);
    sleep(1000);
}
//新tips
function Tips(){
    log("查询弹窗");

    if(  jsclick("text","允许",true,rd(2,3))  ){
    }else if(  jsclick("text","始终允许",true,rd(2,3))  ){
    }else if(  jsclick("text","打开",true,rd(2,3))  ){
    }else if(  jsclick("text","下载",true,rd(2,3))  ){
    }else if(  jsclick("text","安装",true,rd(2,3))  ){
    }

    let appTips = [
        // {"textMatches":"拒绝"},
        // {"textMatches":"取消"},
        {"textMatches":"我知道了"},
        {"textMatches":"知道了"},
        {"desc":"图标","depth":4},
        {"textMatches":"跳过"},
        {"textMatches":"知道了"},
        {"textMatches":"允许"},
        {"textMatches":".*同.*意.*"},
        {"textMatches":".*重新.*"},
        {"textMatches":".*关闭.*"},
        {"text":"立即更新"},
    ]

    for( let k in appTips ){
        if (ms( appTips[k],true,rd(1,2) ) ){

        }
    }

    log('查询弹窗-end')
}

//河马ip
function hmip(){
    var result = shell("ipclient faa31f81bfea4124995972d5dc016b57 1", true);
    // console.show();
    // log(result);
    if(result.code == 0){
      toast("执行成功");
      return true
    }else{
      toastLog("vpn执行失败！请到控制台查看错误信息");
    }
}

//设备大师
function sbds(){
    let fix = false
    var start = false
    var timeLine = new Date().getTime()
    while ( new Date().getTime() - timeLine < 5 * 60 * 1000 ) {

        if ( active( appinfo.sbdsbid , 5)  ){

            if (fix && jsclick("text","修改设备",false,rd(2,3) )){
                return true
            }else
            if ( jsclick("text","修改设备",true,rd(2,3) )   ){
                start = true;
            }else if ( start && jsclick("id","brand",true,rd(2,3) ) ){

                var phonelist = ["vivo"]
                if ( ms({"text":phonelist[0],"id":"brand","depth":4},true,rd(1,2)) ) {
                    jsclick("text","下一步",true,rd(2,3))
                }else{
                    jsclick("id","back",true,rd(2,3))
                }
                
            }else if( start && jsclick("text","立即清理",false,rd(2,3)) ){

                let i = 0
                while ( i < 10 ){
                    if ( jsclick("text",appinfo.name,true,1) ){
                        break
                    }else{
                        moveTo( width/2,height*0.7,width/2,height*0.2,1000  )
                        sleep(1000)
                    }
                    i++
                }

                if ( jsclick("text","立即清理",true,rd(10,15)) ){
                    fix = true
                }
            }else{
                jsclick("id","back",true,rd(2,3))
            }
        }
        sleep(1000);
        ms({"textMatches":"关闭.*"},true,2)
    }
}


//设备大师
function sbdsJk(oaid){

    active(appinfo.sbdsbid, 8)
    var result = shell("setphone" ,true);

    phoneMode = "setphone -a " + oaid['androidid'] + " -m " + oaid['make'] + " -b " + oaid['make'] + " -o " +  oaid['model'] + " -w " + oaid['mac']

    log(phoneMode)
    
    need = 'var result = shell("' + phoneMode + '" ,true)'

    eval(need)

    // eval( 'var result = shell("setphone -m vivo -b vivo -o ' + phoneMode[rd(0,5)] +'" ,true)'  )

    // var result = shell("setphone -m vivo -b vivo -o Y85A" ,true);
    // console.show();
    log(result);
    if(result.code == 0){
        toastLog("一键新机 执行成功")
    }else{
        toastLog("一键新机 执行失败！请到控制台查看错误信息")
    }

    eval( 'var result = shell("pm clear '+ appinfo.bid +'",true)'  )
    eval( 'var result = shell("pm clear '+ appinfo.llq +'",true)'  )
    // var result = shell("pm clear com.youxiang.soyoungapp",true)
    log(result);
    if(result.code == 0){
        toastLog("一键清理 执行成功");
    }else{
        toastLog("一键清理 执行失败！请到控制台查看错误信息");
    }

    
    recents();
    sleep(3000)

    if ( ms({"descMatches":"移除设备大师.*"},true,5)){
        return true
    }
}


//设备大师参数信息
function getsbds() {
    let fix = false;
    var start = false;
    var timeLine = new Date().getTime();
    while (new Date().getTime() - timeLine < 3 * 60 * 1000) {
        if (  active(appinfo.sbdsbid, 10)  ) {
            
            if ( jsclick("text","当前设备" ) ){
                log("设备信息界面");
                appinfo.imei = id("imei").findOne(100).text();
                appinfo.oaid = id("android_id").findOne(100).text();
                appinfo.device = id("phone_model").findOne(100).text();
                appinfo.brand = id("phone_brand").findOne(100).text();
                appinfo.mac = id("wifi_mac").findOne(100).text();

                // console.show()
                log( appinfo );
                home()
                sleep(1000)
                return true;
            }

        }
    }
}

//vivo云帮手
function main(){

    dpget()
    var timeLine = new Date().getTime()
    while ( new Date().getTime() - timeLine < 0.4 * 60 * 1000 ) {
        Tips();
        sleep(1000);

        ms({"textMatches":".*打开.*"},true)
        ms({"textMatches":".*跳转.*"},true)
        
        click_(72,383,2)
        click_(123,383,2)

        click_(72,500,2)
        click_(123,800,2)

    }

    Idfa()
}

function dpget(){

    var timeLine = new Date().getTime()
    while ( new Date().getTime() - timeLine < 0.4 * 60 * 1000 ) {

        

        if ( active(appinfo.bid,5) ){

            setText(0,"")

            sleep(1000)

            setText(0,'openapp.jdmobile://virtual?params={"category":"jump","des":"m","url":"https://u.jd.com/WdGJ8Fs","keplerID":"0","keplerFrom":"1","kepler_param":{"source":"kepler-open","otherData":{"mopenbp7":"7"}},"union_open":"union_cps"}')

            if ( ms({"text":"点击唤醒"},true,2) ){
                return true
            }

        }

        Tips();
        Tips();
        Tips();
        sleep(1000);

    }

}



//上传系统
function Idfa(){
    let postArr = {};
    postArr['service'] = 'Idfa.idfa';
    postArr['name'] = appinfo.name;
    postArr['password'] = "AaDd112211";
    postArr['idfa'] = appinfo.imei || device.getIMEI()
    let data = jspost("http://wenfree.cn/api/Public/idfa/",postArr);
}


//open url
function open_url(url){
    app.openUrl(url)
    sleep(2000)

    ms({"textMatches":".*浏览器.*"},true,2)
    ms({"textMatches":"始终"},true,2)
    ms({"textMatches":"知道了"},true,2)
    ms({"textMatches":"允许"},true,2)
    ms({"textMatches":"允许"},true,2)

    sleep(5000)
}




// var all_Info = textMatches(/.*/).find();
// for (var i = 0;i<all_Info.length;i++){
//     var d = all_Info[i];
//     log(i,d.id(),d.text(),d.depth())
// }

// 正式开始编代码
var width = 720;
var height = 1280;
var width = device.width;
var height = device.height;
// var phoneMode = device.brand;

log([currentPackage(),currentActivity(),width,height]);

var appinfo = {}
appinfo.name = "JD-BYUNADX";
appinfo.bid = "cn.adget.core";
appinfo.llq = "com.tencent.mtt";
appinfo.gzbid = "com.deruhai.guangzi";
appinfo.sbdsbid = "com.longene.setcardproperty";
info ={};
info.phone = '18128823268';
info.password = 'AaDd112211';
info.htlogin = 'wenfree';
info.htpassword = "AaDd112211";
info.token = '44a1b6f5a690d3dd96abdfc3d546c55d87c7e682';
info.sid = '25094';
info.htapi = 'http://api.haitunpt.com/sms/'
info.yzm = '';



function alls(){
    while (true) {
        start_time = new Date().getHours()
        try{
            if ( start_time > 8 && start_time < 24  ){
                while  (true) {
                    if ( hmip() ){
                        if ( sbdsJk() ){

                            getsbds()
                            main()
                          
                        }
                    }
                }
            }else{
                toastLog("时间不对->"+start_time)
                sleep(3000);
            }
        }catch(e){
            toastLog(e);
            sleep(1000);
        }
    }
}


// alls()

// open_url()

// jdmobile()  


// main()

function getIp()
{
    url = "api.wenfree.cn"
    r = jspost(url,{})
    return JSON.parse(r).data.ip
}

function checkIp_(){
    url = "http://api.wenfree.cn/?s=App.Site.Ip"
    r = f.post(url,{})
    log(r)
    if (r){
        r = JSON.parse(r)
        if ( r.data.state == "ok"){
            toastLog(r.data.ip + "->可以使用->" + r.data.area)
            return true
        }
    }
}

function getAd_(){

    ip_ = getIp()
    url = 'http://byplus.banyunjuhe.com/byssp/deliver'

    data = {}
    data['id'] = "1650272971928"  //new Date().getTime()
    data['id'] = new Date().getTime()
    // var token = "e85976ff091fd9b8c30f0adb3772f809"
    // var token = "78883c97a35a6594cbf69fdda77dae3e"
    var token = "9325dfa40f43fea53e76f8f9f0871dd5"

    data['sign'] = $crypto.digest(data['id']+token, "MD5")
    // data['adp'] = "byadp100102"
    // data['adp'] = "byadp100094"
    data['adp'] = "byadp100090"
    data['adset'] = "S2S"
    data['version'] = { "apiVer": "1.3.1", "sdkVer": "3.2", "appVer": "2.3"}
    device_object = {
        "ip" : ip_,
        "lip" : "192.168.0."+f.rd(2,233),
        "bua" : "Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36",
        "os" : "android",
        // "os" : "IOS",
        "osver" : device.release,
        "imei" : appinfo.imei || device.getIMEI(),
        "oaid" : appinfo.oaid || device.getAndroidId(),
        "aid" : appinfo.oaid || device.getAndroidId(),
        "mac" : appinfo.mac || device.getMacAddress(),
        "h" :  height,
        "w" :  width,
        "dev" :  appinfo.device || device.device,
        "brand" : appinfo.brand || device.brand,
        "carrier" :  0,
        "connectionType" :  0,
        "deviceType" :  3,
        "sysua" :  'Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36'
    }
    log( JSON.stringify(device_object) )
    
    // 密钥，由于AES等算法要求是128/192/256 bits，我们这里长度为16, 即128bits
    // let str16 = "3a9add67a13da932";
    var str16 = token.substr(0,16)
    // log("str16", str16)
    let key = new $crypto.Key(str16);
    
    data['device'] = $crypto.encrypt(JSON.stringify(device_object), key, "AES", {
        output: "base64",
      })
     
    
    log(JSON.stringify(data))
    r = jspostjson(url, data ) 

    return r

}


console.show();


// setText(0,"openapp.jdmobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fccc-x.jd.com%2Fdsp%2Fcl%3Fposid%3D1999%26v%3D707%26union_id%3D1000027281%26pid%3D4838%26tagid%3D103214%26didmd5%3D09fbd8f37b023662890db07bcd14ce6b%26idfamd5%3D__5IDFA5__%26did%3D__IMEIIMEI__%26idfa%3D__IDFAIDFA__%26oaid%3D52b866e0e7714c80%26caidmd5%3D__CAID1__%26oaidmd5%3D__OAID1__%26caid%3D__CAID__%26tg_ext%3D0-00-0%26pl%3D2606%26unt%3D15568%26ct%3D13742105%26to%3Dhttps%253A%252F%252Fprodev.m.jd.com%252Fmall%252Factive%252Fp7L2hkGuXitcGkQoPjrMZfXM66u%252Findex.html%253Fad_od%253D1%2526babelChannel%253Dttt1%22%2C%22m_param%22%3A%7B%22jdv%22%3A%22122270672%7Ckong%7Ct_1000027281_103214%7Czssc%7Cd36d13b9-61c4-4fdf-b7f2-11dbc28d14dd-p_1999-pr_4838-at_103214-pl_2606-unt_15568-ct_13742105-tg_ext_0-00-0%22%7D%2C%22keplerFrom%22%3A%221%22%2C%22kepler_param%22%3A%7B%22source%22%3A%22kepler-open%22%2C%22otherData%22%3A%7B%22channel%22%3A%22b4dc3278288f4a25982ccdec07ebdc41%22%7D%7D%7D")
// f.ms({"text":"点击唤醒"},true,2)


function dp_Link(url){
    log("深度链接")
    f.active(appinfo.bid,3)
    var timeLine = new Date().getTime()
    while ( new Date().getTime() - timeLine < 60* 1000 ){
        Tips()
        Tips()
        setText(0,"")
        sleep(500)
        setText(0,url)
        if(f.ms({"text":"点击唤醒"},true,2)){
            return true
        }
    }
}



function get_imei_wenfree(){
    url = "http://api.wenfree.cn/?s=App.AdImei.GetImei"
    r = f.get(url)
    if (r){
        r = JSON.parse(r)
        return JSON.parse(r.data.info)
    }
}


function all(){
    while (true){
        try{
            
                if ( hmip() ){
                    if ( false || checkIp_() ){
                        // getsbds()
                        
                        oaid = get_imei_wenfree()
                        log( oaid )
            
                        sbdsJk(oaid)
                        ad = getAd_()
                        if ( ad ){
                            ad = JSON.parse(ad)
                            adlist = ad['adList'][0]
                    
                            open_url(adlist['monitor']['view'][0]['url'])
                            open_url(adlist['monitor']['click'][0]['url'])
                            open_url(adlist['monitor']['event'][2]['url'])
                            open_url(adlist['monitor']['event'][3]['url'])
                            open_url(adlist['monitor']['event'][4]['url'])
                            open_url(adlist['monitor']['event'][5]['url'])
                            open_url(adlist['monitor']['event'][1]['url'])
                    
                            open_url(adlist['admUrl'])
                            // open_url(adlist['deepLink'])
                            if( dp_Link(adlist['deepLink']) ){
                                Idfa()
                                sleep( (10+f.rd(1,4)) *1000  )
                            }
            
                            
                        }
                    }
                }else{
                    sleep(5000)
                }
        

        }catch(e){
            log(e)
            sleep(5000)
        }

    }
}



all()














