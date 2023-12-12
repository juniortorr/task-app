import newProj from './views/partials/popup.handlebars'
import projCard from './views/partials/proj-card.handlebars'
import projectOptions from './views/partials/projectOptions.handlebars'
import newTaskPopupTmpl from './views/partials/newTaskPopup.handlebars'
import todoListTmpl from './views/partials/todo-list.handlebars'
import todayTaskTemp from './views/partials/today-task-filter.handlebars'
import { initiateNewProj, initiateNewTask, callDeleteProject, initiateTaskDisplay } from './app';
import { data } from './components/data';
import cardOptionsIcon from './images/card-options.png'
import { dateCheck } from './components/dateCheck'



const domStuff = (function(){
    const cardContainer = document.querySelector('.container');
    const body = document.querySelector('body')
    const todayBtn = document.querySelector('.today')
    const newProjectButton = document.querySelector('.newProject')
    const upcomingBtn = document.querySelector('.upcoming');
    const allProjectsBtn = document.querySelector('.all');

    const newProjPopup = () => {
        cardContainer.innerHTML = newProj()
        const form = document.querySelector('.newProjectPopup');
        const input = document.querySelector('input');
        const select = document.querySelector('select')
        const closePopupBtn = document.querySelector('.closePopup');
        closePopupBtn.addEventListener('click', () => {updateProjectListUI()})
        form.addEventListener('submit', (e) => {
            initiateNewProj(input.value, select.value), e.preventDefault()
        })
    }

    const createTaskDeleteBtn = (task, project) => {
        const taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.classList.add('taskDeleteBtn');
        taskDeleteBtn.setAttribute('type', 'button')
        taskDeleteBtn.textContent = 'Delete Task'
        taskDeleteBtn.addEventListener('click', () => { task.deleteTask(project), updateProjectListUI() })
        return taskDeleteBtn
    }

    const displaySelectedTask = (task, project) => {
        const taskForm = document.createElement('form');
        taskForm.innerHTML = newTaskPopupTmpl();
        const taskName = taskForm.querySelector('.newTask')
        const addNewTaskBtn = taskForm.querySelector('.addNewTask');
        const todoList = taskForm.querySelector('.newTaskListUl')
        const dueDate = taskForm.querySelector('#dueDate');
        const desc = taskForm.querySelector('#desc')
        const popUpLeft = taskForm.querySelector('.popUpLeft');
        const taskDeleteBtn = createTaskDeleteBtn(task, project);
        popUpLeft.append(taskDeleteBtn)
        task.list.forEach((todo) => {
            const li = document.createElement('li')
            li.textContent = todo;
            todoList.append(li);
        })
        taskName.value = task.title
        dueDate.setAttribute('placeholder', task.dueDate) 
        desc.value = task.desc
        taskForm.classList.add('newTaskPopup')
        taskForm.setAttribute('action', '/')
        cardContainer.append(taskForm)
        addNewTaskBtn.addEventListener('click', (e) => { data.updateTodoData(task), updateTodoUI(task.list, taskForm) })
        taskForm.addEventListener('submit', (e) => {completeTaskSetup(task, project), e.preventDefault()})
    }

    const updateTodoUI = (list, form) => {
        const taskList = document.querySelector('.newTaskListUl')
        const todoInput = document.querySelector('.newTodo');
        todoInput.value = '';
        console.log(taskList)
        taskList.innerHTML = todoListTmpl({list})
        
    }

    const newTaskPopup  = (task, project) => {
        const taskForm = document.createElement('form');
        taskForm.innerHTML = newTaskPopupTmpl();
        taskForm.classList.add('newTaskPopup');
        taskForm.setAttribute('action', '/')
        cardContainer.append(taskForm);
        const addNewTaskBtn = document.querySelector('.addNewTask');
        addNewTaskBtn.addEventListener('click', (e) => { data.updateTodoData(task), updateTodoUI(task.list, taskForm) })
        taskForm.addEventListener('submit', (e) => {completeTaskSetup(task, project), e.preventDefault()})
    }

    const completeTaskSetup = (task, project) => {
        const taskTitle = document.querySelector('.newTask');
        const dueDate = document.querySelector('#dueDate');
        const taskDesc = document.querySelector('#desc');
        const splitDate = dueDate.value.split('-');
        const formatDueDate = [splitDate[1], splitDate[2], splitDate[0]].join('-')
        task.title = taskTitle.value;
        task.dueDate = formatDueDate;
        task.desc = taskDesc.value;
        data.updatelocalStorage();
        updateProjectListUI()
    }   


    const updateProjectListUI = () => {
        const arr = [...data.projectList]
        cardContainer.innerHTML = projCard({arr, cardOptionsIcon})
        const projTitleBox = document.querySelectorAll('.projTitleBox');
        const newTaskBtn = document.querySelectorAll('.newTaskBtn')
        const labels = document.querySelectorAll('label')
        projTitleBox.forEach((box) => {
            const cardOptions = document.createElement('img') 
            cardOptions.classList.add('projectOptions')
            cardOptions.src = cardOptionsIcon
            box.append(cardOptions)
            cardOptions.addEventListener('click', () => {projectOptionsPopup(box)})
        })
        labels.forEach((label) => {
            const para = label.querySelector('p')
            para.addEventListener('click', () => { initiateTaskDisplay(para) })
        })
        newTaskBtn.forEach((btn) => {
            btn.addEventListener('click', () => {initiateNewTask(btn)})
        })
    }   

    const todayTasksUI = (todayTaskList) => { cardContainer.innerHTML = todayTaskTemp({todayTaskList}) }

    const projectOptionsPopup = (titleDiv) => {
        const projectCard = titleDiv.parentNode
        const popUp = document.createElement('div');
        popUp.classList.add('projectOptionsPopup');
        projectCard.append(popUp);
        popUp.innerHTML = projectOptions()
        const cancelOptionsBtn = projectCard.querySelector('.cancelOptionsBtn');
        const deleteOptionsBtn = projectCard.querySelector('.deleteProjectBtn');
        cancelOptionsBtn.addEventListener('click', () => {updateProjectListUI()})
        deleteOptionsBtn.addEventListener('click', () => { callDeleteProject(projectCard)})
    }

    todayBtn.addEventListener('click', () => {
        const list = dateCheck.filterTodayTasks()
        if(list.length == 0) {
            alert('nothing to see here')
        } else {
            todayTasksUI(list)
        }

    })

    upcomingBtn.addEventListener('click', () => {
        const list = dateCheck.filterUpcomingTasks();
        if(list.length == 0) {
            alert('nothing to see here');
        } else {
            todayTasksUI(list)
        }
    })

    allProjectsBtn.addEventListener('click', () => {
        updateProjectListUI()
    })


    newProjectButton.addEventListener('click', () => { newProjPopup()})

    return {
        newProjPopup,
        updateTodoUI,
        newTaskPopup,
        updateProjectListUI,
        displaySelectedTask
    }
})()




export { domStuff }

