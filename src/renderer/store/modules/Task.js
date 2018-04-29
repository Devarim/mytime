import moment from 'moment'

const state = {
    tasks : [],
    date : moment(),
}

const getters = {
    tasks: state => state.tasks,
    tasks_order: state => {
        if ([...state.tasks].lenght > 0) return [];
        let sorted = [...state.tasks].sort((a, b) => {
            if(a.status == b.status) {
                var timestamp_a = parseInt(moment(a.date.init).format('x'));
                var timestamp_b = parseInt(moment(b.date.init).format('x'));
                if (timestamp_a > timestamp_b) return -1
                if (timestamp_a < timestamp_b) return 1
                return 0
            } else {
                if (a.status > b.status) return 1
                if (a.status < b.status) return -1
            }
        });
        return sorted
    },
    date: state => state.date
}

const mutations = {
    ADD_TASK(state, value) {
        var task = state.tasks.find(task => {
            if (task.id == value.id) {
                Object.assign(task, value);
                return task;
            }
        });

        if(!task) {
            state.tasks.push(value);
        }
        
    },
    INIT_TASK(state, value) {
        value.init_date = moment().format(dateformat)
        value.state = 'INIT'
        state.tasks.push(value)
    },
    END_TASK(state, task) {
        task.end_date = moment().format(dateformat)
        task.state = 'END'
    },
    SET_DATE_TASKS(state, date) {
        state.date = moment(date)
    }
    
}

const actions = {
}

export default {
    state,
    mutations,
    actions,
    getters
}
