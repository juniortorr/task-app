import Project from './components/project.js'
import Task from "./components/task.js";
import { projectList } from './components/data.js';
import ListItem from './components/listItem.js';
import { newProjectButton, newProjPopup } from './domStuff.js';

const callNewTask = (taskArr) => {
    // prompt the dom page to show a prompt 
    let newTaskName = prompt('New task');
    const newTask = new Task(newTaskName)
    taskArr.push(newTask)
    console.log('success', taskArr)
}
const callRemoveTask = (task) =>{
    console.log('hello')
}
const callNewListItem = (listArr) => {
    let newListItem = prompt('new list item')
    listArr.push(new ListItem(newListItem))
    console.log(listArr)
}
const work = new Project('Work', 'Blue');
const school = new Project('school', 'red')

newProjectButton.addEventListener('click', newProjPopup)




export { callNewTask, callRemoveTask, callNewListItem }
// data.js
// /components
    // project.js
    // task.js

// Project card Functionality
    // Class that acts as a data base and initiates new projects into an array 
    // Each NEW project should contain a title, a priority option, and an empty array and push into the date.js projects array
    // each project should have a function that adds a new task into the empty tas
    // Users should be able to remove or delete an entire 
    
// Individual Task Functionality
    // Initiating a NEW task will include a title, a due date, an optional description, and an empty array for the child list then  