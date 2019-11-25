const hiddenDiv = document.querySelector('.hidden');
const selectedArea = document.querySelector('.selected');
const areaPos = selectedArea.getBoundingClientRect();

let X = 0;
let Y = 0;

let selectedLi = '';
let nextName = '';

document.querySelectorAll('.all>li').forEach(li => {
  li.addEventListener('mousedown', function(event) {
    li.className = 'transparent-li';
    hiddenDiv.innerHTML = li.innerHTML;
    hiddenDiv.style.visibility = 'visible';

    const {left, top} = li.getBoundingClientRect();

    X = event.clientX - left;
    Y = event.clientY - top;
    hiddenDiv.style.left = left + 'px';
    hiddenDiv.style.top = top + 'px';
  });
});

window.addEventListener('mousemove', function(event) {
  if (hiddenDiv.style.visibility == 'visible') {
    const {clientX, clientY} = event;
    hiddenDiv.style.left = clientX - X + 'px';
    hiddenDiv.style.top = clientY - Y + 'px';
    if (
      areaPos.left < clientX &&
      clientX < areaPos.left + areaPos.width &&
      areaPos.top < clientY &&
      clientY < areaPos.top + areaPos.height
    ) {
      selectedArea.style.boxShadow = '0px 0px 7px 1px rgba(12, 154, 170, 0.67)';
      let selectedNames = this.document.querySelectorAll('.selected>li');

      if (selectedNames.length) {
        for (let i = 0; i < selectedNames.length; i++) {
          let selectedNamePos = selectedNames[i].getBoundingClientRect();
          let pos = selectedNamePos.top - clientY;
          let hiddenDivPos = hiddenDiv.getBoundingClientRect();
          if (hiddenDivPos.top < selectedNamePos.top) {
            selectedNames[i].className = 'next-name';
          }
          if (pos > 15 || hiddenDivPos.top > selectedNamePos.top) {
            selectedNames[i].removeAttribute('class', 'next-name');
          }
        }
      }
    } else {
      selectedArea.style.boxShadow = '';
    }
  }
});

window.addEventListener('mouseup', () => {
  const oldLi = document.querySelector('.transparent-li');
  hiddenDiv.style.visibility = 'hidden';

  if (selectedArea.style.boxShadow) {
    const newLi = document.createElement('li');
    newLi.innerHTML = hiddenDiv.innerHTML;
    selectedArea.style.boxShadow = '';
    nextName = document.querySelector('.next-name');
    if (nextName) {
      nextName.insertAdjacentElement('beforeBegin', newLi);
      nextName.removeAttribute('class', 'next-name');
    } else {
      selectedArea.appendChild(newLi);
    }

    oldLi.className = 'hidden-li';

    newLi.addEventListener('contextmenu', function(event) {
      event.preventDefault();
      newLi.remove();
      oldLi.removeAttribute('class', 'hidden-li');
    });
  } else {
    hiddenDiv.innerHTML = '';
    if (document.querySelector('.transparent-li'))
      oldLi.removeAttribute('class', '.transparent-li');
  }
});
