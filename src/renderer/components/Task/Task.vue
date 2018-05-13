<template>
    <li :class="{ active: isPlayed, finalized : isFinalized, waiting : isWaiting }"> 
        <div class="time">
            <div class="init_time">#{{task.id}} - {{task.init_time}} </div>
            <div class="id_task">{{task.title}} </div>
            <div class="end_time">
                <span class='btn' v-if="isWaiting" @click="edit(task)">
                    <span class="ft-red"><fa name="edit"></fa></span> 
                </span>
                <span class='btn' v-if="isWaiting" @click="task.start()">
                    <span class="ft-red"><fa name="play"></fa></span> 
                </span>
                <span class='btn' v-if="isPlayed" @click="task.pause()">
                    <span class="ft-red"><fa name="pause"></fa></span>
                </span>
                <span class='btn' v-if="isPlayed || isWaiting" @click="task.finalize()">
                    <span class="ft-red"><fa name="times"></fa></span> 
                </span>
                <!-- {{task.end_time}} -->
            </div>
        </div>
        <pre>{{task.name}}</pre>
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
        isPlayed() {
            return this.task.isStatus(Task._PLAYED);
        },
        isFinalized() {
            return this.task.isStatus(Task._FINALIZED);
        },
        isWaiting() {
            return this.task.isStatus(Task._WAITING);
        }
    },
    methods : {
        endTask(task) {
            var task = new Task(task);
            task.finalize();
        },
    },
    created() {
    }
}
</script>

<style scoped>
.active {
    background: rgb(202, 231, 184) !important;
}
.waiting {
    background: rgb(245, 213, 177) !important;
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

