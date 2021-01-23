$(document).ready(function () {
	$('.menu__burger').click(function (event) {
		$('.header__menu, .burger__line').toggleClass('active');
		// $('body').toggleClass('lock');
	});
});;

let nav = $('.header__body');  // сексия, родитель
scrollPrev = 0;
let navFunc = $('.menu__list')  //   список с меню

$(window).scroll(function () {

	let scrolled = $(window).scrollTop();

	if (scrolled > 105 && scrolled > scrollPrev) {
		nav.addClass('out');
	} else {
		nav.removeClass('out');
	}
	scrollPrev = scrolled;
	if (navFunc.hasClass('nav_active')) {
		header.removeClass('out');
	} else {

	}
});;

window.onscroll = function showHeader() {
	let nav = document.querySelector('.header');

	if (window.pageYOffset > 200) {
		nav.classList.add('active')
	} else {
		nav.classList.remove('active')
	}
}

$(document).ready(function () {
	$('.main__btn, .promo__video').click(function (event) {
		$('.promo__video').toggleClass('active');
	});
});

$(document).ready(function () {
	$('.video__play, .video__item-1').click(function (event) {
		$('.video__item-1').toggleClass('active');
	});
});

$(function () {
	$("a[href^='#']").click(function () {
		var _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});
});