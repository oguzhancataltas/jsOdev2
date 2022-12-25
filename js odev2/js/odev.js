const button = document.querySelector("#liveToastBtn");
const list = document.querySelector("#list");
const liveToast = document.querySelector("#liveToast")


const allLi = document.querySelectorAll("li")
eventListener();
function eventListener() {
    list.addEventListener("click", listFunction)
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
}
function loadAllTodosToUI(){
    let task = getTodosFromStorage();
    task.forEach(function(setTask){
        addTodoUi(setTask);
    })

}
function listFunction(e) {
    if (e.target.className === "close") {
        e.target.parentElement.remove();
        //fonsiyonu çagır
        // console.log(e.target.parentElement.firstChild.nodeValue);
        deleteToDoStorage(e.target.parentElement.firstChild.nodeValue); 
        
    }
    else if (e.target.className === "toDoItem") {
        //  var olan todoItem classını sileceksin
        // toDoOkey classını ekleyeceksin
        e.target.className = "toDoOkey";
        const checkItem = document.createElement("i");
        checkItem.className = "fa fa-check";
        e.target.appendChild(checkItem);

    }
    else if (e.target.className === "toDoOkey") {
        e.target.className = "toDoItem";
        e.target.children[1].remove();
    }

}
function getTodosFromStorage(){
    let task;
    if(localStorage.getItem("task")===null){
        task =[];
    }
    else{
        task = JSON.parse(localStorage.getItem("task"))
    }
    return task;

}

function addToDoToStorage(setTask){
    
let localStorageTask = getTodosFromStorage();
localStorageTask.push(setTask);
localStorage.setItem("task", JSON.stringify(localStorageTask));

}

function deleteToDoStorage(deleteTask){
 let siltask = getTodosFromStorage();
 siltask.forEach (function(task,index){
 if(task == deleteTask){
   siltask.splice(index,1);
 }


 });
console.log(siltask);
 localStorage.setItem("task", JSON.stringify(siltask));

 }




function newElement() {
    const task = document.querySelector("#task");

    
    if (task.value.trim() == "") {
        showToast(false);

    }
    else if (!task.value == "") {
        addTodoUi(task.value);
        showToast(true);
        addToDoToStorage(task.value);
        task.value = "";
    }
}

function addTodoUi(task){
    const listElement = document.createElement("li");
    const spanElement = document.createElement("span");
    listElement.className = "toDoItem";
    spanElement.className = "close";
    spanElement.innerText = "x";
    listElement.innerText = task.trim();
    listElement.appendChild(spanElement);
    list.appendChild(listElement);
}

function showToast(sonuc) {
    if (sonuc == false) {
        $(".error").toast("show");
    }
    else {
        $(".success").toast("show");
        

    }

}