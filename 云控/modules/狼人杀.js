// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息

events.on("prepare", function (i,task_info, mainEngine) {
    log("task_info",task_info);
    log("id=>",task_info.id)
    main();
    log(info);
    info["state"] = "ok";
    app_info(my_app.name,info);
    home();
    callback_task(task_info.id,"done");

    mainEngine.emit("control", i,task_info);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
    clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
});

//--------------------------------------------------------------------------------------------------------------------------

var myAPP = {};
var info = {};

var data = get_data()
var data_time = new Date().getTime();
myAPP.phone = db.phoneNumber();

myAPP.appName = "狼人杀"
myAPP.packageName = "com.c2vl.kgamebox"
// myAPP.version = "7.0.6"

myAPP.site = "http://langrensha.caniculab.com"
myAPP.rndName = getRndName();
myAPP.rndPassword = random(100000, 999999)    //随机六位密码
myAPP.sex = random(1, 100) % 2 == 1 ? 'male' : 'female'     //随机性别
myAPP.downMinute = 10   // 等待多少分钟,根据App文件大小,提前设置不同的分钟数

// 已注册成功的号码
myAPP.phones = {
    '17191185961': true,
    '17056540104': true,
    '17150164887': true,
    '17191206939': true,
    '18500827365': true,
    '18500827357': true,
}

/**
狼人杀APP下载/注册,返回手机号和简单密码
*/
//--------------------------------------------------------------------------------------------------------------------------

log(currentPackage());
log(currentActivity());


// app.openUrl(myAPP.site);
// exit()
// main()

function main() {
    // home();   //刷新节点信息
    log(">>>>>>>>>>>>>>>>>>>>开始执行脚本," + "设备型号:" + device.model)

    // 新建线程,来处理请求截图权限的弹出卡片
    var thread = threads.start(function () {
        //在新线程执行的代码

        let i = 0;
        while (i < 10) {
            log("子线程");
            if (clickNode("text", "立即开始")) {
                thread.interrupt();  //停止线程执行
            };
            i++;
            sleep(1000)
        }
    });
    //请求截图
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        exit();
    };


    if (typeof (myAPP.phone) == "undefined") {
        info["state"] = "未获取到电话号码";
    } else if (myAPP.phones[myAPP.phone]) {
        info["state"] = "手机号已注册过";
    } else {
        log("手机号码:" + myAPP.phone)
        core();
    };

    threads.shutDownAll(); //停止所有线程
    log(">>>>>>>>>>>>>>>>>>>>结束执行脚本,执行结果:" + info["state"])
    sendBroadcast(myAPP.name, JSON.stringify(info))
};

