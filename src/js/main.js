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

$('nav a').click(function () {
  const view = $(this).attr('data-scroll-to');
  scrollTo(view);
});
