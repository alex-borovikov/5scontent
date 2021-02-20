const divWave = () => {
    const parentElement = document.querySelector('.bounce-move');

    const divBounce = () => {
        let element = document.querySelector('.span-bounce');
        const elementText = document.querySelector('.span-bounce').innerHTML;

        for (let i = 0; i < elementText.length; i++) {
            let container = document.querySelector('.bounce-move');
            let div = document.createElement('div');
            container.append(div)
            div.classList.add(`move-elem_${i}`, 'div-bounce-item');
            div.append(elementText[i]);
        }
        element.remove()

        const divList = document.querySelectorAll('.div-bounce-item');
        divList.forEach(item => {
            if (item.innerHTML === ' ') {
                item.style.cssText = `
                    margin-right: 5px;
                `
            }
        })
    }
    divBounce();

    const moveLetters = () => {
        const divList = document.querySelectorAll('.div-bounce-item');
        divList.forEach((item, index) => {
            async function startAnimationText() {
                 await new Promise(resolve => {
                    setTimeout(() => {
                        item.style.transform = `translateY(-100%)`
                        resolve();
                    }, index * 35);
                })
                setTimeout(() => {
                    item.style.transform = `translateY(0%)`
                }, 100);
            }
            startAnimationText();
        })
    }
    parentElement.addEventListener('mouseenter', moveLetters);
}

divWave();