function core() {
    let isStop = false;
    let isFail = false   //是否失败
    // let isLogin = false;
    // let isReg = false;
    let isCut = false;   //是否裁剪照片
    // let count = 0;   //翻页计数
    // let isGetCode = false;   //是否已取短信



    while (true) {
        myAPP.activity = currentActivity()
        log("页面地址：" + myAPP.activity)

        if (isFail) {
            info["state"] = "no";
            break;  //跳出循环 
        } else if (isStop) {
            if (isCut) {
                info["state"] = "ok";
                info["phone"] = myAPP.phone;
                info["nickname"] = myAPP.rndName;
                info["password"] = myAPP.rndPassword;
                info["sex"] = myAPP.sex;
                log(info);
                app_info(myAPP.appName, info);   //注册成功,上传数据到服务器
            } else if (findNode('id', "tv_user_info_id")) {
                info["state"] = "已注册过";
            };

            break;  //跳出循环 
        };

        switch (myAPP.activity) {

            case "com.android.browser.BrowserActivity":
                log("页面地址：浏览器")
                if (findNode("text", "保存安装包文件")) {
                    // 这里有时候会跳转到应用商店下载
                    if (clickNode("text", "立即下载")) {

                        let i = 0
                        while (i < 60 * myAPP.downMinute) {
                            if (findNode("text", "安装")) {
                                break;
                            };

                            if (random(1, 100) % 3 == 0) {
                                toast("正在下载,请等待" + myAPP.downMinute + "分钟...")
                            }
                            sleep(1000)
                            i++;
                        }
                    } else {
                        back();
                    };
                } else if (findNode("text", "猜你喜欢")) {
                    toastLog("正在下载,请稍候...")
                    sleep(10000)
                    // } else if (findNode("className", "com.miui.webkit.WebView")) {
                    //     // 小米应用商店弹出广告
                    //     toastLog("正在下载,请稍候...")
                    //     sleep(10000)
                } else {
                    let object = text("btn-android-phone").find();
                    if (!object.empty()) {
                        object.forEach(function (currentValue, index) {
                            if (index == object.length - 1) {
                                click(currentValue.bounds().centerX(), currentValue.bounds().centerY())   //立即下载
                            };
                        });

                    } else {
                        log("没找到╭(╯^╰)╮");
                        click(360, 720);
                        sleep(10000)
                    };
                };
                break;

            case "com.android.packageinstaller.PackageInstallerActivity":
                log("页面地址：安装")
                clickNode("text", "安装")
                break;
            case "com.android.packageinstaller.InstallAppProgress":
                log("页面地址：安装-打开")
                clickNode("text", "打开")
                break;
            case "com.android.packageinstaller.permission.ui.GrantPermissionsActivity":
            case "com.c2vl.kgamebox.activity.LoadingActivity":
                log("页面地址：登录方式选择")
                clickNode("id", "com.c2vl.kgamebox:id/iv_login_phone")
                break;
            case "com.c2vl.kgamebox.activity.PhoneLoginActivity":
                log("页面地址：手机号登录")
                clickNode("id", "tv_login_register")
                break;
            case "com.c2vl.kgamebox.activity.PhoneRegisterActivity":
                log("页面地址：输入手机号")
                setText(myAPP.phone);
                sleep(500);
                clickNode("id", "btn_register", 10000)
                break;
            case "com.c2vl.kgamebox.activity.PhoneVerifyActivity":
                log("页面地址：设置密码")

                if (findNode("text", "请进行安全验证")) {
                    toastLog("请处理验证码");
                    sleep(10000)
                } else {
                    // 获取验证码
                    let smsContent = db.sms(myAPP.appName, data_time), smsCode;
                    if (smsContent) {
                        smsCode = getSmsCode(smsContent);
                        smsCode && id('et_verify_code').setText(smsCode)   //输入验证码
                        log("已输入验证码:" + smsCode)
                    } else {
                        log("未取到验证码")
                    }

                    if (smsCode) {
                        sleep(500);
                        id('et_verify_password').setText(myAPP.rndPassword);    //设置随机密码
                        sleep(500);
                        clickNode("id", "btn_verify_next");

                        // 脚本执行前,先上传一条数据
                        info["state"] = "已输入密码...";
                        info["phone"] = myAPP.phone;
                        info["nickname"] = myAPP.rndName;
                        info["password"] = myAPP.rndPassword;
                        info["sex"] = myAPP.sex;
                        app_info(myAPP.appName, info);   //上传数据到服务器
                    };
                };
                break;
            case "com.c2vl.kgamebox.activity.CompleteUserDataActivity":
                log("页面地址：只差一步")

                if (isCut) {
                    id('et_user_data_nick_name').setText(myAPP.rndName);    //设置随机中文姓名
                    sleep(500);


                    // 设置性别
                    clickNode("id", "rb_user_data_" + myAPP.sex)

                    // 进入狼人杀
                    clickNode("id", "btn_user_data_finish", 3000)

                } else if (!clickNode("id", "riv_user_data_header_img")) {
                    clickNode("text", "拍照")
                }

                break;
            case "com.android.camera.Camera":
                log("页面地址：相机")
                if (!clickNode("desc", "拍摄") && !clickNode("text", "开始拍照")) {
                    clickNode("id", "intent_done_apply")
                }
                break;
            case "com.yalantis.ucrop.UCropActivity":
                log("页面地址：请按顺序点击图中文字")
                // ------------------------------------------------------纯色或简单图片,会弹出文字识别
                isCut = clickNode("desc", "裁剪")
                break;
            case "com.c2vl.kgamebox.activity.HomePageActivity":
                log("页面地址：首页")
                isStop = true
                break;
            case "com.android.systemui.recents.RecentsActivity":
                log("页面:安装未知应用")
                //允许浏览器安装应用
                if (!className("CheckBox").findOne(1000).checked()) {
                    let object = text("允许来自此来源的应用").findOne(1000)
                    if (object != null) {
                        let par = object.parent().parent();
                        if (par != null) {
                            par.click()
                        };
                    }
                }

                if (!back()) {
                    clickNode("desc", "返回")
                }
                break;
            case "com.android.systemui.media.MediaProjectionPermissionActivity":
            default:
                if (currentPackage() != myAPP.packageName) {
                    // 出于安全考虑,已禁止您的手机安装来自此来源的应用
                    //防止和桌面上的设置按钮冲突
                    clickObject(className("Button").text("设置"));

                    if (!launch(myAPP.packageName)) {
                        log("app未安装,请下载")
                        // isFail = true;
                        app.openUrl(myAPP.site);
                    } else {

                        if (findNode("text", "请进行安全验证")) {
                            toastLog("请处理验证码");
                        } else if (findNode("text", "请按顺序点击图中文字")) {
                            toastLog("请处理验证码");
                        }
                    };

                } else {
                    back();
                };
        };


        // 查询弹窗
        clickNode("text", "允许")
        clickNode("text", "知道了")
        clickNode("text", "以后再说")
        clickNode("text", "立即下载")   //流量保护提醒

        // sleep(1000);
    };
};


