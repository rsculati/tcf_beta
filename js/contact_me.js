function myFunction() {
    var email = document.getElementById('email').value;

    if(validateForm(email)){
      $( "#emailAlert" ).hide();
      // console.log("valid email : " + email);
      var request = [];
      request.client = "tcf";
      request.category = "contact";
      request.content = "Ask for contact";
      request.emailContact = email;
      // request.content.push({email : email});
      // JSON.stringify(request);
      console.log(request);
      saveRequest(request);

      $("#serviceModalContact").modal()
      // $( "#emailWritten" ).text("");
      $( "#emailWritten" ).text(document.getElementById('email').value);


    } else {
      $( "#emailAlert" ).show();
    }

}

function validateForm(x) {
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    } else {
      return true;
    }
}

function saveRequest(request) {

    $.ajax({
    type: "POST",
    url: "https://thecomputerfirm.herokuapp.com/api/requests",
    // url: "http://localhost:8080/api/requests",
    data: {client : request.client, category : request.category, content : request.content, emailContact : request.emailContact},
    dataType: 'json',
    success: function( data, textStatus, jQxhr ){
                    console.log(data);
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
  });


    // $http.post('http://localhost:8080/api/request',email)

}
