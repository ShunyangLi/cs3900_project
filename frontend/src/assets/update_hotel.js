// we use JQuery to upload hotel images
// because angular2 is not working.

layui.use('jquery', function() {
  $ = layui.jquery;
  // detect the submit action
  $("#formContent").submit(function(e){
    e.preventDefault();
    // get the current hotel details
    let hotel_info = JSON.parse(window.localStorage.getItem('update_hotel'));

    // init the FormData
    let formdata = new FormData(this);
    formdata.append('hotel_id', hotel_info.hotel_id);
    formdata.append('hotel_name', hotel_info.hotel_name);
    formdata.append('hotel_address', hotel_info.hotel_address);
    formdata.append('description', hotel_info.description);
    formdata.append('phone', hotel_info.phone);
    formdata.append('email', hotel_info.email);
    // console.log(token);
    // Use ajax the request API
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
