function mouseMove(e){
    const pulse = document.querySelector('.c-pulse');
    const child_first = document.querySelector('.pulse-f');
    const child_sec = document.querySelector('.pulse-s');
    let posX = e.pageX;
    let posY = e.pageY;
    pulse.style.cssText = `
        left: ${posX}px;
        top: ${posY}px;
    `

    child_first.classList.add('is-pulsed');
    child_sec.classList.add('is-pulsed-2')
    setTimeout(() => {
        child_first.classList.remove('is-pulsed');
        }, 400);
    setTimeout(() => {
        child_sec.classList.remove('is-pulsed-2');
    }, 500);

}

document.addEventListener('click', mouseMove);


