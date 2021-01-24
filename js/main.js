$(document).ready(function () {
	$('.menu__burger, .header__menu').click(function (event) {
		$('.header__menu, header__list, .burger__line').toggleClass('active');
		$('body').toggleClass('lock');
	});
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
	$('.main__btn, .main__promo').click(function (event) {
		$('.main__promo').toggleClass('active');
	});
});

$(function () {
	$("a[href^='#']").click(function () {
		var _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});
});