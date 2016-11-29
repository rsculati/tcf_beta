var API_URL_SPEED = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?';
var API_URL_MOBILE = 'https://www.googleapis.com/pagespeedonline/v3beta1/mobileReady'
var CHART_API_URL = 'http://chart.apis.google.com/chart?';

// Specify your actual API key here:
var API_KEY = 'AIzaSyC4EGTymkx621JVuiCv9wcd7bqs3eY0uyY';

// Specify the URL you want PageSpeed results for here:
var URL_TO_GET_RESULTS_FOR = 'https://developers.google.com/speed/pagespeed/insights/';


function requestWebsiteInsight(url) {

    $('.mobile-friendly-header-state-1').hide();
    $('.mobile-friendly-header-state-2').show();

    // $('#result').hide();
    // NProgress.configure({ parent: '#wait-container' });
    // NProgress.start();


    $.ajax({
    type: "GET",
    url: API_URL_MOBILE,
    data: { url : url, strategy: 'mobile', key: API_KEY },
    // url: "http://localhost:8080/api/requests",
    dataType: 'json',
    success: function( data, textStatus, jQxhr ){

      var pass = data.ruleGroups.USABILITY.pass;
      var score = data.ruleGroups.USABILITY.score;
      var avoidPlugins = data.formattedResults.ruleResults.AvoidPlugins.ruleImpact;
      var configureViewport = data.formattedResults.ruleResults.ConfigureViewport.ruleImpact;
      var sizeContentToViewport = data.formattedResults.ruleResults.SizeContentToViewport.ruleImpact;
      var sizeTapTargetsAppropriately = data.formattedResults.ruleResults.SizeTapTargetsAppropriately.ruleImpact;
      var useLegibleFontSizes = data.formattedResults.ruleResults.UseLegibleFontSizes.ruleImpact;
      // console.log(sizeContentToViewport);
      // console.log(configureViewport);

      if(pass){
        $('.mobile-friendly-header-state-2').hide();
        $('.mobile-friendly-header-state-3-1').show();
        $( '.mobile-friendly-lp' ).css( "background-color", "#27AE61");

        if(configureViewport < 8){
          $('#test-screen-size-positive').show();
        }
        if(sizeContentToViewport < 8){
          $('#test-content-size-positive').show();
        }
        if(sizeTapTargetsAppropriately < 8){
          $('#test-link-size-positive').show();
        }
        if(useLegibleFontSizes < 8){
          $('#test-text-size-positive').show();
        }
        // TODO: display score
        // TODO: display success img
      } else {
        $('.mobile-friendly-header-state-2').hide();
        $('.mobile-friendly-header-state-3-2').show();
        $( '.mobile-friendly-lp' ).css( "background-color", "#C03C2D");

        if(configureViewport > 9){
          $('#test-screen-size').show();
        }
        if(sizeContentToViewport > 9){
          $('#test-content-size').show();
        }
        if(sizeTapTargetsAppropriately > 9){
          $('#test-link-size').show();
        }
        if(useLegibleFontSizes > 9){
          $('#test-text-size').show();
        }

        // Front facing
        // bioMp(document.getElementById('preview'), {
        // 	url: url,
        // 	view: 'front',
        // 	image: "images\mobile-icon-state-3-2.png",
        // 	scale: 0.7
        // });

      }
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    // $('#wait-text').hide();
                    // NProgress.done();
                    $('.mobile-friendly-header-state-2').hide();
                    $('.mobile-friendly-header-state-3-3').show();
                    $( '.mobile-friendly-lp' ).css( "background-color", "#D15726");
                }
  });


    // $http.post('http://localhost:8080/api/request',email)
}

function validateUrl(value){
  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}


function myFunction2() {

  $('.mobile-friendly-header-state-3-3').hide();
  $('.mobile-friendly-header-state-1').show();
  $( '.mobile-friendly-lp' ).css( "background-color", "#0E5C4C");

}

function startAnalysis() {

    // var email = document.getElementById('email').value;
    var url = document.getElementById('url').value;

    if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    if (validateUrl(url)){
      // console.log("url : " + url);
      requestWebsiteInsight(url);
      $('#urlAlert').hide();
    } else {
      // console.log("invalid : " + url);
      $('#urlAlert').show();
    }

}


function myFunction() {
    var email = document.getElementById('email1').value;

    if(validateForm(email)){
      $( "#emailAlert" ).hide();
      // console.log("valid email : " + email);
      var request = [];
      request.client = "tcf";
      request.category = "contact";
      request.content = "Mobile friendly test - contact: " + document.getElementById('url').value + " - FR";
      request.emailContact = email;
      // request.content.push({email : email});
      // JSON.stringify(request);
      console.log(request);
      saveRequest(request);

      $("#serviceModalContact").modal()
      // $( "#emailWritten" ).text("");
      $( "#emailWritten" ).text(document.getElementById('email1').value);


    } else {
      $( "#emailAlert" ).show();
    }
}

function myFunction3En() {
    var email = document.getElementById('email2').value;

    if(validateForm(email)){
      $( "#emailAlert" ).hide();
      // console.log("valid email : " + email);
      var request = [];
      request.client = "tcf";
      request.category = "contact";
      request.content = "Mobile friendly test - contact: " + document.getElementById('url').value + " - EN";
      request.emailContact = email;
      // request.content.push({email : email});
      // JSON.stringify(request);
      console.log(request);
      saveRequest(request);

      $("#serviceModalContact").modal()
      // $( "#emailWritten" ).text("");
      $( "#emailWritten" ).text(document.getElementById('email2').value);


    } else {
      $( "#emailAlert" ).show();
    }
}

function myFunction3(){
  var email = document.getElementById('email').value;

  if(validateForm(email)){
    $( "#emailAlert" ).hide();
    // console.log("valid email : " + email);
    var request = [];
    request.client = "tcf";
    request.category = "contact";
    request.content = "Mobile friendly test - contact: " + document.getElementById('url').value + " - FR";
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

function myFunctionEn(){
  var email = document.getElementById('email3').value;

  if(validateForm(email)){
    $( "#emailAlert" ).hide();
    // console.log("valid email : " + email);
    var request = [];
    request.client = "tcf";
    request.category = "contact";
    request.content = "Mobile friendly test - contact: " + document.getElementById('url').value + " - EN";
    request.emailContact = email;
    // request.content.push({email : email});
    // JSON.stringify(request);
    console.log(request);
    saveRequest(request);

    $("#serviceModalContact").modal()
    // $( "#emailWritten" ).text("");
    $( "#emailWritten" ).text(document.getElementById('email3').value);


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
