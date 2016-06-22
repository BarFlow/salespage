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
