import Project from './components/project.js'
import './styles.css'
import Task from "./components/task.js";
import { projectList } from './components/data.js';
import ListItem from './components/listItem.js';
import { newProjectButton, domStuff } from './domStuff.js';
import {format} from 'date-fns'


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
const work = new Project('Work', 'blue');
work.updateProjectListData()
domStuff.updateProjectListUI()




export { callRemoveTask, callNewListItem, initiateNewProj, initiateNewTask, callDeleteProject }
