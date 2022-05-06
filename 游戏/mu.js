auto.waitFor()

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
} else {
    log('截图权限')
}


var jietu = {
    "ImportInfo": "dm",
    "RangeFormat": "{startX},{startY},{width},{height}",
    "FirstColorFormat": "\"#{color}\"",
    "FollowColorFormat": "[{x},{y},\"#{color}\"]",
    "FindStrFormat": "['']=[ {firstColorStr},[{followColorStr}], {region:[{range}],threshold:20 },true]",
    "CompareStrFormat": "new array({ImportInfo},\"{colorStr}\",0.9)"
}



//新版基础函数
var f = {
    init: function () {
        log("程序初始化")
    },
    //post
    post: function (url, data) {
        var res = http.post(url, data);
        var data = res.body.string();
        if (data) {
            // log(data);
            return data;
        }
    },
    //get
    get: function (url) {
        var res = http.get(url);
        var data = res.body.string();
        if (data) {
            return data;
        }
    },
    //读取本地数据
    getLocal: function (name, key) {
        const storage = storages.create(name);  //创建storage对象
        if (storage.contains(key)) {
            return storage.get(key);
        };
        //默认返回undefined
    },
    //基础函数
    active: function (pkg, n) {
        if (!n) { n = 5 }
        if (currentPackage() == pkg) {
            log("应用在前端");
            return true;
        } else {
            log("启动一次应用");
            app.launch(pkg);
            sleep(1000)
            f.ms({ "textMatches": "允许|始终允许" }, true)
            sleep(1000 * n)
        }
    },
    //准备点击
    click: function (x, y, sleeptime, name) {
        if (!sleeptime) { sleeptime = 1 }
        if (name) {
            log('准备点击->' + name, "x:", x, "y:", y);
        } else {
            log('准备点击坐标->', "x:", x, "y:", y);
        }
        if (x > 0 && y > 0) {
            threads.start(function () {
                //在新线程执行的代码
                click(x, y);
            });
            // click(x,y);
            sleep(sleeptime * 1000);
            return true
        } else {
            log('坐标错误');
        }
    },
    //点击obj
    clickObj: function (obj, sleeptime, name) {
        if (!sleeptime) { sleeptime == 1 }
        log(name ? ("准备点击对象->" + name) : "点击未命名对象")
        x = obj.bounds().centerX()
        y = obj.bounds().centerY()
        return f.click(x, y, sleeptime, name)
    },
    //穿透点击
    clickTrue: function (obj, sleeptime, name, lun) {
        sleeptime ? sleeptime : 1
        let result = false;
        lun ? lun : 3
        for (let i = 0; i < lun; i++) {
            if (obj && obj.clickable()) {
                obj.click();
                log(name ? ("准备穿透点击对象->" + name) : "准备穿透点击未命名对象")
                result = true
                break
            }
            obj = obj.parent()
        }
        if (result) { sleep(sleeptime * 1000) }
        return result
    },
    //正则点击
    ms: function (obj, clicks, sleeptimes, name, findtime, lun) {
        if (!sleeptimes) { sleeptimes = 1 }
        if (!findtime) { findtime = 200 }
        if (!lun) { lun = 3 }

        var txt = '';
        for (let key in obj) {
            if (key.search("Matches") > 0) {
                eval("var matches = /" + obj[key] + "/")
                txt = txt + key + '(' + matches + ').'
            } else if (key == 'boundsInside') {
                txt = txt + key + '(' + obj[key] + ').'
            } else {
                txt = txt + key + '("' + obj[key] + '").'
            }
        }
        var txt = "let objs = " + txt + "findOne(" + findtime + ");"
        log(txt)
        eval(txt)
        if (objs) {
            log('找到==>' + objs.text() || objs.desc() || objs.id() || objs.className())
            if (clicks) {
                name = obj['textMatches'] || obj['descMatches'] || obj['idMatches'] || obj['text'] || obj['desc'] || obj['id']
                if (lun < 1 || !f.clickTrue(objs, sleeptimes, name, lun)) {
                    log('准备坐标点击')
                    return f.clickObj(objs, sleeptimes, name);
                }
            }
            return true;
        }
    },
    rd: function (min, max) {
        if (min <= max) {
            return random(min, max)
        } else {
            return random(max, min)
        }
    },
    moveTo: function (x, y, x1, y1, times) {
        swipe(x, y, x1, y1, times);
        sleep(1000);
    }
}
f.init()



mir = {}
mir.createLocal = function () {
    //记录每天要做什么，和做过什么
    timeLines = new Date()
    var todoInfo = {
        date: new Date().toLocaleDateString(),
        会员地图: true,
        正在战斗时间长: 0,
        正在移动时间长: 0,
        回收开关: false,
    }
    mir.saveLocal(todoInfo)
    return todoInfo
}
//写入存档
mir.saveLocal = function (tab) {
    storage.put("mu", tab)
}
//读出存档
mir.readLoacl = function () {
    todoInfo = storage.get("mu")
    if (todoInfo) {
        if (todoInfo.date == new Date().toLocaleDateString()) {
            return todoInfo
        } else {
            return mir.createLocal()
        }
    }
    return mir.createLocal()
}





function todo(name) {
    //截图
    var img = captureScreen();
    let cd = d[name]
    var p = images.findMultiColors(img, cd[0], cd[1], cd[2])
    img.recycle()
    if (p) {
        if (cd[3]) {
            if (!cd[4]) { cd[4] = 1 }
            f.click(p.x, p.y, cd[4], name)
        } else {
            log('找到=> ' + name)
        }
        return p
    }
}


