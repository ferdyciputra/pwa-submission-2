const base_url = "https://api.football-data.org/v2/";
const API_KEY = "48782b3f76a641ef8ae9dbbf5e994166";

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
    static async showAlbums() {
        const albums = {
            'tahun': [
                '1990', '1991', '1994', '1995', '1997', '2000', '2004', '2009', '2012', '2014', '2016', '2020'
            ],
            'judul': [
                '39/Smooth', 'Kerplunk', 'Dookie', 'Insomniac', 'nimrod', 'Warning:', 'American Idiot', '21st Century Breakdown', '¡Uno! ¡DOs! ¡Tre!', 'Demolicious', 'Revolution Radio', 'Father of All'
            ]
        };
        if (Object.keys(albums).length === 0 && albums.constructor === Object) {
            //Jika object albums tidak memiliki data
            let albumList = document.querySelector('#albums-list');
            let row = document.createElement('tr');

            row.innerHTML = "<td>No Data Available</td>";
            row.innerHTML += "<td>No Data Available</td>";
            albumList.appendChild(row);
        } else {
            for (let index = 0; index < albums['tahun'].length; index++) {
                //menampilkan data albums ke table
                let albumList = document.querySelector('#albums-list');
                let row = document.createElement('tr');

                row.innerHTML = "<td>" + albums['tahun'][index] + "</td>";
                row.innerHTML += "<td>" + albums['judul'][index] + "</td>";
                albumList.appendChild(row);
            }
        }
    }

    static async getStandings(competitionId) {
        swal({
            title: 'Please Wait..!',
            icon: 'info',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        })
        fetch(base_url + `competitions/${competitionId}/standings`, {
                headers: {
                    'X-Auth-Token': API_KEY
                }
            })
            .then(status)
            .then(json)
            .then(function(data) {
                const dataStandings = data.standings[0].table;
                let standingHTML = "";
                let i = 0;
                dataStandings.forEach(data => {
                    let dataTeam = dataStandings[i].team;
                    let dataImage = replaceURL(dataTeam.crestUrl);
                    console.log(dataImage);
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
                                    <td><a href="${dataTeam.id}" class="waves-effect waves-light indigo darken-1 btn-small"><i class="material-icons left">info</i>Detail</a></td>
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
                                    <td><a href="${dataTeam.id}" class="waves-effect waves-light indigo darken-1 btn-small"><i class="material-icons left">info</i>Detail</a></td>
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
            })
            .catch(error);
    }

    static async getLogoTeam(competitionId) {
        swal({
            title: 'Please Wait..!',
            icon: 'info',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        })
        fetch(base_url + `competitions/${competitionId}/standings`, {
                headers: {
                    'X-Auth-Token': API_KEY
                }
            })
            .then(status)
            .then(json)
            .then(function(data) {
                let logoHTML = "";
                let i = 0;
                const dataAllTeam = data.standings[0].table;
                dataAllTeam.forEach(() => {
                    let dataTeam = dataAllTeam[i].team;
                    let dataImage = replaceURL(dataTeam.crestUrl);
                    console.log(dataTeam);
                    logoHTML += `
                    <div class="col s12 m6 l3 center-align">
                        <div class="card">
                            <div class="card-content">
                                <img class="logo-club-card" src="${dataImage}" alt="">
                                <p class="card-name-club center-align">${dataTeam.name}</p>
                            </div>
                            <div class="card-action"><a href="${dataTeam.id}" class="indigo-text text-darken-1">See Detail</a></div>
                        </div>
                    </div>
                    `
                    i += 1;
                });
                // Sisipkan komponen card logo-club ke dalam element dengan id #logo-list
                document.getElementById("logo-list").innerHTML = logoHTML;
                swal.stopLoading();
                swal.close();
            })
    }
}

export default DataSourceApi;