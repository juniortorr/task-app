import { projectList, updateProjectListData } from "./data";
import { callNewTask } from "../app";
import { updateProjectListUI } from "../domStuff";

export default class Project {
    constructor(title, priority) {
        this.title = title;
        this.priority = priority;
        this.tasks = []
        updateProjectListData(this)
        console.log(projectList)
        updateProjectListUI(this)
    }
    speak(){
        console.log(this)
    }
    addTask() {
        callNewTask(this.tasks)
    }
    removeTask() {
        let removeTaskName = prompt('which task')
        this.tasks.forEach((task) => {
            if(task.title === removeTaskName) {
                console.log('working')
                console.log(this.tasks)
            }
        })
    }
} 


