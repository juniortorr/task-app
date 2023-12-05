import Project from './components/project.js'
import './styles.css'
import Task from "./components/task.js";
import { projectList } from './components/data.js';
import ListItem from './components/listItem.js';
import { newProjectButton, newProjPopup, newTaskPopup } from './domStuff.js';

// console.log(res) // Hi Ben!


const initiateNewProj = (projTitle, priority) => {
    const proj = new Project(projTitle, priority);
    console.log('project added!')

}
const initiateNewTask = (taskArr) => {
     const task = new Task();
     taskArr.push(task)
     newTaskPopup(task)
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


newProjectButton.addEventListener('click', newProjPopup)




export { callNewTask, callRemoveTask, callNewListItem, initiateNewProj, initiateNewTask }
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