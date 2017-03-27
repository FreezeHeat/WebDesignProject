$(document).ready(

    function () {

        /* SIDEBAR: make the sidebar text invisible*/
        $("#sidebar li h6").addClass("notSelected");

        //determines which elements can be changed (because some elements were set by scroll function)
        var okToChange = false;

        /* SIDEBAR: Hover on circle handler */

        /*in function*/
        $(".circle").hover(function () {

            if ($(this).parent().parent().find("h6").hasClass("notSelected")) {
                $(this).parent().parent().find("h6").addClass("selected").removeClass("notSelected");
                okToChange = true;
            }

            /*out function*/
        }, function () {
            if (okToChange == true) {
                $(this).parent().parent().find("h6").removeClass("selected").addClass("notSelected");
                okToChange = false;
            }
        });

        //on scroll, activate onScroll function
        $(document).on("scroll", onScroll);

        // scroll animation and setting the menu items accordingly
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            //clean former classes
            $('#sidebar li h6').each(function () {
                $(this).removeClass('selected notSelected').addClass('notSelected');
            });

            //clean all circles
            $('#sidebar li .circle').each(function () {
                $(this).css({
                    "background-color": "transparent"
                });
            });

            //add class to currently selected
            $(this).parent().find("h6").removeClass('notSelected').addClass('selected');

            //change the current circle to gray
            $(this).find(".circle").css({
                "background-color": "gray"
            });

            //get the href target
            var target = this.hash;
            var menu = target;
            $target = $(target);

            //set okToChange to false, so when the text won't disappear when clicking
            okToChange = false;

            //scroll based on the target
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top + 2
            },
                800,
                'swing',
                function () {
                    window.location.hash = target;
                    $(document).on("scroll", onScroll);
                }
            );
        });

        //upon scrolling, update the sidebar based on the currently viewed section
        function onScroll(event) {

            var scrollPos = $(document).scrollTop();

            $('#sidebar li a').each(function () {

                var currLink = $(this);
                var refElement = $(currLink.attr("href"));

                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('#sidebar li h6').removeClass("selected").addClass("notSelected");
                    currLink.parent().find("h6").addClass("selected").removeClass("notSelected");
                    currLink.find(".circle").css({
                        "background-color": "gray"
                    });

                    //for animations to appear if there are any in that ID (#)
                    $(this.hash).addClass("current");
                } else {
                    currLink.parent().find("h6").removeClass("selected").addClass("notSelected");
                    currLink.find(".circle").css({
                        "background-color": "transparent"
                    });
                }
            });
        }
    });