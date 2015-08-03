/*jshint browser: true */
/*global $ */

$(function () {
    "use strict";

    /** Mind the different classes!
     *
     * .equal-heights is the wrapper
     * .equal-height is the element INSIDE the wrapper
     */
    var heightEqualizer = function () {
        // find all wrappers
        $(".equal-heights").each(function () {
            var $wrapper = $(this);

            // we're only interested in equalizing heights of elements
            // that are on the same top offset level
            var offsetGroups = {};

            // each wrapper has some items, group them by offset
            // (mind the reset of the height value here, this is important
            // so that elements may grow to different sizes if they need)
            $wrapper.find(".equal-height").height('').each(function () {
                var $victim = $(this);

                var offset = $victim.offset().top.toString();
                if (!offsetGroups.hasOwnProperty(offset)) {
                    offsetGroups[offset] = [];
                }

                offsetGroups[offset].push($victim);
            });

            $.each(offsetGroups, function (offset, victims) {
                var maxHeight = 0;

                // height detection
                $.each(victims, function (index, $victim) {
                    maxHeight = Math.max(maxHeight, $victim.height());
                });

                // set equal heights
                $.each(victims, function (index, $victim) {
                    $victim.height(maxHeight);
                });
            });
        });
    };

    $(window).on("resize", heightEqualizer);
    heightEqualizer();
});
