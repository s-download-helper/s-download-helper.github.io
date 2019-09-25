const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

sections.forEach(section => {
  section.addEventListener("mouseenter", function() {
    const id = this.getAttribute("id");
    const activeSection = document.querySelector("a[href= '#" + id + "']");
    navLinks.forEach(nav => nav.classList.remove("active"));
    activeSection.classList.add("active");
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
var platforms = 
{
    "drive": "https://drive.google.com/open?id=",
    "mediafire": "http://www.mediafire.com/file/",
    "tmearn": "https://tmearn.com/"
};

var urlParams;
var downloadbutton = this.document.getElementById("btnDownload");
var match,
pl     = /\+/g,  // Regex for replacing addition symbol with a space
search = /([^&=]+)=?([^&]*)/g,
decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
query  = window.location.search.substring(1);

urlParams = {};
while (match = search.exec(query)){
    urlParams[decode(match[1])] = decode(match[2]);
}
if (urlParams["p"] == null || urlParams["id"] == null || platforms[urlParams["p"]] == null)
{
    this.document.getElementById("note").innerHTML = "One or multiple wrong queries was passed, please get a valid link from the owner.";
    downloadbutton.disabled = true;
    downloadbutton.innerText = "No Download";
}
else{
    var url = platforms[urlParams["p"]] + urlParams["id"];
    downloadbutton.href = url;
    downloadbutton.addEventListener("click", function() {    
        var win = window.open(url, "_blank");
        win.focus();
    }, false);
}