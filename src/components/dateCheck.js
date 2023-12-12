import { format, addDays, isBefore } from 'date-fns';
import { data } from './data';


const dateCheck = (function(){
    const todayTasks = []
    const getToday = () => format(new Date(), 'yyyy-MM-dd');

    const filterTodayTasks = () => {
        const today = getToday();
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

// 2023-12-08 - this is what the date input sends back
// we have to get



    return {
        filterTodayTasks,
        todayTasks,
        filterUpcomingTasks
    }
})()

export { dateCheck }