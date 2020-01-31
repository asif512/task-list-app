// UI element

const form = document.querySelector('#task-form');
const inputValue = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');


loadEventListner();

function loadEventListner(){

    // DOM load
    document.addEventListener('DOMContentLoaded', getTask);
    // add item
    form.addEventListener('submit', addItem);

    // remove item
    taskList.addEventListener('click', deleteItem);

    // clear item
    clearBtn.addEventListener('click', clearItem);

    // filter item
    filter.addEventListener('keyup',filerItem);
    
}

// Get items from local storage
function getTask(e){
    let items;
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(function(item){
        
        const li = document.createElement('li');
       li.className = 'collection-item';
       li.appendChild(document.createTextNode(item));
       const link = document.createElement('a');
       link.className = 'delete-item secondary-content';
       link.innerHTML = '<i class="fa fa-remove"> </i>';
       li.appendChild(link);
       taskList.appendChild(li);

    });
    
}


// Add Item
function addItem(e){
    if(inputValue.value !== ''){
       const li = document.createElement('li');
       li.className = 'collection-item';
       li.appendChild(document.createTextNode(inputValue.value));
       const link = document.createElement('a');
       link.className = 'delete-item secondary-content';
       link.innerHTML = '<i class="fa fa-remove"> </i>';
       li.appendChild(link);
       taskList.appendChild(li);

       // store item in local storage functin call
        storeItemInLocalStorage(inputValue.value);
    }
    else{
        alert('enter the values');
    }
  
    inputValue.value = '';
    e.preventDefault();
}


// Store Item in Local Storage
function storeItemInLocalStorage(item){
    let items;
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));

}



// Delete Item
function deleteItem(e){
    
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure!')){
            e.target.parentElement.parentElement.remove();

            // Remove item form local storage function call
            removeItemFromLS(e.target.parentElement.parentElement);
               
        }            
    }   
}


// Remove Item form Local Storage
function removeItemFromLS(listItem){
    let items;
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    
    items.forEach(function(item, index){

        if(listItem.textContent.indexOf(item) != -1){
            items.splice(index, 1); 
        }        
    });

    localStorage.setItem('items', JSON.stringify(items));
}


// Clear Item
function clearItem(e){

    // taskList.innerHTML = '';

    // faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}


// Filter Item
function filerItem(e){
   const text = e.target.value.toLowerCase();
   const lists = document.querySelectorAll('.collection-item');
   lists.forEach(function(list){
       const task = list.firstChild.textContent.toLocaleLowerCase();
       if(task.indexOf(text) != -1){
           list.style.display = 'block';
       }
       else{
        list.style.display = 'none';
       }
   });
}

// localStorage.clear();
