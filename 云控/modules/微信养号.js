
// 保持脚本运行
var ID = setInterval(() => { }, 1000)
// 监听主脚本消息
events.on("prepare", function (i, mainEngine) {

    try{
        var taskData = getTask();
        log(taskData.task.data);

        readInfo();
        main();

        callback_task(taskData.task.id,"done");
        launch('com.wenfree.cn');
    }
    catch(err){
        log(err)
    }

    callback_task(taskData.task.id,"done");
    mainEngine.emit("control", i);  //向主脚本发送一个事件，该事件可以在它的events模块监听到并在脚本主线程执行事件处理。
    clearInterval(ID);   //取消一个由 setInterval() 创建的循环定时任务。
});


function jspost(url,data){
    var res = http.post(url, data);
    var data = res.body.string();
    if(data){
        return data;
    }
}

// 获取接口数据
function getTask() {
    var url = 'http://api.wenfree.cn/public/';
    let res = http.post(url, {
        "s": "NewsImei.Imei",
        "imei": device.getIMEI()
    });
    let json = {};
    try {
        let html = res.body.string();
        // log(html)
        json = JSON.parse(html);
        log(json)
        return json.data;
    } catch (err) {
        //在此处理错误
    }
};

function callback_task(id,state){
    var url = "http://api.wenfree.cn/public/";
    var arr = {};
    arr["id"] = id;
    arr["state"] = state;
    var postdata = {};
    postdata["s"]="NewsRecordBack.Back"
    postdata["arr"] = JSON.stringify(arr)
    log(arr,postdata)
    log(jspost(url,postdata));
}

//读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        return storage.get(key);
    };
    //默认返回undefined
}

