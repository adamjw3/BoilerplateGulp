"use strict";

/*****************************************************/
/*                  Filter Bar                       */
/*****************************************************/
var BEFilterBar = {
    "Init": function Init() {}
};

/*****************************************************/
/*                  Filter Bar                       */
/*****************************************************/
var FEFilterBar = {
    "Init": function Init() {
        this.ToggleFilters();
    },
    "ToggleFilters": function ToggleFilters() {
        var $filterToggleBtn = $("#js-filter-bar-toggle-btn");

        $filterToggleBtn.on("click", function () {
            var target = $(this).attr("aria-controls"),
                $target = $("#" + target);

            $target.toggleClass("is-active");
        });
    }
};