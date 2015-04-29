$(document).ready(function () {
    // back to top button init

    function initBackToTop() {
        var oldButton = $('a.totop').last(),
            button = oldButton.clone(),

            animSpeed = 500,
            win = $(window),
            footer = oldButton.parents('footer'),
            winHeight,
            footerOffset,
            shownClass = 'shown',
            fixedClass = 'fixed-state';

        button
            .insertAfter(oldButton)
            .css({opacity: 0});

        $(window).on('resize prepare', function() {
            button.css({ left: oldButton.offset().left + 'px' });
        }).trigger('prepare');

        button.click(function(e) {
            e.preventDefault();
            SmoothScroll.scrollToOffsset(0);
        });

        resizeHandler();
        setTimeout(resizeHandler, 1000);
        win
            .on('scroll', scrollHandler)
            .on('resize orientationchange', resizeHandler);

        function scrollHandler() {
            var winTop = win.scrollTop();
            if (winTop > winHeight/4) {
                if (!button.hasClass(shownClass)) {
                    showButton(button);
                }
            } else {
                if (button.hasClass(shownClass)) {
                    hideButton(button);
                }
            }
            if (winTop + winHeight > footerOffset) {
                button
                    .removeClass(fixedClass)
                    .addClass('hidden');

            } else {
                button
                    .addClass(fixedClass)
                    .removeClass('hidden');
            }
        }
        function resizeHandler() {
            winHeight = getWindowHeight();
            footerOffset = footer.offset().top;
            scrollHandler();
        }
        function showButton(button) {
            button.addClass(shownClass).stop().css({visibility: 'visible', opacity: 0}).animate({opacity: 1}, animSpeed);
        }
        function hideButton(button) {
            button.removeClass(shownClass).stop().animate({opacity: 0}, animSpeed,function() {
                button.css({visibility: 'hidden'});
            });
        }
        function getWindowHeight() {
            return typeof window.innerHeight === 'number' ? window.innerHeight : document.documentElement.clientHeight;
        }
    }

    // smooth scroll
    var SmoothScroll = {
        options: {
            animSpeed: 750
        },
        init: function() {
            this.isWP = /MSIE 10.*Touch/.test(navigator.userAgent) || /Windows Phone OS 7.5/.test(navigator.userAgent) || /Windows Phone OS 7.8/.test(navigator.userAgent);
            this.scrollHolder = /WebKit/.test(navigator.userAgent) ? $('body') : $('html');
            this.win = $(window);
        },
        scrollToOffsset: function(offset, animSpeed) {
            if (this.isWP) {
                this.win.scrollTop(offset);
            } else {
                this.scrollHolder.stop().animate({scrollTop: offset}, animSpeed || this.options.animSpeed);
            }
        }
    };

    SmoothScroll.init();
    initBackToTop();
});