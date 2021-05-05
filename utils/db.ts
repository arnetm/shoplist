import { openDatabase, Database, SQLTransaction, Query, SQLStatementCallback, SQLError, SQLResultSet } from 'expo-sqlite'
import Note from '../Models/product';

const databaseName: string = 'writings';
//DB INIT
const getDb = (name: string = databaseName): Database => {
    // Opent de db als deze bestaat, maakt db aan als ze nog niet bestaat.
    return openDatabase(name);
}

const transaction = (db: Database): Promise<SQLTransaction> => {
    return new Promise(function (resolve, reject) {
        db.transaction((tx: SQLTransaction) => {
            resolve(tx);
        },
            (error) => {
                reject(error);
            },
            () => {
                console.info('Transaction succeeded');
            },
        );
    });
}

const query = (tx: SQLTransaction, query: Query): Promise<SQLResultSet> => {
    return new Promise(function (resolve, reject) {
        tx.executeSql(
            query.sql,
            query.args,
            (tx: SQLTransaction, res: SQLResultSet) => {
                resolve(res);
            },
            (tx: SQLTransaction, error: SQLError) => {
                reject(error);
                return true;
            }
        )
    });
}

//ALLES PREPARED


//TABLE INIT
export const initWritings = async () => {
    const db = getDb();
    const tx = await transaction(db).catch(error => console.error(error));
    console.log({ tx });
    if (tx) {
        const res = await query(tx, {
            sql: "CREATE TABLE IF NOT EXISTS `products` (id integer primary key autoincrement, name text)",
            args: [],
        });
    }
}


export const writings = {

    //C reate
    create: (n: Note): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
            const db = getDb();
            const tx = await transaction(db);

            const res = await query(tx, {
                sql: "INSERT INTO `products` (id, name) values(?, ?)",
                args: [null, n.name],
            }).catch((error) => {
                reject(error);
            });
            if (res) {
                resolve(res);
            }
        });
    },

    //R ead
    read: {
        all: (): Promise<SQLResultSet> => {
            return new Promise(async function (resolve, reject) {
                const db = getDb();
                const tx = await transaction(db);

                const res = await query(tx, {
                    sql: "SELECT * FROM `products`",
                    args: [],
                }).catch((error) => {
                    reject(error);
                });
                if (res) {
                    resolve(res);
                }
            });
        },

        detail: (id: number): Promise<SQLResultSet> => {
            return new Promise(async function (resolve, reject) {
                const db = getDb();
                const tx = await transaction(db);

                const res = await query(tx, {
                    sql: "SELECT * FROM `products` WHERE id = ?",
                    args: [id],
                }).catch((error) => {
                    reject(error);
                });
                if (res) {
                    resolve(res);
                }
            });
        }
    },



    //U pdate
    update: (n: Note): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
            const db = getDb(),
                tx = await transaction(db);

            const res = await query(tx, {
                sql: "UPDATE `writings` SET name = ?, WHERE id = ?",
                args: [n.name, n.id],
            }).catch((error) => {
                reject(error);
            });
            if (res) resolve(res);
        });
    },

    //D elete
    delete: (id: number): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
            const db = getDb();
            const tx = await transaction(db);

            const res = await query(tx, {
                sql: "DELETE FROM `products` WHERE id = ?",
                args: [id],
            }).catch((error) => {
                reject(error);
            });
            if (res) {
                resolve(res);
            }
        });
    },
}