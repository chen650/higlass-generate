$(document).ready(function (){ 

  $("#inputJSON").click(function(){
    $("#jsonModal").modal();
  });

  $(".modal-footer").on('click', '#submitJSON', function() {
    $("#jsonText").submit();
  });

  $(".modal-body").on('submit', '#jsonText', function() {
    loadJSON(jsonText.value);
  });

  loadJSON = function(json) { 
    sections.innerHTML = "";
    document.getElementById('placeholder').style.display = 'none';
    json = JSON.parse(json);
    globalVars.json = json;
    var activateFunctions = globalVars.activate(json);
    var reverseFunctions = globalVars.reverse(json);

    for (var i=0; i<json.textSections.length; i++) { 
      var str = "<li><section class=\"step\"><div class='inlineText sectionContent'><h4>Section Content: </h4>" + json.textSections[i] + 
            "</div>";
      for (var j=0; j<json.mediaSections.length; j++) {
        if(json.mediaSections[j].startPos === i) {
          str += "<div class='sectionThumbnail'><h4>Main Content: <i class='fa fa-arrow-right' aria-hidden='true'></i></h4>";
          switch(json.mediaSections[j].activate) {
            case "text":
              str += "<img class='thumbnail' src=\"" + "https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Fast_text.png/330px-Fast_text.png" + "\">"; 
              break;
            case "vid":
              str += "<img class='thumbnail' src=\"" + "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Video_-_The_Noun_Project.svg/512px-Video_-_The_Noun_Project.svg.png" + "\">";
              break;
            case "yt":
              str += "<img class='thumbnail' src='https://img.youtube.com/vi/" + json.mediaSections[j].activateParams[0] + "/default.jpg'>"; 
              break;
            case "img":
              str += "<img class='thumbnail' src=\"" + json.mediaSections[j].activateParams[0] + "\">"
              break;
            default: // hg
              str += "<img class='thumbnail' src=\"" + "https://preview.ibb.co/cm8PLe/Full_Genome1_Mb.jpg" + "\">"; 
              break;
          }
          str += "</div>"
          break;
        }
      }
      str += "</section></li>"; 
      sections.innerHTML += str;
    }
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions);
    document.getElementById('jsonText').value = '';
    globalVars.download(json);
  }

});