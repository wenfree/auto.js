// 脚本功能:主脚本依次启动两个脚本,并循环运行.主脚本不停止.
var myAPP = {};
myAPP.imei = device.getAndroidId();
myAPP.site = "http://mir4.honghongdesign.cn"   //后台地址
myAPP.taskTimeOut = 60000;  //单任务超时时长
var public = require('public.js');
const { info } = require('__console__');
var imei = myAPP.imei;
var task_id = public.getStorageData(imei, "task_id");
log("task_id--------", task_id)
myAPP.dy_bid = "com.ss.android.ugc.aweme"
var width = device.width
var height = device.height
log([currentPackage(),currentActivity(),width,height]);
//------------------------------------------------------------------------------------------------------------------

function main() {
    log("task_id", task_id)
    while (true){
        try{
            taskinfo = getJsonData()
            if ( taskinfo ){
                log( taskinfo )
                sendComment(taskinfo)
            }
        }catch(e){
            log(e)
        }
        sleep(1000*5)
    }
};

// 获取接口数据
function getJsonData() {
    const data = {
        "s": "App.Site.Select_where",
        "table": "comment_task",
        "page": 1,
        "size": 99,
        "where": JSON.stringify({id:task_id})
    }
    log(data)
    try {
        let res = http.post("http://mir4.honghongdesign.cn", data );
        let json = {};
        let html = res.body.string();
        json = JSON.parse(html);
        // log(json)
        if( json.data.count > 0 ){
            return json.data.data[0];
        }
    } catch (err) {
        //在此处理错误
        return false;
    }
};


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



function send(){
    let postdata = {
        "s":"App.Comment.Get",
        name: taskinfo.name,
        type: taskinfo.type,
        username: taskinfo.username
    }
    log(  "postdata", postdata)
    let r = http.post("http://mir4.honghongdesign.cn/", postdata );
    if(r){
        let r = JSON.parse(r.body.string())
        let txt = r.data.content
        if ( f.ms({"textMatches":"说点什么..."},true,3) ){
            setText(0,txt)
            if ( f.ms({"desc":"发送"},true,3) ){
                return true
            }
        }else{
            back()
            sleep(1000)
        }
    }
}

function sendComment(info){
    var all_time = info.all_time
    var Time_line = new Date().getTime()
    var live_key = false

    //第一次进直播间
    var in_live = true

    var look_time1_line = true
    var look_time2_line = true
    var look_time1 = info.look_time1
    var look_time2 = info.look_time2
    var send1 = true
    var send2 = true
    var live_out = info.out_key


    while ( new Date().getTime() - Time_line < all_time * 1000 ){
        if( f.active(myAPP.dy_bid,5) ){

            if( f.ms({"id":"b++"}) ){
                log("在直播间")
                if ( live_key ){

                    if ( in_live ){
                        let i = 0
                        while ( i < 20){
                            log("第一次进, 浏览倒计时->", 20 - i )
                            i++
                            sleep(1000)
                        }
                        in_live = false
                    }else
                    //开始查看商品
                    if ( look_time1_line ){
                        if ( f.ms({"desc":"商品"},true,5) ){
                            let i = 0
                            while ( i < look_time1){
                                if ( f.rd(0,100) > 80 ){
                                    f.moveTo( width*0.5, height*0.8, width*0.5, height*0.5, 2000)
                                } 
                                log("浏览商品, 倒计时->", look_time1 - i )
                                i++
                                sleep(1000)
                            }
                        }
                        look_time1_line = false
                        back()
                    }else
                    if ( send1 ){
                        sleep(2000)
                        if ( send(info.name) ){
                            send1 = false
                        }
                    }else
                    //再停留时间
                    if( look_time2_line ){
                        let i = 0
                        while ( i < look_time2){
                            log("第二次发言, 倒计时->", look_time2 - i )
                            i++
                            sleep(1000)
                        }
                        in_live = false
                        look_time2_line = false
                    }else
                    if (send2)
                    {
                        if ( send(info.name) ){
                            send2 = false
                        }
                    }else{
                        if ( live_out ){
                            f.ms({"id":"b++"},true,f.rd(3,8))
                            return true
                        }else{
                            look_time1_line = true
                            look_time2_line = true
                            send1 = true
                            send2 = true
                            sleep(rd(10,40)*1000)
                        }
                    }

                }else{
                    f.ms({"id":"b++"},true,3)
                }

            }else{
                f.ms({"desc":"搜索，按钮"},true,3)
                setText(0,"878608426")
                f.ms({"desc":"搜索"},true,3)
                if ( f.ms({"textMatches":"直播中.*"},true,5) ){
                    live_key = true
                }
            }
        }
        log( (new Date().getTime() - Time_line)/1000 )
        sleep(2000)
    }

}



console.show()
console.setSize(device.width*0.48,device.height*0.3)
console.setPosition(device.width*0.4,200)

main();

events.on("exit", function () {
    log("结束运行 模块脚本");
    console.hide()
  });