function getSmsCode(sms) {
    // "【抖音】验证码6298，用于手机登录，5分钟内有效。验证码提供给他人可能导致账号被盗，请勿泄露，谨防被骗。"
    var check_sms = sms.match(/\【狼人杀\】/)
    // log(check_sms)
    if (check_sms[0] == "【狼人杀】") {
        sms = sms.match(/\d{4,6}/)
        log("验证码解析结果:" + sms[0])
        return sms[0]
    }
}

function get_data() {
    try {
        return JSON.parse(db.taskParam());
    } catch (error) {
        log("异常" + error);
        return null;
    }
}

function sendBroadcast(appName, data) {
    app.launchPackage("com.flow.factory");
    sleep(2000)
    var mapObject = {
        appName: appName,
        data: data
    }
    app.sendBroadcast(
        {
            packageName: "com.flow.factory",
            className: "com.flow.factory.trafficfactory.broadcast.TaskBroadCast",
            extras: mapObject
        }
    );
}


//--------------------------------------------------------------------------------------------------------------------------

/*
修改时间:20190808
函数功能:强制结束app，无需root权限,仅支持小米手机
@author:飞云
@packageName:包名
返回值:Boolean，是否执行成功
*/
function killAPP(packageName) {
    let result = false   //执行结果
    let appName = getAppName(packageName)
    if (!appName) {
        log("应用不存在,无需结束")
        return false;
    }

    let i = 0, isStopLoop = false
    while (i < 30) {
        let activity = currentActivity()
        log("页面地址：" + activity)
        switch (activity) {
            case "com.miui.appmanager.ApplicationsDetailsActivity":
                if (findNode("text", appName)) {
                    log("页面:APP设置")
                    if (findNode("text", "结束运行")) {
                        if (!clickNode("text", "结束运行")) {
                            log("APP进程未启动")
                            isStopLoop = true
                        }
                    } else if (findNode("text", "强制停止")) {
                        if (!clickNode("text", "强制停止")) {
                            log("APP进程未启动")
                            isStopLoop = true
                        }
                    }
                } else if (findNode("text", "要强行停止吗？")) {
                    log("页面:停止警告")
                    if (clickNode("text", "确定")) {
                        printToast("已停止程序:" + appName)
                        result = true
                    } else {
                        log("停止程序失败,请检查机型/安卓版本/是否卡机")
                        clickNode("text", "取消")
                    }
                    isStopLoop = true
                } else if (findNode("text", "联网控制")) {
                    log("页面:联网控制")
                    clickNode("text", "取消")
                } else {
                    log("页面:未知")
                }

                break;
            case "com.miui.appmanager.AMAppStorageDetailsActivity":
                log("页面:存储占用")
                clickNode("desc", "返回")  //右上角返回按钮
                break;
            case "com.miui.permcenter.autostart.AutoStartDetailManagementActivity":
                log("页面:自启动")
                clickNode("desc", "返回")  //右上角返回按钮
                break;
            case "com.miui.permcenter.permissions.PermissionsEditorActivity":
                log("页面:权限管理")
                clickNode("desc", "返回")  //右上角返回按钮
                break;
            case "com.android.settings.Settings$NotificationFilterActivity":
                log("页面:通知管理")
                clickNode("desc", "返回")  //右上角返回按钮
                break;
            case "com.miui.powerkeeper.ui.HiddenAppsConfigActivity":
                log("页面:省电策略")
                clickNode("desc", "返回")  //右上角返回按钮
                break;

            default:
                log("页面:other")
                if (openAppSetting(packageName)) {
                    log("已打开设置页")
                } else {
                    log("找不到应用，请检查packageName")
                };
        }

        if (isStopLoop) {
            break;  //跳出循环
        }

        i++;
        sleep(500)
    }

    clickNode("desc", "返回")  //右上角返回按钮
    return result;
};


