// 脚本功能:主脚本依次启动两个脚本,并循环运行.主脚本不停止.
var myAPP = {};
myAPP.site = "http://news.wenfree.cn/phalapi/public/"   //后台地址
myAPP.taskTimeOut = 60000;  //单任务超时时长

//-------------------------------------------------------------------------------------------------------------------------
var date1, date2, index;
main();

function main() {
    var ID = setInterval(() => { }, 1000);  //保持主脚本不停，实际使用有ui也可以没有这个
    var mainEnengine = engines.myEngine();   //当前脚本的脚本引擎对象
    mainEnengine.emit("control", -1);  //向当前脚本发送一个事件，该事件可以在目标脚本的events模块监听到并在脚本主线程执行事件处理。
    events.on("control", (i) => {
        i++;

        var json = getJsonData(myAPP.site);   //获取脚本任务配置
        let names = json.data.name   //数组
        // let appScriptSite = json.data.js_path   //下载地址
        log(names)
        // var names = []
        // if (appName != "") {
        //     names.push(appName)
        // } else {
        //     toastLog("未获取到任务脚本名称!")
        // };

        if (i < names.length) {
            let path = engines.myEngine().cwd() + "/modules/" + names[i] + ".js"  //脚本路径
            // log(path)
            if (files.exists(path)) {
                // date1 = new Date();    //开始时间
                // date2 = date1.getTime()
                // var thread = threads.start(function () {
                //     //在新线程执行的代码
                //     while (true) {
                //         date1 = new Date();    //结束时间
                //         let date3 = date1.getTime()
                //         if ((date3 - date2) > myAPP.taskTimeOut) {
                //             // 设置超时：防止有的页面，比如广告页，没有明显的标识。会出现阻塞的问题。
                //             log("任务已超时")
                //             //停止线程执行
                //             thread.interrupt();
                //         };
                //     }
                // });

                var execution = engines.execScriptFile(path)  //在新的脚本环境中运行脚本文件path。返回一个ScriptExecution对象。获取子脚本对象
                sleep(1000)//等待子脚本运行

                var aengine = execution.getEngine();  //获取子脚本引擎对象(ScriptEngine)
                aengine.emit("prepare", i, mainEnengine)   //向子脚本发送一个事件，该事件可以在目标脚本的events模块监听到并在脚本主线程执行事件处理。

                var enginess = []
                enginess.push(aengine); //便于后续管理  
            } else {
                log("脚本文件不存在,请下载后再执行")
            }

        } else {
            mainEnengine.emit("control", -1);   //所有任务结束后,让监听重新开始
            let i = 0;
            while (i < 30) {
                toastLog("休息倒计时" + (30 - i) + "秒")
                sleep(1000)
                i++;
            }
        }
    });
};

// 获取接口数据
function getJsonData(url) {
    let res = http.post(url, {
        "service": "App.Zllgcimei.Imei",
        "imei": device.getIMEI(),
        "imei_tag": "测试标签",
        "whos": "ouwen000",
    });

    let json = {};
    try {
        let html = res.body.string();
        // log(html)
        json = html ? JSON.parse(html) : json;
    } catch (err) {
        //在此处理错误
    }
    return json;
};


// 下载脚本
function downScriptFile(url) {
    let result = false   //执行结果
    if (!url.endsWith(".js")) {
        log("downScriptFile:url不是js地址,请检查")
    } else {
        let res = http.get(url);
        let fileName = getEndValue(url)  //获取带后缀的文件名
        let runCat = files.cwd()   //获取脚本工作夹路径:  /storage/emulated/0/脚本

        if (res.statusCode != 200) {
            toast("downScriptFile:请求失败");
        } else {
            let path = runCat + "/modules/" + fileName
            // log(path)
            files.createWithDirs(path)  //创建文件.如果上层目录不存在,则自动创建目录

            if (files.exists(path)) {
                files.write(path, res.body.string());
                log("downScriptFile:下载成功");
            } else {
                log("downScriptFile:创建文件失败/文件不存在!")
            };
        };
    };

    return result;
}