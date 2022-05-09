
//新版基础函数
var f = {
    init:function() {
        log("程序初始化")
    },
    //post
    post : function(url,data){
        var res = http.post(url, data);
        var data = res.body.string();
        if(data){
            // log(data);
            return data;
        }
    },
    //get
    get : function(url){
        var res = http.get(url);
        var data = res.body.string();
        if(data){
            return data;
        }
    },
    //读取本地数据
    getLocal:function ( name, key) {
        const storage = storages.create(name);  //创建storage对象
        if (storage.contains(key)) {
            return storage.get(key);
        };
        //默认返回undefined
    },
    //基础函数
    active:function(pkg,n){
        if(!n){n=5}
        if(  currentPackage() == pkg ){
            log("应用在前端");
            return true;
        }else{
            log("启动一次应用");
            app.launch(pkg);
            sleep(1000)
            f.ms({"textMatches":"允许|始终允许"},true)
            sleep(1000*n)
        }
    },
    //准备点击
    click:function (x,y,sleeptime,name){
        if ( ! sleeptime ){sleeptime = 1}
        if ( name ){
            log('准备点击->'+name,"x:",x,"y:",y);
        }else{
            log('准备点击坐标->', "x:",x,"y:",y);
        }
        if( x > 0  && y > 0  ){
            threads.start(function(){
                //在新线程执行的代码
                click(x,y);
            });
            // click(x,y);
            sleep(sleeptime*1000);
            return true
        }else{
            log('坐标错误');
        }
    },
    //点击obj
    clickObj:function (obj,sleeptime,name){
        if ( ! sleeptime ){ sleeptime == 1 } 
        log(  name ? ("准备点击对象->" + name) : "点击未命名对象" )
        x = obj.bounds().centerX()
        y = obj.bounds().centerY()
        return f.click(x,y,sleeptime,name)
    },
    //穿透点击
    clickTrue:function(obj,sleeptime,name,lun){
        sleeptime ? sleeptime : 1
        let result = false;
        lun ? lun : 3
        for (let i=0;i<lun;i++){
            if (  obj && obj.clickable() ){
                obj.click();
                log(  name ? ("准备穿透点击对象->" + name) : "准备穿透点击未命名对象" )
                result = true
                break
            }
            obj = obj.parent()
        }
        if ( result ) { sleep(sleeptime * 1000) }
        return result
    },
    //正则点击
    ms:function (obj,clicks,sleeptimes,name,findtime,lun){
        if (!sleeptimes) { sleeptimes = 1}
        if (!findtime) { findtime = 200}
        if (!lun) { lun = 3}

        var txt = '';
        for(let key in obj){
            if ( key.search("Matches") > 0 ){
                eval("var matches = /" + obj[key] + "/")
                txt = txt + key+'('+matches+').'
            }else if( key ==  'boundsInside' ){
                txt = txt + key+'('+obj[key]+').'
            }else{
                txt = txt + key+'("'+obj[key]+'").'
            }
        }
        var txt = "let objs = "+txt+"findOne("+findtime+");"
        log(txt)
        eval(txt)
        if ( objs ) {
            log( '找到==>' + objs.text() || objs.desc() || objs.id() || objs.className() )
            if ( clicks ){
                name = obj['textMatches'] || obj['descMatches'] || obj['idMatches'] || obj['text'] || obj['desc'] || obj['id']
                if (lun < 1 || !f.clickTrue( objs,sleeptimes,name,lun )){
                    log('准备坐标点击')
                    return f.clickObj( objs,sleeptimes,name );
                }
            }
            return true;
        }
    },
    rd:function (min,max){
        if (min<=max){
            return random(min,max)
        }else{
            return random(max,min)
        }
    },
    moveTo:function (x,y,x1,y1,times){
        swipe(x,y,x1,y1,times);
        sleep(1000);
    }
}
f.init()


//批查打印app参数
function printAll( ways ) {
    if (!ways){
        ways = 'className'
    }
    if (ways = 'className'){
        var all_Info = classNameMatches(/.*/).find();
    }else
    if (ways == 'text'){
        var all_Info = textMatches(/.*/).find();
    }else
    if (ways == 'id'){
        var all_Info = idMatches(/.*/).find();
    }else{
        eval( 'var all_Info = ' + ways + '.find();'  )
    }
    
    if ( all_Info ){
        for (var i = 0;i<all_Info.length;i++){
            var d = all_Info[i];
            log(i,d.id(),d.text(),"desc:"+d.desc(),'"className":"'+d.className()+'"',
            "clickable->"+d.clickable(),'selected->'+selected(),"depth->"+d.depth(),
            d.bounds().centerX(),d.bounds().centerY())
        }
    }else{
        log('没有找到任何相关的节点')
    }
}


// printAll()

f.ms({"desc":"搜索，按钮"},true,3)
setText(0,"878608426")
f.ms({"desc":"搜索"},true,3)
f.ms({"textMatches":"直播中.*"},true,3)

//在直播间
f.ms({"id":"b++"})

f.ms({"desc":"商品"},true,5)
f.ms({"textMatches":"说点什么..."},true,3)

f.ms({"desc":"发送"},true,3)