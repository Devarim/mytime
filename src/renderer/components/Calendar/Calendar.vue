<template>
    <div>
        <table class="calendar">
            <thead>
                <tr>
                    <td>
                        <button @click="back()"><fa name='angle-left'></fa></button>
                    </td>
                    <td colspan="5">
                        {{date | date('MMMM - YYYY') }}
                    </td>
                    <td>
                        <button @click="next()"><fa name='angle-right'></fa></button>
                    </td>
                </tr>
                <tr>
                    <td>D</td>
                    <td>S</td>
                    <td>T</td>
                    <td>Q</td>
                    <td>Q</td>
                    <td>S</td>
                    <td>S</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(week, index) in month_array " :key="index">
                    <td @click="selectDate(week[0])" :class="getClass(week[0])" class="weekend">
                        {{week[0]}}
                    </td>
                    <td @click="selectDate(week[1])" :class="getClass(week[1])" >
                        {{week[1]}}
                    </td>
                    <td @click="selectDate(week[2])" :class="getClass(week[2])" >
                        {{week[2]}}
                    </td>
                    <td @click="selectDate(week[3])" :class="getClass(week[3])" >
                        {{week[3]}}
                    </td>
                    <td @click="selectDate(week[4])" :class="getClass(week[4])" >
                        {{week[4]}}
                    </td>
                    <td @click="selectDate(week[5])" :class="getClass(week[5])" >
                        {{week[5]}}
                    </td>
                    <td @click="selectDate(week[6])" :class="getClass(week[6])" class="weekend">
                        {{week[6]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import moment from 'moment'
import { log } from 'util';

export default {
    name : 'Calendar',
    data () {
        return {
            date_selected : moment().format('x')
        }
    },
    computed : {
        date() {
            return moment(this.date_selected,'x')
        },
        first_day() {
            return moment(this.date_selected,'x').startOf('month');
        },
        last_day() {
            return moment(this.date_selected,'x').endOf('month');
        },
        month_array () {
            let calendar = [];
            let initialized = false;
            let day_of_month = 1;

            for (let week = 0; week < 5; week++) {
                calendar[week] = [];
                for (let day_on_week = 0; day_on_week < 7; day_on_week++) {
                    if(day_on_week >= this.first_day.day() && !initialized) {
                        calendar[week][day_on_week] = day_of_month++;
                        initialized = true;
                    } else if( this.last_day.format('D') >= day_of_month && initialized) {
                        calendar[week][day_on_week] = day_of_month++;
                    } else {
                        calendar[week][day_on_week] = '';
                    }               
                }

            }

            return calendar;
        }
    },
    methods : {
        back() {
            this.date_selected = moment(this.date_selected, 'x').add(-1, 'months').format('x');
        },
        next() {
            this.date_selected = moment(this.date_selected, 'x').add(1, 'months').format('x');
        },
        selectDate(day) {
            let date = day + '-' + moment(this.date_selected, 'x').format('MM-YY')
            this.date_selected = moment(date,'D-MM-YY').format('x');
            this.$emit('selected',moment(date,'D-MM-YY'));
        },
        isToday(day) {
            if(!day) return "";
            let date = day + '-' + moment(this.date_selected, 'x').format('MM-YY')
            return moment(date,'D-MM-YY').format('x') == moment(moment().format('D-MM-YY'),'D-MM-YY').format('x')
        },
        isSelected(day) {
            if(!day) return "";
            let date = day + '-' + moment(this.date_selected, 'x').format('MM-YY')
            return moment(date,'D-MM-YY').format('x') == moment(moment(this.date_selected,'x').format('D-MM-YY'),'D-MM-YY').format('x')
        },
        getClass(day) {
            return {isDate: day, isToday : this.isToday(day), isSelected : this.isSelected(day) }
        }
    }

}
</script>
<style lang="scss" scoped>
.calendar {
    width: 250px;
    background: #EEE;
    color: #444;
    border-radius: 5px;
    margin: 2px;
    box-shadow: 0px 0px 15px -2px #000;
    border-spacing: 10px 10px;

    & td {
        text-align: center;
        padding: 5px;
    }

    & thead td {
        font-weight: bold;
        color: #000;
    }
    & tbody td {
        border-radius: 5px;
        font-size: 10px;
        &.isToday {
            box-shadow: 1px 1px 7px -2px #000;
            background-color: rgb(212, 219, 250) !important;
        }
        &.isDate {
            &:hover {
                color: #333;
                cursor: pointer;
                box-shadow: 0px 0px 7px -2px #000;
            }
        }
        &.weekend {
            background: #DDD;
            color: #666;
        }
        &.isSelected {
            box-shadow: 1px 1px 7px -2px #000;
            background-color: rgb(204, 255, 208) !important;
        }
    }
}

</style>
