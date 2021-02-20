function openCloseModal() {
    const parent = document.querySelector('.main-modal');
    const clickElem = document.querySelectorAll('.st0');
    const body = document.querySelector('.body');


    for (let i = 0; i < clickElem.length; i++) {
        clickElem[i].onclick = function () {
            parent.classList.toggle('md-open')
            body.classList.toggle('_lock')
        }
    }


}

openCloseModal();



