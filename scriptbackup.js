// this backup is made just before changing the stored value from array to ul. functionally everything works but its missing the ability to delete individual list items, a dif i add that functionality im still struglling to find out how to delete the corresponding array item


const formElement = document.querySelector('#addNewTask')
const taskList = document.querySelector('.task-list')
const ul = document.querySelector('ul')
const newTaskDateUl = document.querySelector('.newTaskDate-ul')
const taskUl = document.querySelector('.task-ul')
const completeTaskByUl = document.querySelector('.completeTaskBy-ul')

let taskListArray = [
    {
        newTaskDate: '12/02/2023',
        task: 'Complete transition to Webdev',
        completeTaskBy: '01/12/2023',
        taskCompleted: false,
    }
]

function pushToPage(){
    let ul = 
        `<ul>
            ${taskListArray.map(task =>`<li>${task.newTaskDate} | ${task.task} | ${task.completeTaskBy}</li>`).join('')}
        </ul>`;
    taskList.innerHTML = ul;
}

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}/${month}/${year}`;


const addTask = () =>{
    // e.preventDefault()
    let newTask = {
        newTaskDate: currentDate,
        task: document.querySelector('#task').value,
        completeTaskBy: document.querySelector('#completeTaskBy').value,
        taskCompleted: false,
    }
    taskListArray.push(newTask)
    pushToPage();
    document.forms[0].reset();
    localStorage.setItem('taskListArray', JSON.stringify(taskListArray));
}

const toggleFormVisible = document.querySelector("#showFormButton").addEventListener('click', function(){
    if(formElement.classList.contains('formVisible')){
        formElement.classList.remove('formVisible');
    } else {
        formElement.classList.add('formVisible');
    }
})

function checkEmpty(e){
    e.preventDefault();
    let task = document.querySelector('#task').value;
    let completeTaskBy = document.querySelector('#completeTaskBy').value;
        if(task === ''){
            alert('Input a task')
        } else if (completeTaskBy === ''){
            alert('Insert a date of completion')
        } else{
            addTask();
        }
}

//1st. Below function checks to see if the HTML document is fully loaded (DOMContentLoaded). Then preventDefault action of page refresh[not needed?]. Accessing localstorage and setting taskListArray variable to the stored value (which is pushed to local storage everytime user submits a new task). Submit button Elistener fires when a new task is submitted, runs function checkempty (checks if empty value for the date or task). Push to page runs, needs to be here so it runs on page load, otherwise the array will only be pushed to page once a user adds a new task

document.getElementById('reset').addEventListener('click', (e)=>{
    e.preventDefault();
    taskListArray = [];
    localStorage.setItem('taskListArray', JSON.stringify(taskListArray));
    pushToPage();
});

document.addEventListener('DOMContentLoaded', (e)=>{
    // e.preventDefault();
    document.getElementById('submit').addEventListener('click', checkEmpty)
    taskListArray =  JSON.parse(localStorage.getItem("taskListArray"));
    // below clears unsubmitted form data on page refresh
    document.forms[0].reset();
    pushToPage();
})



// Tests and ideas below

// function deleteTask(){
//     if(string value being clicked === string value in Array.task by looping over array){
//         delete said object from array
//     }
// }



// make a variable called mylist, which is the ul and all list items in it. store mylist in localstorage rather than the array, and on page load populate the dom with mylist from localstorage. no need to save to array.