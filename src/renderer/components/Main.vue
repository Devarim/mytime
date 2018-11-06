<template>
    <div>
        <h1 class="text-center">My Time</h1>
        
        <div class="tasks">
            <tasks :date="date"></tasks>
        </div>
        <div class="calendar">
            <calendar @selected='selectedDate'></calendar>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
window.moment =moment;

import tasks from './Task/Tasks.vue';
import calendar from './Calendar/Calendar.vue';


export default {
    name: 'Main',
    data() {
        return {
            date : moment()
        }
    },
    methods : {
        selectedDate(date) {
            this.date = date;
        }
    },
    components : {
        tasks,
        calendar
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


.ft-red {
    color: #F44;
}
</style>

<style lang="scss">

.btn {
    cursor: pointer;
    background: #DDD;
    border: 1px solid #AAA;
    padding: 2px 8px;
    border-radius: 5px;
    color: #333;
    box-shadow: 1px 1px 3px -1px #000;
    transition: all 0.3s;
    font-size: 0.9em;
    &:hover {
        background: #EEE;
        box-shadow: 0px 0px 3px -1px #000;
    }
}
</style>

<style lang="scss" scoped>
.tasks {
    display: inline-block;
    width: calc(100% - 300px);
    vertical-align: top;
}
.calendar {
    display: inline-block;
    width: 250px;
    vertical-align: top;
    float: right;
    margin-right: 15px;
}
</style>


