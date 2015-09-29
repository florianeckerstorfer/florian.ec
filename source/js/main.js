(function () {
    function forceTouchLogo() {
        var img   = document.querySelector('.header__logo img');
        var touch = null;

        addForceTouchToElement(img);

        function onTouchStart(e) {
            e.preventDefault();
            checkForce(e);
        }

        function onTouchMove(e) {
            e.preventDefault();
            checkForce(e);
        }

        function onTouchEnd(e) {
            e.preventDefault();
            touch = null;
        }

        function checkForce(e) {
            touch = e.touches[0];
            setTimeout(refreshForceValue.bind(touch), 10);
        }

        function refreshForceValue() {
            var touchEvent = this;
            var forceValue = 0;
            if(touchEvent) {
                forceValue = touchEvent.force || 0;
                setTimeout(refreshForceValue.bind(touch), 10);
            } else {
                forceValue = 0;
            }

            renderElement(forceValue);
        }

        function renderElement(forceValue) {
            document.body.style.background = 'rgba(255, 129, 255, '+forceValue+')';
            img.style.webkitFilter = 'blur(' + forceValue * 30 + 'px)';
        }

        function addForceTouchToElement(elem) {
            elem.addEventListener('touchstart', onTouchStart, false);
            elem.addEventListener('touchmove', onTouchMove, false);
            elem.addEventListener('touchend', onTouchEnd, false);
        }
    }
    forceTouchLogo();
})();
