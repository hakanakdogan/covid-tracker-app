import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('favourites.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS favourites(id INTEGER PRIMARY KEY NOT NULL, countryName TEXT NOT NULL, countryCode TEXT NOT NULL)',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise;
}

export const addToFavourites = (countryName, countryCode) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO favourites (countryName, countryCode) VALUES (?,?)',
                [countryName, countryCode],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise;
}

export const removeFromFavourites = (countryName, countryCode) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM favourites WHERE countryName=? AND countryCode=?',
                [countryName, countryCode],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise;
}

export const fetchFromFavourites = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM favourites',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            )
        })
    })
    return promise;
}