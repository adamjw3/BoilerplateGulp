"use strict";

/*****************************************************/
/*                    Global                         */
/*****************************************************/
var BEGlobal = {
	"Init": function Init() {}
};
/*****************************************************/
/*                    Global                         */
/*****************************************************/
var FEGlobal = {
	"Init": function Init() {
		this.BurgerNav();
		this.FormValidation();
		this.FormFileUpload();
		this.SelectionSharer();
		this.ResponsiveVideos();
		this.CheckSetCookie();
	},
	"BurgerNav": function BurgerNav() {
		// On click of the burger icon show both the top & main navigation
		// Also show the body menu overlay & change the burger icon to be a close icon
		$("#js-navbar-menu-toggle").on("click", function (e) {
			e.preventDefault();

			var $this = $(this),
			    $navLinks = $("#js-navbar-links");

			if ($navLinks.hasClass("is-active")) {
				$this.removeClass("is-active");
				$navLinks.removeClass("is-active");
			} else {
				$this.addClass("is-active");
				$navLinks.addClass("is-active");
			}
		});
	},
	"FormValidation": function FormValidation() {
		// Validate any forms
		$("form").validateWebForm({
			errorPlacement: function errorPlacement(error, element) {}
		});
	},
	"FormFileUpload": function FormFileUpload() {
		$("input:file").on("change", function () {
			// Get the html input file element
			var $input = $(this),

			// Get the fake button
			$button = $input.prev(".js-file-upload"),

			// Get the file name and type, removing rest of path
			filename = $input.val().replace(/\\/g, '/').replace(/.*\//, '');

			// Update the fake button with the name of file e.g file.pdf or the default text
			if (filename.length > 0) {
				$button.text(filename);
			} else {
				$button.text($button.data("default"));
			}
		});
	},
	"SelectionSharer": function SelectionSharer() {
		// Popover menu to share on Twitter or by email any text selected on the page (non touch only)
		$("article").selectionSharer();
	},
	"ResponsiveVideos": function ResponsiveVideos() {
		// Targets youtube and vimeo videos inside .cms-content areas and makes them responsive
		$(".cms-content iframe[src*='youtube'], .cms-content iframe[src*='vimeo']").parent().fitVids();
	},
	"CheckSetCookie": function CheckSetCookie() {
		var cookieName = "BoilerplateCookiePolicy"; // The cookie name will need changing

		// Show Cookie bar if cookie has not been already set
		if (document.cookie.indexOf(cookieName) < 0) {
			var expires = new Date();
			expires.setFullYear(expires.getFullYear() + 1); // 1 year

			// Date()'s toGMTSting() method will format the date correctly for a cookie
			document.cookie = cookieName + "=true; expires=" + expires.toGMTString();
			this.CookieShowHide();
		}
	},
	"CookieShowHide": function CookieShowHide() {
		// If user interacts by hovering over it we keep it on screen.
		var $cookieAlert = $("#js-cookiebar");

		setTimeout(function () {
			$cookieAlert.mouseenter(function () {
				clearTimeout($cookieAlert.data("timeoutId"));
			}).mouseleave(function () {
				FEGlobal.CookieTimeOut();
			});
			$cookieAlert.removeClass("c-cookiebar--hidden");
			FEGlobal.CookieTimeOut();
		}, 2000);
	},
	"CookieTimeOut": function CookieTimeOut() {
		var $cookieAlert = $("#js-cookiebar");

		FEGlobal.timeOutId = setTimeout(function () {
			$cookieAlert.addClass("c-cookiebar--hidden");
		}, 5000);

		$cookieAlert.data("timeoutId", FEGlobal.timeOutId);
	}
};