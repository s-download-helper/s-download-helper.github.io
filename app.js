var platforms = 
{
    "drive": "https://drive.google.com/open?id=",
    "mediafire": "http://www.mediafire.com/file/",
    "tmearn": "https://tmearn.com/",
	"mega": "https://mega.nz/#"
};

var urlParams;
var downloadbutton = this.document.getElementById("btnDownload");

(function() {
    this.navigationSetup();
    this.makeHrefScrollingSmooth();

    this.urlParams = parseUrlQueries();

    this.setup();
})();

function setup() {
    if ((urlParams["p"] == null || urlParams["id"] == null || platforms[urlParams["p"]] == null) && urlParams["url"] == null) {
        this.document.getElementById("note").innerHTML = "One or multiple wrong queries was passed, please get a valid link from the owner. If you want to use this then check <a class=\"link\" href=\"#use\">usage</a>.";
        downloadbutton.disabled = true;
        downloadbutton.innerText = "No Link Found";
        makeHrefScrollingSmooth();
    }
    else if (urlParams["url"] != null) {
        this.document.getElementById("note").innerHTML = "If you don't get redirected to your desired link then close that tab and click the Go button again.";
        var url = urlParams["url"];
        if (!url.startsWith("https://") && !url.startsWith("http://"))
            url = "https://" + url;
        downloadbutton.href = url;
        downloadbutton.innerText = "Go There Now!";
        downloadbutton.addEventListener("click", function () {
            var win = window.open(url, "_blank");
            win.focus();
        }, false);
    }
    else {
        var url = platforms[urlParams["p"]] + urlParams["id"];
        downloadbutton.href = url;
        downloadbutton.addEventListener("click", function () {
            var win = window.open(url, "_blank");
            win.focus();
        }, false);
    }
}

function parseUrlQueries() {
    var match, pl = /\+/g, // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g, decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); }, query = window.location.search.substring(1);
    var temp_urlParams = {};
    while (match = search.exec(query)) {
        temp_urlParams[decode(match[1])] = decode(match[2]);
    }
    return temp_urlParams;
}

function makeHrefScrollingSmooth() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function navigationSetup() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");
    sections.forEach(section => {
        section.addEventListener("mouseenter", function () {
            const id = this.getAttribute("id");
            const activeSection = document.querySelector("a[href= '#" + id + "']");
            navLinks.forEach(nav => nav.classList.remove("active"));
            activeSection.classList.add("active");
        });
    });
}
