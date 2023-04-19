"use strict";

/*****************************************************/
/*                 SocialShare                       */
/*****************************************************/
var BESocialShare = {
    "Init": function Init() {}
};
/*****************************************************/
/*                 SocialShare                       */
/*****************************************************/
var FESocialShare = {
    "Init": function Init() {
        this.SocialSharePopup();
    },
    "SocialSharePopup": function SocialSharePopup() {
        var $socialShareButton = $("a.js-socialshare"),
            currentUrl = window.location.href;

        $socialShareButton.on("click", function (event) {
            var shareUrl = $(this).attr("href");

            event.preventDefault();
            event.stopPropagation();

            window.open(shareUrl + currentUrl + "", "sharer", "toolbar=0,status=0,width=548,height=325,resizable=1");
        });
    }
};