// 脚本功能:主脚本依次启动两个脚本,并循环运行.主脚本不停止.
var myAPP = {};
myAPP.imei = device.getIMEI();
myAPP.site = "http://api.wenfree.cn/public/"   //后台地址
myAPP.taskTimeOut = 60000;  //单任务超时时长
var public = require('public.js');
var imei = myAPP.imei;
var phone = public.getStorageData(imei, "phone");
var tag = public.getStorageData(imei, "tag");
var whos = public.getStorageData(imei, "whos");

//-------------------------------------------------------------------------------------------------------------------------
main();

function main() {
    var ID = setInterval(() => { }, 1000);  //保持主脚本不停，实际使用有ui也可以没有这个
    var mainEnengine = engines.myEngine();   //当前脚本的脚本引擎对象
    mainEnengine.emit("control", -1);  //向当前脚本发送一个事件，该事件可以在目标脚本的events模块监听到并在脚本主线程执行事件处理。
    events.on("control", (i) => {
        i++;
        log("i",i)
        var json = getJsonData(myAPP.site);   //获取脚本任务配置
        
        if(json.data.type == "download"){
            var data = json.data.data;
            for (let ii=0;ii<data.length;ii++){
                var name = data[ii];
                var url = get_js_code(name)
                log("name",name,"url",url)
                downScriptFile(name,url);
            }
            donwload_OK();
            sleep(500)//下载后休息5秒
            mainEnengine.emit("control", -1);   //所有任务结束后,让监听重新开始
        }else
        if(json.data.type == "task"){
            var data = json.data.data
            if (i < data.length) {
                let path = engines.myEngine().cwd() + "/modules/"+ data[i]+ "/"+ data[i] + ".js"  //脚本路径
                log(path)
                if (files.exists(path)) {
                    log("脚本存在");
                    //把数据存入adb
                    var execution = engines.execScriptFile(path)  //在新的脚本环境中运行脚本文件path。返回一个ScriptExecution对象。获取子脚本对象
                    sleep(1000)//等待子脚本运行
                    log("execution-------------");
                    log(execution);
                    var aengine = execution.getEngine();  //获取子脚本引擎对象(ScriptEngine)
                    log("aengine---------------");
                    log(aengine);
                    sleep(1000)//等待子脚本运行
                    aengine.emit("prepare", i, mainEnengine)   //向子脚本发送一个事件，该事件可以在目标脚本的events模块监听到并在脚本主线程执行事件处理。
                    // var enginess = []
                    // enginess.push(aengine); //便于后续管理 
                    // log("enginess--",enginess)

                } else {
                    log("脚本文件不存在,请下载后再执行")
                    log(data[i])
                    var name = data[i]
                    var url = get_js_code(name)
                    downScriptFile(name,url);
                    sleep(1000);
                    mainEnengine.emit("control", -1);
                }
            }else{
                mainEnengine.emit("control", -1);   //所有任务结束后,让监听重新开始
                let i = 0;
                while (i < 5) {
                    toastLog("休息倒计时" + (5 - i) + "秒")
                    sleep(2000);
                    i++;
                }
            }
        }else{
            let i = 0;
            while (i < 30) {
                toastLog("休息倒计时" + (30 - i) + "秒")
                sleep(500)
                i++;
            }
            mainEnengine.emit("control", -1);
        }
        sleep(1000);
    });
};

// 获取接口数据
function getJsonData(url) {
    let res = http.post(url, {
        "s": "App.NewsImei.Imei",
        "imei": imei,
        "imei_tag": tag,
        "whos": whos,
    });

    let json = {};
    try {
        let html = res.body.string();
        // log(html)
        json = JSON.parse(html);
        log(json)
        return json;
    } catch (err) {
        //在此处理错误
    }
};

function get_js_code(js_name){
    let res = http.post("http://api.wenfree.cn/public/", {
        "s": "App.NewsJs.Get_js_name",
        "js_name": js_name,
    });
    if(res){
        let html = res.body.string();
        json = html ? JSON.parse(html) : json;
        log(json)
        return json.data.js_url
    }
}

// 返回脚本下载完成接口
function donwload_OK() {
    let res = http.post(myAPP.site, {
        "service": "App.Zllgcimei.Imei",
        "imei": imei,
        "imei_tag": tag,
        "imei_js_todo": "done",
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