window.onload = function() {
  $.ajax({
     type: "GET",
     url: "data/study_index.json",
     dataType: "json",
     success: function(study_index) {
       $.ajax({
          type: "GET",
          url: "data/points.json",
          dataType: "json",
          success: function(locPoints) {
            $('#studies-main').html("");
            for(var key in study_index) {
              $('#main-table-body').append("<tr><td >"+key+"</td><td><a href=\"study_detail.html?id="+key+"\">"+study_index[key].title+"</a></td></tr>");
            }
          }
       });
     }
  });
};
