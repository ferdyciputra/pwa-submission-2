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
                    var tx = db.transaction("detail-team", "readonly");
                    var store = tx.objectStore("detail-team");
                    return store.getAll();
                })
                .then(function(teams) {
                    resolve(teams);
                })
        })
    }
}

export default DataSourceDb;