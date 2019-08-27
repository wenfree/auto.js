


'ui';
var storage = storages.create("news");
var imei_tag = storage.get("imei_tag");
var whos = storage.get("whos");
if (!imei_tag){
    imei_tag = '手机标签';
}
if (!whos){
    whos = 'ouwen000';
}

ui.layout(
    <vertical>
        <input id = 'imei_tag' w="*" hint="手机标签" margin="30 10" > { imei_tag } </input>
        <input id = 'whos' w="*"hint="所有者" margin="30 10" > { whos } </input>
        <button text="开始赚钱" id="ok" margin="30 10" gravity_layout='bottom'/>
    </vertical>
)
//点击开始赚钱
ui.ok.click(()=>{
    var imei_tag = ui.imei_tag.text();
    var whos = ui.whos.text();
    saveConf(imei_tag,whos);
    var allInfo = Imei_sevice(imei_tag,whos);
    if (allInfo){
        var allInfo = JSON.parse(allInfo);
        toastLog(allInfo);
        log('end')
    }

    threads.start(function(){
        //在新线程执行的代码
        console.show();
        var i=0;
        while(true){
            log("子线程");
            (Imei_sevice(imei_tag,whos));
            sleep(1000*30);
            log("imei",i)
            i++;
        }
    });
})
//把2个相关信息存一下
function saveConf(imei_tag,whos){
    storage.put("imei_tag", ui.imei_tag.text());
    storage.put("whos", ui.whos.text());
}
//同步imei的接口
function Imei_sevice(imei_tag,whos){
    try{
        var url = "http://news.wenfree.cn/phalapi/public/";
        var r = http.post(url, {
            "s": "App.Zllgcimei.Imei",
            "imei": device.getIMEI(),
            "imei_tag": imei_tag,
            "imei_info": device,
            "whos": whos,
        });
        return r.body.string();
    }catch(err){
        toastLog(err);
    }
}







