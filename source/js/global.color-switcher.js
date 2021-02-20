function globalColorSwitcher(){
    let body = document.querySelector('.body');
    let counter = 0;
    body.addEventListener('click', (e) => {
        let wrapper = document.querySelector('.page-main')
        let target = e.target;

        if(target.classList.contains('sw-ignore')) return

        body.classList.remove(`theme-${counter}`)
        counter++;
        if(counter > 4) counter = 0;
        body.classList.add(`theme-${counter}`);
    });
}
globalColorSwitcher();



