(function(window) {
    // Define Modiran class
    function Modiran() {

        var toggleSidebarSwitch = document.querySelector(".toggle-sidebar-switch");
        var creativeSidebarSwitch = document.querySelector(".creative-sidebar-switch");
        var fixHeaderSwitch = document.querySelector(".fix-header-switch");

        // Initilize metisMenu
        this.initMetisMenu = function() {
            if (typeof metisMenu != "undefined") {
                $("#side-menu").metisMenu();
            }
        };

        // Check old IE browsers and show appropriate notice
        this.checkOldIE = function() {
            if ($.browser.msie && $.browser.version < 9) {
                $("#page-content").prepend('<p class="alert alert-warning">مرورگر شما منسوخ و تاریخ گذشته است. از سایت  <a href="http://browsehappy.com/">browsehappy(مرور شاد اینترنت)</a> ، اقدام به به روز رسانی کنید</p>');
            }
        };

        // Handle toggle-sidebar-top button
        this.toggleSidebarTop = function() {
            $("#toggle-sidebar-top").on("click", function(e) {
                e.preventDefault();
                var btn = $(this),
                        icon = $(this).find("i");

                if (btn.hasClass("open")) {
                    btn.removeClass("open");
                    icon.removeClass("icon-user-following").addClass("text-danger icon-user-unfollow");

                    $(".sidebar-top").slideUp();
                } else {
                    btn.addClass("open");
                    icon.removeClass("text-danger icon-user-unfollow").addClass("icon-user-following");

                    $(".sidebar-top").slideDown();
                }
            });
        };

        // Handle toggle-sidebar button
        this.toggleSidebar = function() {
            $("#toggle-sidebar").on("click", function(e) {
                e.preventDefault();
                if ($("body").hasClass("sidebar-collapse")) {
                    window.Modiran.changeSidebarState("expand");
                } else {
                    window.Modiran.changeSidebarState("collapse");
                }
            });
        };

        // Change sidebar state
        this.changeSidebarState = function(newState) {

            if (newState === "collapse") {
                $("body").addClass("sidebar-collapse");
                $(".metismenu>li").removeClass("active");
                $(".metismenu > li > ul").removeClass("in");


                if (!toggleSidebarSwitch.checked) {
                    $('.toggle-sidebar-switch').trigger('click');
                }
            } else {
                $("body").removeClass("sidebar-collapse");

                if (toggleSidebarSwitch.checked) {
                    $('.toggle-sidebar-switch').trigger('click');
                }
            }

            window.Modiran.updateSettingCodes();
        };


        // Handle btn-status
        this.handleStatusButton = function() {
            $(".dropdown-status>li>a").on("click", function() {
                $(".btn-status").html($(this).html());
            });
        };


        // Define tooltip
        this.tooltip = function() {
            $("[rel='tooltip'], .has-tooltip").tooltip();
            $(".btn-code").tooltip({title: $(this).data("title")});
        };

        // Handle code button
        this.handleCodeButton = function() {
            $(".btn-code").on("click", function(e) {
                e.preventDefault();

                var result = escapeHtml($(this).parent().find(".code-modal").html());
                result = "<pre class='codes'><code id='code-for-copy'>" + result + "</code></pre>";

                $("#code-modal .modal-body").html(result);
                $("#code-modal").modal("show");
            });
        };

        // Handle code copy button
        this.handleCopyCodeButton = function() {
            $("#btn-copy").on("click", function() {
                var text = document.getElementById("code-for-copy");
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(text);
                selection.removeAllRanges();
                selection.addRange(range);

                document.execCommand('copy');
            });
        };

        // Define popover
        this.popover = function() {
            // Define general popover
            $("[data-toggle='popover'] .has-popover").popover({
                container: "body",
                html: true,
                trigger: "click",
                content: function() {
                    return $(this).find(".popover-content").html();
                }
            }).on("shown.bs.popover", function() {
                // Define elements
                var currentTrigger = $(this);
                var currentPopover = currentTrigger.data("bs.popover").tip();

                // Activate close button
                currentPopover.find(".close").click(function() {
                    currentTrigger.popover("hide");
                });
            });
        };


        // Define dropdownHover
        this.dropdownHover = function() {
            if ($(".dropdown-hover").length) {
                $(".dropdown-hover").dropdownHover();
            }
        };


        // Define toggleFullScreen
        this.toggleFullScreen = function() {
            if (typeof screenfull !== "undefined"){
                if (screenfull.isEnabled) {
                    $("#toggle-fullscreen").click(function(){      
                        $(this).find("i").toggleClass("icon-size-fullscreen icon-size-actual");
                        screenfull.toggle();
                    });
                }else{
                    $("#toggle-fullscreen").addClass("hide");
                }
            }
        };

        // Define boxFullScreen
        this.boxFullScreen = function() {
            if (typeof screenfull !== "undefined"){
                screenfull.on("change", (e) => {
                    var toggledBox = $(e.target);
                    toggledBox.toggleClass("full");
                    $(toggledBox).find(".buttons-box .btn-fullscreen i").toggleClass("icon-size-fullscreen icon-size-actual");
                });
                $(".btn-fullscreen").on("click", function(e) {
                    e.preventDefault();
                    var toggledPanel = $(this).parents(".box")[0];
                    screenfull.toggle(toggledPanel);
                });
           
            }
        };


        // Define boxCollapse
        this.boxCollapse = function() {
            var collapseButton = $(".btn-collapse");

            collapseButton.on("click", function(e) {
                e.preventDefault();
                bodyClasses = ".panel-body, .portlet-body";
                $(this).closest(".box").find(bodyClasses).slideToggle();
                $(this).find("i").toggleClass("icon-arrow-up icon-arrow-down");
            });
        };


        // Define boxHide
        this.boxHide = function() {
            $(".btn-close").on("click", function(e) {
                e.preventDefault();
                $(this).closest(".box").animate(
                        {"opacity": "0"},
                500,
                        function() {
                            $(this).closest(".box").hide("fast");
                        });
            });
        };


        // Define buttonsBoxCollapse
        this.buttonsBoxCollapse = function() {
            var collapseButton = $(".buttons-box .btn-toggle");

            collapseButton.on("click", function(e) {
                e.preventDefault();

                $(this).parent().toggleClass("in");
            });
        };


        // Handle settings box
        this.handleSettings = function() {
            // Toggle box button 
            $("#toggle-setting").on("click", function(e) {
                e.preventDefault();

                $(this).parent().toggleClass("active");
            });

            // Change Theme Color
            $(".theme-colors .btn").on("click", function(e) {
                e.preventDefault();

                var colorName = $(this).attr("data-color");

                // Remove current theme color class
                $("body").removeClass(function(index, css) {
                    return (css.match(/(^|\s)theme-\S+/g) || []).join(" ");
                });
                // Add new theme color class
                $("body").addClass("theme-" + colorName);
                $(".theme-colors .btn").removeClass("active");
                $(this).addClass("active");

                window.Modiran.updateSettingCodes();
            });

            // Update code guide box
            this.updateSettingCodes = function() {
                var currentColor = $(".theme-colors .btn.active").attr("data-color");
                var themeColor = "theme-" + currentColor;
                var headerStatus, sidebarStatus, creativeSidebarStatus = "";

                if (typeof Switchery != "undefined") {
                    if (fixHeaderSwitch.checked) {
                        headerStatus = " fix-header";
                    }

                    if (toggleSidebarSwitch.checked) {
                        sidebarStatus = " sidebar-collapse";
                    }

                    if (!creativeSidebarSwitch.checked) {
                        creativeSidebarStatus = " sidebar-extra";
                    }
                }

                var result = escapeHtml('<body class="' + themeColor + headerStatus + sidebarStatus + creativeSidebarStatus + '">');
                $(".theme-code code").html(result);


            }
            window.Modiran.updateSettingCodes();
        };


        // Handle ripple effect
        this.handleRipple = function() {
            var rippleTargets = document.querySelectorAll(".active-ripple .btn:not(.no-ripple), .active-ripple .metismenu a, .ripple-effect");

            [].forEach.call(rippleTargets, function(button) {
                var ripple = new PaperRipple();
                button.appendChild(ripple.$);
                button.addEventListener("mousedown", function(ev) {
                    ripple.downAction(ev);
                    ripple.upAction();
                });
            });
        };


        // Handle  switcheries
        this.handleSwitchery = function() {
            if (typeof Switchery != "undefined") {
                var size = "small",
                        color = "#999";
                new Switchery(fixHeaderSwitch,
                        {
                            size: size,
                            color: color
                        });
                fixHeaderSwitch.onchange = function() {
                    // Fix header setting
                    if (fixHeaderSwitch.checked) {
                        $("body").addClass("fix-header");
                        $("#main-navbar").addClass("navbar-fixed-top");
                    } else {
                        $("body").removeClass("fix-header");
                        $("#main-navbar").removeClass("navbar-fixed-top");
                    }

                    window.Modiran.updateSettingCodes();
                };

                new Switchery(toggleSidebarSwitch,
                        {
                            size: size,
                            color: color
                        });
                toggleSidebarSwitch.onchange = function() {
                    // Sidebar toggle setting
                    if (toggleSidebarSwitch.checked) {
                        window.Modiran.changeSidebarState("collapse");
                    } else {
                        window.Modiran.changeSidebarState("expand");
                    }
                };

                new Switchery(creativeSidebarSwitch,
                        {
                            size: size,
                            color: color
                        });
                creativeSidebarSwitch.onchange = function() {
                    // Sidebar creative switch
                    console.log(creativeSidebarSwitch.checked);
                    if (creativeSidebarSwitch.checked) {
                        if ($('body').hasClass("sidebar-extra")) {
                            $('body').removeClass("sidebar-extra");
                        }
                    } else {
                        if (!$('body').hasClass("sidebar-extra")) {
                            $('body').addClass("sidebar-extra");
                        }
                    }
                    window.Modiran.updateSettingCodes();
                };
            }
        };

        // Handle scrollbars
        this.handleScrollbars = function() {
            if (typeof mCustomScrollbar != "undefined") {
                $(".dropdown-menu.has-scrollbar").mCustomScrollbar({
                    setHeight: 300,
                    theme: "minimal-dark"
                });
                $(".has-scrollbar").mCustomScrollbar({
                    theme: "minimal-dark"
                });
            }
        };

        // Initilize sweet alert
        this.initiSwal = function() {
            if (typeof swal != "undefined") {
                swal.setDefaults({
                    confirmButtonText: 'تائید',
                    cancelButtonText: 'لغو'
                });
            }
        };

        // Initilize iCkeck
        this.initiCkeck = function() {
            $("input:not(.normal)").iCheck({
                checkboxClass: 'icheckbox_square-grey',
                radioClass: 'iradio_square-grey'
            });
        };

        // Handle numeric text inputs
        this.handleNumericInputs = function() {
            $(document).on("input", ".numeric", function() {
                this.value = this.value.replace(/[^0-9]/g, '');
            });
        };

        // reinitialize
        this.reinitialize = function() {
            //window.Modiran.initMetisMenu();
            //window.Modiran.checkOldIE();
            //window.Modiran.toggleSidebarTop();
            //window.Modiran.handleStatusButton();
            //window.Modiran.toggleSidebar();
            //window.Modiran.handleCodeButton();
            //window.Modiran.handleCopyCodeButton();
            window.Modiran.tooltip();
            window.Modiran.popover();
            //window.Modiran.dropdownHover();
            //window.Modiran.toggleFullScreen();
            window.Modiran.boxFullScreen();
            window.Modiran.boxCollapse();
            window.Modiran.boxHide();
            //window.Modiran.buttonsBoxCollapse();
            //window.Modiran.handleSettings();
            //window.Modiran.handleRipple();
            //window.Modiran.handleSwitchery();
            //window.Modiran.handleScrollbars();
            //window.Modiran.initiSwal();
            window.Modiran.initiCkeck();
            //window.Modiran.handleNumericInputs();
        };
    }

    // Creates a Modiran object.
    window.Modiran = new Modiran();
})(window);


