window.addEventListener('load', () => {
    function preloader(){
        const preload = document.querySelector('.preloader');
        body.classList.add('_lock')
        setTimeout(() => {
            preload.style.cssText = `
                display: none;
            `
            body.classList.remove('_lock')
        }, 1500);
    }
    preloader();

    function checkWindowWidth(val){
        const userWindow = window.clientWidth || document.documentElement.clientWidth;
        const elem = document.querySelector('.main-modal ');
        if(userWindow < 1000){
            elem.classList.remove('transform-top-center');
            elem.classList.add('_mobile-main_modal')
        }
    }
    checkWindowWidth();

    function sevenBlockAnimation(){
        const first = document.querySelectorAll('.seven-item');
        const wrapper = document.querySelectorAll('.seven-wrap');
        const video_svg = document.querySelector('.m-link-svg svg path');
        const mainVideo = document.querySelector('.main-video');
        const header = document.querySelector('.header');
        const logo = document.querySelector('.header-logo-svg');

        first.forEach(i => i.classList.add('trans-off'))

        function delay(value, ms) {
            return new Promise(resolve => resolve(
                setTimeout(() => {
                    wrapper.forEach(item => {
                        item.style.cssText = `
                        transform: translateY(${value}px);
                    `
                    })
                }, ms))
            )
        }

        delay(80, 2900)
        delay(40, 4000)
        delay(0, 5000)

        // delay(80, 1000)
        // delay(40, 1900)
        // delay(0, 2900)

        setTimeout(() => {
            video_svg.style.cssText = `
            stroke-dashoffset: 0px;
            `
            mainVideo.classList.add('m-video-trans-off')

            header.classList.add('h-def')
            logo.style.cssText = `bottom: 15px;`
        }, 5100); // 3000
    }
    sevenBlockAnimation();



});
