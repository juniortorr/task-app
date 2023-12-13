import Project from './components/project.js'
import './styles.css'
import Task from "./components/task.js";
import { data } from './components/data.js';
import ListItem from './components/listItem.js';
import { newProjectButton, domStuff } from './domStuff.js';
import {format} from 'date-fns'
import { dateCheck } from './components/dateCheck.js';

const initiateNewProj = (projTitle, priority) => {
    projTitle = projTitle.split(' ').join('-')
    const proj = new Project(projTitle, priority);
    proj.updateProjectListData()
    const storedData = data.getStorageData()
    console.log(storedData)
    domStuff.updateProjectListUI()
}
const initiateNewTask = (btn) => {
     const task = new Task();
    
     data.projectList.forEach((project) => {
        if(btn.classList.contains(project.title)){
            console.log('here i am')
            project.tasks.push(task);
            task.updateTaskData()
            domStuff.newTaskPopup(task, project)
        }   
     })
}

const initiateTaskDisplay = (label) => {
    console.log(data.tasks)
    data.projectList.forEach((project) => {
        project.tasks.forEach((task) => {
            if(task.title === label.textContent){
                domStuff.displaySelectedTask(task, project)
            }
        })
    })
}
const callDeleteProject = (projectCard) => {
    const projectTitle = projectCard.getAttribute('id');
        for(let i=0; i<data.projectList.length; i++){
            if(data.projectList[i].title === projectTitle){
                data.projectList.splice(i, 1);
            }
        }
        data.updatelocalStorage()
        domStuff.updateProjectListUI()
}

const isTaskCreated = (task, project) =>{
    if(task.title) {
        domStuff.updateProjectListUI()
    } else {
        task.deleteTask(project);
        domStuff.updateProjectListUI();
    }
}

const callNewTask = (title, tasks) => {
    const task = new Task(title, '12-12-2023')
    tasks.push(task);
    console.log(tasks)
}

const callRemoveTask = (task) =>{
    console.log('hello')
}
const callNewListItem = (listArr) => {
    let newListItem = prompt('new list item')
    listArr.push(new ListItem(newListItem))
    console.log(listArr)
}
const pageData = data.getProjectData();
pageData.forEach((page) => {
    const project = new Project(page.title, page.priority, page.tasks);
    project.updateProjectListData()
})
const taskData = data.getTaskData()
data.projectList.forEach((project) => {
    taskData.forEach((task) => {
        if(task.value === project.title){
            console.log('helloooo')
        }
    })
})
data.getTrial()
domStuff.updateProjectListUI()
dateCheck.filterUpcomingTasks()




export { callRemoveTask, callNewListItem, initiateNewProj, initiateNewTask, callDeleteProject, callNewTask, initiateTaskDisplay, isTaskCreated  }
