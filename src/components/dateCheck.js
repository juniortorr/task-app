import { format, addDays, isBefore, isPast, isAfter, isFuture } from 'date-fns';
import { data } from './data';


const dateCheck = (function(){

    const priorities = ['overdue','dueThisWeek', 'notDueYet']
    const getTodayFormatted = () => format(new Date(), 'yyyy-MM-dd');
    
    const filterTodayTasks = () => {
        const todayTasks = []
        const today = getTodayFormatted()
        data.projectList.forEach((project) => {
            project.tasks.forEach((task) => {
                const taskDueDate = format(new Date(task.dueDate), 'yyyy-MM-dd')
                if(taskDueDate === today) {
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

    const sortPriority = (task) => {
        const today = new Date();
        const splitDueDate = task.dueDate.split('-');
        const formatDueDate = [splitDueDate[2], splitDueDate[0]-1, splitDueDate[1]]
        const dueDate = new Date(formatDueDate[0], formatDueDate[1], formatDueDate[2])
        const thisWeek = addDays(today, 7);
        console.log(thisWeek)
        console.log(dueDate)
        if(isBefore(dueDate, thisWeek) && isFuture(dueDate)){
            return priorities[1]
        } else if(isPast(dueDate)){
            return priorities[0]
        } else if(isAfter(dueDate, thisWeek)){
            return priorities[2]
        }
        
    }





    return {
        filterTodayTasks,
        filterUpcomingTasks, 
        sortPriority,
        priorities
    }
})()

export { dateCheck }