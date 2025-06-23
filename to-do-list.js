const todoInput = document.querySelector('.todoInput');
const activeItems = JSON.parse(localStorage.getItem('activeItems')) || [];
const completedItems = JSON.parse(localStorage.getItem('completedItems')) || [];
const activeBtn = document.querySelector('.todoActive');
const completedBtn = document.querySelector('.todoCompleted');

function saveToStorage(){
    localStorage.setItem('activeItems', JSON.stringify(activeItems));
}
function completedItemStorage(){
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
}

document.querySelector('.todoAdd').addEventListener('click', ()=>{
    let item = todoInput.value;
    if(item !== ''){
        activeItems.push(item);
        todoInput.value = '';
        saveToStorage();
        activeTodoItems();
    }
});

function activeTodoItems(){

    activeBtn.classList.add('selected-button');

    let html = '';
    activeItems.forEach((item, index) => {
        html+=`
        <div class='item-container item-container-${index}'>
            <p class='item-text'>${item}</p>
            <div class='editDiv'>
                <input placeholder='Type a new one' class='editInput editInput-${index}'>
                <button class='editSave' data-list-index='${index}'>Save</button>
            </div>
            <button class='item-completed'><i class="fa-solid fa-check" title="Completed"></i></button>
            <button class='item-edit'><i class="fa-solid fa-pen-to-square" title="Edit"></i></button>
            <button class='item-delete'><i class="fa-solid fa-trash" title="Delete"></i></button>      
        </div>
        `
    });
    document.querySelector('.todolist').innerHTML = html;

    document.querySelectorAll('.item-delete')
    .forEach((deleteBtn, index) =>{
        deleteBtn.addEventListener('click', ()=>{
            activeItems.splice(index, 1);
            saveToStorage();
            activeTodoItems();
        })
    });

    document.querySelectorAll('.item-completed')
    .forEach((completedBtn, index) =>{
        completedBtn.addEventListener('click', ()=>{
            completedItems.push(activeItems[index]);
            completedItemStorage();
            activeItems.splice(index, 1);
            saveToStorage();
            activeTodoItems();
        })
    });

    document.querySelectorAll('.item-edit')
    .forEach((editBtn, index)=>{
        editBtn.addEventListener('click', ()=>{
            document.querySelector(`.item-container-${index}`).classList.add('displayChange');
        })
    });

    document.querySelectorAll('.editSave')
    .forEach((saveBtn) =>{
        saveBtn.addEventListener('click', ()=>{
            let index = saveBtn.dataset.listIndex;
            let newItem = document.querySelector(`.editInput-${index}`).value;
            if(newItem !== ''){
                activeItems[index] = newItem;
                saveToStorage();
            }
            document.querySelector(`.item-container-${index}`).classList.remove('displayChange');
            activeTodoItems();
        })
    });

    updateNumbersOfItems();
}

activeTodoItems();

function updateNumbersOfItems(){
    const numofactiveItems = activeItems.length;
    const numofcompletedItems = completedItems.length;
    document.querySelector('.total-item').innerHTML = `${numofactiveItems + numofcompletedItems}`;
    document.querySelector('.active-item').innerHTML = `${numofactiveItems}`;
    document.querySelector('.completed-item').innerHTML = `${numofcompletedItems}`;
}

updateNumbersOfItems();

function completedTodoItems(){
    let html = '';
    completedItems.forEach(item => {
         html+=`
        <div class='item-container'>
            <p class='item-text'>${item}</p>
            <button class='completedItem-delete'><i class="fa-solid fa-trash" title="Delete"></i></button>      
        </div>
        `
    })
    document.querySelector('.todolist').innerHTML = html;

    document.querySelectorAll('.completedItem-delete')
    .forEach((deleteBtn, index) =>{
        deleteBtn.addEventListener('click', ()=>{
            completedItems.splice(index, 1);
            completedItemStorage();
            completedTodoItems();
        })
    });
    updateNumbersOfItems();
}

activeBtn.addEventListener('click', ()=>{
    completedBtn.classList.remove('selected-button');
    activeBtn.classList.add('selected-button');
    activeTodoItems();
});

completedBtn.addEventListener('click', ()=>{
    activeBtn.classList.remove('selected-button');
    completedBtn.classList.add('selected-button');
    completedTodoItems();
});
