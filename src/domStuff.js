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
        const form = document.querySelector('.newProjectPopup');
        const input = document.querySelector('input');
        const select = document.querySelector('select')
        const closePopupBtn = document.querySelector('.closePopup');
        closePopupBtn.addEventListener('click', () => {updateProjectListUI()})
        form.addEventListener('submit', (e) => {initiateNewProj(input.value, select.value), e.preventDefault()})
    }
    function updateTodoUI(list, form) {
        const taskList = document.querySelector('.newTaskListUl')
        const todoInput = document.querySelector('.newTodo');
        todoInput.value = '';
        console.log(taskList)
        taskList.innerHTML = todoListTmpl({list})
        
    }

    function newTaskPopup (task, project) {
        const taskForm = document.createElement('form');
        taskForm.innerHTML = newTaskPopupTmpl();
        taskForm.classList.add('newTaskPopup');
        cardContainer.append(taskForm);
        const addNewTaskBtn = document.querySelector('.addNewTask');
        console.log(addNewTaskBtn)
        const complete = document.querySelector('.taskComplete');
        addNewTaskBtn.addEventListener('click', (e) => { updateTodoData(task), updateTodoUI(task.list, taskForm) })
        taskForm.addEventListener('submit', (e) => {e.preventDefault(), completeTaskSetup(task, project) })
    }

    function completeTaskSetup(task, project) {
        const taskTitle = document.querySelector('.newTask');
        const dueDate = document.querySelector('#dueDate');
        const taskDesc = document.querySelector('#desc');
        task.title = taskTitle.value;
        task.dueDate = dueDate.value;
        task.desc = taskDesc.value;
        console.log(task)
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

    
    function projectOptionsPopup(titleDiv) {
        const projectCard = titleDiv.parentNode
        const popUp = document.createElement('div');
        popUp.classList.add('projectOptionsPopup');
        projectCard.append(popUp);
        popUp.innerHTML = projectOptions()
        const cancelOptionsBtn = projectCard.querySelector('.cancelOptionsBtn');
        cancelOptionsBtn.addEventListener('click', () => {updateProjectListUI()})
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

