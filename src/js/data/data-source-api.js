const base_url = "https://api.football-data.org/v2/";
const API_KEY = "48782b3f76a641ef8ae9dbbf5e994166";

function fetchApi(url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    });
}

function replaceURL(url) {
    if (url === null || url === '') {
        return '/src/img/dummy-logo-club.png'
    } else {
        return url.replace(/^http:\/\//i, 'https://');
    }
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
                const dataStandings = data.standings[0].table;
                let standingHTML = "";
                let i = 0;
                dataStandings.forEach(data => {
                    let dataTeam = dataStandings[i].team;
                    let dataImage = replaceURL(dataTeam.crestUrl);
                    if (parseInt(data.goalDifference) >= 0) {
                        standingHTML += `
                                <tr>
                                    <td>${data.position}</td>
                                    <td>
                                        <img src="${dataImage}" class="logo-club" alt="${dataTeam.name}">
                                    </td>
                                    <td class="name-club">${dataTeam.name}</td>
                                    <td>${data.playedGames}</td>
                                    <td>${data.won}</td>
                                    <td>${data.draw}</td>
                                    <td>${data.lost}</td>
                                    <td>${data.goalsFor}</td>
                                    <td>${data.goalsAgainst}</td>
                                    <td class="plus-goal">${data.goalDifference}</td>
                                    <td class="points-club">${data.points}</td>
                                </tr>`
                    } else {
                        standingHTML += `
                                <tr>
                                    <td>${data.position}</td>
                                    <td>
                                        <img src="${dataImage}" class="logo-club" alt="${dataTeam.name}">
                                    </td>
                                    <td class="name-club">${dataTeam.name}</td>
                                    <td>${data.playedGames}</td>
                                    <td>${data.won}</td>
                                    <td>${data.draw}</td>
                                    <td>${data.lost}</td>
                                    <td>${data.goalsFor}</td>
                                    <td>${data.goalsAgainst}</td>
                                    <td class="minus-goal">${data.goalDifference}</td>
                                    <td class="points-club">${data.points}</td>
                                </tr>`
                    }
                    i += 1;
                });
                // Sisipkan komponen tabel ke dalam element dengan id #standings-list
                document.getElementById("standings-list").innerHTML = standingHTML;
                let headerStandings = document.getElementById("header-standings");
                headerStandings.removeAttribute("hidden");
                swal.stopLoading();
                swal.close();
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
                let logoHTML = "";
                let i = 0;
                const dataAllTeam = data.standings[0].table;
                dataAllTeam.forEach(() => {
                    let dataTeam = dataAllTeam[i].team;
                    let dataImage = replaceURL(dataTeam.crestUrl);
                    logoHTML += `
                    <div class="col s12 m6 l3 center-align">
                        <div class="card">
                            <div class="card-content">
                                <img class="logo-club-card" src="${dataImage}" alt="${dataTeam.name}">
                                <p class="card-name-club center-align">${dataTeam.name}</p>
                            </div>
                            <div class="card-action"><a href="./detail-team.html?id=${dataTeam.id}" class="indigo-text text-darken-1">See Detail</a></div>
                        </div>
                    </div>
                    `
                    i += 1;
                });
                // Sisipkan komponen card logo-club ke dalam element dengan id #logo-list
                document.getElementById("logo-list").innerHTML = logoHTML;
                swal.stopLoading();
                swal.close();
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
                    let dataImage = replaceURL(data.crestUrl);
                    let detailTeamHTML = `
                    <div class="card">
                        <div class="row">
                            <div class="card-content">
                                <div class="col s12 m6 l6 center-align">
                                    <img class="logo-club-card" src="${dataImage}" alt="${data.name}">
                                </div>
                                <div class="col s12 m6 l6 center-align">
                                    <p class="card-name-club center-align">${data.name}</p>
                                    <p class="card-detail-club">${data.address}</p>
                                    <p class="card-detail-club">${data.phone}</p>
                                    <p class="card-detail-club">${data.email}</p>
                                    <p class="card-detail-club">Stadion ${data.venue}</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-action">
                        </div>
                    </div>
                        `
                    document.getElementById('detail-team-list').innerHTML = detailTeamHTML;
                    resolve(data);
                    swal.stopLoading();
                    swal.close();
                }).catch(error);
        })
    }

    static async showDetailTeams(teams) {
        let favoriteHTML = "";
        teams.then(function(result) {
            if (result.length === 0) {
                favoriteHTML = `
                <div class="row">
                        <div class="col s12 m12 l6 xl6">
                            <img src="/src/img/icon-favorite.png" class="img-favorite">
                        </div>
                        <div class="col s12 m12 l6 xl6">
                            <h2>No Team Favorite</h2>
                            <p>Yuk tambahkan team favorite kamu</p>
                            <a class="waves-effect waves-light btn indigo darken-1" id="btn-goto-logo" href="#logo">Search Now</a>
                        </div>
                </div>
                `
                document.getElementById('favorite-list').innerHTML = favoriteHTML;
            }

            result.forEach(function(data) {
                let dataImage = replaceURL(data.crestUrl);
                favoriteHTML += `
                <div class="card">
                        <div class="row">
                            <div class="card-content">
                                <div class="col s12 m6 l6 center-align">
                                    <img class="logo-club-card" src="${dataImage}" alt="${data.name}">
                                </div>
                                <div class="col s12 m6 l6 center-align">
                                    <p class="card-name-club center-align">${data.name}</p>
                                    <p class="card-detail-club">${data.address}</p>
                                    <p class="card-detail-club">${data.phone}</p>
                                    <p class="card-detail-club">${data.email}</p>
                                    <p class="card-detail-club">Stadion ${data.venue}</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-action">
                        <a class="waves-effect waves-light btn red accent-4 remove" data-id="${data.id}">
                            <i class="material-icons left">delete</i> Remove Team
                        </a>
                        </div>
                    </div>
                `
                document.getElementById('favorite-list').innerHTML = favoriteHTML;
            })
        })
    }

}

export default DataSourceApi;