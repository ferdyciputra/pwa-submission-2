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