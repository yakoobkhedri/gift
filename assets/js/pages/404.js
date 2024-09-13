$(document).ready(function() {
    // Parallax controllers
    $(".page-404").mousemove(function(e) {
        var x = (e.pageX * -1 / 6), y = (e.pageY * -1 / 10);
        $(".parallax1").css("background-position", x + "px " + y + "px");

        var x = (e.pageX * -1 / 10), y = (e.pageY * -1 / 40);
        $(".parallax2").css("background-position", x + "px " + y + "px");
    });
});