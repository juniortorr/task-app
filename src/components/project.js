import { data } from "./data";
import { callNewTask } from "../app";
import { domStuff } from "../domStuff";

export default class Project {
    constructor(title, priority) {
        this.title = title;
        this.tasks = []
    }
    speak(){
        console.log(this)
    }
    addTask(title) {
        callNewTask(title, this.tasks)
    }
    deleteProject(title){
        console.log(title)
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
    updateProjectListData() {
        data.projectList.push(this)
        data.updatelocalStorage()
    }
} 



