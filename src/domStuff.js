import newProj from './views/partials/popup.handlebars'
import projCard from './views/partials/proj-card.handlebars'
import projectOptions from './views/partials/projectOptions.handlebars'
import newTaskPopupTmpl from './views/partials/newTaskPopup.handlebars'
import todoListTmpl from './views/partials/todo-list.handlebars'
import { initiateNewProj, initiateNewTask, callDeleteProject } from './app';
import { projectList, updateTodoData } from './components/data';
import cardOptionsIcon from './images/card-options.png'


// import projTemplate from './views/partials/proj-card.html?render'
const newProjectButton = document.querySelector('.newProject')
const cardContainer = document.querySelector('.container');
const body = document.querySelector('body')

const domStuff = (function(){
    function newProjPopup() {
        cardContainer.innerHTML = newProj()
        const btn = document.querySelector('.createProject');
        const input = document.querySelector('input');
        const select = document.querySelector('select')
        btn.addEventListener('click', () => {initiateNewProj(input.value, select.value)})
    }
    function updateTodoUI(list, form) {
        const taskList = document.querySelector('.newTaskListUl')
        const todoInput = document.querySelector('.newTodo');
        todoInput.value = '';
        console.log(taskList)
        taskList.innerHTML = todoListTmpl({list})
    
    }

    function newTaskPopup (task, project) {
        const div = document.createElement('div');
        div.innerHTML = newTaskPopupTmpl();
        div.classList.add('newTaskPopup');
        body.append(div);
        const addNewTaskBtn = document.querySelector('.addNewTask');
        const todoForm = document.querySelector('form');
        const complete = document.querySelector('.taskComplete');
        todoForm.addEventListener('submit', (e) => { e.preventDefault(), updateTodoData(task), updateTodoUI(task.list, todoForm)})
        complete.addEventListener('click', () => { completeTaskSetup(task, project) })
    }

    function completeTaskSetup(task, project) {
        const taskTitle = document.querySelector('.newTask');
        const dueDate = document.querySelector('#dueDate');
        const taskDesc = document.querySelector('#desc');
        task.title = taskTitle.value;
        task.dueDate = dueDate.value;
        task.desc = taskDesc.value;
        console.log(task)
        body.removeChild(body.lastChild)
        updateProjectListUI()
        console.log(project)
    }   

    function updateProjectListUI() {
        cardContainer.innerHTML = projCard({projectList, cardOptionsIcon})
        const projTitleBox = document.querySelectorAll('.projTitleBox');
        const newTaskBtn = document.querySelectorAll('.newTaskBtn')
        projTitleBox.forEach((box) => {
            const cardOptions = document.createElement('img')
            cardOptions.classList.add('projectOptions')
            cardOptions.src = cardOptionsIcon
            box.append(cardOptions)
            cardOptions.addEventListener('click', () => {projectOptionsPopup(box)})
        })
        newTaskBtn.forEach((btn) => {
            btn.addEventListener('click', () => {initiateNewTask(btn)})
        })
    function closeOptions(projectCard) {
        const cancelOptionsBtn = projectCard.querySelector('.cancelOptionsBtn');
        cancelOptionsBtn.addEventListener('click', () => {projectCard.removeChild(projectCard.lastChild)})
    } 

    
    function projectOptionsPopup(titleDiv) {
        const projectCard = titleDiv.parentNode
        const popUp = document.createElement('div');
        popUp.classList.add('projectOptionsPopup');
        projectCard.append(popUp);
        popUp.innerHTML = projectOptions()
        closeOptions(projectCard)
        callDeleteProject(projectCard);
    }
    }   

    return {
        newProjPopup,
        updateTodoUI,
        newTaskPopup,
        updateProjectListUI
    }
})()




export { domStuff, newProjectButton }

