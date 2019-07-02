function get_task(){
    var storage= storages.read();
    var res= storage.get("task");
    log(res.data.code)
    if (res.mesg == "今天没有任务"){
        sleep(1000*10)
        return false
    }else if (res.mesg == "暂时没有任务"){
        sleep(1000*10)
        return false
    }else{
        var taskData = res.data
        log(taskData)
        return taskData;
    }
}

// var taskData = get_task();
// code=taskData.code;

code = "LeHaiTv";

switch(code){
	case 'LeHaiTv':
		var lehai = require("lehai");
		lehai.main();
	break;
	
}