<template>
    <div>
        <h1 class="text-center">My Time</h1>
        
        <tasks></tasks>
        
    </div>
</template>

<script>
import moment from 'moment'
window.moment =moment;

import tasks from './Task/Tasks.vue';


export default {
    name: 'Main',
    data() {
        return {
        }
    },
    components : {
        tasks
    }
}
</script>

<style>

.form input, .form textarea {
    border: 0px;
    outline: none !important;
    border-radius: 3px;
}
.form input[type='text'], .form textarea {
    width: 100%;
    overflow: hidden;
}
.btn {
    cursor: pointer;
    background: #DDD;
    border: 1px solid #AAA;
    padding: 2px;
    border-radius: 5px;
    color: #333;
    box-shadow: 1px 1px 3px -1px #000;
    transition: all 0.3s;
}
.btn:hover {
    background: #EEE;
    box-shadow: 0px 0px 3px -1px #000;
}

.ft-red {
    color: #F44;
}
</style>

