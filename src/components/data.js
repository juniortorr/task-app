


const data = (function() {

    const projectList = [];
    const tasks = []
    let test; 

    const updateTodoData = (task) => {
        const todoInput = document.querySelector('.newTodo')
        task.title = todoInput.textContent;
        task.list.push(todoInput.value)
        console.log(task.list)
    }

    const updatelocalStorage = () => {
        localStorage.clear();
        localStorage.setItem('projectList', JSON.stringify(data.projectList))
        localStorage.setItem('trial', JSON.stringify(['hi', 'there']))
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    const getProjectData = () => {
        let UIdata = localStorage.getItem('projectList');
        UIdata = JSON.parse(UIdata);
        console.log(UIdata)
        return UIdata;
    }

    const getTaskData = () => {
        let taskData = localStorage.getItem('tasks');
        taskData = JSON.parse(taskData);
        console.log(taskData)
        return taskData;
    }

    const getTrial = () => {
        let trial = localStorage.getItem('trial');
        console.log(trial)
    }

    return {
        projectList,
        updateTodoData,
        updatelocalStorage,
        getProjectData,
        getTaskData,
        getTrial,
        tasks
    }

})()





export { data }