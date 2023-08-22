"use strict";

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/objects')
        .then(data => data.json())
        .then(res => {
        console.log(res)
    });
});