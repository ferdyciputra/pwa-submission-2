import idb from '../data/idb';

let dbPromised = idb.open("football", 1, function(upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("detail-team", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
})



class DataSourceDb {
    static async saveForLater(team) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("detail-team", "readwrite");
                let store = tx.objectStore("detail-team");
                console.log(team);
                store.add(team);
                return tx.complete;
            })
            .then(function() {
                swal({
                    title: "Success",
                    text: "Team berhasil disimpan",
                    icon: "success",
                });
            }).catch(function(error) {
                swal({
                    title: "Ooopss...",
                    text: "Team sudah pernah disimpan",
                    icon: "error",
                });
            })
    }

    static async getAllTeams() {
        return new Promise(function(resolve, reject) {
            dbPromised
                .then(function(db) {
                    let tx = db.transaction("detail-team", "readonly");
                    let store = tx.objectStore("detail-team");
                    return store.getAll();
                })
                .then(function(teams) {
                    resolve(teams);
                })
        })
    }

    static async deleteTeam(teamId) {
        return new Promise((resolve, reject) => {
            dbPromised
                .then(db => {
                    const tx = db.transaction("detail-team", `readwrite`);
                    tx.objectStore("detail-team").delete(teamId);
                    return tx;
                }).then(tx => {
                    if (tx.complete) {
                        resolve(true)
                        swal({
                            title: "Success",
                            text: "Success deleted Team!",
                            icon: "success",
                        });
                    } else {
                        reject(new Error(tx.onerror))
                    }
                })
        })
    }
}

export default DataSourceDb;