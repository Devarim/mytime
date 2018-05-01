<template>
    <div>
        <ul class="lista">
            <li class="form noOpacity">
                <task-form></task-form>               
            </li>
        </ul>
        <transition-list>
            <li class="list-complete-item noOpacity" :key="'fileds'">
                <input type="checkbox" v-model="showFinalized"> Show finalized?
            </li>
            <task-item v-for="task in tasks" :key="task.id" :task='task' class="list-complete-item"></task-item>
        </transition-list>
    </div>
</template>


<script>

import {mapGetters} from 'vuex'

import taskform from './Form.vue';
import taskitem from './Task.vue';
import TransitionList from '../helpers/TransitionList.vue';

import {Task} from '../../models/Task.js'
import {Tags} from '../../models/Tags.js'


export default {
    name: 'tasks',
    data() {
        return {
            showFinalized : false
        }
    },
    props : [ 'date' ],
    computed : {
        ...mapGetters({
            tasks_order : 'tasks_order',
        }),
        tasks() {
            if(!this.tasks_order.length > 0) return []
            
            let tasks = [];
            this.tasks_order.forEach((item) => {
                let task = new Task({...item});
                if(task.isStatus(Task._FINALIZED)) {
                    if(this.showFinalized) {
                        tasks.push(task);
                    }
                } else {
                    tasks.push(task);
                }
            });
            return tasks 
        }
    },
    created() {
        Task.load();
    },
    mounted() {
    },
    components : {
        taskForm: taskform,
        taskItem: taskitem,
        TransitionList
    }
}
</script>
<style scoped>

ul.lista {
    margin: 0px 10px;
    margin-top: 0px;
    padding: 5px;
}
.lista li {
    background: #FFF;
    color: #333;
    box-shadow: 0px 0px 5px 2px #000;
    list-style: none;
    padding: 10px ;
    margin: 15px 0px;
    border-radius: 3px;
}
.lista li:hover, .lista li.noOpacity {
    box-shadow: 0px 0px 20px 2px #000;
}


.lista li datetime {
    color: #666;
}


</style>

