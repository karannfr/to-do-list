const toDoList = JSON.parse(localStorage.getItem('list')) || [];
renderToDo();
function renderToDo(){
  localStorage.setItem('list',JSON.stringify(toDoList));
  let html = "";
  for(let i=0;i<toDoList.length;i++){
    if(!toDoList[i].status){
      html = html + `<div class="item" id="item${i}">
            <input type="checkbox" name="check" class="check" id="check${i}" onchange="checkItem(this.id)">
            <p id="desc${i}">${toDoList[i].desciption}</p>
            <button class="delete" id="delete${i}" onclick="deleteItem(this.id)">✖</button>
          </div>`;
    }
    else{
      html = html + `<div class="item" id="item${i}">
            <input type="checkbox" name="check" class="check" id="check${i}" checked="true" onchange="checkItem(this.id)">
            <p id="desc${i}" class="checked">${toDoList[i].desciption}</p>
            <button class="delete" id="delete${i}" onclick="deleteItem(this.id)">✖</button>
          </div>`;
    }
  }
  document.querySelector('.items').innerHTML = html;
}

function addItem(){
  let value = document.querySelector('.description').value;
  if(value)
    toDoList.push({'status': false,'desciption': value});
  renderToDo();
  document.querySelector('.description').value = null; 
}

function checkItem(itemId){
  let taskNumber = Number(itemId.substring(5));
  toDoList[taskNumber].status = !toDoList[taskNumber].status;
  renderToDo();
}

function deleteItem(itemId){
  let taskNumber = Number(itemId.substring(6));
  toDoList.splice(taskNumber,1);
  renderToDo();
}

document.addEventListener('keydown',(event)=>{
  if(event.key==='Enter')
    addItem();
});