import { data } from "./data";

const checkmarkStatus = (para, label) => {
    data.projectList.forEach((project) => {
        project.tasks.forEach((task) => {
            if(task.title === para.textContent  && !label.getAttribute('id')){
                label.setAttribute('id', 'checked')
                task.toggleCheckmark();
                console.log(task.checkStatus)
            } else if(label.getAttribute('id'))  {
                console.log('ayo')
                label.removeAttribute('id');
                task.toggleCheckmark();
                console.log(task.checkStatus, 'removed check!')
            }
        })
    })
}


export {
    checkmarkStatus
}

// {{!-- <div class="checkBoxTest">
// <div class="checkBoxFiller"></div>
// </div> --}}