//--------------------------------------------------------------------------------------------------------------------------

/**
寻找节点
@version  20190819
@author   飞云<283054503@qq.com> 
@param    way:节点属性text/desc/id
@param    content:节点文本
@param    timeOut:寻找组件的超时时长
@return   Boolean:是否找到
*/
function findNode(way, content, timeOut) {
    if (!timeOut) { timeOut = 1000 }
    let result = false
    let object
    if (way == "text") {
        object = text(content).findOne(timeOut);
    } else if (way == "desc") {
        object = desc(content).findOne(timeOut);
    } else if (way == "id") {
        object = id(content).findOne(timeOut);
    } else if (way == "className") {
        object = className(content).findOne(timeOut);
    } else {
        log("findNode:" + way + " 参数不正确")
    }

    if (object != null) {
        result = true
    } else {
        // log("findNode:" + content + " 不存在/没找到")
    }
    return result
};

/**
寻找组件
@version  20190819
@author   飞云<283054503@qq.com> 
@param    object:组件对象
@param    timeOut:寻找组件的超时时长
@return   Boolean:是否找到
*/
function findObject(object, timeOut) {
    if (!timeOut) { timeOut = 1000 }
    let result = false
    object = object.findOne(timeOut);

    if (object != null) {
        result = true
    } else {
        // log("findObject:" + content + " 不存在/没找到")
    }
    return result
};


/**
点击节点
@version  20190819
@author   飞云<283054503@qq.com> 
@param    way:节点属性text/desc/id
@param    content:节点文本
@param    milliSecond:点击后延迟,毫秒
@return   Boolean 是否执行成功
*/
function clickNode(way, content, milliSecond) {
    if (!milliSecond) { milliSecond = 1000 }
    let result = false
    let object
    if (way == "text") {
        object = text(content).findOne(1000);
    } else if (way == "desc") {
        object = desc(content).findOne(1000);
    } else if (way == "id") {
        object = id(content).findOne(1000);
    } else if (way == "className") {
        object = className(content).findOne(1000);
    } else {
        log("clickNode:" + way + " 参数不正确")
    }

    if (object != null) {
        if (object.clickable()) {
            result = object.click()
            result && sleep(milliSecond)
        } else {
            log("clickNode:" + content + " 不可点击")
        }
    } else {
        // log("clickNode:" + content + " 不存在/没找到")
    }

    return result
};


