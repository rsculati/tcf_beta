$(document).ready(function() {
  // $.ajax( {
  //               url:'http://localhost:8080/api/articles',
  //               success:function(data) {
  //                 console.log(data[0].html_content);
  //                 var showData = $('#show-data');
  //                 $("#article").html(data[0].html_content);
  //               }
  //            });

     $.ajax( {
              //  url:'http://localhost:8080/api/pages',
               url:'http://jsonplaceholder.typicode.com/posts/1',

               success:function(data) {
                 console.log(data);

                var content = $(".content");
                for(var i = 0 ; i < content.length; i++){
                  console.log(content[i].id);
                  var array = content[i].id.split('-');
                  console.log(array);
                  // console.log(data[0].content[array[0]].elements[array[1]].value);
                  $('#'+content[i].id).html(data.title);
                  // $('#'+content[i].id).html(data[0].content[array[0]].elements[array[1]].value);
                }

                // showData.text(data[0].content.['section1'].elements.titre.value)

               }
            });

});
