
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


var sms_ = '660462';
                            for(var i=0;i<sms_.length;i++){
                                // id("com.zhihu.android:id/passcode_input_"+(i+1)).findOne(200).setText(sms_.substring(i,i+1));
                                // jsclick("id","com.zhihu.android:id/passcode_input_"+(i+1),false,2);
                                var d = id("com.zhihu.android:id/passcode_input_"+(i+1)).findOne(200);
                                if(d){
                                   input(sms_.substring(i,i+1));
                                   sleep(100);
                                }
                            }






