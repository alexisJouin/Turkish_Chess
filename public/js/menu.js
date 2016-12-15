$( document ).ready(function() {


    $(document).on("click","#personnalStaticsSwitcher:not(.selected)",function () {
        $(this).addClass("selected");
        $("#rankSwitcher").removeClass("selected");
        $("#rank").addClass("hidden");
        $("#personnalStatics").removeClass("hidden");
    });

    $(document).on("click","#rankSwitcher:not(.selected)",function () {
        $(this).addClass("selected");
        $("#personnalStaticsSwitcher").removeClass("selected");
        $("#rank").removeClass("hidden");
        $("#personnalStatics").addClass("hidden");
    });

});


