import newProj from './views/partials/popup.html?render'
import projCard from './views/partials/proj-card.html?render'
import { initiateNewProj } from './app';
import { projectList } from './components/data';

// import projTemplate from './views/partials/proj-card.html?render'
const newProjectButton = document.querySelector('.newProject')
const cardContainer = document.querySelector('.container');
const body = document.querySelector('body')


function newProjPopup() {
    cardContainer.innerHTML = newProj
    const btn = document.querySelector('.createProject');
    const input = document.querySelector('input');
    const select = document.querySelector('select')
    btn.addEventListener('click', () => {initiateNewProj(input.value, select.value)})
    console.log('you hit me')
}
function newTaskPopup (taskArr, taskListDiv) {
    const div = document.createElement('div');
    div.classList.add('newTaskPopup');
    body.append(div);
}

function updateProjectList() {
    cardContainer.innerHTML = ''
    projectList.forEach((project) => {
        const div = document.createElement('div');
        const projTitle = document.createElement('h1');
        const taskList = document.createElement('ul')
        const newTaskBtn = document.createElement('button');
        newTaskBtn.textContent = 'add new task'
        div.classList.add('projCard')
        projTitle.classList.add('projTitle', project.title.split(' ').join(''))
        taskList.classList.add('taskList');
        projTitle.textContent = project.title;
        taskList.append(newTaskBtn)
        div.append(projTitle, taskList)
        cardContainer.append(div);
        newTaskBtn.addEventListener('click', () => {newTaskPopup(project.tasks, taskList)})
    })
    // cardContainer.innerHTML = projCard
    // const projTitle = document.querySelector('.projTitle');
    // const projCardTmpl  = document.querySelector('.projCard');
    // console.log(projTitle)
    // projTitle.textContent = proj.title;
    // projCardTmpl.classList.add(proj.title);
    // console.log(proj)

    // cardContainer.append(projCardTmpl)
}   



export { newProjectButton, newProjPopup, updateProjectList }

