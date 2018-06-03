<template>
    <div>

        <div class="time">
            <div class="init_time">
                <input class="" type="time" placeholder='Initial date' v-model="task.init_time" >
            </div>
            <div class="id_task">
                <input class="text-center" type="text" placeholder='Title' v-model="task.title" @keypress.enter.ctrl.prevent="save">
            </div>
            <div class="end_time">
                <span class='btn' @click="save(STATUS_PLAYED)"><fa name="play"></fa></span>
                <span class='btn' @click="save(STATUS_WAITING)"><fa name="plus"></fa></span>
                <span class='btn' @click="clear()"><fa name="times"></fa></span>
            </div>
        </div>
        <textarea id="textarea-name" rows="1" style="height:1em;" v-model="task.name" @keypress.enter.ctrl.prevent="save(STATUS_PLAYED)" @keyup.esc.delete="clear">
        </textarea>

    </div>
</template>

<script>
import {autoresize} from './../../helpers.js';
import {Task} from '../../models/Task.js'
export default {
    name: 'FormTask',
    data : () => {
        return {
            task : new Task()
        }
    },
    computed : {
        STATUS_PLAYED () {
            return Task._PLAYED
        },
        STATUS_WAITING () {
            return Task._WAITING
        }
    },
    methods : {
        save(status) {
            this.task.save(status);
            this.clear();
        },
        clear(key) {
            if(key && key.code == 'Backspace') return "";
            this.task = null
            this.task = new Task();
            // this.task.setAutoInitDateTime();            
        }
    },
    created() {
        // this.task.setAutoInitDateTime();
    },
    mounted() {
        autoresize('textarea-name').init();
    }

}
</script>

<style scoped>
input {
    background: none;
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


