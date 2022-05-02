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


//批查打印app参数
function printAll( ways ) {
    if (!ways){
        ways = 'className'
    }
    if (ways = 'className'){
        var all_Info = classNameMatches(/.*/).find();
    }else
    if (ways == 'text'){
        var all_Info = textMatches(/.*/).find();
    }else
    if (ways == 'id'){
        var all_Info = idMatches(/.*/).find();
    }else{
        eval( 'var all_Info = ' + ways + '.find();'  )
    }
    
    if ( all_Info ){
        for (var i = 0;i<all_Info.length;i++){
            var d = all_Info[i];
            log(i,d.id(),d.text(),"desc:"+d.desc(),'"className":"'+d.className()+'"',
            "clickable->"+d.clickable(),'selected->'+selected(),"depth->"+d.depth(),
            d.bounds().centerX(),d.bounds().centerY())
        }
    }else{
        log('没有找到任何相关的节点')
    }
}


printAll()



//河马ip
function hmip(){
    var result = shell("ipclient faa31f81bfea4124995972d5dc016b57 1", true);
    // console.show();
    // log(result);
    if(result.code == 0){
        toastLog("执行成功");
      return true
    }else{
        toastLog("执行失败！请到控制台查看错误信息");
    }
}


//设备大师
function sbds(){
    let fix = false
    var start = false
    var timeLine = new Date().getTime()
    while ( new Date().getTime() - timeLine < 5 * 60 * 1000 ) {

        if ( f.active( appinfo.sbdsbid , 5)  ){

            if (fix && f.ms({"text":"修改设备"},false,rd(2,3) )){
                return true
            }else
            if ( f.ms({"text":"修改设备"},true,rd(2,3) )   ){
                start = true;
            }else if ( start && f.ms("id","brand",true,rd(2,3) ) ){

                var phonelist = [ "XIAOMI","HUAWEI","SAMSUNG","HONOR","vivo"]
                if ( f.ms({"text":phonelist[rd(0,4)],"depth":4},true,rd(1,2)) ) {
                    f.ms("text","下一步",true,rd(2,3))
                }else{
                    f.ms("id","back",true,rd(2,3))
                }
                
            }else if( start && f.ms("text","立即清理",false,rd(2,3)) ){
                f.ms("text","以吾之力",true,1)
                f.ms("text","QQ浏览器",true,1)

                if ( f.ms("text","立即清理",true,rd(10,15)) ){
                    fix = true
                }
            }else{
                f.ms("id","back",true,rd(2,3))
            }
        }
        sleep(1000);
    }
}


//设备大师
function sbdsJk(){

    f.active(appinfo.sbdsbid, 8)
    var result = shell("setphone" ,true);

    phoneMode = [
        "vivo_Y85A",
        "vivo_Y67A",
        "vivo_X21A",
        "V2055A",
        "V2049A",
        "V1089A",
    ]
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
    // var result = shell("pm clear com.youxiang.soyoungapp",true)
    log(result);
    if(result.code == 0){
        toastLog("一键清理 执行成功");
    }else{
        toastLog("一键清理 执行失败！请到控制台查看错误信息");
    }

    
    recents();
    sleep(3000)

    if ( f.ms({"descMatches":"移除设备大师.*"},true,5)){
        return true
    }
}

//设备大师参数信息
function getsbds() {
    let fix = false;
    var start = false;
    var timeLine = new Date().getTime();
    while (new Date().getTime() - timeLine < 3 * 60 * 1000) {
        if (  f.active(appinfo.sbdsbid, 10)  ) {
            
            if ( f.ms({"text":"当前设备"} ) ){
                log("设备信息界面");
                appinfo.imei = id("imei").findOne(100).text();
                appinfo.oaid = id("android_id").findOne(100).text();
                appinfo.device = id("phone_model").findOne(100).text();
                appinfo.brand = id("phone_brand").findOne(100).text();

                // console.show()
                log( appinfo );
                home()
                sleep(1000)
                return true;
            }

        }
    }
}

//上传idfa
function Idfa(){
    let postArr = {};
    postArr['service'] = 'Idfa.idfa';
    postArr['name'] = appinfo.name;
    postArr['idfa'] = appinfo.imei || new Date();
    let data = f.post("http://wenfree.cn/api/Public/idfa/",postArr);
}


//主程序
function main(){

    f.active(appinfo.bid, 5)
    var timeLine = new Date().getTime();
    while (new Date().getTime() - timeLine < 0.5 * 60 * 1000) {
        
        f.ms({"text":"同意"},true,3)
        f.ms({"textMatches":"开启.*"},true,3)


        f.ms({"textMatches":"允许.*"},true,3)
        f.ms({"textMatches":"允许.*"},true,3)
        f.ms({"idMatches":"arg.*"},true,3)
        f.ms({"textMatches":"允许.*"},true,3)
        f.ms({"textMatches":"允许.*"},true,3)
        f.ms({"textMatches":"继续使用"},true,3)
        f.ms({"textMatches":"首页"},true,3)
        f.ms({"textMatches":"问证"},true,3)


        sleep(2000)
    }
}


// 正式开始编代码
var width = 720;
var height = 1440;
var width = device.width;
var height = device.height;
var phoneMode = device.brand;

log([currentPackage(),currentActivity(),width,height]);
var appinfo = {}
appinfo.name = "新华社";
appinfo.bid = "net.xinhuamm.mainclient";
appinfo.llq = "com.tencent.mtt";
appinfo.gzbid = "com.deruhai.guangzi";
appinfo.sbdsbid = "com.longene.setcardproperty";
info ={};



function all(){
    while (true){
        // if ( true || hmip() ){
        if ( hmip() ){

            if ( sbdsJk() ){

                if ( true || getsbds() ){

                    main()
                    Idfa()

                }

            }

        }

    }
}


all()