 import { projectList } from "./data";
 import { callRemoveTask, callNewListItem } from "../app";
import ListItem from "./listItem";

 export default class Task {
    constructor(title, dueDate, desc) {
        this.title = title;
        this.dueDate = dueDate;
        this.desc = desc
        this.list = []
    }

    addListItem() {
        callNewListItem(this.list)
    }

}