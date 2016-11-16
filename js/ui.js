/**
 * UI lib
 **/

function done() {
  $('.pg-loading-screen').hide();
  $('body').removeClass('pg-loading');
  $('#wrapper').show();
  $('.loader').hide();
}

function showError(err) {
  window.location.href = '/index.html?error="'+err+'"'
}

function replaceKey(elem, key, value) {
  console.log('replace', key, value)
  var cnts = $(elem).html();
  var mcnts = cnts.replace(new RegExp('%'+key+'%', 'g'), value);
  $(elem).html(mcnts);
}

ui = {
  init: function() {
    $.ajax({
      type: 'POST',
      url: 'https://api.hacknova.co/v1/mlh/me',
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      data: JSON.stringify({
        access_token: $.cookie('hacknova_accesstoken')
      })
    }).fail(function() {
      showError("Failed To Build Dashboard");
    }).done(function(data) {
      if(!data.first_name) return showError("Failed To Build Dashboard (inner)");


      replaceKey('#user', 'username', data.first_name+' '+data.last_name)
      replaceKey('#user', 'userimage', 'https://gravatar.com/avatar/'+md5(data.email));

      // Setup Attendees
      $.get('https://api.hacknova.co/v1/attending', function(data) {
        replaceKey('#percent-attnds', 'percent', data.data.length)

        jQuery(document).ready(function($) {
            $('.circliful-chart').circliful();
        });

        done();
      })
    })
  }
}
