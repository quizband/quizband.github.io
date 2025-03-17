let preloader = document.querySelector('.preloader-cont')

document.body.onload = function () {
    setTimeout(function (){
        preloader.classList.add('loaded')
    }, 1500)
}