// 脚本功能:主脚本依次启动两个脚本,并循环运行.主脚本不停止.
var myAPP = {};
myAPP.imei = device.getIMEI();
myAPP.site = "http://news.wenfree.cn/phalapi/public/"   //后台地址
myAPP.taskTimeOut = 60000;  //单任务超时时长
var public = require('public.js');
var imei = myAPP.imei;
var phone = public.getStorageData(imei, "phone");
var tag = public.getStorageData(imei, "tag");
var whos = public.getStorageData(imei, "whos");

//-------------------------------------------------------------------------------------------------------------------------
var date1, date2, index;
try{
    main();
}catch(e){
    log("报错");
    log(e);
}

function main() {
    var ID = setInterval(() => { }, 1000);  //保持主脚本不停，实际使用有ui也可以没有这个
    var mainEnengine = engines.myEngine();   //当前脚本的脚本引擎对象
    mainEnengine.emit("control", -1);  //向当前脚本发送一个事件，该事件可以在目标脚本的events模块监听到并在脚本主线程执行事件处理。
    events.on("control", (i) => {
        i++;
        log("i",i)
        var json = getJsonData(myAPP.site);   //获取脚本任务配置
        
        if(json.data.type == "download"){
            var data = JSON.parse(json.data.data);
            for (let ii=0;ii<data.length;ii++){
                downScriptFile(data[ii]["js_code"],data[ii]["js_path"]);
            }
        }else
        if(json.data.type == "task"){
            var data = json.data.data
            if (i < data.length) {
                let path = engines.myEngine().cwd() + "/modules/" + data[i] + "/" + data[i] + ".js"  //脚本路径
                log(path)
                if (files.exists(path)) {
                    log("脚本存在")
                    var execution = engines.execScriptFile(path)  //在新的脚本环境中运行脚本文件path。返回一个ScriptExecution对象。获取子脚本对象
                    sleep(1000)//等待子脚本运行
    
                    var aengine = execution.getEngine();  //获取子脚本引擎对象(ScriptEngine)
                    aengine.emit("prepare", i, mainEnengine)   //向子脚本发送一个事件，该事件可以在目标脚本的events模块监听到并在脚本主线程执行事件处理。
    
                    var enginess = []
                    enginess.push(aengine); //便于后续管理  
                } else {
                    log("脚本文件不存在,请下载后再执行")
                }
            }else{
                mainEnengine.emit("control", -1);   //所有任务结束后,让监听重新开始
                let i = 0;
                while (i < 30) {
                    toastLog("休息倒计时" + (30 - i) + "秒")
                    sleep(500)
                    i++;
                }
            }
        }else{
            mainEnengine.emit("control", -1);   //所有任务结束后,让监听重新开始
            let i = 0;
            while (i < 30) {
                toastLog("休息倒计时" + (30 - i) + "秒")
                sleep(500)
                i++;
            }
        }
    });
};

// 获取接口数据
function getJsonData(url) {
    let res = http.post(url, {
        "service": "App.Zllgcimei.Imei",
        "imei": imei,
        "imei_tag": tag,
        "whos": whos,
    });

    let json = {};
    try {
        let html = res.body.string();
        // log(html)
        json = html ? JSON.parse(html) : json;
        return json;
    } catch (err) {
        //在此处理错误
    }
};


// 下载脚本
function downScriptFile(name,url) {
    if (!url.endsWith(".js")) {
        log("downScriptFile:url不是js地址,请检查")
    } else {
        log(url);
        let res = http.get(url);
        let runCat = files.cwd()   //获取脚本工作夹路径:  /storage/emulated/0/脚本

        if (res.statusCode != 200) {
            toast("downScriptFile:请求失败");
        } else {
            let path = runCat + "/modules/" + name + "/" + name + ".js";
            // log(path)
            files.createWithDirs(path)  //创建文件.如果上层目录不存在,则自动创建目录
            if (files.exists(path)) {
                files.write(path, res.body.string());
                log("downScriptFile:下载成功");
                return true
            };
        };
    };
}