import { format, addDays, isBefore } from 'date-fns';
import { data } from './data';


const dateCheck = (function(){
    const todayTasks = []
    const priorities = ['overdue','dueThisWeek', 'notDueYet']
    const getTodayFormatted = () => format(new Date(), 'yyyy-MM-dd');
    
    const filterTodayTasks = () => {
        const today = getTodayFormatted();
        data.projectList.forEach((project) => {
            project.tasks.forEach((task) => {
                if(task.dueDate === today) {
                    todayTasks.push(task);
                }
            })
        }) 
        return todayTasks;
    }

    
    const filterUpcomingTasks = () => {
        const today =  new Date()
        const thisWeek = addDays(today, 7)
        const upcomingTasks = [];
        data.projectList.forEach((project) => {
            project.tasks.forEach((task) => {
                const taskDueDate = new Date(task.dueDate)
                if(isBefore(taskDueDate, thisWeek)){
                    upcomingTasks.push(task);
                }
            })
        }) 
        return upcomingTasks;
    }

    const sortPriority = () => {
        const today = new Date();
        const splitDueDate = this.dueDate.split('-');
        const formatDueDate = [splitDueDate[2], splitDueDate[0]-1, splitDueDate[1]]
        const dueDate = new Date(formatDueDate[0], formatDueDate[1], formatDueDate[2])
        const thisWeek = addDays(today, 7);
        // if(isBefore(dueDate, thisWeek)){
        //     return priorities[1]
        // } else if()
        
    }





    return {
        filterTodayTasks,
        todayTasks,
        filterUpcomingTasks
    }
})()

export { dateCheck }