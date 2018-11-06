import Datastore from 'nedb-promises';

let db = Datastore.create('db/database.json');


db.nextId = async (type) => {
    let count = await db.count({ type: type });
    return count + 1;
};

export default db;