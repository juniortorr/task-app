 import { data } from "./data";
 import { callRemoveTask, callNewListItem } from "../app";
 import { dateCheck } from "./dateCheck";
 import ListItem from "./listItem";

 export default class Task {
    constructor(title, dueDate, desc) {
        this.title = title;
        this.dueDate = dueDate;
        this.desc = desc
        this.list = []
        this.value = title
        this.checkStatus
        this.priority 
    }

    

    addListItem() {
        callNewListItem(this.list)
    }
    updateTaskData() {
        data.tasks.push(this)
        data.updatelocalStorage()
    }

    toggleCheckmark() {
        if(this.checkStatus === 'checked') {
            this.checkStatus = ''
        } else {
            this.checkStatus = 'checked'
        }
    }

    setPriority(priorityDiv) {
        const priorityStatus = dateCheck.sortPriority(this)  
        console.log(priorityStatus)
        switch(priorityStatus){
            case 'overdue':
                this.priority = 'red';
                break;
            case 'dueThisWeek':
                this.priority = 'yellow';
                break;
            case 'notDueYet':
                this.priority = 'green';
                break;
        }
    }

    deleteTask(project) {
        for(let i=0; i<project.tasks.length; i++){
            if(project.tasks[i].title === this.title) {
                project.tasks.splice(i, 1);
            }
        }
        for(let i=0; i<data.tasks.length; i++) {
            if(this.title === data.tasks[i].title){
                data.tasks.splice(i, 1)
                data.updatelocalStorage();
            }
        }
    }

}