document.addEventListener('scroll', (e) => {
    function infoBlockRotateScroll(){
        if(pageYOffset > 400) {
            document.querySelector('.header-stroke').style.bottom = `0`
        }else{
            document.querySelector('.header-stroke').style.bottom = `100%`
        }

        const lmVideo = document.querySelector('.lm-video');
        const infoBlock = document.querySelector('.learn-more');

        let infoBlockDistance = infoBlock.getBoundingClientRect().top;
        let screenHeight = window.innerHeight || document.documentElement.clientHeight;
        let screenWidth = window.innerWidth || document.documentElement.clientWidth;
        let denominator = 1.1;
        let calcResDist = screenHeight / denominator;

        if(infoBlockDistance <= calcResDist){
            lmVideo.classList.add('m-video-trans-off')
        }
    }
    infoBlockRotateScroll();



    function parallaxVideo(){
        const block1 = document.querySelector('.block__mod-1');
        const block4 = document.querySelector('.block__mod-4');
        const block5 = document.querySelector('.block__mod-5');

        const screenHeight = window.innerHeight || document.documentElement.clientHeight;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth;

        let top = block1.getBoundingClientRect().top;
        let top2 = block4.getBoundingClientRect().top;
        let top3 = block5.getBoundingClientRect().top;

        function parallaxDown(element){
            const elem = document.querySelector(element).getBoundingClientRect().top;
            const speed = document.querySelector(element).getAttribute('data-speed');
            const screenHeight = document.documentElement.clientHeight;

            let d = (pageYOffset + elem) - screenHeight;
            let scroll = window.pageYOffset;
            let res = (scroll - d) / speed;

            document.querySelector(element).style.cssText = `transform: translate3d(0px, ${res}px, 0px);`
        }

        function parallaxTop(element){
            const speed = document.querySelector(element).getAttribute('data-speed');
            const a = window.pageYOffset,
                b = document.querySelector(element).getBoundingClientRect().top,
                c = a + b,
                d = c - 100,
                e = ((d - a) / 2) / speed;

            document.querySelector(element).style.cssText = `transform: translate3d(0px, ${e}px, 0px);`
        }
        function noTransform(element){
            document.querySelector(element).classList.add('m-video-trans-off')
        }


        if(top <= screenHeight && top >= 0 && screenWidth >= 1000){
            noTransform('.g-project-elem-1')
            noTransform('.g-project-elem-2')
            parallaxDown('.block__mod-1');
            parallaxTop('.block__mod-2');
        }
        if(top2 <= screenHeight && top2 >= 0 && screenWidth >= 1000){
            parallaxTop('.block__mod-3');
            parallaxDown('.block__mod-4');
        }
        if(top3 <= screenHeight / 1.5){
            noTransform('.g-project-elem-3')
        }
    }
    parallaxVideo();

})

