"ui";
// 唯一的全局变量MYAPP:
var myAPP = {};
myAPP.title = "超级云控";  //脚本名称
myAPP.programVersion = "v1";   //版本号
myAPP.packageName = currentPackage();   //程序自身包名
myAPP.color = "#333333";   //主题色
myAPP.screen_size = device.width + '×' + device.height
myAPP.avail_mem = (device.getAvailMem() / device.getTotalMem() * 100).toFixed(2) + '%'
myAPP.imei = device.getIMEI()

myAPP.site = "http://news.wenfree.cn/phalapi/public/"   //后台地址
myAPP.taskTimeOut = 60000;  //单任务超时时长

//引用公共函数模块
var public = require('public.js');


importClass('java.net.NetworkInterface');
importClass('java.net.Inet6Address');

//获取内网IP地址
var hostIp = null;
try {
    var nis = NetworkInterface.getNetworkInterfaces();
    var ia = null;
    while (nis.hasMoreElements()) {
        var ni = nis.nextElement();
        var ias = ni.getInetAddresses();
        while (ias.hasMoreElements()) {
            ia = ias.nextElement();
            if (ia instanceof Inet6Address) {
                continue;
            };
            var ip = ia.getHostAddress();
            if (!"127.0.0.1".equals(ip)) {
                hostIp = ia.getHostAddress();
                break;
            };
        };
    };
} catch (e) {
    log(e);
};

//获取外网ip地址
var getIp_api = http.get('http://pv.sohu.com/cityjson?ie=utf-8');
var InetIP = getIp_api.body.string();
eval(InetIP);
// var returnCitySN = {"cip": "114.253.48.32", "cid": "110000", "cname": "北京市"};
// 通过 eval(把 var 后的变成一个真正的变量)
var showdate = new Date();

