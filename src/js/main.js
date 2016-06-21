import $ from 'jquery';
import Tether from 'tether';
window.$ = window.jQuery = $;
window.Tether = Tether;
require('bootstrap');


// Helpers
// function scrollTo(elem) {
//   $('html, body').animate({
//     scrollTop: $(elem).offset().top
//   }, 400);
// }
//
// function validateEmail(email) {
//   const re = new RegExp(
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))/.source
//     + /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.source);
//   return re.test(email);
// }
