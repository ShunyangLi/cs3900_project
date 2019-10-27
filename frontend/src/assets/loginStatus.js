let token = window.localStorage.getItem('token');
layui.use('jquery', function() {
  var $ = layui.jquery;
  if (token) {
    $.ajax({
      url: 'http://nomoreprojectpls.com/auth/profile',
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
      }
    });
  } else {
    $("#loginStatus").html('<a href="/login">Log in</a>');
  }

  function addData(avatar) {
    let content;
    let img = $('<img class="login-img " />');
    img.attr('src', avatar);
    console.log(img[0]);
    // then we need add the image into nav bar
    content = '<li class="dropdown simple_menu active">';
    content += '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + img[0].outerHTML +  '<b class="caret"></b></a>';
    content += '<ul class="dropdown-menu">';
    content += '<li><a href="/profile">Profile</a></li>';
    content += '<li><a onclick="Logout()">Log Out</a></li>';
    content += '</ul>';
    content += '</li>';
    $("#loginStatus").html(content);
  }

});


function Logout() {
  window.localStorage.clear();
  window.location.assign('/homepage');
}