/**
点击节点中心点坐标
@version  20190819
@author   飞云<283054503@qq.com> 
@param    way:节点属性text/desc/id
@param    content:节点文本
@param    milliSecond:点击后延迟,毫秒
@param    isForceClick:是否强制点击,忽略坐标在屏幕之外
@return   Boolean:是否执行成功
*/
function clickNodeR(way, content, milliSecond, isForceClick) {
    if (!milliSecond) { milliSecond = 1000 }
    let result = false
    let object
    if (way == "text") {
        object = text(content).findOne(1000);
    } else if (way == "desc") {
        object = desc(content).findOne(1000);
    } else if (way == "id") {
        object = id(content).findOne(1000);
    } else if (way == "className") {
        object = className(content).findOne(1000);
    } else {
        log("clickNodeR:" + way + " 参数不正确")
    }

    if (object != null) {
        let x = object.bounds().centerX()
        let y = object.bounds().centerY()

        if (isForceClick) {
            result = click(parseInt(x), parseInt(y))
            result && sleep(milliSecond)
        } else {
            if (x > 0 & y > 0) {
                result = click(parseInt(x), parseInt(y))
                result && sleep(milliSecond)
            } else {
                log("clickNodeR:" + content + " 不在屏幕可视范围")
            }
        };

    } else {
        // log("clickNodeR:" + content + " 不存在/没找到")
    }

    return result
};

/**
点击组件
@version  20190821
@author   飞云<283054503@qq.com> 
@param    object:组件对象
@param    milliSecond:点击后延迟,毫秒
@return   Boolean:是否执行成功
*/
function clickObject(object, milliSecond) {
    if (!milliSecond) { milliSecond = 1000 }
    let result = false
    object = object.findOne(1000);

    if (object != null) {
        if (object.clickable()) {
            result = object.click()
            result && sleep(milliSecond)
        } else {
            log("clickObject: 不可点击")
        }
    } else {
        // log("clickObject:" + content + " 不存在/没找到")
    }

    return result
};


/**
点击组件中心点
@version  20190819
@author   飞云<283054503@qq.com> 
@param    object:组件对象
@param    milliSecond:点击后延迟,毫秒
@return   Boolean:是否执行成功
*/
function clickObjectR(object, milliSecond) {
    if (!milliSecond) { milliSecond = 1000 }
    let result = false
    object = object.findOne(1000);
    if (object != null) {
        let x = object.bounds().centerX()
        let y = object.bounds().centerY()
        if (x > 0 & y > 0) {
            result = click(parseInt(x), parseInt(y))
            result && sleep(milliSecond)
        } else {
            log("clickObjectR: object 不在屏幕可视范围")
        }

    } else {
        // log("clickNodeR:" + content + " 不存在/没找到")
    }
    return result
};

/**
点击父组件
@version  20190819
@author   飞云<283054503@qq.com> 
@param    way:节点属性text/desc/id
@param    content:节点文本
@param    milliSecond:点击后延迟,毫秒
@return   Boolean 是否执行成功
*/
function clickParentNode(way, content, milliSecond) {
    if (!milliSecond) { milliSecond = 1000 }
    let result = false
    let object
    if (way == "text") {
        object = text(content).findOne(1000);
    } else if (way == "desc") {
        object = desc(content).findOne(1000);
    } else if (way == "id") {
        object = id(content).findOne(1000);
    } else if (way == "className") {
        object = className(content).findOne(1000);
    } else {
        log("clickParentNode:" + way + " 参数不正确")
    }

    if (object != null) {
        let far = object.parent();
        if (far != null) {
            if (far.clickable()) {
                result = far.click()
                result && sleep(milliSecond)
            } else {
                log("clickParentNode:" + content + " 父组件不可点击")
            }
        };
    } else {
        // log("clickNode:" + content + " 不存在/没找到")
    }

    return result
};

