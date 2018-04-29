
export const autoresize = function (element) {
    var observe = window.attachEvent ? function (element, event, handler) {
        element.attachEvent('on' + event, handler);
    } : function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };

    return {
        init() {
            var text = document.getElementById(element);
            function resize() {
                text.style.height = 'auto';
                text.style.height = text.scrollHeight + 'px';
            }
            /* 0-timeout to get the already changed text */
            function delayedResize() {
                window.setTimeout(resize, 0);
            }
            observe(text, 'change', resize);
            observe(text, 'cut', delayedResize);
            observe(text, 'paste', delayedResize);
            observe(text, 'drop', delayedResize);
            observe(text, 'keydown', delayedResize);

            text.focus();
            text.select();
            resize();
        }
    }
}