import "regenerator-runtime";
import "./css/materialize.min.css";
import "./css/materialize.css";
import "./css/style.css";
import "../src/js/materialize.js";
import "./js/script";
import swal from 'sweetalert';

// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function() {
                console.log('Pendaftaran ServiceWorker berhasil');
            })
            .catch(function() {
                console.log('Pendaftaran ServiceWorker gagal');
            });
    })
} else {
    console.log("ServiceWorker belum didukung browser ini.")
}

// Periksa fitur Notification API
if ("Notification" in window) {
    requestPermission();
} else {
    console.error('Browser tidak mendukung notifikasi.');
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
    Notification.requestPermission().then(function(result) {
        if (result === 'denied') {
            console.log(result);
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
        } else if (result === 'default') {
            console.log(result);
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
        }
        console.log(result);
        console.log("Fitur notifikasi diijinkan.");
    });
}

document.addEventListener('DOMContentLoaded', function() {

})