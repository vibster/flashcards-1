function init(id) {
    document.getElementById(id).style.display="block";
    return true;
}
function toggle(id) {
    e = document.getElementById(id);
    if (e.style.display == "none") {
        e.style.display="block";
    } else {
        e.style.display="none";
    }
    return true;
}
