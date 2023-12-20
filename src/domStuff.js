import newProj from './views/partials/popup.handlebars'
import projCard from './views/partials/proj-card.handlebars'
import projectOptions from './views/partials/projectOptions.handlebars'
import newTaskPopupTmpl from './views/partials/newTaskPopup.handlebars'
import todoListTmpl from './views/partials/todo-list.handlebars'
import todayTaskTemp from './views/partials/today-task-filter.handlebars'
import { initiateNewProj, initiateNewTask, callDeleteProject, initiateTaskDisplay, isTaskCreated } from './app';
import { data } from './components/data';
import cardOptionsIcon from './images/card-options.png'
import { dateCheck } from './components/dateCheck'
import { checkmarkStatus } from './components/checkmark'
import ListItem from './components/listItem'



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
        const closePopupBtn = document.querySelector('.closePopup');
        closePopupBtn.addEventListener('click', () => {updateProjectListUI()})
        form.addEventListener('submit', (e) => { initiateNewProj(input.value), e.preventDefault() })
    }

    const createTaskForm = (task, project) => {
        const taskForm = document.createElement('form');
        taskForm.innerHTML = newTaskPopupTmpl();
        taskForm.classList.add('newTaskPopup')
        taskForm.setAttribute('action', '/')
        taskForm.addEventListener('submit', (e) => {completeTaskSetup(task, project), e.preventDefault()})
        return taskForm
    }

    const displaySelectedTask = (task, project) => {
        const taskForm = createTaskForm(task, project)
        const addNewTodoBtn = taskForm.querySelector('.addNewTodo');
        const popUpLeft = taskForm.querySelector('.popUpLeft');
        const taskDeleteBtn = createTaskDeleteBtn(task, project);
        populateTaskformFields(taskForm, task)
        createClosePopupBtn(task, project, taskForm)
        popUpLeft.append(taskDeleteBtn)
        cardContainer.append(taskForm)
        addNewTodoBtn.addEventListener('click', (e) => { data.updateTodoData(task), updateTodoUI(task.list, taskForm) })
    } 

    const updateTodoUI = (list, taskForm) => {
        const todoList = taskForm.querySelector('.todoList')
        const todoInput = taskForm.querySelector('.newTodo');
        if(todoInput.value === ''){
            alert('uh something is wrong here')
        } else {
            todoInput.value = '';
            todoList.innerHTML = todoListTmpl({list})
            const allTodoLi = todoList.querySelectorAll('li');
            allTodoLi.forEach((todo) => { 
                const text = todo.querySelector('p');
                const todoOptions = document.createElement('img')
                todoOptions.src = cardOptionsIcon;
                todoOptions.classList.add('todoOptions');
                todo.append(todoOptions)
                todoOptions.addEventListener('click', () => {
                    for(let i=0; i<list.length; i++){
                        if(text.textContent === list[i]){
                            list.splice(i, 1)
                            console.log(list, 'deleted!')
                            updateTodoUI(list, taskForm)
                        }
                    }
                })
                
            })
        }

    }

    const createTaskDeleteBtn = (task, project) => {
        const taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.classList.add('taskDeleteBtn');
        taskDeleteBtn.setAttribute('type', 'button')
        taskDeleteBtn.textContent = 'Delete Task'
        taskDeleteBtn.addEventListener('click', () => { task.deleteTask(project), updateProjectListUI() })
        return taskDeleteBtn
    }

    const populateTaskformFields = (taskForm, task) => {
        const taskName = taskForm.querySelector('.newTask')
        const dueDate = taskForm.querySelector('#dueDate');
        const desc = taskForm.querySelector('#desc')
        taskName.value = task.title
        dueDate.setAttribute('placeholder', task.dueDate) 
        desc.value = task.desc
        updateTodoUI(task.list, taskForm)
    }



    const createClosePopupBtn = (task, project, taskForm) => {
        const closePopupBtn = taskForm.querySelector('.closePopup');
        closePopupBtn.addEventListener('click', () => { isTaskCreated(task, project) })
    } 

    const newTaskPopup  = (task, project) => {
        const taskForm = createTaskForm(task, project);
        const addNewTodoBtn = taskForm.querySelector('.addNewTodo');
        cardContainer.append(taskForm);
        createClosePopupBtn(task, project, taskForm);
        addNewTodoBtn.addEventListener('click', (e) => { data.updateTodoData(task), updateTodoUI(task.list, taskForm) })
    }

    const completeTaskSetup = (task, project) => {
        const taskTitle = document.querySelector('.newTask');
        const dueDate = document.querySelector('#dueDate');
        const taskDesc = document.querySelector('#desc');
        const splitDate = dueDate.value.split('-');
        const formatDueDate = [splitDate[1], splitDate[2], splitDate[0]].join('-');
        task.title = taskTitle.value;
        task.dueDate = formatDueDate;
        task.desc = taskDesc.value;
        task.setPriority()
        data.updatelocalStorage();
        updateProjectListUI()
    }   

    const setCheckMarkEvents = () => {
        const labels = document.querySelectorAll('label')
        labels.forEach((label) => {
            const para = label.querySelector('p')
            para.addEventListener('click', () => { initiateTaskDisplay(para) })
            label.addEventListener('click', () => { checkmarkStatus(para, label)})
         })
    }

    const addProjectCardOptions = () => {
        const projTitleBox = document.querySelectorAll('.projTitleBox');
        projTitleBox.forEach((box) => {
            const cardOptions = document.createElement('img') 
            cardOptions.classList.add('projectOptions')
            cardOptions.src = cardOptionsIcon
            box.append(cardOptions)
            cardOptions.addEventListener('click', () => {projectOptionsPopup(box)})
        })
    }



    const updateProjectListUI = () => {
        const projectListCopy = [...data.projectList]
        cardContainer.innerHTML = projCard({projectListCopy, cardOptionsIcon})
        const newTaskBtn = document.querySelectorAll('.newTaskBtn')
        setCheckMarkEvents()
        addProjectCardOptions()
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


    newProjectButton.addEventListener('click', () => { newProjPopup() })

    return {
        newProjPopup,
        updateTodoUI,
        newTaskPopup,
        updateProjectListUI,
        displaySelectedTask
    }
})()




export { domStuff }