/**
点击父组件中心点
@version  20190819
@author   飞云<283054503@qq.com> 
@param    way:节点属性text/desc/id
@param    content:节点文本
@param    milliSecond:点击后延迟,毫秒
@return   Boolean 是否执行成功
*/
function clickParentNodeR(way, content, milliSecond) {
    if (!milliSecond) { milliSecond = 1000 }
    let result = false
    let object
    if (way == "text") {
        object = text(content).findOne(1000);
    } else if (way == "desc") {
        object = desc(content).findOne(1000);
    } else if (way == "id") {
        object = id(content).findOne(1000);
    } else if (way == "className") {
        object = className(content).findOne(1000);
    } else {
        log("clickParentNodeR:" + way + " 参数不正确")
    }

    if (object != null) {
        let far = object.parent();
        if (far != null) {
            if (far.clickable()) {
                result = far.click()
                result && sleep(milliSecond)
            } else {
                let x = far.bounds().centerX()
                let y = far.bounds().centerY()
                if (x > 0 & y > 0) {
                    result = click(parseInt(x), parseInt(y))
                    result && sleep(milliSecond)
                } else {
                    log("clickParentNodeR:" + content + " 父组件不在屏幕可视范围")
                }
            }
        };
    } else {
        // log("clickNode:" + content + " 不存在/没找到")
    }

    return result
};


/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
}

//--------------------------------------------------------------------------------------------------------------------------


//姓名随机函数
function getRndName() {
    var firstNames = new Array(
        "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
        "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
        "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
        "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
        "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
        "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
        "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
        "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
        "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
        "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹",
        "司马", "欧阳", "上官", "夏侯夏侯", "诸葛", "西门", "南宫", "东郭",
        "百里", "尉迟", "端木", "皇甫", "钟离", "宇文", "长孙", "慕容", "司徒", "司空", "东方", "公孙", "令狐"
    );
    var secondNames = new Array(
        "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
        "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
        "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
        "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
        "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
        "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
        "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
        "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
        "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
        "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌",
        "惠宁", "雅欣", "奕雯", "佳琪", "永怡", "璐瑶", "娟秀", "天佳", "晓华", "妍丽", "璇菡",
        "嘉禾", "忆辰", "妍彤", "眉萱", "秀辰", "怡熹", "思琦", "弦娇", "青淑", "宣淑", "和静",
        "雪涵", "美嘉", "佳涵", "旭和", "丽娇", "雨晨", "文惠", "雅馥", "雨嘉", "亦婷", "秀慧",
        "俊颖", "亭清", "思涵", "珂嘉", "蒂莲", "秀娟", "晋仪", "玮菁", "慧琳", "丽帆", "思辰",
        "宇纯", "美瑞", "蕊清", "秀敏", "家维", "宁致", "婷方", "燕晨", "子琳", "雪菲", "泓锦",
        "佳妮", "初晨", "芷菡", "奕可", "莉姿", "杏菏", "韵彩", "姝慧", "雪华", "珊娜", "秀丽",
        "箫辉", "盈初", "语楚", "青秋", "梓菁", "宝萱"
    );
    var thirdNames = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
    var firstLength = firstNames.length;
    var secondLength = secondNames.length;
    var thirdLength = thirdNames.length;
    var i = parseInt(Math.random() * firstLength);
    var j = parseInt(Math.random() * secondLength);
    var k = parseInt(Math.random() * thirdLength);
    var name = firstNames[i] + secondNames[j] + thirdNames[k] + thirdNames[random(0, 8)] + thirdNames[random(0, 8)];
    return name;
};

function jspost(url, data) {
    var res = http.post(url, data);
    var data = res.body.string();
    if (data) {
        return data;
    }
}

function app_info(name, data) {
    var url = "http://news.wenfree.cn/phalapi/public/";
    var postdata = {};
    postdata["s"] = "App.ZllgcAppInfo.App_info";
    postdata["imei"] = device.getIMEI();
    postdata["app_name"] = name;
    postdata["whos"] = "ouwen000";
    postdata["app_info"] = JSON.stringify(data);
    log(jspost(url, postdata));
}