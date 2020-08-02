import "regenerator-runtime";
import "./css/materialize.min.css";
import "./css/materialize.css";
import "./css/style.css";
import "../src/js/materialize.js";
import DataSourceApi from './js/data/data-source-api';
import swal from 'sweetalert';

document.addEventListener('DOMContentLoaded', function() {
    DataSourceApi.getDetailTeam();
})