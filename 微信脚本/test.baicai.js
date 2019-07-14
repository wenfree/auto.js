

"ui";
ui.layout(
    <vertical>
        <input id='hh' w='*'/>
    </vertical>
)
ui.hh.addTextChangedListener({
    afterTextChanged:(s)=>{
        toast(s);
    }
})




