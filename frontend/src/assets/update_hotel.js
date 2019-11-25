layui.use('jquery', function() {
  $ = layui.jquery;
  $("#formContent").submit(function(e){
    e.preventDefault();
    let hotel_info = JSON.parse(window.localStorage.getItem('update_hotel'));

    let formdata = new FormData(this);
    formdata.append('hotel_id', hotel_info.hotel_id);
    formdata.append('hotel_name', hotel_info.hotel_name);
    formdata.append('hotel_address', hotel_info.hotel_address);
    formdata.append('description', hotel_info.description);
    formdata.append('phone', hotel_info.phone);
    formdata.append('email', hotel_info.email);
    console.log(token);
    $.ajax({
      url: "http://localhost:9000/hotel/management",
      type: "PUT",
      headers: {
        "Authorization": window.localStorage.getItem('token')
      },
      data: formdata,
      mimeTypes:"multipart/form-data",
      contentType: false,
      cache: false,
      processData: false,
      success: function(data){
        // window.localStorage.setItem('update_hotel', '');
        location.reload();
      },
      error: function(data){
        console.log(data);
      }
    });
  });
});
