let layer;

layui.use('layer', function () {
  layer = layui.layer;
});

layui.use('jquery', function() {
  var $ = layui.jquery;
  $(document).ready(function() {
    // get the data firtly
    $.ajax({
      url: 'http://nomoreprojectpls.com/auth/profile',
      type: "GET",
      headers: {
        "Authorization": window.localStorage.getItem('token')
      },
      success: function(data){
        setProfile(data);
        // after that we need add the booking history to user;
        var content = "";
        for (var i = 0; i < data.profile.history.length; i ++) {
          h = data.profile.history[i];
          content += "<li class=\"layui-timeline-item\">\n" +
            "          <i class=\"layui-icon layui-timeline-axis\"></i>\n" +
            "          <div class=\"layui-timeline-content layui-text\">\n" +
            "              <h3 class=\"layui-timeline-title\">" + h.booking_date + "</h3>\n" +
            "              <p>\n" +
            "               Booking id: " +h.booking_id + "; Booking name: " + h.username + "\n" +
            "                <br>Your check in date: "+ h.check_in_date + "\n" +
            "              </p>\n" +
            "          </div>\n" +
            " </li>"

        }
        $("#history").html(content);
      },
      error: function(data){
        layer.msg("Can not get your profile information, pls reload");
        window.location.assign('/homepage');
      }
    });
  });

  // make the update correct
  $("#submit").on('click', function(){
    $.ajax({
      url: 'http://nomoreprojectpls.com/auth/profile',
      method: 'PUT',
      headers: {
        "Authorization": window.localStorage.getItem('token')
      },
      data: {
        'NewPassword': $("#newpassword").val(),
        'birthday': $("#birthday").val(),
        'img': $('#img').attr('src'),
        'first_name': $("#first_name").val(),
        'last_name': $("#last_name").val(),
        'password': $("#password").val()
      },
      success: function(data) {
        setProfile(data);
        layer.msg("Update successfully");
        location.reload();
      },
      error: function (data) {
        layer.msg("Update error");
      }
    })
});

  // set the profile's data
  function setProfile(data) {
    $("#email").val(data.profile.username);
    $("#birthday").val(data.profile.birthday);
    $("#first_name").val(data.profile.first_name);
    $("#last_name").val(data.profile.last_name);
    $("#img").attr('src', data.profile.avatar);
    $("#password").val(data.profile.password);
  }
});
// nothing, just make the tab working
layui.use('element', function(){
  var element = layui.element;
});

layui.use('laydate', function() {
  var laydate = layui.laydate;
  laydate.render({
    elem: '#birthday'
    ,lang: 'en'
  });
});

layui.use('upload', function(){
  var $ = layui.jquery
    ,upload = layui.upload;

  var uploadInst = upload.render({
    elem: '#test1',
    url: '127.0.0.1:5000/auth/profile',
    auto: false,
    choose: function(obj){
      // preview the image
      obj.preview(function(index, file, result){
        // the image base 64
        $('#img').attr('src', result);
      });
    }
  });
});

// this part is for hotels info
layui.use('table', function () {
  let table = layui.table;
  table.render({
    elem: '#hotels',
    url: 'http://127.0.0.1:9000/hotel-management/',
    headers: {
      "Authorization": '8509345d167944fd24278189c502cb511c5b5873f4e48a2b65bdfd8a89bb9d72'
    },
    cols: [[
      {type:'radio'},
      {field:'id', width:100, title: 'Hotel ID', sort: true},
      {field:'name', width:100, title: 'Hotel name', sort: true},
      {field:'location', width:120, title: 'Hotel location', sort: true},
      {field:'phone', width:100, title: 'Hotel phone', sort: true},
      {field:'price', width:100, title: 'Hotel price', sort: true},
      {field:'room_type', width:100, title: 'Hotel type', sort: true},
      {field:'bathrooms', width:100, title: 'Bathroom', sort: true},
      {field:'bedrooms', width:100, title: 'Bedroom', sort: true},
      {field:'description', width:180, title: 'Hotel description', sort: true}
    ]],
    toolbar: '#hotelTools',
    page: false
  });

  // header manage for hotels
  table.on('toolbar(hotels)', function(obj){
    // get the selected col
    let checkStatus = table.checkStatus(obj.config.id);
    switch(obj.event){
      case 'deleteData':
        let data = checkStatus.data[0].id;
        console.log(data);
        layer.alert(JSON.stringify(data));
        break;
    }
  });
});
