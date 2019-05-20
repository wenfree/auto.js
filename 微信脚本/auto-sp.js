
module.exports = {
    "hello":function(){  return "hello world" },
    "jsclick":function(way,txt,clickKey,n){
        if(!n){n=1}
        var res = false;
        if(!clickKey){clickKey=false};
        if (way == "text"){
            res = text(txt).findOne(200);
        }else if(way == "id"){
            res = id(txt).findOne(200);
        }
        if(res){
            log("找到->",txt)
            if (clickKey){
                log('准备点击->',txt);
                log("x:",res.bounds().centerX(),"y:",res.bounds().centerX());
                // click(txtddd.bounds().centerX(),txtddd.bounds().centerY());
                Tap(res.bounds().centerX(),res.bounds().centerY());
                sleep(1000*n);
            }
            return true;
        }else{
            log("没有找到->",txt)
        }
    },
    "input_":function(txt){
        input(txt)
        sleep(1000*1)
    }
};