//---------------------------------------------------------------------------------------------------------

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar background="{{myAPP.color}}">
                <toolbar id="toolbar" title="{{myAPP.title + ' ' + myAPP.programVersion}}" />
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                {/** 第1屏布局*/}
                <frame>
                    <ScrollView>
                        <vertical marginTop="10">
                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 8" h="auto">
                                    <linear>
                                        <Switch id="autoService" text="无障碍服务:" checked="{{auto.service != null}}" w="auto" textStyle="bold" />
                                    </linear>
                                </vertical>
                                <View bg="#E51400" h="*" w="5" />
                            </card>

                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 8" h="auto">
                                    <linear>
                                        <Switch id="editDevice" text="编辑设备信息:" w="auto" textStyle="bold" />
                                    </linear>
                                </vertical>
                                <View bg="#5FB878" h="*" w="5" />
                            </card>
                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 8" marginBottom="10" h="auto">
                                    <linear>
                                        <text text="手机号码:" textColor="black" w="auto" textStyle="bold" />
                                        <input id="phone" color="#666666" paddingLeft="5" inputType="number" phoneNumber="true" marginLeft="10" w="*" hint="" />
                                    </linear>
                                    <linear>
                                        <text text="设备标签:" textColor="black" w="auto" textStyle="bold" />
                                        <input id="tag" color="#666666" paddingLeft="5" inputType="text" marginLeft="10" w="*" hint="" />
                                    </linear>
                                    <linear>
                                        <text text="归属人员:" textColor="black" w="auto" textStyle="bold" />
                                        <input id="whos" color="#666666" paddingLeft="5" inputType="text" marginLeft="10" w="*" hint="" textSize="14" />
                                    </linear>
                                    <button marginTop="10" id="sure" text="保存" h="50" w="*" style="Widget.AppCompat.Button.Colored" ></button>
                                </vertical>
                                {/* <View bg="#1BA1E2" h="*" w="5" /> */}
                            </card>
                            {/* <horizontal margin="10 5">
                                <button marginTop="10" id="start" text="启动任务监控" h="50" w="*" style="Widget.AppCompat.Button.Colored" ></button>
                            </horizontal> */}
                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 8" h="auto">
                                    <linear>
                                        <Switch id="taskMonitor" text="任务监控:" w="auto" textStyle="bold" />
                                    </linear>
                                </vertical>
                                <View bg="#1e9fff" h="*" w="5" />
                            </card>
                        </vertical>

                    </ScrollView>
                </frame>
                {/** 第2屏布局*/}

                <frame>
                    <ScrollView>
                        <vertical marginTop="10">
                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical" marginBottom="20">
                                <vertical padding="18 8" h="auto">
                                    <text margin="0 5" text="IMEI：{{myAPP.imei}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="屏幕分辨率：{{myAPP.screen_size}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="产品型号：{{device.model}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="制造商：{{device.brand}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="Android系统版本号：{{device.release}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="主板：{{device.board}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="内存总量：{{device.getTotalMem()}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="可用内存：{{device.getAvailMem()}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="可用内存占比：{{myAPP.avail_mem}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="内网IP：{{hostIp}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="外网IP：{{returnCitySN.cip}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="Mac：{{device.getMacAddress()}}" textColor="black" w="auto" />
                                    <text margin="0 5" text="剩余电量：{{device.getBattery() + '%'}}" textColor="black" w="auto" />
                                </vertical>
                                {/* <View bg="#DEDFDE" h="*" w="5" /> */}
                            </card>
                        </vertical>

                    </ScrollView>
                </frame>

            </viewpager>
        </vertical>

    </drawer>
);

//---------------------------------------------------------------------------------------------------------

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("日志");
    // menu.add("控制台");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "日志":
            app.startActivity('console');
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);
//设置任务栏背景色
ui.statusBarColor(myAPP.color);
//设置滑动页面的标题
ui.viewpager.setTitles(["设置", "关于"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//---------------------------------------------------------------------------------------------------------

getData(true);  // 初始化界面组件数据



//---------------------------------------------------------------------------------------------------------
ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();  //关闭自己service的方法，在设置界面可以看到辅助功能状态被关闭
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

// 编辑设备信息
ui.editDevice.on("check", function (checked) {
    setObject(checked);  // 设置组件是否可用
});


function jspost(url,data){
    var res = http.post(url, data);
    var data = res.body.string();
    if(data){
        return data;
    }
}
function imei_online(){
    var url = "http://news.wenfree.cn/phalapi/public/";
    var postdata = {};
    postdata["s"]="App.Zllgcimeionline.Imei";
    postdata["imei"]= device.getIMEI();
    var r = (jspost(url,postdata));
    if (r){
        var r = JSON.parse(r)
        if (r.data == "fail"){
            return true
        }
    }
}

// 启动任务监控
var execution;
ui.taskMonitor.on("check", function (checked) {
    if (checked) {
        toastLog("开启任务监控");
        // Imei_sevice();
        execution = engines.execScriptFile('start.js')  //在新的脚本环境中运行脚本文件path。返回一个ScriptExecution对象。获取子脚本对象

        setInterval(
            function(){
                if (imei_online()){
                    log("掉线了");
                    execution.getEngine().forceStop();
                    Imei_sevice();
                    execution = engines.execScriptFile('start.js')  //在新的脚本环境中运行脚本文件path。返回一个ScriptExecution对象。获取子脚本对象
                }else{
                    log("在线");
                }
            }, 
            1000*60*10
        );
    } else {
        //停止任务监控
        toastLog("停止任务监控")
        execution.getEngine().forceStop();
        // threads.shutDownAll();
    };
});

// 启动任务监控
// ui.start.on("click", function () {
// var execution = engines.execScriptFile('start.js')  //在新的脚本环境中运行脚本文件path。返回一个ScriptExecution对象。获取子脚本对象
// });

// 确定
ui.sure.on("click", function () {
    var phone = ui.phone.text();
    var tag = ui.tag.text();
    var whos = ui.whos.text();
    if (phone.length == 0) {
        ui.phone.setError("输入不能为空");
        return;
    } else if (tag.length == 0) {
        ui.tag.setError("输入不能为空");
        return;
    } else if (whos.length == 0) {
        ui.whos.setError("输入不能为空");
        return;
    } else if (phone.length != 11) {
        ui.phone.setError("手机号码格式错误");
        return;
    };

    saveData();
    getData(false);
    Imei_sevice();

    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    };

    setObject(false);  // 设置组件是否可用
    ui.editDevice.setChecked(false);
    toastLog("已保存")
});


//同步imei的接口
function Imei_sevice(){
    try{
        var url = "http://news.wenfree.cn/phalapi/public/";
        var r = http.post(url, {
            "s": "App.Zllgcimei.Imei",
            "imei": device.getIMEI(),
            "imei_phone": myAPP.phone,
            "imei_tag": myAPP.tag,
            "imei_info": JSON.stringify(
                {        
                    "release": device.release,
                    "battery": device.getBattery() + '%',
                    "is_charging": device.isCharging(),
                    "avail_mem": myAPP.avail_mem,
                    "total_mem": device.getTotalMem(),
                    "is_screen_on": device.isScreenOn(),
                    "screen_size": myAPP.screen_size,
                    "mac": device.getMacAddress(),
                    "screen_brightness": device.getBrightness(),
                    "screen_brightness_model": device.getBrightnessMode(),
                    "music_volume": device.getMusicVolume()
                }),
            "whos": myAPP.whos,
        });
        log(device.getIMEI(),myAPP.phone,myAPP.tag,myAPP.whos)
        log('同步接口');
        r = r.body.string()
        if(r){
            log(r);
            return true;
        }
    }catch(err){
        toastLog(err);
    }
}

// 设置组件是否可用
function setObject(isAllow) {
    ui.phone.setEnabled(isAllow)
    ui.tag.setEnabled(isAllow)
    ui.whos.setEnabled(isAllow)

    importClass(android.view.View);
    if (isAllow) {
        ui.sure.setVisibility(View.VISIBLE);  //可视
    } else {
        ui.sure.setVisibility(View.GONE);  //不可见，且不占据空间
    };
};

// 读取配置
function getData(isSetValue) {
    let phone = public.getStorageData(myAPP.imei, "phone");
    let tag = public.getStorageData(myAPP.imei, "tag");
    let whos = public.getStorageData(myAPP.imei, "whos");
    if (phone) {
        myAPP.phone = phone;
        isSetValue && ui.phone.setText(myAPP.phone);
    };
    if (tag != undefined) {
        myAPP.tag = tag
        isSetValue && ui.tag.setText(myAPP.tag);
    };
    if (whos != undefined) {
        myAPP.whos = whos
        isSetValue && ui.whos.setText(myAPP.whos);
    };

    let isAllow = myAPP.phone != undefined ? false : true
    ui.editDevice.setChecked(isAllow);
    setObject(isAllow);
};

// 保存配置
function saveData() {
    public.setStorageData(myAPP.imei, "phone", ui.phone.text());
    public.setStorageData(myAPP.imei, "tag", ui.tag.text());
    public.setStorageData(myAPP.imei, "whos", ui.whos.text());
};