function escapeHtml(text) {
    if (text == null)
        return;

    var html = text
            .replace(/<!--/g, "")
            .replace(/-->/g, "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/^\s*/g, "")
            .replace(/\s*$/g, "");

    return html;

}
(function($) {
    $(document).ready(function() {
        Modiran.initMetisMenu();
        Modiran.checkOldIE();
        Modiran.toggleSidebarTop();
        Modiran.handleStatusButton();
        Modiran.toggleSidebar();
        Modiran.handleCodeButton();
        Modiran.handleCopyCodeButton();
        Modiran.tooltip();
        Modiran.popover();
        Modiran.dropdownHover();
        Modiran.toggleFullScreen();
        Modiran.boxFullScreen();
        Modiran.boxCollapse();
        Modiran.boxHide();
        Modiran.buttonsBoxCollapse();
        Modiran.handleSettings();
        Modiran.handleRipple();
        Modiran.handleSwitchery();
        Modiran.handleScrollbars();
        Modiran.initiSwal();
        Modiran.initiCkeck();
        Modiran.handleNumericInputs();
    });

    $(window).load(function() {
        // Animate loader off screen
        $("#loader").animate({
            "opacity": "0"
        },
        10,
                function() {
                    $("#loader").css("display", "none");
                });
    });
})(jQuery);


//noty
function generateType(type, text, layout) {
    var notyObj = noty({
        text: text,
        type: type,
        dismissQueue: true,
        timeout: 5000,
        layout: layout,
        closeWith: ["click"],
        maxVisible: 10,
        theme: "flat"
    });
    return notyObj;
}


function insert(url, form, url2, destination, msg, reset, disableAnimation, alertType, method)
{
    if (disableAnimation != true) {
        var position_result = $(msg).offset().top - 30;
        $('html, body').animate({scrollTop: position_result}, 'slow');
    }
    
    if(method !== 'GET'){
        method = 'POST';
    }

    var frm = form.replace(/\#/g, "");
    var formData = (frm) ? new FormData(document.getElementById(frm)) : null;
    
    $.ajax({
        type: method,
        url: url,
        async: false,
        data: formData, // serializes the form's elements.
        success: function(data)
        {
            var result = JSON.parse(data);
            
            if (typeof result.csrf !== 'undefined') {
                $("input[name='"+csrfTokenName+"']").val(result.csrf);
            }
            
            if (alertType == 'noty') {
                if (result.condition == true) {
                    generateType('success', result.msg, 'bottomLeft');
                } else {
                    generateType('error', result.msg, 'bottomLeft');
                }
            } else if (alertType == 'sweetalert') {
                if (result.condition == true) {
                    if (typeof result.url == 'undefined') {
                        //swal('موفق', result.msg, 'success');
                        generateType('success', result.msg, 'bottomLeft');
                    }
                } else {
                    swal('ناموفق', result.msg, 'error');
                }
            } else {
                $(msg).html(result.msg);
            }
            if (result.condition == true) {
                change(url2, destination, false);
                setTimeout(function() {
                    $(msg).find('*').slideUp(1000,
                            function() {
                                $(msg).html('');
                            });
                }, 3000);
            } else {
                return false;
            }
            if (reset == true) {
                var frm = form.replace(/\#/g, "");
                document.getElementById(frm).reset();
            }

            if (typeof result.url !== 'undefined') {
                window.location.assign(result.url);
            }

            if (typeof result.script !== 'undefined') {
                eval(result.script);
            }
            
        },
        cache: false,
        contentType: false,
        processData: false
    });

}

function deleteRow(url, form, url2, destination, confirmFor, method)
{
    if (confirmFor != 'undefined') {
        var confirmButtonText = 'حذف';
        confirmMessage = "آیا اطمینان دارید آیتم یا آیتم های مورد نظر حذف شوند؟";

        swal({
            title: "این عملیات برگشت پذیر نیست!",
            text: confirmMessage,
            type: "error",
            showCancelButton: true,
            confirmButtonColor: "#f44336",
            confirmButtonText: confirmButtonText,
            cancelButtonText: "انصراف",
            cancelButtonColor: '#55b559',
            closeOnConfirm: false,
            closeOnCancel: true //false
        }).then(function() {
            if(method && method.toLowerCase() !== 'post'){
                method = 'GET';
            }


            var frm = form.replace(/\#/g, "");
            var formData = (frm) ? new FormData(document.getElementById(frm)) : null;


            $.ajax({
                type: method,
                url: url,
                async: false,
                data: formData, // serializes the form's elements.
                success: function(data)
                {
                    var result = JSON.parse(data);

                    if (typeof result.csrf !== 'undefined') {
                        $("input[name='"+csrfTokenName+"']").val(result.csrf);
                    }

                    if (result.condition == true) {
                        change(url2, destination, false);
                        generateType('success', result.msg, 'bottomLeft');
                    } else {
                        generateType('error', result.msg, 'bottomLeft');
                    }

                },
                cache: false,
                contentType: false,
                processData: false
            });
        }, function(dismiss) {

        });
    }
}

function change(url, destination, msgEmpty) {
    if (typeof (destination) === 'undefined')
        destination = '#res';
    if (typeof (msgEmpty) === 'undefined')
        msgEmpty = true;
    if (msgEmpty == true) {
        $("#msg").html('');
    }
    $(destination).html('<img src="' + baseUrl + 'assets/admin/images/loading.gif" />');
    $(destination).load(url, function() {
        Modiran.reinitialize()
    });

}

//remove image
$(document).on("click", ".remove-image", function() {
    var url = $(this).attr("data-url");
    var type = $(this).attr("data-type");
    if(type == 'video'){
        var title = 'ویدئو';
    }else if(type == 'pdf'){
        var title = 'pdf';
    }else if(type == 'file'){
        var title = 'فایل';
    }else{
        var title = 'تصویر';
    }
    var target = $(this).closest(".box-image");
    swal({
        title: "این عملیات برگشت پذیر نیست!",
        text: "در صورت تائید، "+title+" حذف می شود و پس از آن امکان دسترسی وجود نخواهد داشت.",
        type: "error",
        showCancelButton: true,
        confirmButtonColor: "#f44336",
        confirmButtonText: "حذف " + title,
        cancelButtonText: "انصراف",
        cancelButtonColor: '#55b559',
        closeOnConfirm: false,
        closeOnCancel: true //false
    }).then(function() {
        //confirm
        $.ajax({
            type: "GET",
            url: url,
            async: false,
            success: function(data)
            {
                var result = JSON.parse(data);
                if (result.condition == true) {
                    target.find(".box-old-image").addClass('hide');//hide
                    target.find(".box-new-image").removeClass('hide'); //show
                } else {
                    return false;
                }
            }
        });
    }, function(dismiss) {
        //cancel
    });
});

function numberFormat(num){
    var n = num.toString(), p = n.indexOf('.');
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
        return p<0 || i<p ? ($0+',') : $0;
    });
}

$(document).on("keyup", "input.numeric.separate , input.numeric-float.separate", function(){
    $(this).val(numberFormat($(this).val()));
});

$(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/[^0-9]/g, '');

    if ($(this).data("max")) {
        var max = parseInt($(this).data("max"));
        var entered = parseInt(this.value);

        if (entered > max)
            this.value = max;
    }

    if ($(this).data("min")) {
        var min = parseInt($(this).data("min"));
        var entered = parseInt(this.value);

        if (entered < min){
            $(this).addClass('red-border');
        }else{
            $(this).removeClass('red-border');
        }
    }
});
$(document).on("input", ".numeric-float", function() {
    this.value = this.value.replace(/[^0-9\.]/g, '');

    if ($(this).data("max")) {
        var max = parseFloat($(this).data("max"));
        var entered = parseFloat(this.value);

        if (entered > max)
            this.value = max;
    }

    if ($(this).data("min")) {
        var min = parseFloat($(this).data("min"));
        var entered = parseFloat(this.value);

        if (entered < min)
            this.value = min;
    }
});

$(document).on("input", ".has-counter", function(){
    var counter = $(this).val().length;
    $(this).siblings(".counter").text(counter);
});
$(document).on("input", ".has-word-counter", function(){
    var counter = 0;
    if($(this).val().trim()){
        counter = $(this).val().split(',').length;
    }
    $(this).parent().find(".counter").text(counter);
});

// Check all
function chackAllStatus(tableTarget){
    if(tableTarget.find("tbody input[type='checkbox']").length != 0 && tableTarget.find("tbody input[type='checkbox']:checked").length == tableTarget.find("tbody input[type='checkbox']").length){
        $(tableTarget).find(".check-all").prop('checked', true).iCheck('update');
    }else{
        $(tableTarget).find(".check-all").prop('checked', false).iCheck('update');
    }
}

$(document).on("ifChanged", ".check-all", function (event) {
    isChecked = event.target.checked;
    target = $(this).closest("table").find("tbody");
    if(isChecked){
        $(target).find("input[type='checkbox']").each(function(key, item){$(item).iCheck('check');});
    }else{
        $(target).find("input[type='checkbox']").each(function(key, item){$(item).iCheck('uncheck');});
    }
});