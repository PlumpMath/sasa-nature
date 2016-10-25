var documentID, params;

$(document).ready(function()
{
  params = getParams();
  if(!params.hasOwnProperty('id')) {
    ajax_failed();
  }
  else documentID = params["id"];
  $.ajax({
     type: "GET",
     url: "data/papers/"+documentID+".json",
     dataType: "json",
     success: function(doc) {
       if(doc == null) reject();
       $.ajax({
          type: "GET",
          url: "data/points.json",
          dataType: "json",
          success: function(pointInfos) {
            PDFObject.embed("docs/"+documentID+".pdf", "#pdf-wrapper");
            $('#study-title').html(doc["name"]);
            $('#download-paper-btn').click(function() {
              var win = window.open("docs/"+documentID+".pdf",'_blank');
              if(win) {
                win.focus();
              }
              else {
                alert('팝업이 차단되어 있습니다. 팝업을 허용해 주세요.');
              }
            });
          },
          fail: function() {
            ajax_failed();
          }
       });
     },
     fail: function() {
       ajax_failed();
     }
  });
});
function ajax_failed() {
    alert('잘못된 접근입니다. 문서 아이디를 확인해주세요.');
    window.history.back();
}
function getParams() {
    var param = new Array();
    var url = decodeURIComponent(location.href);
    url = decodeURIComponent(url);
    var params;
    params = url.substring( url.indexOf('?')+1, url.length );
    params = params.split("&");
    var size = params.length;
    var key, value;
    for(var i=0 ; i < size ; i++) {
        key = params[i].split("=")[0];
        value = params[i].split("=")[1];
        param[key] = value;
    }
    return param;
}
