import Project from './components/project.js'
import './styles.css'
import Task from "./components/task.js";
import { projectList } from './components/data.js';
import ListItem from './components/listItem.js';
import { newProjectButton, domStuff } from './domStuff.js';

// console.log(res) // Hi Ben!


const initiateNewProj = (projTitle, priority) => {
    const proj = new Project(projTitle, priority);
    console.log('project added!')
    proj.updateProjectListData()
    console.log(projectList)
    domStuff.updateProjectListUI()
}
const initiateNewTask = (btn) => {
     const task = new Task();
    
     projectList.forEach((project) => {
        if(btn.classList.contains(project.title)){
            console.log('here i am')
            project.tasks.push(task);
            domStuff.newTaskPopup(task, project)
        }   
     })
}
const callDeleteProject = (projectCard) => {
    const projectTitle = projectCard.getAttribute('id');
    const deleteOptionsBtn = projectCard.querySelector('.deleteProjectBtn');
    deleteOptionsBtn.addEventListener('click', () => {
        for(let i=0; i<projectList.length; i++){
            if(projectList[i].title === projectTitle){
                projectList.splice(i, 1);
            }
        }
        domStuff.updateProjectListUI()
    });

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
work.updateProjectListData()
domStuff.updateProjectListUI()


newProjectButton.addEventListener('click', domStuff.newProjPopup)




export { callRemoveTask, callNewListItem, initiateNewProj, initiateNewTask, callDeleteProject }
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