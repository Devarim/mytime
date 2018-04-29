import {Store} from '../store/Store'
import { setInterval } from 'timers';

const dateformat = 'DD/MM/YY HH:mm'
const timeformat = 'HH:mm'

export class Task extends Store {

    id = ''
    name = ''
    date = {
        init : '',
        end : '',
    }
    status = ''

    _autoSetInitTime_interval = null
    _autoSetEndTime_interval = null

    static _INITIAL = 1
    static _FINALIZED = 2

    get init_time() {
        return moment(this.date.init).format(timeformat);
    }
    set init_time(value) {
        var hour = moment(value, timeformat);
        this.date.init.set({
            'hour': hour.get('hour'),
            'minute': hour.get('minute'),
            'second': hour.get('second')
        })
    }
    get end_time() {
        return moment(this.date.end).format(timeformat);
    }
    set end_time(value) {
        var hour = moment(value, timeformat);
        this.date.end.set({
            'hour': hour.get('hour'),
            'minute': hour.get('minute'),
            'second': hour.get('second')
        })
    }


    constructor(data) {
        super()
        if (data) {
            this.id = data.id
            this.name = data.name
            this.date.init = data.date.init
            this.date.end = data.date.end
            this.status = data.status
        } else {
            this.id = moment().format('x');
            this.status = Task._INITIAL
        }
    }

    setAutoInitDateTime() {
        this.date.init = moment()
        if (!this._autoSetInitTime_interval)
            this._autoSetInitTime_interval = window.setInterval(()=> { this.setAutoInitDateTime() }, 1000);
    }

    stopAutoInitDateTime() {
        window.clearInterval(this._autoSetInitTime_interval)
    }


    setAutoEndDateTime() {
        this.date.end = moment()
        if (!this._autoSetEndTime_interval)
            this._autoSetEndTime_interval = window.setInterval(() => { this.setAutoEndDateTime() }, 1000);
    }

    stopAutoEndDateTime() {
        window.clearInterval(this._autoSetEndTime_interval)
    }

    save() {
        let dados = this.serialize();
        console.log("Adicionando");
        console.log(dados);
        this.commit('ADD_TASK', dados );
        return true;
    }

    finalize() {
        this.status = Task._FINALIZED
        this.stopAutoEndDateTime()
        this.save();
    }

    isInitial() {
        return this.status == Task._INITIAL;
    }

    isFinalized() {
        return this.status == Task._FINALIZED;
    }


}