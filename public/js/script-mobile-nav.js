console.log('it works') /*checked to see js is inserted correctly*/

// Mobile Navigation Bar
function mobileMenu() {
    var x = document.getElementById("navLinks");
    if (x.style.display === "block") {
    x.style.display = "none";
    } 
    else {
    x.style.display = "block";
    }
}
