let token = window.localStorage.getItem('token');
let request_url = 'http://localhost:9000';

layui.use('jquery', function() {
  var $ = layui.jquery;
  // if we can get token, that means login already
  // so it hide the signup buttton and add the user avatar
  // also add logout buttton
  if (token) {
    $("#singup_status").hide();
    $("#loginStatus").hide();
    $("#other").show();
    $.ajax({
      url: request_url + '/auth/profile',
      method: 'GET',
      headers: {
        "Authorization": token
      },
      async: true,
      success: function (data) {
        addData(data.profile.avatar);
      },
      error: function (data) {
        console.log(data);
        window.localStorage.clear();
        location.reload();
      }
    });
  } else {
    $("#other").html('');
    $("#other").hide();
  }

  function addData(avatar) {
    let content;
    let img = $('<img class="login-img " />');
    img.attr('src', avatar);
    // console.log(img[0]);
    // then we need add the image into nav bar
    content = '<li class="dropdown simple_menu" style="margin-bottom: 15px">';
    content += '<a href="/profile" class="dropdown-toogle" data-toggle="dropdown">' + img[0].outerHTML +  '<b class="caret"></b></a>';
    content += '<ul class="dropdown-menu">';
    content += '<li><a href="/profile">Profile</a></li>';
    content += '<li><a onclick="Logout()">Log Out</a></li>';
    content += '</ul>';
    content += '</li>';
    $("#other").html(content);
  }

});

// init the logout button
function Logout() {
  window.localStorage.clear();
  window.location.assign('/homepage');
  $("#singup_status").show();
  $("#loginStatus").show();
  $("#other").html('');
}
