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
$('nav li').click(function (e) {
  const view = $(this).find('a').attr('data-scroll-to');
  if (view) {
    e.preventDefault();
    scrollTo(view);
    if (mobile) {
      $('.navbar-nav').toggleClass('hidden-xs-down');
    }
  }
});

$('.hamburger').click(() => {
  $('.navbar-nav').toggleClass('hidden-xs-down');
  mobile = true;
});

$('.navbar-brand').click(() => {
  window.scrollTo(0, 0);
});

// Exit dialog
// const exitOverlay = function () {
//   if (localStorage.getItem('exitOverlay')) {
//     return;
//   }
//   $('body').one('mouseleave', (e) => {
//     $('.dialog').css('display', 'flex');
//     localStorage.setItem('exitOverlay', true);
//   });
//   $('.cover, .close').click(() => {
//     $('.dialog').css('display', 'none');
//   });
// };
// if (document.hasFocus()) {
//   exitOverlay();
// }
// let hadFocus = false;
// window.onfocus = function () {
//   if (hadFocus) {
//     return;
//   }
//   exitOverlay();
//   hadFocus = true;
// };

// Signup
const thanksMessage = '<h5>Thank you, we\'ll get back to you soon!</h5>';
const errorMessage = '<h5>Woops, something went wrong, please contact us via: sales@barflow.io</h5>';

function validateEmail(email) {
  const re = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))/.source
    + /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.source);
  return re.test(email);
}
function validate(elem) {
  function shake() {
    elem.addClass('shake');
    setTimeout(() => {
      elem.removeClass('shake');
    }, 300);
  }
  if (!elem.val()) {
    shake();
    return false;
  } else if (elem.data('type') === 'email' && !validateEmail(elem.val())) {
    shake();
    return false;
  }
  return true;
}

function feedback(template) {
  const html = `<div class="row">
  <div class="col-lg-10 col-lg-offset-1 col-md-8 col-md-offset-2">
    ${template}
  </div>
  </div>`;
  $('section.beta-wrap form').remove();
  $('section.beta-wrap .container').append(html);
}

$('form button[type="submit"]').click((e) => {
  e.preventDefault();
  const company = $('form input[name="company"]');
  const email = $('form input[name="email"]');

  if (!validate(company) || !validate(email)) {
    return;
  }

  $(e.currentTarget).attr('disabled', 'disabled').text('Sending...');

  const payload = {
    company: company.val(),
    email: email.val(),
    source: 'website'
  };

  window.fbq('track', 'Lead', payload);

  $.ajax({
    url: '//api.barflow.io/v1/leads',
    method: 'post',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(payload)
  }).done((res) => {
    feedback(thanksMessage);
  }).fail((res) => {
    feedback(errorMessage);
  });
});
