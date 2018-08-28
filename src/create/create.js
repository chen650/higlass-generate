import { changeSelDisplay } from './multimedia.js';
import { loadHg } from '../loadHg.js';
import { createDownload, selReset, createText, createImg, createYt, createVid, addMedia, submtitHgUrl, swap } from './editHTML.js';
import { openFile, openJSONModal } from './jsonModal.js';
import { openCSSModal, removeCSS, editCSS } from './editCSS.js';
import { editContent } from './editContent.js';
import { sortable } from '../../third_party/jquery-sortable.js';
import { deleteSections } from './delete.js';

$(document).ready(function (){ 
  createDownload();

  loadHg('https://higlass.io/api/v1/viewconfs/?d=WV2nvPIJScK1zpZGf5lO6A');
  changeSelDisplay();
  $("#scrollingText").on('click', '#cancel', selReset);
  $("#scrollingText").on('click', '#submitHgUrl', function() {
    $( "#hgUrl" ).submit();
  });
  $("#scrollingText").on('submit', '#hgUrl', submitHgUrl);
  $("#scrollingText").on('click', '#submit', addMedia);
  $("#scrollingText").on('submit', '#sectionText', createText);
  $("#scrollingText").on('submit', '#imgUrl', createImg);
  $("#scrollingText").on('submit', '#ytUrl', createYt);
  $("#scrollingText").on('submit', '#vidUrl', createVid);
  
  sortable();
  swap();

  openJSONModal();
  document.getElementById('submitJSON').addEventListener('click', openFile, false);

  openCSSModal();
  removeCSS();
  editCSS();

  deleteSections();

  $('[data-toggle="tooltip"]').tooltip({placement:'right'}); 

});