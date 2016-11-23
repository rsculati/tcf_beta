var API_URL_SPEED = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?';
var API_URL_MOBILE = 'https://www.googleapis.com/pagespeedonline/v3beta1/mobileReady'
var CHART_API_URL = 'http://chart.apis.google.com/chart?';

// Specify your actual API key here:
var API_KEY = 'AIzaSyC4EGTymkx621JVuiCv9wcd7bqs3eY0uyY';

// Specify the URL you want PageSpeed results for here:
var URL_TO_GET_RESULTS_FOR = 'https://developers.google.com/speed/pagespeed/insights/';


function requestWebsiteInsight(url) {
    $('#wait-text').show();
    $('#preview').hide();
    $('#result').hide();
    NProgress.configure({ parent: '#wait-container' });
    NProgress.start();


    $.ajax({
    type: "GET",
    url: API_URL_MOBILE,
    data: { url : url, strategy: 'mobile', key: API_KEY },
    // url: "http://localhost:8080/api/requests",
    dataType: 'json',
    success: function( data, textStatus, jQxhr ){

                    console.log(data);

                    var pass = data.ruleGroups.USABILITY.pass;
                    var score = data.ruleGroups.USABILITY.score;
                    var avoidPlugins = data.formattedResults.ruleResults.AvoidPlugins.ruleImpact;
                    var configureViewport = data.formattedResults.ruleResults.ConfigureViewport.ruleImpact;
                    var sizeContentToViewport = data.formattedResults.ruleResults.SizeContentToViewport.ruleImpact;
                    var sizeTapTargetsAppropriately = data.formattedResults.ruleResults.SizeTapTargetsAppropriately.ruleImpact;
                    var useLegibleFontSizes = data.formattedResults.ruleResults.UseLegibleFontSizes.ruleImpact;

                    $( "#pass" ).text("Pass : " + data.ruleGroups.USABILITY.pass);
                    $( "#score" ).text("Score : " + data.ruleGroups.USABILITY.score);

                    // Front facing
            				bioMp(document.getElementById('preview'), {
            					url: url,
            					view: 'front',
            					image: 'http://beeker.io/images/posts/3/iphone6_front_white.png',
            					scale: 0.7
            				});

                    if(pass){
                      // TODO: display score
                      // TODO: display success img
                    } else {
                      // TODO: display score
                      // TODO: display erreur img

                      // TODO: test parameter impact
                        // TODO: display parameter to change
                    }

                    // $( "#param1" ).text("Uses incompatible plugins : " + data.formattedResults.ruleResults.AvoidPlugins.ruleImpact);
                    // $( "#param2" ).text("Mobile viewport not set : " + data.formattedResults.ruleResults.ConfigureViewport.ruleImpact);
                    // $( "#param3" ).text("Content wider than screen : " + data.formattedResults.ruleResults.SizeContentToViewport.ruleImpact);
                    // $( "#param4" ).text("Links too close together : " + data.formattedResults.ruleResults.SizeTapTargetsAppropriately.ruleImpact);
                    // $( "#param5" ).text("Text too small to read : " + data.formattedResults.ruleResults.UseLegibleFontSizes.ruleImpact);

                    // console.log("Uses incompatible plugins : " + data.formattedResults.ruleResults.AvoidPlugins.ruleImpact);
                    // console.log("Mobile viewport not set : " + data.formattedResults.ruleResults.ConfigureViewport.ruleImpact);
                    // console.log("Content wider than screen : " + data.formattedResults.ruleResults.SizeContentToViewport.ruleImpact);
                    // console.log("Links too close together : " + data.formattedResults.ruleResults.SizeTapTargetsAppropriately.ruleImpact);
                    // console.log("Text too small to read : " + data.formattedResults.ruleResults.UseLegibleFontSizes.ruleImpact);

                    $('#wait-text').hide();
                    $('#preview').show();
                    $('#result').show();
                    NProgress.done();

                    // $( "#emailWritten" ).text();
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    $('#wait-text').hide();
                    NProgress.done();
                }
  });


    // $http.post('http://localhost:8080/api/request',email)
}

function myFunction() {
    var email = document.getElementById('email').value;
    var url = document.getElementById('url').value;


    console.log("url : " + url);
    console.log("email : " + email);
    requestWebsiteInsight(url);



    // if(validateForm(email)){
    //   $( "#emailAlert" ).hide();
    //   // console.log("valid email : " + email);
    //   var request = [];
    //   request.client = "tcf";
    //   request.category = "contact";
    //   request.content = "Ask for contact";
    //   request.emailContact = email;
    //   // request.content.push({email : email});
    //   // JSON.stringify(request);
    //   console.log(request);
    //   saveRequest(request);
    //
    //   $("#serviceModalContact").modal()
    //   // $( "#emailWritten" ).text("");
    //   $( "#emailWritten" ).text(document.getElementById('email').value);
    //
    //
    // } else {
    //   $( "#emailAlert" ).show();
    // }

}
