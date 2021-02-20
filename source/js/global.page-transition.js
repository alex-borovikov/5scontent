function pageTransitions(event){
    event.preventDefault();
    const transitionElements = document.querySelectorAll('.page-retransnform');
    const allMainHeaders = document.querySelectorAll('.seven-item');
    const playbtnOpacity = document.querySelectorAll('.m-btn-link')
    const infoOpacity = document.querySelectorAll('.lm-info');
    const projectsVideo = document.querySelectorAll('.project_page-tr');
    const projectsBlock = document.querySelectorAll('.g-project-block');
    const projectHeader = document.querySelectorAll('.prj-header h2')
    const footer = document.querySelectorAll('.footer');
    let target = event.target;

    if(!target.classList.contains('page-tra')) return

    function reTransform(item,addClass,ms){
        item.forEach(i => {
            i.classList.add(addClass)
        })
        setTimeout(() => {
            let removeElems = document.querySelectorAll(`.${addClass}`);
            removeElems.forEach( item => {
                item.classList.remove(addClass)
            })
        }, ms);

    }

    reTransform(transitionElements, 'video-change-page', 10000 )
    reTransform(allMainHeaders, 'headers-change-page', 10000 )
    reTransform(projectsVideo, 'video-change-page', 10000 )

    reTransform(playbtnOpacity, 'op-none', 10000 )
    reTransform(infoOpacity, 'op-none', 10000 )
    reTransform(projectsBlock, 'op-none', 10000 )
    reTransform(projectHeader, 'op-none', 10000 )
    reTransform(footer, 'op-none', 10000 )

}
document.addEventListener('click', pageTransitions)

document.addEventListener('click', (event) => {
    let target = event.target;
    console.log(target.className)
})