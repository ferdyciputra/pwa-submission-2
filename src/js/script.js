import DataSourceApi from '../js/data/data-source-api';
import swal from 'sweetalert';
import DataSourceDb from './data/db';

// Active sidebar nav
const elems = document.querySelectorAll(".sidenav");
M.Sidenav.init(elems);
loadNav();

function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status !== 200) return;

            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                elm.innerHTML = xhttp.responseText;
            });

            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                elm.addEventListener("click", function(event) {
                    //Tutup sidenav
                    const sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    // Muat konten halaman yang dipanggil
                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);

                });
            });
        }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
}

// Load Page Content
let page = window.location.hash.substr(1);
if (page === "") page = "home";
loadPage(page);

function loadPage() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");
            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
                activeNav();
                activeNavMobile();

                if (page === 'standings') {
                    let elems = document.querySelector('select');
                    M.FormSelect.init(elems);
                    // ubah value sesuai pilihan option saat klik
                    const standingsSelect = document.getElementById("standings-select");
                    standingsSelect.addEventListener('change', function(event) {
                        const valueOption = event.target.value;
                        DataSourceApi.getStandings(valueOption);
                    })
                } else if (page === 'home') {
                    //klik button go to profile di home
                    let btnStandings = document.getElementById("btn-goto-standings");
                    btnStandings.addEventListener('click', function() {
                        loadStandingsPage();
                    })
                } else if (page === 'logo') {
                    let elems = document.querySelector('select');
                    M.FormSelect.init(elems);
                    const logoSelect = document.getElementById("logo-select");
                    logoSelect.addEventListener('change', function(event) {
                        const valueOption = event.target.value;
                        DataSourceApi.getLogoTeam(valueOption);
                    })
                } else if (page === 'favorite') {
                    $(document).ready(function() {
                        $("#favorite-list").on('click', '#btn-goto-logo', function() {
                            loadLogoPage();
                        })
                    });
                    let team = DataSourceDb.getAllTeams();
                    DataSourceApi.showDetailTeams(team);

                    $("#favorite-list").on('click', '.remove', function() {
                        const value = $(this).data('id');
                        swal({
                                title: "Are you sure?",
                                text: "This team will be deleted from your favorite",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            })
                            .then((willDelete) => {
                                if (willDelete) {
                                    DataSourceDb.deleteTeam(value).then(function() {
                                        loadfavoritePage();
                                    })
                                } else {
                                    swal("Your favorite team is safe!");
                                }
                            });
                    })
                }
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "src/pages/" + page + ".html", true);
    xhttp.send();
}


const topNav = document.getElementById("navbar");
const sideNav = document.getElementById("nav-mobile");
let menuWeb = topNav.getElementsByClassName("menu");
let menuMobile = sideNav.getElementsByClassName("menu");

function activeNavMobile() {

    for (let i = 0; i < menuMobile.length; i++) {
        menuMobile[i].addEventListener("click", function() {
            // remove all class active
            for (let index = 0; index < menuMobile.length; index++) {
                menuMobile[index].classList.remove("active")
            }

            let current = document.getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
        });
    }
}

function activeNav() {
    for (let i = 0; i < menuWeb.length; i++) {
        menuWeb[i].addEventListener("click", function() {
            let current = document.getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
        });
    }
}

function loadfavoritePage() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");
            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
                $(document).ready(function() {
                    $("#favorite-list").on('click', '#btn-goto-logo', function() {
                        loadLogoPage();
                    })
                });
                let team = DataSourceDb.getAllTeams();
                DataSourceApi.showDetailTeams(team);

                $("#favorite-list").on('click', '.remove', function() {
                    const value = $(this).data('id');
                    swal({
                            title: "Are you sure?",
                            text: "This team will be deleted from your favorite",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((willDelete) => {
                            if (willDelete) {
                                DataSourceDb.deleteTeam(value).then(function() {
                                    loadfavoritePage();
                                })
                            } else {
                                swal("Your favorite team is safe!");
                            }
                        });
                })

            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "src/pages/favorite.html", true);
    xhttp.send();

    // remove all class active
    for (let i = 0; i < menuWeb.length; i++) {
        menuWeb[i].classList.remove("active")
    }
    for (let index = 0; index < menuMobile.length; index++) {
        menuMobile[index].classList.remove("active")
    }
    // add class active menu standings
    menuWeb[3].classList.add('active')
    menuMobile[3].classList.add('active')
}

function loadStandingsPage() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");
            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
                let elems = document.querySelector('select');
                M.FormSelect.init(elems);
                // ubah value sesuai pilihan option saat klik
                const standingsSelect = document.getElementById("standings-select");
                standingsSelect.addEventListener('change', function(event) {
                    const valueOption = event.target.value;
                    DataSourceApi.getStandings(valueOption);
                })
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "src/pages/standings.html", true);
    xhttp.send();

    // remove all class active
    for (let i = 0; i < menuWeb.length; i++) {
        menuWeb[i].classList.remove("active")
    }
    for (let index = 0; index < menuMobile.length; index++) {
        menuMobile[index].classList.remove("active")
    }
    // add class active menu standings
    menuWeb[1].classList.add('active')
    menuMobile[1].classList.add('active')
}

function loadLogoPage() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");
            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
                let elems = document.querySelector('select');
                M.FormSelect.init(elems);
                const logoSelect = document.getElementById("logo-select");
                logoSelect.addEventListener('change', function(event) {
                    const valueOption = event.target.value;
                    DataSourceApi.getLogoTeam(valueOption);
                })
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "src/pages/logo.html", true);
    xhttp.send();

    // remove all class active
    for (let i = 0; i < menuWeb.length; i++) {
        menuWeb[i].classList.remove("active")
    }
    for (let index = 0; index < menuMobile.length; index++) {
        menuMobile[index].classList.remove("active")
    }
    // add class active menu standings
    menuWeb[2].classList.add('active')
    menuMobile[2].classList.add('active')
}