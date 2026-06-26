//select dom elements
const input = document.getElementById('to-do input')
const addbtn=document.getElementById('add-btn')
const list= document.getElementById('to-do list')

const saved= localStorage.getItem('todos');
const todos= saved? JSON.parse(saved): [];

function saveTodos(){
    //save current to-dos to local storage  
    localStorage.setItem('todos', JSON.stringify(todos));
}
//create a dom node for a to-do object and append it to the list
function createToDoNode(todo,index){
    const li= document.createElement('li');
    
    //check box to show completetion
    const checkbox= document.createElement('input');
    checkbox.type= 'checkbox';
    checkbox.checked= !!todo.completed; //double !  is used to convert boolean equivalent value to exact boolean 
    checkbox.addEventListener("change", ()=> {
        todo.completed=checkbox.checked;
        textSpan.style.textDecoration=todo.completed? 'line-through': " ";
    saveTodos();
    })
    //text of todo
    const textSpan=document.createElement("span");
    textSpan.textContent= todo.text;
    textSpan.style.margin='0 8px';
    if (todo.completed){
        textSpan.style.textDecoration='line-through';
    }
        //add double-click event listener to edit to-do
        textSpan.addEventListener('dblclick', ()=>{
            const newText= prompt("edit todo", todo.text);
            if (newText !==null){
                todo.text=newText.trim()
                textSpan.textContent= todo.text;
                saveTodos();
            }
        })
        //delete todo
        const delbtn=document.createElement('button');
        delbtn.textContent="Delete";
        delbtn.addEventListener("click", ()=>{
            todos.splice(index, 1);
            render();
            saveTodos();
        })
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delbtn);
        return li
    }

    



//render the todos list from array
function render(){
    list.innerHTML= ' ';
    //recreate each item
    todos.forEach((todo,index) => {
        const node= createToDoNode(todo,index)
        
        list.appendChild(node)
        
    });
    
}
function addtodo(){
    const text= input.value.trim();
    if (!text){
        return
    }
    todos.push({text, completed:false});
    input.value=" ";
    render()
    saveTodos()
}
addbtn.addEventListener("click", addtodo);
render();
