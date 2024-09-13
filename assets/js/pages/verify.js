$(document).ready(function () {
    function ticker(){
        var remainSeconds = 120;
        intervalId = setInterval((function () {
            if(remainSeconds<=0){
                $("#btn-resend-sms").removeClass("hide");
                $("#ticker-box").addClass("hide");
                clearInterval(intervalId);
            }else{
                var minutes = Math.floor(remainSeconds/60);
                var seconds = remainSeconds % 60;

                if(minutes<10){
                    minutes = "0" + minutes;
                }
                if(seconds<10){
                    seconds = "0" + seconds;
                }

                $("#minutes").text(minutes);
                $("#seconds").text(seconds);

                remainSeconds--;
            }
        }), 1000);
    }
    ticker();

    $("#btn-resend-sms").click(function(){
        $.ajax({
            type: 'GET',
            url: baseUrl + 'users/getNewCodeForVeify',
            beforeSend: function() {
                $("#status-new-code" ).html('<i class="fa fa-spinner fa-spin"></i>');
            },
            success: function(data) {
                var result = JSON.parse(data);
                if(result.condition){
                    $("#status-new-code" ).html('<span>' + result.msg + '</span')
                    $("#btn-resend-sms").addClass("hide");
                    $("#ticker-box").removeClass("hide");
                    ticker();
                }else{
                    $("#status-new-code" ).html('<span class="text-danger">' + result.msg + '</span')
                }

            }
        });
    });

    $("#btn-submit").click(function(){
        $(this).attr("disabled", true);
        $("#form-data").submit();
    });

});
