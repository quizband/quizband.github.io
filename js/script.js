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
const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPositions = [];
if (lazyImages.length > 0){
    lazyImages.forEach(img => {
        if (img.dataset.src || img.dataset.srcset) {
            lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
            lazyScrollCheck();
        }
    });
}

window.addEventListener("scroll", lazyScroll);

function lazyScroll() {
    if (document.querySelectorAll('img[data-src], source[data-srcset]').length > 0) {
        lazyScrollCheck();
    }
}

function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(
        item => pageYOffset > item - windowHeight
    );
    if (imgIndex >= 0) {
        if (lazyImages[imgIndex].dataset.src) {
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].removeAttribute('data-src');
        } else if (lazyImages[imgIndex].dataset.srcset) {
            lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
            lazyImages[imgIndex].removeAttribute('data-srcset');
        }
    }
        
    delete lazyImagesPositions[imgIndex];
};
document.addEventListener("DOMContentLoaded", function() {
    if ("IntersectionObserver" in window) {
     var iframesLazy = document.querySelectorAll("iframe.lazy__video");
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
     var iframesLazy = document.querySelector('iframe.lazy__video');
     for (var i = 0; i < iframesLazy.length; i++) {
      if (lazyVids[i].getAttribute('data-src')) {
       lazyVids[i].setAttribute('src', lazyVids[i].getAttribute('data-src'));
      }
     }
    }
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

document.body.onload = function() {
  setTimeout(function() {
      var preloader = document.getElementById('page-preloader');
      if (!preloader.classList.contains('done'))
      {
          preloader.classList.add('done');
      }
  }, 1000);
}

var images = document.images,
  images_total_count = images.length,
  images_loaded_count = 0,
  perc_display = document.getElementById('load_perc'),
  preloader = document.getElementById('page-preloader');

for (var i = 0; i < images_total_count; i++)
{
  image_clone = new Image();
  image_clone.onload = image_loaded;
  image_clone.onerror = image_loaded;
  image_clone.src = images[i].src;
}   

function image_loaded() {
  images_loaded_count++;

  perc_display.innerHTML = (( (100 / images_total_count) * images_loaded_count) << 0) + '%';

  if (images_loaded_count >= images_total_count) {
      setTimeout(function() {
          if (!preloader.classList.contains('done'))
          {
              preloader.classList.add('done');
          }
      }, 1000);
  }
}
