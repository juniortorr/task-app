
const projectList = [];

function updateProjectListData(word) {
    projectList.push(word)
}
function updateTodoData(task) {
    const todoInput = document.querySelector('.newTodo')
    task.title = todoInput.textContent;
    task.list.push(todoInput.value)
    console.log(task.list)
}

export { projectList, updateProjectListData, updateTodoData }