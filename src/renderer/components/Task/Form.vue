<template>
    <div>
        <input class="" type="time" placeholder='Initial date' v-model="task.init_time" @click="task.stopAutoInitDateTime()"> <br> 
        <textarea id="textarea-name" rows="1" style="height:1em;" v-model="task.name">
        </textarea>
        <button @click="save()">&#10011;</button>
    </div>
</template>

<script>
import {autoresize} from './../../helpers.js';
import {Task} from '../../models/Task.js'
export default {
    name: 'FormTask',
    // props: ['task'],
    data : () => {
        return {
            task : new Task()
        }
    },

    methods : {
        save() {
            this.task.save();
            this.task = null
            this.task = new Task();
            this.task.setAutoInitDateTime();
        }
    },
    created() {
        this.task.setAutoInitDateTime();
    },
    mounted() {
        autoresize('textarea-name').init();
    }

}
</script>

