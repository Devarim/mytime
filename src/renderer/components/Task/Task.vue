<template>
    <li :class="{ active: isInitial, finalized : isFinalized }"> 
        <div class="time">
            <div class="init_time">{{objTask.init_time}} </div>
            <div class="id_task">{{objTask.id}} </div>
            <div class="end_time">
                <span class='btn' v-if="isInitial" @click="objTask.finalize()">
                    <span class="ft-red">&#10060;</span> {{objTask.end_time}}
                </span>
                <span v-else>
                    {{objTask.end_time}}
                </span>
            </div>
        </div>
        {{objTask.name}} <br>
    </li>
</template>


<script>

import {Task} from '../../models/Task.js'

export default {
    name: 'task',
    props: ['task'],
    data () {
        return {
            objTask : {}
        }
    },
    computed : {
        isInitial() {
            return this.objTask.isInitial();
        },
        isFinalized() {
            return this.objTask.isFinalized();
        }
    },
    methods : {
        endTask(task) {
            var task = new Task(task);
            task.finalize();
        },
    },
    created() {
        this.objTask = new Task(this.task);
        if(this.objTask.isInitial()) {
            this.objTask.setAutoEndDateTime()
        }
    }
}
</script>

<style scoped>
.active {
    opacity: 1 !important;
    background: rgb(202, 231, 184) !important;
}
.init_time, .id_task, .end_time {
    display: inline-block;
    width: 32.3%;
    vertical-align: middle;
    line-height: 32px;
    padding: 0px 10px;
}
.id_task {
    text-align: center;
    font-size: 9px;
}
.end_time {
    text-align: right;
    float: right;
}
.active .end_time {
    color: #F44;
}
.time {
    background: rgba(0,0,0,0.2);
    margin: -10px -10px 10px -10px;
}
</style>