function app_info(name,data){
    var url = "http://api.wenfree.cn/public/";
    var postdata = {};
    postdata["s"]="App.NewsAppInfo.App_info";
    postdata["imei"]= device.getIMEI();
    postdata["imei_tag"]= getStorageData(device.getIMEI(), "tag");;
    postdata["app_name"]= name;
    postdata["whos"]= "ouwen000";
    postdata["app_info"]= JSON.stringify(data);
    log(jspost(url,postdata));
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
function click_(x,y){
    if(x>0 && x < 720 && y > 0 && y < 1440){
        click(x,y);
        return true
    }else{
        log('坐标错误');
        return false
    }
}
//点击obj
function click__(obj){
    click_(obj.bounds().centerX(),obj.bounds().centerY())
}
//普通封装
function jsclick(way,txt,clickKey,n){
    if(!n){n=1};//当n没有传值时,设置n=1
    var res = false;
    if(!clickKey){clickKey=false}; //如果没有设置点击项,设置为false
    if (way == "text"){
        res = text(txt).findOne(200);
    }else if(way == "id"){
        res = id(txt).findOne(200);
    }else if(way == "desc"){
        res = desc(txt).findOne(200);
    }
    if(res){
        if ( clickKey ){
            if ( res.bounds().centerX() < 0 || res.bounds().centerX()> width || res.bounds().centerY() < 0 || res.bounds().centerY() > height ){
                return false
            }
            log('准备点击->',txt,"x:",res.bounds().centerX(),"y:",res.bounds().centerY());
            click__(res);
        }else{
            log("找到->",txt);
        }
        sleep(1000*n);
        return true;
    }else{
        // log("没有找到->",txt)
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

function moveTo(x,y,x1,y1,times){
    swipe(x,y,x1,y1,times);
    sleep(1000);
}

var replayText = [
"不要在本该奋斗的年纪选择了安逸，只有度过了一段连自己都被感动的日子，才会遇见那个最好的自己，未来的你，一定会感谢现在拼命努力的自己。永远相信，越努力，越幸运，所有失去的，都会以另一种方式归来，踏实一些，你想要的，岁月统统都会给你。",
"与其担心未来，不如好好把握现在，不要轻易把梦想寄托在某个人身上，因为未来是你自己的，只有你自己能给自己最大的安全感，无论我们处在人生的那一个阶段，都应努力好好经营自己。",
"生活不能等待别人来安排，要自己去争取和奋斗；而不论其结果是喜是悲，但可以慰藉的是，你总不枉在这世界上活了一场。",
"人最大的对手，往往不是别人，而是自己的懒惰。别指望撞大运，运气不可能永远在你身上，任何时候都要靠本事吃饭。你必须拼尽全力，才有资格说自己的运气不好。",
"当你越来越漂亮时，自然有人关注你。当你越来越有能力时，自然会有人看得起你。改变自己，你才有自信，梦想才会慢慢的实现。",
"如果没人认可你，那就自己认可自己；如果没人欣赏你，那就自己欣赏自己；如果没人祝福你，那就自己祝福自己。与其用泪水悔恨昨天，不如用汗水拼搏明天。",
"只有你自己变优秀了，那样才会有别人来亲附。这叫做“近者悦，远者来”。自己是梧桐，凤凰才会来栖；自己是大海，百川才会来归。你只有到了那个层次，才会有相应的圈子，而不是倒过来。",
"不去做，就永远不会有收获，不尝试，就永远不会有成功，不可能，就永远停留在现在，未来，是靠把握和努力争取来的，相信，永远比怀疑多一次成功的机会。请相信：想法+做法+坚持=成功！",
"二十多岁了，请放下你的清高，收起你的自尊，褪去你的愚昧，穿上你的现实，冲出你的花季，去走出你的人生。",
"一个能把每一个今天过好的人，明天也坏不到哪里去。因为对未来的真正慷慨，就是把最卓越的努力献给现在，珍惜当下的一切。未来才会无限可能！趁年轻，埋头苦干；免来日，仰慕求人。",
"所谓迷茫，就是才华配不上梦想：大事干不了，小事不肯干；不想做手边的事，只想做天边的事。解除迷茫，就从小事做起，从身边的事情做起，能力不是从做大事得来的，而是从这些“不起眼”的事情中锻炼来的。小事不肯干的你，大事轮不到你，趁你跌倒还能站起来的时候，先学会脚踏实地。",
"能自己扛就别声张，你矫情幽怨的样子并不漂亮，做个勇敢的人，学着去承受命运给你的每一个耳光。",
"看清楚自己的心，找准属于自己的路，用力去飞，努力去追，不负年华和未来。遇见更好的自己！",
"这个世界上从来没有一劳永逸的努力，就如没有不劳而获的成功，要想一生过得顺遂，除了一直努力，别无捷径。",
"改变，永远不嫌晚。无论你是几岁，也无论你目前所处的境况有多糟，只要立定目标、一步一步往前走，人生随时都有翻盘的可能性。",
"长时间呆在舒适区，人难免会慢慢丧失斗志，动起来做出改变，出去看看世界，或者学一个新技能，让自己始终在进步；你要相信，这个世界上，一定有另一个自己，在做着你不敢做的事情，过着你想过的生活！",
"从没有白费的努力，也没有碰巧的成功。只要认真对待生活，终有一天，你的每一份努力，都将绚烂成花。",
"比我差的人还没放弃，比我好的人仍在努力，我就更没资格说，我无能为力。——致自己",
"请把努力当成一种习惯，而不是三分钟热度。每一个你羡慕的收获，都是努力用心拼来的。相信人生不会亏待你，你吃的苦，你受的累，你掉进的坑，你走错的路，都会练就独一无二成熟坚强感恩的你。",
"当你真心想做一件事的时候，全世界都会给你让路；当你只想试一试的时候，总能找到不去努力的借口；当你连尝试都不愿意的时候，便能找到一万个不做的理由。",
]

var emoji = [
    '[微笑]','[撇嘴]','[色]','[发呆]','[得意]','[流泪]','[害羞]','[呲牙]','[调皮]','[发怒]','[尴尬]','[大哭]','[睡]','[闭嘴]','[惊讶]','[难过]',
    '[囧]','[抓狂]','[吐]','[偷笑]','[愉快]','[悠闲]','[憨笑]','[流汗]','[惊恐]','[困]','[傲慢]','[白眼]','[奋斗]','[咒骂]','[疑问]','[嘘]',
    '[晕]','[衰]','[骷髅]','[左哼哼]','[坏笑]','[鼓掌]','[抠鼻]','[擦汗]','[再见]','[敲打]','[亲亲]','[阴险]','[快哭了]','[委屈]','[鄙视]',
    '[哈欠]','[右哼哼]','[玫瑰]','[猪头]','[咖啡]','[啤酒]','[西瓜]','[菜刀]','[可怜]','[便便]','[炸弹]','[蛋糕]','[心碎]','[爱心]','[嘴唇]',
    '[凋谢]','[胜利]','[握手]','[弱]','[强]','[拥抱]','[太阳]','[月亮]','[怄火]','[发抖]','[跳跳]','[OK]','[拳头]','[勾引]','[抱拳]','[转圈]',
    '[皱眉]','[机智]','[奸笑]','[捂脸]','[嘿哈]','[社会社会]','[Emm]','[天啊]','[汗]','[加油]','[吃瓜]','[耶]','[哇]','[加油加油]','[打脸]',
    '[好的]','[旺柴]','[福]','[發]','[红包]'
]

function Tips(){
    log("查询弹窗");
    var textTips = {}
    textTips["允许"]="text";
    textTips["保存"]="text";
    textTips["我知道了"]="text";
    textTips["好的"]="text";
    for(var k in textTips){
        if (jsclick(textTips[k],k,true,2)){
            return false
        }
    }
    log('查询弹窗-end')
    return true
}

// [500,1044,692,1238]

function main(){

    var fristbox = true
    var readtimes = 0
    var readtimes_end = random(2,3)
    var detail2 = 0;
    var movetoTimes = 0

    var i__ = 0;
    while (i__ < 200) {
        i__++;
        if ( active( appinfo.bid , 8)  ){

            var UI = currentActivity();
            log('UI',UI,i__)
            switch(UI){
                case 'com.tencent.mm.ui.LauncherUI':
                    log('主界面');
                    if (fristbox){
                        if (jsclick('text','微信',true,2)){
                            var mesglist = id('b4r').find();
                            if ( mesglist ){
                                click__(mesglist[rd(0,mesglist.length-1)])
                                sleep(rd(1000,5000));
                            }
                            fristbox = false
                        }else{
                            click_(90,1318);
                        }
                    }else
                    if (jsclick('desc','更多功能按钮，已折叠',false,2) || jsclick('text','发送',false,2)){
                        log('聊天界面');
                        setText(0,replayText[rd(0,replayText.length-1)]+emoji[rd(0,emoji.length-1)]);
                        sleep(rd(1000,3000));
                        jsclick('text','发送',true,rd(2,5));
                        back();
                    }else
                    if(  jsclick('id','rr',true,2)){

                    }else
                    if(  mesg() ){

                        if (jsclick('id','ga3',true,2)){

                        }

                    }else {
                        if ( i__ >  120){
                            return true
                        }
                    }
                    break;
                case "com.android.systemui.recents.RecentsActivity":
                    home();
                    break;
                case "com.tencent.mm.plugin.account.ui.WelcomeActivity":
                case "com.tencent.mm.plugin.account.ui.LoginPasswordUI":
                    return true
                default:
                    back();
            }
        }
        Tips();
        sleep(1000);
    }
}

function readInfo(){
    info = {};
    var i__ = 0;
    while (i__ < 8) {
        i__++;
        if ( active( appinfo.bid , 8)  ){

            var UI = currentActivity();
            log('UI',UI,i__)
            switch(UI){
                case 'com.tencent.mm.ui.LauncherUI':
                    log('首页');
                    if(jsclick('text',"我",true,2)){
                        if(jsclick("text","设置",false,2)){
                            var d = textMatches(/微信号.*/).findOne(1000)
                            if(d){
                                var d = d.parent().parent()
                                var keyArr = {
                                    '0':'微信昵称',
                                    '1':'微信号',
                                }
                                if(d){
                                    var d2 = d.children()
                                    log(d2.length)
                                    for (var i=0;i<2;i++){
                                        d2_ = d2[i].children()
                                        log(d2_[0].text())
                                        info[keyArr[i]] = d2_[0].text();
                                    }
                                    log(info);
                                    app_info(appinfo.name,info);
                                    return true
                                }
                            }
                        }
                    }else{
                        back();
                    }
                    break;
                case "com.tencent.mm.plugin.account.ui.WelcomeActivity":
                    log('未注册');
                    app_info(appinfo.name,{"状态":'未注册'});
                    break;
                case "com.tencent.mm.plugin.account.ui.LoginPasswordUI":
                    log('封号');
                    app_info(appinfo.name,{"状态":'封号'});
                    return true
                default:
                    back();
            }
        }
        Tips();
        sleep(500);
    }
}

function mesg(){
    var redmsg = text('微信').depth(12).findOne(500);
    if (redmsg){
        var redmsg = redmsg.parent().children()
        var rredmsg = redmsg[0].children()
        if ( rredmsg[1] ){
            log( '未读消息->',rredmsg[1].text() ,'条')
            return true
        }else{
            log('暂无未读消息')
        }
    }
}

// 正式开始编代码
log([currentPackage(),currentActivity(),device.width,device.height]);
var width = 720;
var height = 1440;
var appinfo = {}
appinfo.name = "微信";
appinfo.bid = "com.tencent.mm";

info={}

// var all_Info = textMatches(/.*/).find();
// for (var i = 0;i<all_Info.length;i++){
//     var d = all_Info[i];
//     log(i,d.id(),d.text(),d.depth())
// }

// var redmsg = text('微信').findOne(500);
// if (redmsg){
//     var redmsg = redmsg.parent().children()
//     var rredmsg = redmsg[0].children()
//     if ( rredmsg[1] ){
//         log( '未读消息->',rredmsg[1].text() ,'条')
//     }else{
//         log('暂无未读消息')
//     }
// }

// var idlist = {}
// var list = className('android.widget.LinearLayout').find();
// for (var i = 0;i<list.length;i++){
//     var d = list[i];
//     log(i,d.id(),d.text(),d.depth())
//     if (idlist[d.id()]){
//         idlist[d.id()]++
//     }else{
//         idlist[d.id()]=1;
//     }
// }

// readInfo()
// main()


// jsclick('text','微信',true,2)

