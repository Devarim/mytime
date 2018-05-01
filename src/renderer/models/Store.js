export class Store {
    static _store;

    constructor() {
        // this.$store = Store._store
    }

    commit(name, value) {
        Store._store.commit(name, value);
    }

    dispatch(name, value) {
        Store._store.dispatch(name, value);
    }

    

    serialize()
    {
        var element = serializeObject(this);
        var toReturn = {};
        var keys = Object.keys(element)
        keys.forEach(key => {
            if (key[0] == '_') return;
            if (element[key] instanceof Array) toReturn[key] = serializeObject(element[key]);
            toReturn[key] = element[key];
        });
        return toReturn;
    }

}

function serializeObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}


