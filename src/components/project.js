import { projectList } from "./data";
import { callNewTask } from "../app";
import { updateProjectList } from "../domStuff";

export default class Project {
    constructor(title, priority) {
        this.title = title;
        this.priority = priority;
        this.tasks = []
        projectList.push(this)
        console.log(projectList)
        updateProjectList()
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


