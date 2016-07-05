import $ from 'jquery';
import Tether from 'tether';
window.$ = window.jQuery = $;
window.Tether = Tether;

require('bootstrap');

// Helpers
function scrollTo(elem) {
  $('html, body').animate({
    scrollTop: $(elem).offset().top
  }, 400);
}

// Navbar
let mobile = false;
$('nav li').click(function () {
  const view = $(this).find('a').attr('data-scroll-to');
  scrollTo(view);
  if (mobile) {
    $('.navbar-nav').toggleClass('hidden-xs-down');
  }
});

$('.hamburger').click(() => {
  $('.navbar-nav').toggleClass('hidden-xs-down');
  mobile = true;
});

$('.navbar-brand').click(() => {
  window.scrollTo(0, 0);
});

// LeadTracking
$('.preorder-btn').click(() => {
  window.fbq('track', 'Lead');
});

// Exit dialog
const exitOverlay = function () {
  if (localStorage.getItem('exitOverlay')) {
    return;
  }
  $('body').one('mouseleave', (e) => {
    $('.dialog').css('display', 'flex');
    localStorage.setItem('exitOverlay', true);
  });
  $('.cover, .close').click(() => {
    $('.dialog').css('display', 'none');
  });
};
if (document.hasFocus()) {
  exitOverlay();
}
let hadFocus = false;
	window.onfocus = function () {
  if (hadFocus) {
    return;
  }
  exitOverlay();
  hadFocus = true;
};
