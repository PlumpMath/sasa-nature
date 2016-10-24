var documentID, doc, params, pointInfos;

$(document).ready(function()
{
  var p = new Promise(function(resolve, reject) {
    params = getParams();
    if(!params.hasOwnProperty('id')) {
      reject();
    }
    else documentID = params["id"];
    $.getJSON("data/papers/"+documentID+".json", function(data) {
      doc = data;
      if(doc == null) reject();
      $.getJSON("data/points.json", function(data2) {
        pointInfos = data2;
        resolve();
      });
    }).fail(function() {reject();});
  });
  p.then(function(result) {
    PDFObject.embed("docs/"+documentID+".pdf", "#pdf-wrapper");

    $('#study-title').html(doc["name"]);

    var author="", locations="";
    doc.author.forEach(function(element) {
      author+=(element+", ");
    });
    doc.locations.forEach(function(element) {
      locations+=(pointInfos[element-1].name+", ");
    });
    $('#study-author').html(author.substring(0,author.length-2));
    $('#study-location').html(locations.substring(0,locations.length-2));

    $('#study-abstract').html(doc.abstract);

    if(doc.hasOwnProperty("medal")) {
      var str = doc["medal"];
      $('#medal-info').toggle();
      if(str=='gold') {
        $('#medal-gold-info').toggle();
      }
      else if(str=='silver') {
        $('#medal-silver-info').toggle();
      }
      else if(str=='bronze') {
        $('#medal-bronze-info').toggle();
      }
      else {
        $('#medal-info').toggle();
      }
    }

    $("#show-paper-btn").click(function() {
      $('#pdf-wrapper').toggle();
      if($("#show-paper-btn").css("display") == 'none') {
        $('#show-paper-btn').html("보고서 보기");
      }
      else {
        $("#show-paper-btn").html("보고서 숨기기");
      }
    });
    $('#download-paper-btn').click(function() {
      var win = window.open("/docs/"+documentID+".pdf",'_blank');
      if(win) {
        win.focus();
      }
      else {
        alert('팝업이 차단되어 있습니다. 팝업을 허용해 주세요.');
      }
    });
  },
  function(error) {
    alert('잘못된 접근입니다. 문서 아이디를 확인해주세요.');
    window.history.back();
  });
});

//http://antop.tistory.com/60
function getParams() {
    // 파라미터가 담길 배열
    var param = new Array();

    // 현재 페이지의 url
    var url = decodeURIComponent(location.href);
    // url이 encodeURIComponent 로 인코딩 되었을때는 다시 디코딩 해준다.
    url = decodeURIComponent(url);

    var params;
    // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
    params = url.substring( url.indexOf('?')+1, url.length );
    // 파라미터 구분자("&") 로 분리
    params = params.split("&");

    // params 배열을 다시 "=" 구분자로 분리하여 param 배열에 key = value 로 담는다.
    var size = params.length;
    var key, value;
    for(var i=0 ; i < size ; i++) {
        key = params[i].split("=")[0];
        value = params[i].split("=")[1];

        param[key] = value;
    }

    return param;
}