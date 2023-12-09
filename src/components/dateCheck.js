import { format } from 'date-fns';
import { projectList } from './data';


const dateCheck = (function(){
    const todayTasks = []
    const filterTodayTasks = () => {
        const today = format(new Date(), 'yyyy-MM-dd')
        projectList.forEach((project) => {
            project.tasks.forEach((task) => {
                if(task.dueDate === today) {
                    todayTasks.push(task);
                }
            })
        }) 
        return todayTasks;
    }

    return {
        filterTodayTasks,
        todayTasks
    }
})()

export { dateCheck }