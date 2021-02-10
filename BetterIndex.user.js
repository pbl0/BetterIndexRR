// ==UserScript==
// @name        BetterIndex
// @namespace   https://pablobls.tech/
// @match       *://*rivalregions.com/
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0.1
// @author      Pablo
// @description 9/28/2020, 9:47:49 PM
// @require https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// ==/UserScript==

var myRegions = GM_getValue("myregions");

if (!myRegions) {
  GM_setValue("myregions", []);
  myRegions = [];
}

$(document).ready(function () {
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
    if (location.href.includes("//m.")) {
      addClickEvents();
    }
  }
}

function filterRegions() {
  var tableInterval = setInterval(function () {
    if ($("#table_list").length) {
      clearInterval(tableInterval);
      $("#table_list").css("border-collapse", "collapse");
      var indiex = 1;
      $(
        $("tr.list_link.header_buttons_hover>.list_level.tip.yellow")
          .get()
          .reverse()
      ).each(function () {
        if ($(this).text() > indiex || $(this).text() == "11") {
          indiex += 1;
          $(this)
            .parent()
            .append("<td>" + Math.floor($(this).attr("rat")) + "</td>");
        } else if (myRegions.includes($(this).parent().attr("user"))) {
          $(this).parent().css("background-color", "green");
          $(this)
            .parent()
            .append("<td>" + Math.floor($(this).attr("rat")) + "</td>");
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
