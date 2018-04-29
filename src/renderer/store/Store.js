export class Store {
    static _store;

    constructor() {
        // this.$store = Store._store
    }

    commit(name, value) {
        Store._store.commit(name, value);
    }

    serialize()
    {
        var element = JSON.parse(JSON.stringify(this));
        var toReturn = {};
        var keys = Object.keys(element)
        keys.forEach(key => {
            if (key[0] == '_') return;
            toReturn[key] = element[key];
        });
        return toReturn;
    }

}



