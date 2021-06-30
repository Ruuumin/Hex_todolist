let data = [
    {
        content: "把烏龜放到倉庫",
        status: "no"
    },{
        content: "把企鵝冰進冰箱",
        status: "done"
    },{
        content: "記得帶上檸檬皮",
        status: "no"
    }
];

const list = document.querySelector(".todo-content");
const count = document.querySelector(".count");

// 預設載入
function init(){
    let str="";
    data.forEach(function(item,index){
        content = `
        <li class=${item.status}>
            <input type="checkbox" class="check" data-check="${index}"><p>${item.content}</p><span class="cross" data-del="${index}">×</span>
        </li>
        `
        str += content;
    })
    list.innerHTML = str;

    // 計算待完成數量
    let countNum = 0;
    data.forEach(function(item){
        if(item.status == "no"){
            countNum++;
        }
    })
    count.innerHTML = `${countNum} 個待完成項目`
};

init();

// 新增
const btnAdd = document.querySelector(".btn-add");
const textTodo = document.querySelector(".text-todo");

btnAdd.addEventListener("click",function(e){
    if(textTodo.value==""){
        alert("您尚未輸入待辦事項");
        return
    }
    let obj = {};
    obj.content = textTodo.value;
    obj.status = "no";
    data.push(obj);
    init();
    textTodo.value = "";
})

// 篩選資料
const filter = document.querySelector('.filter');

filter.addEventListener('click', function(e){
    let str = '';
    // 待完成 已完成
    data.forEach(function(item, index){
        if(e.target.getAttribute("data-filter") == item.status){
            content =`
            <li class=${item.status}>
                <input type="checkbox" class="check" data-check="${index}"><p>${item.content}</p><span class="cross" data-del="${index}">×</span>
            </li>
            `
            str += content;
        }
        
        list.innerHTML = str;

        //全部
        if(e.target.getAttribute("data-filter") == "all"){
            init();
        }

    })

    // 切換樣式
    let num = filter.childNodes.length;
    for(let i=0; i<num; i++){
        if(i%2){
            filter.childNodes[i].classList.remove('active');
        }
    }
    e.target.classList.add('active');
})

// 資料功能
list.addEventListener('click',function(e){
    // 刪除資料
    if(e.target.getAttribute("class") == "cross"){
        let num = e.target.getAttribute("data-del");
        data.splice(num, 1);
        init();
    }

    // 狀態轉換
    if(e.target.getAttribute("class") == "check"){
        let num = e.target.getAttribute("data-check");
        if(data[num].status == "no"){
            data[num].status = "done";
        }else{
            data[num].status = "no";
        }
        init();
    }
})

//清除已完成項目
const clearDone = document.querySelector(".clearDone_btn");
clearDone.addEventListener('click',function(e){
    let obj = [];
    data.forEach(function(item){
    if(item.status != "done"){
        obj.push(item);
    }
})
data = obj;
init();
})