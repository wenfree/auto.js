importClass(android.content.ContentResolver);
importClass(android.database.Cursor);
importClass(android.net.Uri);

//uri
function get_sms_by_time(name,timeline){
    var smsUri = "content://sms/inbox";
    function xxxx( body ,date){
        var sms_arr ={};
        var cursor=context.getContentResolver().query(Uri.parse(smsUri), ["body"], "body like ? and date > ?",["%"+body+"%",date], "date desc");
        if (cursor != null) {
            let i=0;
            while(cursor.moveToNext()){
                var sms_content = cursor.getString(cursor.getColumnIndex("body")); 
                console.log("短信", sms_content);
                sms_arr[i]=sms_content;
                i++
            }
        }
        return sms_arr;
    } 
    if(!timeline){
        timeline = 0;
    }
    return xxxx(name,timeline);
}
var datetime =new Date().getTime();
log(datetime)

log(get_sms_by_time("知乎",datetime -60*60*13*1000));
