const base_url = "https://api.football-data.org/v2/";
const API_KEY = "48782b3f76a641ef8ae9dbbf5e994166";

function replaceURL(url) {
    return url.replace(/^http:\/\//i, 'https://');
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
    console.log("Error : " + error);
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
        return fetch(base_url + `competitions/${competitionId}/standings`, {
                headers: {
                    'X-Auth-Token': API_KEY
                }
            })
            .then(status)
            .then(json)
            .catch(error);
    }
}

export default DataSourceApi;