"use strict";

/*****************************************************/
/*                  Accordion                        */
/*****************************************************/
var BEAccordion = {
	"Init": function Init() {}
};

/*****************************************************/
/*                  Accordion                        */
/*****************************************************/
var FEAccordion = {
	"Init": function Init() {
		this.SetAccordion();
	},
	"SetAccordion": function SetAccordion() {
		var $accordionComponent = $("div.js-accordion");

		// creates a new instance for each accordion component on the page
		$accordionComponent.each(function () {
			var $this = $(this),
			    $headings = $this.find("h2.js-accordion-heading"),
			    $panels = $this.find("div.js-accordion-panel");

			$headings.on("click", function () {
				FEAccordion.SetPanelState($headings, $panels, $(this));
			});
		});
	},
	"SetPanelState": function SetPanelState($headings, $panels, $activeHeading) {
		var $activePanel = $("#" + $activeHeading.attr("aria-controls"));

		if ($activeHeading.hasClass("is-active")) {
			// remove active state from heading
			$activeHeading.removeClass("is-active").attr("aria-selected", "false").attr("aria-expanded", "false");
			// add hidden state from panel
			$activePanel.addClass("is-hidden").attr("aria-hidden", "true");
		} else {
			// add active state to heading
			$activeHeading.addClass("is-active").attr("aria-selected", "true").attr("aria-expanded", "true");
			// remove hidden state to panel
			$activePanel.removeClass("is-hidden").attr("aria-hidden", "false");
		}
	}
};