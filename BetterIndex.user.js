// ==UserScript==
// @name        BetterIndex
// @namespace   https://pablobls.tech/
// @match       *://m.rivalregions.com/
// @grant       none
// @version     1.0
// @author      Pablo
// @description Adds link to index page and improves it by filtering useless info, also highlights your regions
// ==/UserScript==

// Modify this array with your regions ID
const myRegions = [
	"15202", // Argel
	"4525", // Swansea
	"4506", // North West England
	"15201", // Argelia
	"802", // Georgia
	"810", // Tbilisi
	"808", // Adjara
	"2003", // Haifa
	"13602", // Lagos
	"4305", // Andalucia
	"4518", // Gibraltar
    "200030", // MR 30
	"200059", // MR 59
	"200002", // MR 02
];

$(document).ready(function () {
	console.log(c());
	window.addEventListener("popstate", listener);

	const pushUrl = (href) => {
		history.pushState({}, "", href);
		window.dispatchEvent(new Event("popstate"));
	};

	listener();
});

function listener() {
	if (location.href.includes("#listed/country/-2/")) {
		filterRegions();
	} else if (location.href.includes("#map/details/")) {
		addClickEvents();
	}
}

function filterRegions() {
    
	var tableInterval = setInterval(function () {
		if ($("#table_list").length) {
            clearInterval(tableInterval);
            $('#table_list').css('border-collapse', 'collapse');
			var indiex = 1;
			$(
				$("tr.list_link.header_buttons_hover>.list_level.tip.yellow")
					.get()
					.reverse()
			).each(function () {
				if ($(this).text() > indiex || $(this).text() == '11') {
                    indiex += 1;
                    $(this).parent().append('<td>'+  Math.floor($(this).attr("rat")) +'</td>');
				} else if (myRegions.includes($(this).parent().attr("user"))) {
                    $(this).parent().css("background-color", "green");
                    $(this).parent().append('<td>'+  Math.floor($(this).attr("rat")) +'</td>');
				} else {
					$(this).parent().remove();
				}
			});
		}
	}, 500);
}

function addClickEvents() {
	var indexInterval = setInterval(function () {
		if (
			$(
				"div.mob_box_swipe_i_1.no_outline.slick-slide.slick-current.slick-active"
			).length
		) {
			clearInterval(indexInterval);
			$(
				".mob_box_swipe_i_1.no_outline.slick-slide.slick-current.slick-active>.mob_box_inner.mob_box_4_clean.float_left.imp.tc"
			).click(function () {
				slide_header($(this).attr("action"));
			});
		}
	}, 500);
}
