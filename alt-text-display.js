var altrollover = (function(){

  let clickedElm = null;
  const id = 'alt-text-rollover-bookmark-swatch';
  const headertext = 'Drag here';
  const initialtext = 'Roll over any image<br>Drag to where you want me';
  let altDisplay = document.createElement('div');
  altDisplay.classList.add('hidden');
  document.body.appendChild(altDisplay);
  let draghead = document.createElement('h1');
  draghead.innerHTML = headertext;
  altDisplay.appendChild(draghead);
  let swatchtext = document.createElement('p');
  altDisplay.appendChild(swatchtext);
  altDisplay.id = id;
  swatchtext.innerHTML = initialtext;
  let closebutton = document.createElement('button');
  closebutton.innerText = 'ⅹ';
  closebutton.title = 'close';
  draghead.appendChild(closebutton);
  closebutton.addEventListener('click', ev => {
    altDisplay.classList.add('hidden');
  });

  let swatchx = 0;
  let swatchy = 0;
  let mousex = 0;
  let mousey = 0;

  const initiatedrag = ev => {
    ev = ev || window.event;
    ev.preventDefault();
    mousex = ev.clientX;
    mousey = ev.clientY;
    document.addEventListener('mouseup', enddrag);
    document.addEventListener('mousemove', startdrag);
  }
  const startdrag = (ev) => {
    ev = ev || window.event;
    ev.preventDefault();
    swatchx = mousex - ev.clientX;
    swatchy = mousey - ev.clientY;
    mousex = ev.clientX;
    mousey = ev.clientY;
    altDisplay.style.top = (altDisplay.offsetTop - swatchy) + "px";
    altDisplay.style.left = (altDisplay.offsetLeft - swatchx) + "px";
  }
  const enddrag = _ => {
    document.removeEventListener('mouseup', enddrag);
    document.removeEventListener('mousemove', startdrag);
  }
  draghead.addEventListener('mousedown', initiatedrag);

  const outimg = e => {
    e.target.style.opacity = 1;
  };
  const overimg = _ => {
    let e = getelm();
    altDisplay.classList.remove('hidden');
    altDisplay.classList.remove('error');
    e.target.style.opacity = 0.7;
    let out = 'Image: ' + e.target.src.replace(/\/([^\/])/g,'/ $1') +'<br><br>';
    if(e.target.getAttribute('alt') === null) {
      altDisplay.classList.add('error');
      out += 'No alt attribute!';
    } else {
      if(e.target.alt === '') {
        out += 'Empty alt text!';
      }
      if (e.target.alt !== '') {
        out += `"${e.target.alt}"`;
      }
    }
    swatchtext.innerHTML = out;
  };
  document.addEventListener('contextmenu', function(event){
    clickedElm = event;
  }, true);
  const getelm = _ => {
    return clickedElm;
  }
  return {
    f: overimg
  }
})();

