import moment from 'moment'
import db from '../db'
import { Task } from '../../models/Task'


const state = {
    tasks : [],
}

const getters = {
    tasks: state => state.tasks,
    tasks_order: state => {
        if ([...state.tasks].lenght > 0) return [];

        let orderStatus = [Task._PLAYED, Task._WAITING, Task._FINALIZED ];

        let sorted = [...state.tasks].sort((a, b) => {
            if(a.status == b.status) {
                var timestamp_a = parseInt(moment(a.date.init).format('x'));
                var timestamp_b = parseInt(moment(b.date.init).format('x'));
                if (timestamp_a > timestamp_b) return -1
                if (timestamp_a < timestamp_b) return 1
                return 0
            } else {
                let index_a = orderStatus.indexOf(a.status);
                let index_b = orderStatus.indexOf(b.status);
                if (index_a > index_b) return 1
                if (index_a < index_b) return -1
            }
        });
        return sorted
    },
    // date: state => state.date
}

const mutations = {
    SET_TASK(state, value) {
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
    SET_TASKS( state, tasks) {
        state.tasks.splice(0)
        tasks.forEach(task => {
            state.tasks.push(task)
        });
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
    
}

const actions = {
    PAUSE_ALL( {state}, payload ) {
        state.tasks.find(item => {
            if (item.status == Task._PLAYED) {
                let task = new Task(item);
                task.pause();
            }
        });
    },
    async ADD_TASK({ state, commit, dispatch }, payload) {
        payload = { ...payload, type: 'task' }
        if (!payload.id) { 
            payload.id = await db.nextId('task');
            await db.insert(payload);
        }
        else {
            await db.update({ id: payload.id, type: 'task' }, payload);
        }

        await dispatch('LOAD_TASKS');
        return true;
    },

    async LOAD_TASKS ( {state,commit}, payload ) {
        let tasks = await db.find({ type: 'task'}).exec();
        commit('SET_TASKS',tasks)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
