
module.exports = {
    "hello":function(){  return "hello world" },
    "jsclick":function jsclick(way,txt,clickKey,n){
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
                click(res.bounds().centerX(),"y:",res.bounds().centerY());
                sleep(1000*n);
            }else{
                log("找到->",txt);
            }
            return true;
        }else{
            // log("没有找到->",txt)
        }
    },
    "jsinput":function(txt){
        input(txt)
        sleep(1000*1)
    }
};

