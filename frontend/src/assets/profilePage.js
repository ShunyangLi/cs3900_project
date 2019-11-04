let layer;
let $;
let url_method = "POST";
let update_id = null;

layui.use('layer', function () {
  layer = layui.layer;
});

layui.use('jquery', function() {
  $ = layui.jquery;
  $(document).ready(function() {
    // get the data firtly
    $.ajax({
      url: request_url + '/auth/profile',
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
      url: request_url + '/auth/profile',
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
    url: '',
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
    url: request_url + '/hotel-management/',
    headers: {
      "Authorization": token
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
  });

  // header manage for hotels
  table.on('toolbar(hotels)', function(obj){
    // get the selected col
    let checkStatus = table.checkStatus(obj.config.id);
    switch(obj.event){
      case 'deleteData':
        let data = checkStatus.data[0].id;
        deleteItems(data);
        break;
      case 'addData':
        addHotel();
        break;
      case 'updateData':
        if (checkStatus.data[0] === undefined) {
          layer.msg('Please choose one hotel then update');
          return;
        }
        updateData(checkStatus.data[0]);
        break;
    }
  });

  // this is for add hotel
  function addHotel() {
    url_method = "POST";
    update_id = null;
    showContent();
  }

  // this is for update hotel
  // we need to put all the data into forms
  function updateData(data) {

    $("#hotel_name").val(data.name);
    $("#hotel_phone").val(data.phone);
    $("#hotel_location").val(data.location);
    $("#hotel_email").val(data.email);
    $("#hotel_price").val(data.price);
    $("#hotel_description").val(data.description);
    $("#hotel_web").val(data.web);
    $("#hotel_type").val(data.room_type);
    $("#hotel_bathrooms").val(data.bathrooms);
    $("#hotel_bedrooms").val(data.bedrooms);

    url_method = "PUT";
    update_id = data.id;
    showContent();
  }

  // TODO this is for show the forms data, need fix later
  function showContent() {
    layer.open({
      type:1,
      title:"Add new hotel",
      area:["700px","800px"],
      content:$("#forms"),
    });
  }

  // this function is for delete
  function deleteItems(id) {
    $.ajax({
      url: request_url + "/hotel-management/",
      type: "DELETE",
      data: {
        'hotel_id': id
      },
      headers: {
        "Authorization": token
      },
      success: function(data){
        layer.msg('Delete successfully');
        location.reload();
      },
      error: function(data){
        layer.msg(JSON.stringify(data));
      }
    });
  }

  // this is for upload functions, upload all the files and images
  $("#formContent").submit(function(e){
    e.preventDefault();
    let formdata = new FormData(this);

    if (url_method === "PUT" && update_id !== null) {
      formdata.append('hotel_id', update_id);
    }
    // console.log(formdata.get('file'));
    if (formdata.get('hotel_name') === "") {
      layer.msg('Please enter hotel name');
      return;
    }
    if (formdata.get('hotel_phone') === "") {
      layer.msg('Please enter hotel phone');
      return;
    }
    if (formdata.get('hotel_location') === "") {
      layer.msg('Please enter hotel location');
      return;
    }
    if (formdata.get('hotel_email') === "") {
      layer.msg('Please enter hotel email');
      return;
    }

    if (formdata.get('hotel_price') === "") {
      layer.msg('Please enter hotel price');
      return;
    }

    if (formdata.get('hotel_description') === "") {
      layer.msg('Please enter hotel description');
      return;
    }

    if (formdata.get('hotel_web') === "") {
      layer.msg('Please enter hotel web');
      return;
    }

    if (formdata.get('hotel_type') === "") {
      layer.msg('Please enter hotel type');
      return;
    }

    if (formdata.get('hotel_bathrooms') === "") {
      layer.msg('Please enter hotel bathrooms');
      return;
    }

    if (formdata.get('hotel_bedrooms') === "") {
      layer.msg('Please enter hotel bedrooms');
      return;
    }

    if (url_method === "POST") {
      if (formdata.get('file').name === "") {
        layer.msg('Please enter hotel images');
        return;
      }
    }

    $.ajax({
      url: request_url + "/hotel-management/",
      type: url_method,
      data: formdata,
      headers: {
        "Authorization": token
      },
      mimeTypes:"multipart/form-data",
      contentType: false,
      cache: false,
      processData: false,
      success: function(data){
        if (url_method === "POST") {
          layer.msg('Add successfully');
        } else {
          layer.msg('Update successfully');
        }
        location.reload();
      },
      error: function(data){
        layer.msg(JSON.stringify(data));
      }
    });
  });
});
