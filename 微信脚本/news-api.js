



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
        // toastLog(allInfo);
        var webui = JSON.parse(allInfo.data.webui);
        var imei_data = JSON.parse(allInfo.data.imei_data);
        log("webui",webui);
        log("imei_data",imei_data);
        storage.put("webui", webui);
        storage.put("imei_data", imei_data);
        // ui.finish();

        const scripts = ["今日头条极速版","趣头条"]
        var enginess = [];
        var mainEnengine = engines.myEngine();
        log(mainEnengine);

        // var iii = setInterval(()=>{},1000);//保护主脚本不停掉
        events.on("control",(i)=>{
            i++;
            if(i>scripts.length)exit();
            var ae= engines.execScriptFile(scripts[i]+'.js')
            sleep(500)
            var aengine = ae.getEngine();
            aengine.emit("prepare",i,mainEnengine)
            enginess.push(aengine);
        });
        
        mainEnengine.emit("control",-1);

        log('end')

    }
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
        r = http.post(url, {
            "s": "App.Newsimei.Imei",
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







