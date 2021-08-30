
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['site', 'from', 'to'], function (result) {

        if (result.site != null) {
            document.getElementById("site").value = result.site
        }
        if (result.from != null) {
            document.getElementById("from-time").value = result.from
        }
        if (result.to != null) {
            document.getElementById("to-time").value = result.to
        }
    });

    document.getElementById("myForm").addEventListener("submit", saveForm);

});

function saveForm() {
    const form = document.getElementById('myForm');
    const site = form.elements['site'].value
    const from = form.elements['from-time'].value
    const to = form.elements['to-time'].value
    site != "" || from != "" || to != "" ?
        chrome.storage.local.set({ site: site, from: from, to: to }, function () {
            alert(site + " website blocked from " + Date(from).toString().split("GMT")[0] + " to  " + Date(to).toString().split("GMT")[0]);
        }) : alert('Fields cannot be empty')

}


findAllURL = function changeAllURL(text) {
    var current = window.location.href;
    if (current.startsWith(text)) {
        document.documentElement.innerHTML = '';
        document.documentElement.innerHTML = 'Currently Unavailable';
        document.documentElement.scrollTop = 0;
    }
}

chrome.storage.local.get(['site', 'from', 'to'], function (result) {
    var now = new Date();
    var from = new Date(result.from);
    var to = new Date(result.to);


    website = result.site;

    if (Date.parse(now) > Date.parse(from) && Date.parse(now) < Date.parse(to)) {
        console.log("Blocked")
        findAllURL(website);
    }

});





