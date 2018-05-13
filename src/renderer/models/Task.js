import {Store} from './Store.js'
import { setInterval } from 'timers';

const dateformat = 'DD/MM/YY HH:mm'
const timeformat = 'HH:mm'

export class Task extends Store {

    id = ''
    title = ''
    name = ''
    date_ = []
    status = ''

    // intervals_ = []

    // _autoSetInitTime_interval = null
    // _autoSetEndTime_interval = null

    // static _INITIAL = 1
    // static _PAUSED = 3
    static _FINALIZED = 2
    static _PLAYED = 4
    static _WAITING = 5
    
    get first_date() {
        return this.date_[0];
    }

    get last_date() {
        return this.date_[this.date_.length];
    }

    // get intervals() {
    //     return this.intervals_;
    // }
    // set intervals(value) {
    //     this.intervals_ = [];
    //     value.forEach(element => {
    //         this.intervals_.push({...element})
    //     });
    // }

    // get init_time() {
    //     return moment(this.date[0].init).format(timeformat);
    // }
    // set init_time(value) {
    //     var hour = moment(value, timeformat);
    //     this.date.init.set({
    //         'hour': hour.get('hour'),
    //         'minute': hour.get('minute'),
    //         'second': hour.get('second')
    //     })
    // }
    // get end_time() {
    //     return moment(this.date.end).format(timeformat);
    // }
    // set end_time(value) {
    //     var hour = moment(value, timeformat);
    //     this.date.end.set({
    //         'hour': hour.get('hour'),
    //         'minute': hour.get('minute'),
    //         'second': hour.get('second')
    //     })
    // }

    // get last_interval() {
    //     return this.intervals[this.intervals.length - 1];
    // }
    // set last_interval(value) {
    //     this.intervals[this.intervals.length - 1] = value;
    // }


    constructor(data) {
        super()
        if (data) {
            this.id = data.id
            this.title = data.title
            this.name = data.name
            if(data.date_)
                this.date_ = [...data.date_]
            // this.date.init = data.date.init
            // this.date.end = data.date.end
            this.status = data.status
            // this.intervals = [...data.intervals_]
        } else {
            // this.id = moment().format('x');
        }
    }

    // setAutoInitDateTime() {
    //     this.date.init = moment()
    //     if (!this._autoSetInitTime_interval)
    //         this._autoSetInitTime_interval = window.setInterval(()=> { this.setAutoInitDateTime() }, 1000);
    // }

    // stopAutoInitDateTime() {
    //     window.clearInterval(this._autoSetInitTime_interval)
    // }
    
    
    static load() {
        let task = new Task();
        task.dispatch('LOAD_TASKS');
    }
    
    save(status) {
        if(status) this.status = status;
        if (this.isStatus(Task._PLAYED)) {
            this._pauseAllOthers();
            this.actual_date.init = moment();
        }
        let dataObject = this.serialize();
        this.dispatch('ADD_TASK', dataObject );
        return true;
    }

    start() {
        this._pauseAllOthers()
        this.status = Task._PLAYED
        this.date.push({})
        this.save();
    }

    finalize() {
        this.status = Task._FINALIZED
        this.save();
    }

    pause() {
        if (this.last_interval && !this.last_interval.end) return null;
        this.intervals.push({ init: moment(), end: null });
        this.status = Task._WAITING
        this.save();
    }
    _pauseAllOthers() {
        this.dispatch('PAUSE_ALL');
    }


    isStatus(status) {
        return this.status == status;
    }




}