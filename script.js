const formElement = document.querySelector('#addNewTask')
const taskUl = document.querySelector('.task-ul')
const completedTaskUl = document.querySelector('.completed-task-ul')

function pushToPage(){
    let newTaskDate = currentDate;
    let newTask = 
        `Created: ${newTaskDate} Task: ${document.querySelector('#task').value} Complete by: ${document.querySelector('#completeTaskBy').value}`
    let li = document.createElement('li');
    li.innerHTML = newTask;
    taskUl.appendChild(li);
    li.ondblclick = function (){
        this.remove();
        // running below ensures that once removed by clicking, the function loops over the active li's again to update. otherwise it only updates when adding another task
        saveLocalStorage();
        saveLocalStorageCompleted();
    };
    li.onclick = function(){
        completedTaskUl.appendChild(this);
        saveLocalStorage();
        saveLocalStorageCompleted();
    }
    document.forms[0].reset();
    saveLocalStorage();
}


function saveLocalStorage(){
    let arrayForStorage = []
    arrayForStorage = [];
    let taskItems = taskUl.getElementsByTagName("li");
    for(let i = 0; i < taskItems.length; i++){
        arrayForStorage.push(taskItems[i].innerText)
    }
    localStorage.setItem('arrayForStorage', JSON.stringify(arrayForStorage));
}


function saveLocalStorageCompleted(){
    let arrayForStorageCompleted = [];
    arrayForStorageCompleted = [];
    // completedTaskUl.appendChild(this);
    let completedTaskItems = completedTaskUl.getElementsByTagName("li");
    for(let i = 0; i < completedTaskItems.length; i++){
        arrayForStorageCompleted.push(completedTaskItems[i].innerText)
    }
    localStorage.setItem('arrayForStorageCompleted', JSON.stringify(arrayForStorageCompleted));
    // saveLocalStorage();
}


const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}/${month}/${year}`;

// const toggleFormVisible = document.querySelector("#showFormButton").addEventListener('click', function(){
//     if(formElement.classList.contains('formVisible')){
//         formElement.classList.remove('formVisible');
//     } else {
//         formElement.classList.add('formVisible');
//     }
// })

function checkEmpty(e){
    e.preventDefault();
    let task = document.querySelector('#task').value;
    let completeTaskBy = document.querySelector('#completeTaskBy').value;
        if(task === ''){
            alert('Input a task')
        } else if (completeTaskBy === ''){
            alert('Insert a date of completion')
        } else{
            pushToPage();
        }
}

document.getElementById('reset').addEventListener('click', (e)=>{
    e.preventDefault();
    // below, first we reset the array to be empty, but that's just a local reset, we need to reset localstorage too with the emptied array value, so we immediately push that empty value to storage
    arrayForStorage = [];
    localStorage.setItem('arrayForStorage', JSON.stringify(arrayForStorage));
    taskUl.innerHTML = '';
    arrayForStorageCompleted = [];
    localStorage.setItem('arrayForStorageCompleted', JSON.stringify(arrayForStorageCompleted));
    completedTaskUl.innerHTML = '';
});

function populateArray(){
    let parsedArray = JSON.parse(localStorage.getItem("arrayForStorage"));
    for(let i = 0; i < parsedArray.length; i++){
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(parsedArray[i]));
        taskUl.appendChild(li)
        li.ondblclick = function(){
            this.remove();
            // running below ensures that once removed by clicking, the function loops over the active li's again to update. otherwise it only updates when adding another task
            saveLocalStorage();
            saveLocalStorageCompleted();
        };
        li.onclick = function(){
            let arrayForStorageCompleted = [];
            completedTaskUl.appendChild(this);
            let completedTaskItems = completedTaskUl.getElementsByTagName("li");
            for(let i = 0; i < completedTaskItems.length; i++){
                arrayForStorageCompleted.push(completedTaskItems[i].innerText)
            }
            localStorage.setItem('arrayForStorageCompleted', JSON.stringify(arrayForStorageCompleted));
            saveLocalStorage();
            saveLocalStorageCompleted();
        };
    }
}
function populateCompletedArray(){
    let parsedArrayCompleted = JSON.parse(localStorage.getItem("arrayForStorageCompleted"));
    for(let i = 0; i < parsedArrayCompleted.length; i++){
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(parsedArrayCompleted[i]));
        completedTaskUl.appendChild(li)
        li.ondblclick = function (){
            this.remove();
            // running below ensures that once removed by clicking, the function loops over the active li's again to update. otherwise it only updates when adding another task
            saveLocalStorage();
            saveLocalStorageCompleted();
        };
    }
}

document.addEventListener('DOMContentLoaded', (e)=>{
    document.getElementById('submit').addEventListener('click', checkEmpty)
    populateArray();
    populateCompletedArray();
    // below clears typed but unsubmitted form data on page refresh
    document.forms[0].reset();
})







// when clicking, it is added to a second list called completed tasks. the completed tasks has a strike through class appended, and also if i can add the date completed too?



// Logic is as follows:

//1st we check to see if the HTML document is fully loaded (DOMContentLoaded), once it is it runs the inner code
// We access localstorage to retrieve a stored array of list items, that were previously converted to an array for storage
// We parse said array, and save it as variable parsedArray, it is an array
// The array is looped over, and for every array element we create a li element, add in the text content of each array item, and then append it to the ul

    // Submit button Elistener fires when a new task is submitted, runs function checkempty (checks if theres an empty value for the date, or task)

    // here im redefining task and complete task by as they are block scoped, must have ran into some issues with scoping. Those variables are used with an if else statement to check if there are any empty inputs

    // Push to page is then told to run, needs to be here in sequence so it runs automatically after checking for any empty values
// /////////


// Push to page: we set new task date equal to current date, the string of which we created elsewhere in the document. then a variable called new task is created, using STLiterals, we create the inner text of the li. We set the new task date, then capture the value of the task and complete-task-by date by using query selector and .value.

    // we then create a li element

    // the newTask variable's inner HTML (not text, as its using STLiterals) is set to this li's content

    // Then we append the li to the ul on the page

    // then a function exists where we can remove the li using 'this', and if anything is removed we run save to local storage

    // after this save to local storage is run
// //////////


// To save the tasks upon leaving the page, we need to store them in localStorage. To do this we need to loop over all li's and save them to an array using a for loop. we then use setItem method to store this using JSON.stringify

    // we need to reset arrayForStorage first right before saveLocalStorage is run. It repushes the entire ul into the array, and then when a new task is added, you end up with exponentially increasing duplicates. So this empties the stored array first, and then loops over the whole thing