function UI() {
    //截图
    var img = captureScreen();

    log("-----------------------------", img.getWidth(), img.getHeight())
    if (  img.getWidth() != 1920 ){
        log('游戏未启动,竖屏了')
        return ['','']
    }

    // exit()
    for (key in t) {
        // log( '顶层=>',key )
        for (UIname in t[key]) {
            // log( '顶层=>', key , '=>界面:', UIname )
            var ct = t[key][UIname]
            var p = images.findMultiColors(img, ct[0], ct[1], ct[2])
            if (p) {
                log('顶层=>', key, '=>界面:', UIname)
                if (ct[3]) {
                    if (!ct[4]) { ct[4] = 1 }
                    f.click(p.x, p.y, ct[4], key + '=>' + UIname)
                }
                img.recycle()
                return [key, UIname]
            }
        }
    }
    img.recycle()
    return ['', '']
}


t = {}
t['游戏'] = {}
t['游戏']['主界面'] =[ "#b2a271",[[565,938,"#8d0404"]], {region:[1,55,665,1020],threshold:20 },false]
t['事件'] = {}
t['事件']['登录界面-开始游戏'] = ["#da9f27", [[845, 127, "#ffffff"], [843, 107, "#ffb541"]], { region: [832, 760, 1070, 231], threshold: 20 }, true]
t['事件']['创建角色-开始游戏'] = ["#fdeda3", [[7, -7, "#ac4613"], [52, -739, "#000000"]], { region: [784, 218, 354, 832], threshold: 20 }, true]

t['弹窗']={}
t['弹窗']['挂机提示-x']=[ "#2a1900",[[0,-11,"#deac1b"],[-40,97,"#168e19"],[-138,97,"#169419"]], {region:[1413,113,380,180],threshold:20 },true]



d={}
d['会员地图-进入']=[ "#b76d2c",[[-74,-20,"#cb7643"]], {region:[845,771,226,100],threshold:20 },true]
mir.goto_Vip_Maps = function() {
    if ( todoInfo.会员地图 ){
        log("准备去会员地图")
        f.click(1760,123,2,"点击地图")
        f.click(418,223,5,"会员领地")
        f.click(741,280,2,"会员一层")
        if (todo("会员地图-进入")){
            todoInfo.会员地图 = false
        }
    }
}

d['回收装备']=[ "#d2d6d7",[[-2,23,"#e4c24d"]], {region:[1510,943,233,80],threshold:20 },true]
mir.clearBag = function() {
    if ( todoInfo.回收开关 ){
        f.click(1865,398,5,"点开背包")
        f.click(1683,1000,2,"回收装备")
        if ( todo("回收装备") ){
            todoInfo.回收开关 = false
        }
    }
}

d['主界面-正在寻路']=[ "#65b151",[[0,4,"#61ad4f"]], {region:[860,676,196,50],threshold:20 },false]
d['主界面-正在战斗']=[ "#c11717",[[0,8,"#c11717"]], {region:[863,37,45,46],threshold:20 },false]
d['主界面-点击黄金怪']=[ "#ecc514",[[0,-3,"#ecc515"]], {region:[1526,297,260,48],threshold:20 },true]
d['主界面-点击黄金怪-展开']=[ "#cdbca0",[[10,-8,"#e2dbc7"],[10,7,"#bbaa88"]], {region:[1745,235,60,60],threshold:20 },true]

function Game() {


    //这是里程序开始
    var ReCode = 1
    while (true) {

        //读出记忆文档
        todoInfo = mir.readLoacl()
        log(todoInfo)

        UIs = UI()
        switch (UIs[0]) {
            case "游戏":
                ReCode = 0
                log('查看战斗')
                // mir.goto_Vip_Maps()
                
                if ( todo("主界面-正在寻路") ){
                    log('正在寻路')
                    todoInfo.正在移动时间长 = todoInfo.正在移动时间长 + 1
                }else
                if ( todo("主界面-正在战斗") ){
                    todoInfo.正在战斗时间长 = todoInfo.正在战斗时间长 + 1
                    todoInfo.正在移动时间长 = 0
                }else{
                    if ( todoInfo.正在战斗时间长 > 3){
                        todoInfo.回收开关 = true
                    }
                    if ( !todo("主界面-点击黄金怪") ){
                        // todo("主界面-点击黄金怪-展开")
                    }
                    todoInfo.正在战斗时间长 = 0
                }
 
                mir.clearBag()
                break
            case "事件":
                log("事件")
                switch (UIs[1]) {
                    case "创建角色-开始游戏":
                        // 登录了游戏,会员地图失效
                        log('登录了游戏,会员地图失效')
                        todoInfo.会员地图 = true
                    break
                }
                break
            default:

                if (f.ms({ "text": "设置" }) ){
                    f.ms({ "textMatches": "天使之战" }, true, 4)
                }

                //直接关闭，省电模式

                ReCode++
                log(ReCode)
                if (ReCode % 2 == 0) {
                    f.click(100, 100, 2, '左上角')
                }
                if (ReCode % 15 == 0) {
                    back()
                }
                if (ReCode % 30 == 0) {
                    back()
                    home()
                }

        }

        // todoInfo.exchange = "2022-03-24T08:09:41.653Z"
        //存入忆文档
        mir.saveLocal(todoInfo)
        sleep(1000 * 1)

    }

}


//游戏相关，都写入mir
var storage = storages.create("game");
var todoInfo = {}
var appInfo = {};


// home()
function main() {
    while (true) {
        try {
            Game()
        } catch (e) {
            log(e)
            sleep(2000)
        }
    }
}

Game()