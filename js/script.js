function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
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
$(document).ready(function() {
	$('.menu__burger').click(function(event) {
	  $('.header__menu, .burger__line').toggleClass('active');
	  $('body').toggleClass('lock');
	});
  
	// Get the height of the menu
	const menuHeight = $('.header__body').outerHeight();
  
	// Get all the menu links
	const menuLinks = document.querySelectorAll('.header__link');
  
	// Add an event listener to each menu link
	menuLinks.forEach(link => {
	  link.addEventListener('click', function(e) {
		e.preventDefault();
  
		// Get the target section ID from the link's href attribute
		const targetId = link.getAttribute('href');
  
		// Calculate the target section's offset from the top of the document
		const targetOffset = $(targetId).offset().top - menuHeight;
  
		// Close the mobile menu
		$('.header__menu, .burger__line').removeClass('active');
		$('body').removeClass('lock');
  
		// Animate scrolling to the target section
		$('html, body').animate({
		  scrollTop: targetOffset
		}, 800);
	  });
	});
  
	// Add an event listener to the window scroll event
	window.addEventListener('scroll', function() {
	  // Get the current scroll position, taking into account the menu height
	  const scrollPosition = window.pageYOffset + menuHeight + 20; // Add an extra 20 pixels for the title height
  
	  // Iterate through each menu link
	  menuLinks.forEach(link => {
		const targetId = link.getAttribute('href');
  
		// Get the target section by ID
		const targetSection = document.querySelector(targetId);
  
		// Get the position and height of the target section
		const targetPosition = targetSection.offsetTop - 20; // Subtract the title height
		const targetHeight = targetSection.offsetHeight;
		const targetBottom = targetPosition + targetHeight;
  
		// Add or remove the "active" class based on the scroll position
		if (scrollPosition >= targetPosition && scrollPosition < targetBottom) {
		  link.classList.add('active');
		} else {
		  link.classList.remove('active');
		}
	  });
	});
  });
  ;

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

function openPopup(popupId, videoId) {
    var popup = document.getElementById(popupId);
    var iframe = popup.querySelector('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId;
    popup.classList.add('show');
  }
  
  function closePopup(popupId) {
    var popup = document.getElementById(popupId);
    var iframe = popup.querySelector('iframe');
    iframe.src = '';
    popup.classList.remove('show');
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
}