import {Store} from './Store.js'
import { setInterval } from 'timers';
import { TaskTime } from './TaskTime.js';


export class Task extends Store {

    id = ''
    title = ''
    name = ''
    date_ = []
    status_ = ''

    // static _INITIAL = 1
    // static _PAUSED = 3
    static _FINALIZED = 2
    static _PLAYED = 4
    static _WAITING = 5
    
    get first_date() {
        if (this.date_[0])
            return this.date_[0];
        else 
            return new TaskTime(moment(),""); 
    }

    get last_date() {
        if (this.date_[this.date_.length - 1])
            return this.date_[this.date_.length - 1];
        else 
            return new TaskTime(moment(), ""); 
    }

    set status(value) {
        this.status_ = value;
        if (this.isStatus(Task._FINALIZED)) { this.finalize(); }
        if (this.isStatus(Task._PLAYED)) { this.start(); }
        if (this.isStatus(Task._WAITING)) { this.pause(); }
    }

    get status() {
        return this.status_;
    }
    
    addDate(date) {
        this.date_.push(date);
    }

    constructor(data) {
        super()
        if (data) {
            this.id = data.id
            this.title = data.title
            this.name = data.name
            if(data.date_) {
                data.date_.forEach(element => {
                    this.addDate(new TaskTime(element.init_, element.end_));
                });
            }
            this.status_ = data.status_
        } else {
            
        }
    }

    
    
    static load() {
        let task = new Task();
        task.dispatch('LOAD_TASKS');
    }
    
    save(status) {
        this.status = status;

        let dataObject = this.serialize();
        console.log(dataObject);
        this.dispatch('ADD_TASK', dataObject );
        return true;
    }

    start() {
        console.log('START');
        this.addDate(new TaskTime(moment(), null));
    }

    finalize() {
        console.log('FINALIZED');
        if (this.date_[this.date_.length - 1])
            this.date_[this.date_.length - 1].end = moment();
    }

    pause() {
        console.log('PAUSE');
        if (this.date_[this.date_.length - 1])
            this.date_[this.date_.length - 1].end = moment();
    }


    isStatus(status) {
        return this.status == status;
    }

}