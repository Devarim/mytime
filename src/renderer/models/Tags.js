import { Store } from './Store'

export class Tags extends Store {

    name = ""
    id = ""
    
    constructor() {
        super()
    }

    save() {
        console.log(this.name);
    }
}