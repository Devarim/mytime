<template>
    <div>
        <ul class="lista">
            {{date}}
            <li class="form noOpacity">
                <task-form></task-form>               
            </li>

        </ul>
        <transition-group name="list-complete" tag="ul" class="lista">
            <task-item v-for="task in tasks" :key="task.id" :task='task' class="list-complete-item"></task-item>
        </transition-group>
    </div>
</template>


<script>

import {mapGetters} from 'vuex'

import taskform from './Form.vue';
import taskitem from './Task.vue';

import {Task} from '../../models/Task.js'
import {Tags} from '../../models/Tags.js'


export default {
    name: 'tasks',
    data() {
        return {
        }
    },
    computed : {
        ...mapGetters({
            tasks : 'tasks_order',
            // tasks : 'tasks',
            date : 'date',
        }),
    },
    mounted() {
    },
    components : {
        taskForm: taskform,
        taskItem: taskitem
    }
}
</script>
<style scoped>

ul.lista {
    margin: 0px;
    margin-top: 0px;
    padding: 5px;
    width: 50%;
}
.lista li {
    background: #FFF;
    color: #333;
    box-shadow: 0px 0px 5px 2px #000;
    list-style: none;
    padding: 10px ;
    margin: 5px 0px;
    border-radius: 3px;
    opacity: 0.6;
    /* transition: opacity 1s, box-shadow 1s; */
}
.lista li:hover, .lista li.noOpacity {
    box-shadow: 0px 0px 20px 2px #000;
    opacity: 1;
}


.lista li datetime {
    color: #666;
}


.list-complete-item {
  transition: all 0.3s;
  display: inline-block;
  width: 100%;
}
.list-complete-enter, .list-complete-leave-to{
  opacity: 0;
  transform: translateY(5px);
}
.list-complete-leave-active {
  position: absolute;
}

</style>

