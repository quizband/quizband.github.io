function testWebP(callback) {
    var webP = new Image();
    webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    webP.onload = webP.onerror = function() {
        typeof callback === 'function' && callback(webP.height === 2);
    };
};
testWebP(function(supported) {
    console.log(supported);
});;

$(document).ready(function() {
	$('.menu__burger').click(function(event) {
		$('.header__menu, .burger__line').toggleClass('active');
		$('body').toggleClass('lock');
	});
});;

window.onscroll = function showHeader() {
	let nav = document.querySelector('.header');

	if (window.pageYOffset > 200) {
		nav.classList.add('active1')
	} else {
		nav.classList.remove('active1')
	}
}

$(function () {
	$("a[href^='#']").click(function () {
		var _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});
});

document.addEventListener("DOMContentLoaded", function() {
if ("IntersectionObserver" in window) {
  var iframesLazy = document.querySelectorAll("video__lazy");
  var iframeObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && entry.target.src.length == 0) {
    entry.target.src = entry.target.dataset.src;
    iframeObserver.unobserve(entry.target);
    }
  });
  });
  iframesLazy.forEach(function (iframe) {
  iframeObserver.observe(iframe);
  });
} else {
  var iframesLazy = document.querySelector('video__lazy');
  for (var i = 0; i < iframesLazy.length; i++) {
  if (lazyVids[i].getAttribute('data-src')) {
    lazyVids[i].setAttribute('src', lazyVids[i].getAttribute('data-src'));
  }
  }
}
});

 $(".gallery-list").magnificPopup({
  delegate: "a",
  type: "image",
  gallery: {
    enabled: true
  }
});

// Cache selectors
var lastId,
    topMenu = $("#header__list"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});

var lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
  // ... more custom settings?
});