



var my_app = {}
my_app.packageName = "com.qihoo.appstore";
my_app.name = "兼职数据";
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


log(currentPackage());
log(currentActivity());
log(device.width,device.height)

  var t = className("TextView").find();
  if(t){
    for (var i=20;i<t.length;i++){
        var tt = t[i];
      
        if (tt.id() == "com.jianzhi.ai:id/title" && tt.text() == '思珂特考场监考员' ){
          log(tt.id(),tt.text());
          var postarr = {}
          postarr["s"] = "App.Acount.Save";
          postarr["title"] = tt.text();
          postarr["price"] = t[i+1].text()+t[i+2].text();
          postarr["context"] = t[i+3].text();
          log(postarr);
          var idarr = jspost("http://99kuaixiu.cn/api/public/",postarr);
          var listid = idarr.data.id;
          if (jsclick("text",tt.text(),true,4)){
              
              savemore(listid);
          }
          back();
          if (i>2){
            sleep(2000);
            swipe(device.width/2,device.height*4/5,device.width/2,device.height*3/5,3000);
            sleep(2000);
          }
        }
    }
  }

function savemore(listid){
    var t_ = className("android.view.View").find();
    if(t_){
        var shows={}
        var work_ = 0
        var ren_ = 0
        for (var i=0;i<t_.length;i++){
            var t__ = t_[i];
            log(i,t__.id(),t__.text())
            if(t__.text() == '工作内容'){
                work_ = i+1
            }
            if(t__.text().replace(/\d*/,'') == '人'){
                ren_ = i
            }
            if(t__.text()=='公司信息'){
                shows['company'] = t_[i+4].text();
            }

        }
        shows['s'] = 'App.Acount.savemore'
        shows['title'] = t_[2].text();
        shows['price'] = t_[4].text().match(/\d*/)[0];
        shows['dw'] = t_[4].text().replace(/\d*/,'');
    
        log(work_,ren_)
        shows['txt'] = '';
        for (var i=work_;i<ren_;i++){
            shows['txt'] = shows['txt'] +'\r\n' + t_[i].text();
        }
        shows['listid'] = listid
        shows['ren'] = t_[ren_].text();
        shows['worktime'] = t_[ren_+2].text();
        shows['address'] = t_[ren_+4].text();
    
        jspost("http://99kuaixiu.cn/api/public/",shows)
        log(shows);
    }
}







function clearApp(bid) {

    var packageName = bid
    let i = 0
    while (i < 10) {
        let activity = currentActivity()
        switch (activity) {
            case "com.miui.appmanager.ApplicationsDetailsActivity":
                if (click("清除数据")) {
                } else if (click("清除全部数据")) {
                } else if (click("确定")) {
                    desc("返回").click();
                    sleep(2000);
                    back();
                    sleep(2000);
                    return true
                }
                break;
            default:
                log("页面:other")
                back()  //返回
                if (!openAppSetting(packageName)) {
                    log("找不到应用，请检查packageName");
                }
                break;
        };
        i++;
        sleep(1000)
    }
    back();
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


// log(getClip());
// var url = 'https://v.douyin.com/XWEQTF/'

// back();
// sleep(1000);
// back();
// sleep(1000);
// back();
// sleep(1000);
// setClip(url);
// log("准备启动");
// log(Date())
// active(my_app.packageName,6);
// log("启动完成");
// log(Date())
// sleep(1000);

// if (jsclick("text","前往",true,2) || jsclick("text","打开看看",true,2)){
//     openKey = true
// }










