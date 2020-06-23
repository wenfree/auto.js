



var my_app = {}
my_app.packageName = "com.ss.android.ugc.aweme";
my_app.name = "抖音";
my_app.link = undefined
        

function jspost(url,data){
    var res = http.post(url, data);
    var data = res.body.string();
    if(data){
        return JSON.parse(data);
    }
}

//读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        return storage.get(key);
    };
    //默认返回undefined
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
        click(x,y)
    }else{
        log('坐标错误')
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
//输入密码
function input_pay_password(password){
    var key_xy = {}
    key_xy[1]=[device.width*0.3,device.height*7/10]
    key_xy[2]=[device.width*0.5,device.height*7/10]
    key_xy[3]=[device.width*0.8,device.height*7/10]
    key_xy[4]=[device.width*0.3,device.height*7.5/10]
    key_xy[5]=[device.width*0.5,device.height*7.5/10]
    key_xy[6]=[device.width*0.8,device.height*7.5/10]
    key_xy[7]=[device.width*0.3,device.height*8/10]
    key_xy[8]=[device.width*0.5,device.height*8/10]
    key_xy[9]=[device.width*0.8,device.height*8/10]
    key_xy[0]=[device.width*0.5,device.height*9/10]
    // 清除其它字符
    password = password.replace(/\D/g,"")
    for(var i=0;i<password.length;i++){
        var numbers = password.substring(i,i+1);
        click_(key_xy[numbers][0],key_xy[numbers][1])
        sleep(300)
    }
}


// var t = className("TextView").find();


// for (var i=0;i<t.length;i++){
//     var tt = t[i]
//     log(i,tt.id(),tt.text())
// }


log(currentPackage());
log(currentActivity());
log(device.width,device.height)
var comssss ={}
var icom = 0

// while (true) {
//     var t = className("TextView").find();
    

//     if(t){
//       for (var i=0;i<t.length;i++){
//           var tt = t[i];
//           log(i,tt.id(),tt.text());
//           if (tt.id() == "com.ss.android.ugc.aweme:id/a2n"){
//             icom++
//             comssss[icom] = tt.text();
//           }

//       }
//     }

//     swipe(device.width/2,device.height*4/5,device.width/2,device.height*2/5,2000);
//     sleep(1000);
  

//     log(comssss)
// }


var ku = [
    "赞",
    "非常不错",
    "好",
    "好好",
    "好好好",
    "我喜欢",
    "喜欢",
    "特别喜欢",
    "同事推荐的",
    "家人推的",
    "家人介绍",
    "同学介绍",
    "朋友介绍",
    "朋友推的",
    "同事推的",
    "同学推的",
    "非常好",
    "这条视频不错",
    "我去，真好",
    "好，虽然只有一个字",
    "拍的好",
    "不错啊",
    "漂亮",
    "漂亮的不行",
    "这个视频真好看",
    "真好看",
    "好看",
    "可以的",
    "可以",
    "非常可以",
    "好的，好的",
    "爱了",
    "大爱视频",
    "这条视频",
    "棒棒的",
    "棒",
    "非常棒",
    "非常非常棒",
    "棒棒棒",
    "满意",
    "很满意",
    "非常满意",
    "满意了",
    "用心了",
    "非常赞",
    "都来赞",
]

var sd =[
    '第四代胜达',
    '自带车辆偏离辅助系统',
    '偏离辅助系统',
    '辅助系统',
    '北京现代真棒！',
    '北京现代，',
    '我们一起来捉妖吧[呲牙]',
    '攒钱，买一辆[呲牙]',
    '准，棒棒哒[强],',
    '买买买',
    '现代',
    '现代汽车',
]

var emoj = [
    "[呲牙]",
    "[赞]",
    "[玫瑰]",
    "[捂脸]",
    "[666]",
    "[鼓掌]",
    "[微笑]",
    "[耶]",
    "[耶]",
];

function txt_(arr)
{
    return arr[random(0, arr.length-1 )]
}
var commms = {}
for (var i=0;i < 1000;i++){
    function rdtxt(n){
        var txt = ''

        for (var kkk=0;kkk<n;kkk++) {
            if (random(1 , 100) < 50 ){
                txt = txt +''+ txt_(ku)
            }
            if (random(1 , 100) < 50 ){
                txt = txt +''+ txt_(emoj)
            }
            if (random(1 , 100) < 50 ){
                txt = txt +''+ txt_(sd)
            }
        }

        return txt
    }
    commms[i] = rdtxt(random(3,5))
}
log(commms)





