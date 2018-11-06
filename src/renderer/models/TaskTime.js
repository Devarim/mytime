
const dateformat = 'DD/MM/YY HH:mm'
const timeformat = 'HH:mm'

export class TaskTime {

    init_ = null;
    end_ = null;

    set init(value) { this.init_ = moment(value); }
    set end(value) { this.end_ = moment(value); }

    get init() { return this.init_; }
    get end() { return this.end_; }


    get init_format_time() { return this.init_.format(timeformat); }
    get end_format_time() { return this.end_.format(timeformat); }

    get init_format_date() { return this.init_.format(dateformat); }
    get end_format_date() { return this.end_.format(dateformat); }


    constructor( init, end) 
    {
        this.init = init;
        this.end = end;
    }

}