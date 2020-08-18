import mainView from '../view/view-main'

const base_url = "https://api.football-data.org/v2/";
const API_KEY = "48782b3f76a641ef8ae9dbbf5e994166";

function fetchApi(url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    });
}

// Blok kode yang akan dipanggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log('Error : ' + response.status);

        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {

        // Mengubah suatu objek menjadi Promise agar bisa "di-then kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk menghandle kesalahan di blok catch
function error(error) {
    swal({
        title: "Ooopss...",
        text: error,
        icon: "error",
    });
}

class DataSourceApi {
    static async getStandings(competitionId) {

        swal({
            title: 'Please Wait..!',
            icon: 'info',
            allowOutsideClick: false,
            closeOnEsc: false,
            allowEnterKey: false,
        })

        fetchApi(base_url + `competitions/${competitionId}/standings`)
            .then(status)
            .then(json)
            .then(function(data) {
                // tampilkan view standings
                mainView.viewStandings(data);
            }).catch(error);
    }

    static async getLogoTeam(competitionId) {

        swal({
            title: 'Please Wait..!',
            icon: 'info',
            allowOutsideClick: false,
            closeOnEsc: false,
            allowEnterKey: false,
        })

        fetchApi(base_url + `competitions/${competitionId}/standings`)
            .then(status)
            .then(json)
            .then(function(data) {
                // tampilkan view logo team
                mainView.viewLogoTeam(data);
            }).catch(error);
    }

    static async getDetailTeam() {
        return new Promise(function(resolve, reject) {
            // Ambil nilai query parameter (?id=)
            let urlParams = new URLSearchParams(window.location.search);
            let idParam = urlParams.get("id");

            swal({
                title: 'Please Wait..!',
                icon: 'info',
                allowOutsideClick: false,
                closeOnEsc: false,
                allowEnterKey: false,
            })

            fetchApi(base_url + `teams/${idParam}`)
                .then(status)
                .then(json)
                .then(function(data) {
                    // tampilkan view detail team
                    mainView.viewDetailTeam(data);
                    resolve(data);
                    swal.stopLoading();
                    swal.close();
                }).catch(error);
        })
    }

    static async showDetailTeams(teams) {
        // tampilkan view showdetailTeams
        mainView.viewShowDetailTeam(teams);
    }

}

export default DataSourceApi;