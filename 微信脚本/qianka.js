


// 引入其它文件支持
var a = require("auto-sp");
var b = require("Wechat_text");

// 本地策略,所以需要时间格式化支持
Date.prototype.Format = function(fmt) 
{ //author: meizz
    var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) 
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    for(var k in o)
    if(new RegExp("("+ k +")").test(fmt)) 
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
    return fmt; 
};

//向上滑动
function upscreen(){
    var ra = new RootAutomator();
    var move_x = (device.width)/2
    var move_y = (device.height)
    for (var i=1;i<5;i++){
        ra.swipe( move_x,move_y*0.7,move_x,move_y*0.4, 50)
    }
    
}


var appbids_ = 'me.gaoshou.money'


log(
    currentActivity()
)


function playsw(){
    
    var UIs = currentActivity()
    log("UIs->",UIs)

    if (UIs == 'me.gaoshou.money.webview.WebViewActivity'){
        var play = desc("试玩赚钱").findOne(2000)
        if (play){
            Tap(play.bounds().centerX(),play.bounds().centerY())
            sleep(5000)
        }
        
        var play = desc("① 完成任务  ② 审核通过  ③ 我拿奖励").findOne(1000)
        if (play){
            log("play 界面")
            var play = desc("映客直播").findOne(1000)
            if ( play){
                Tap(play.bounds().centerX(),play.bounds().centerY())
                sleep(5000)
            }
            
        }
    }
}




playsw()







