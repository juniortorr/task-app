import newProj from './views/partials/popup.handlebars'
import projCard from './views/partials/proj-card.handlebars'
import newTaskPopupTmpl from './views/partials/newTaskPopup.handlebars'
import todoListTmpl from './views/partials/todo-list.handlebars'
import { initiateNewProj, initiateNewTask } from './app';
import { projectList, updateTodoData } from './components/data';
import cardOptionsIcon from './images/card-options.png'

// import projTemplate from './views/partials/proj-card.html?render'
const newProjectButton = document.querySelector('.newProject')
const cardContainer = document.querySelector('.container');
const body = document.querySelector('body')


function newProjPopup() {
    cardContainer.innerHTML = newProj()
    const btn = document.querySelector('.createProject');
    const input = document.querySelector('input');
    const select = document.querySelector('select')
    btn.addEventListener('click', () => {initiateNewProj(input.value, select.value)})
    console.log('you hit me')
}
function updateTodoUI(list, form) {
    console.log(list)
    const taskList = document.querySelector('.newTaskListUl')
    console.log(taskList)
    taskList.innerHTML = todoListTmpl({list})

}
function newTaskPopup (task) {
    const div = document.createElement('div');
    div.innerHTML = newTaskPopupTmpl();
    div.classList.add('newTaskPopup');
    body.append(div);
    const addNewTaskBtn = document.querySelector('.addNewTask');
    const todoForm = document.querySelector('form');

    todoForm.addEventListener('submit', (e) => { e.preventDefault(), updateTodoData(task), updateTodoUI(task.list, todoForm)})
}   


function updateProjectListUI(project) {
    cardContainer.innerHTML = projCard({projectList, cardOptionsIcon, project})
    const cardOptions = document.createElement('img');
    const projTitleBox = document.querySelector('.projTitleBox');
    const newTaskBtn = document.querySelector('.newTaskBtn')
    cardOptions.src = cardOptionsIcon
    projTitleBox.append(cardOptions)
    newTaskBtn.addEventListener('click', () => {initiateNewTask(project.tasks)})
}   



export { newProjectButton, newProjPopup, updateProjectListUI, newTaskPopup }

