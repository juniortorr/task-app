import newProj from './views/partials/popup.handlebars'
import projCard from './views/partials/proj-card.handlebars'
// import newTaskPopupTmpl from './views/partials/newTaskPopup.eta'
import { initiateNewProj } from './app';
import { projectList } from './components/data';
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
function newTaskPopup (project) {
    const div = document.createElement('div');
    const test = 'test'
    // div.innerHTML = newTaskPopupTmpl(test);
    div.classList.add('newTaskPopup');
    body.append(div);

}   


function updateProjectListUI(project) {
    cardContainer.innerHTML = projCard({projectList, cardOptionsIcon})
    const cardOptions = document.createElement('img');
    const projTitleBox = document.querySelector('.projTitleBox');
    const newTaskBtn = document.querySelector('.newTaskBtn')
    cardOptions.src = cardOptionsIcon
    projTitleBox.append(cardOptions)
    newTaskBtn.addEventListener('click', () => {newTaskPopup(project)})
}   



export { newProjectButton, newProjPopup, updateProjectListUI }

