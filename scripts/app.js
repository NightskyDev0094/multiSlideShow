var options = {
  selector: '',
  effectType: 'transition',
  contents: [
    'https://images.unsplash.com/photo-1538991383142-36c4edeaffde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80',
    'https://www.youtube.com/embed/WDH_nJM3djc',
    'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  ],
  fileType: ['image', 'other', 'image'],
  slideDirection: 'horizontal',
  textPosition: 'bottomLeft',
  captains: ['1. Hello World', '2. Hello World', '3. Hello World'],
  captainFontSize: 24,
  captainFontFamily: 'Sofia',
  captainColor: '#ffffff',
  captainDuration: 1,
  captainDelay: 0.5,
  descriptions: [
    [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Integer lacinia dui lectus.',
      'Donec scelerisque ipsum diam, ac mattis orci pellentesque eget.',
    ],
    [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Integer lacinia dui lectus.',
      'Donec scelerisque ipsum diam, ac mattis orci pellentesque eget.',
    ],
    [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Integer lacinia dui lectus.',
      'Donec scelerisque ipsum diam, ac mattis orci pellentesque eget.',
    ],
  ],
  descritpionFontSize: 15,
  descriptionFontFamily: 'Indie Flower',
  descriptionColor: '#dccccc',
  descriptionDuration: 1,
  descriptionDelay: 0.5,
  autoPlay: false,
  displayDuration: 3,
  backgroundDuration: 1.5,
  backgroundDelay: 0,
  navigationPosition: 'bottom',
  navigationBorderColor: '#ffffff',
  navigationBackgroundColor: '#c7c1c1',
  navigationDirection: 'horizontal',
  navigationSize: 15,
  navigationSpace: 2,
  hasCaptain: true,
  hasDescription: true,
  hasNavigation: true,
  hasArrow: true,
  arrowColor: '#ffffff',
  arrowBackgroundColor: '#000000',
  arrowIcon: '<i class="fas fa-chevron-left" aria-hidden="true"></i>',
};

var slideIndex = 1;
document.addEventListener('DOMContentLoaded', function (e) {
  var selector = document.querySelector('.slideshow-container');
  options.selector = selector;

  myWindowGlobalLibraryName.setSlideShowOptions(options);

  if (options.slideDirection == 'vertical' && options.effectType == 'transition') {
    document.querySelector('.slideshow-container').style.width = '600px';
    document.querySelector('.slideshow-container').style.height = '600px';
  } else {
    document.querySelector('.slideshow-container').style.width = '900px';
    document.querySelector('.slideshow-container').style.height = '500px';
  }
  document.querySelector('.effectItem').querySelector('.checkEffectIcon').style.display = 'block';
  createContentList();

  var json = $.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBwIX97bVWr3-6AIUvGkcNnmFgirefZ6Sw', function (data) {
    $.each(data.items, function (index, font) {
      $('.combobox').append($('<option></option>').attr('value', font.family).text(font.family));
    });
  });
});

function checkSlideEffect(n) {
  var effects = document.querySelectorAll('.checkEffectIcon');
  for (let i = 0; i < effects.length; i++) effects[i].style.display = 'none';

  effects[n].style.display = 'block';

  if (n == 0) options.effectType = 'transition';
  else options.effectType = 'fade';

  if (options.slideDirection == 'vertical' && options.effectType == 'transition') {
    document.querySelector('.slideshow-container').style.width = '600px';
    document.querySelector('.slideshow-container').style.height = '600px';
  } else {
    document.querySelector('.slideshow-container').style.width = '900px';
    document.querySelector('.slideshow-container').style.height = '500px';
  }

  myWindowGlobalLibraryName.setSlideShowOptions(options);
}

function transitionEffect() {
  document.querySelector('.transitionPanel').style.transform = 'translateX(-60%)';
  setTimeout(() => {
    document.querySelectorAll('.transitionImageItem')[1].style.transform = 'scale(1)';
  }, 1100);
  document.querySelector('.transitionPanel').animate({ transform: ['translateX(0px)', 'translateX(-60%)'] }, 1000);
  document.querySelectorAll('.transitionImageItem')[1].animate(
    { transform: ['scale(0.8)', 'scale(1)'] },
    {
      duration: 1000,
      delay: 1000,
    }
  );
}

function createContentList() {
  var sidebarContainer = document.querySelector('.sidebarContainer');
  var addBtn = document.createElement('div');
  sidebarContainer.innerHTML = '';

  for (let i = 0; i < options.contents.length; i++) {
    var contentItem = document.createElement('div');
    var innerContent = document.createElement('div');
    var gridIcon = document.createElement('i');
    var trashIcon = document.createElement('i');
    var imageIcon = document.createElement('i');
    var title = document.createElement('div');
    var b = document.createElement('b');

    gridIcon.classList.add('fas', 'fa-grip-vertical', 'fa-sm');
    gridIcon.style.color = 'black';
    if (options.fileType[i] == 'image') {
      imageIcon.classList.add('far', 'fa-image', 'fa-2x');
      imageIcon.style.padding = '0px 4px';
      b.append('Image ' + (i + 1));
    } else {
      imageIcon.classList.add('fas', 'fa-photo-video', 'fa-2x');
      b.append('Other ' + (i + 1));
    }
    imageIcon.style.margin = '0px 10px';
    title.style.color = 'black';
    title.append(b);
    trashIcon.classList.add('fas', 'fa-trash-alt', 'fa-sm');
    trashIcon.style.cursor = 'pointer';
    trashIcon.setAttribute('onclick', 'deleteSlide(' + i + ')');
    innerContent.style.display = 'flex';
    innerContent.style.alignItems = 'center';
    innerContent.style.cursor = 'pointer';
    innerContent.setAttribute('onclick', 'showContentOption(' + i + ')');
    contentItem.classList.add('contentItem');

    innerContent.appendChild(gridIcon);
    innerContent.appendChild(imageIcon);
    innerContent.appendChild(title);
    contentItem.appendChild(innerContent);
    contentItem.appendChild(trashIcon);
    sidebarContainer.appendChild(contentItem);
  }

  addBtn.classList.add('btn', 'addBtn');
  addBtn.append('Add Element');
  addBtn.setAttribute('onclick', 'showContentOption(' + -1 + ')');
  sidebarContainer.appendChild(addBtn);
}

function showContentOption(i) {
  document.querySelector('.tabbed').style.display = 'none';
  document.querySelector('.contentOption').style.display = 'block';

  // Create save button
  var saveBtn = document.createElement('button');
  saveBtn.classList.add('btn', 'saveBtn');

  if (i != -1) {
    saveBtn.setAttribute('onclick', 'changeSlideShow(' + i + ' )');
    saveBtn.append('Save');
  } else {
    saveBtn.setAttribute('onclick', 'addSlide()');
    saveBtn.append('Add');
  }
  document.querySelector('.contentOptionContainer').appendChild(saveBtn);

  // get seleted image info and put to input box
  if (i != -1) {
    document.querySelector('#itemUrl').querySelector('input').value = options.contents[i];
    document.querySelector('#captainSetting').querySelector('input').value = options.captains[i];
    document.querySelector('#captainSetting').querySelectorAll('input')[1].value = options.captainFontSizes[i];

    if (options.fileType[i] == 'image') document.querySelector('#image').checked = true;
    else document.querySelector('#other').checked = true;

    document.querySelector('#descriptionSetting').querySelector('textarea').value = '';
    for (let j = 0; j < options.descriptions[i].length; j++)
      document.querySelector('#descriptionSetting').querySelector('textarea').value += options.descriptions[i][j] + '\n';
    document.querySelector('#descriptionSetting').querySelector('input').value = options.descritpionFontSizes[i];
  }
}

function backToContent() {
  document.querySelector('.tabbed').style.display = 'block';
  document.querySelector('.contentOption').style.display = 'none';
  document.querySelector('.saveBtn').remove();
}

function changeSlideShow(i) {
  options.contents[i] = document.querySelector('#itemUrl').querySelector('input').value;
  options.captains[i] = document.querySelector('#captainSetting').querySelector('input').value;
  options.captainFontSizes[i] = Number.parseInt(document.querySelector('#captainSetting').querySelectorAll('input')[1].value);

  if (document.querySelector('#image').checked) options.fileType[i] = 'image';
  else options.fileType[i] = 'other';

  options.descriptions[i] = [];
  var lines = document.querySelector('#descriptionSetting').querySelector('textarea').value.split('\n');
  for (let j = 0; j < lines.length; j++) options.descriptions[i].push(lines[j]);

  options.descritpionFontSizes[i] = Number.parseInt(document.querySelector('#descriptionSetting').querySelector('input').value);

  myWindowGlobalLibraryName.setSlideShowOptions(options);

  createContentList();
  backToContent();
}

function deleteSlide(i) {
  options.contents.splice(i, 1);
  options.captains.splice(i, 1);
  options.captainFontSizes.splice(i, 1);
  options.descriptions.splice(i, 1);
  options.descritpionFontSizes.splice(i, 1);
  options.fileType.splice(i, 1);

  myWindowGlobalLibraryName.setSlideShowOptions(options);
  createContentList();
}
function addSlide() {
  options.contents.push(document.querySelector('#itemUrl').querySelector('input').value);
  options.captains.push(document.querySelector('#captainSetting').querySelector('input').value);
  var captainFontSize = Number.parseInt(document.querySelector('#captainSetting').querySelectorAll('input')[1].value);
  if (captainFontSize) options.captainFontSizes.push(captainFontSize);
  else options.captainFontSizes.push(24);

  if (document.querySelector('#image').checked) options.fileType.push('image');
  else options.fileType.push('other');

  options.descriptions.push([]);
  var lines = document.querySelector('#descriptionSetting').querySelector('textarea').value.split('\n');
  for (let j = 0; j < lines.length; j++) options.descriptions[options.descriptions.length - 1].push(lines[j]);

  var descritpionFontSize = Number.parseInt(document.querySelector('#descriptionSetting').querySelector('input').value);
  if (descritpionFontSize) options.descritpionFontSizes.push(descritpionFontSize);
  else options.descritpionFontSizes.push(15);

  myWindowGlobalLibraryName.setSlideShowOptions(options);
  createContentList();
  backToContent();
}

function getSlideEffectOffect() {
  if (options.effectType == 'transition') {
    document.querySelector('#displayDuration').parentElement.parentElement.style.display = 'none';
    document.querySelector('#backgroundOption').style.display = 'none';
    document.querySelector('#backgroundDuration').parentElement.parentElement.style.display = 'none';
    document.querySelector('#backgroundDelay').parentElement.parentElement.style.display = 'none';
    document.querySelector('#captainDuration').parentElement.parentElement.style.display = 'none';
    document.querySelector('#captainDelay').parentElement.parentElement.style.display = 'none';
    document.querySelector('#descriptionDuration').parentElement.parentElement.style.display = 'none';
    document.querySelector('#descriptionDelay').parentElement.parentElement.style.display = 'none';
    document.querySelector('#slideHorizontal').parentElement.parentElement.style.display = 'flex';
  } else {
    document.querySelector('#displayDuration').parentElement.parentElement.style.display = 'flex';
    document.querySelector('#backgroundOption').style.display = 'flex';
    document.querySelector('#backgroundDuration').parentElement.parentElement.style.display = 'flex';
    document.querySelector('#backgroundDelay').parentElement.parentElement.style.display = 'flex';
    document.querySelector('#captainDuration').parentElement.parentElement.style.display = 'flex';
    document.querySelector('#captainDelay').parentElement.parentElement.style.display = 'flex';
    document.querySelector('#descriptionDuration').parentElement.parentElement.style.display = 'flex';
    document.querySelector('#descriptionDelay').parentElement.parentElement.style.display = 'flex';
    document.querySelector('#slideHorizontal').parentElement.parentElement.style.display = 'none';
  }

  document.querySelector('#autoPlay').checked = options.autoPlay;
  document.querySelector('#hasCaptain').checked = options.hasCaptain;
  document.querySelector('#hasDescription').checked = options.hasDescription;

  document.querySelector('#displayDuration').value = this.options.displayDuration;
  document.querySelector('#backgroundDuration').value = this.options.backgroundDuration;
  document.querySelector('#backgroundDelay').value = this.options.backgroundDelay;
  document.querySelector('#captainDuration').value = this.options.captainDuration;
  document.querySelector('#captainDelay').value = this.options.captainDelay;
  document.querySelector('#descriptionDuration').value = this.options.descriptionDuration;
  document.querySelector('#descriptionDelay').value = this.options.descriptionDelay;
  document.querySelector('#captainColor').value = options.captainColor;
  document.querySelector('#captainFontSize').value = options.captainFontSize;
  document.querySelector('#descritpionFontSize').value = options.descritpionFontSize;
  document.querySelector('#descriptionColor').value = options.descriptionColor;
  document.querySelector('#textPosition').value = options.textPosition;
  document.querySelector('#navigationPosition').value = options.navigationPosition;
  document.querySelector('#navigationBackgroundColor').value = options.navigationBackgroundColor;
  document.querySelector('#navigationBorderColor').value = options.navigationBorderColor;

  if (options.navigationDirection == 'horizontal') document.querySelector('#horizontal').checked = true;
  else document.querySelector('#vertical').checked = true;

  document.querySelector('#navigationSize').value = options.navigationSize;
  document.querySelector('#navigationSize').parentElement.children[1].innerHTML = options.navigationSize;
  document.querySelector('#navigationSpace').value = options.navigationSpace;
  document.querySelector('#navigationSpace').parentElement.children[1].innerHTML = options.navigationSpace;
  document.querySelector('#hasNavigation').value = options.hasNavigation;
  document.querySelector('#hasArrow').value = options.hasArrow;
  document.querySelector('#arrowColor').value = options.arrowColor;
  document.querySelector('#arrowBackgroundColor').value = options.arrowBackgroundColor;

  if (options.slideDirection == 'vertical') document.querySelector('#slideVertical').checked = true;
  else document.querySelector('#slideHorizontal').checked = true;

  var families = document.querySelector('#captainFontFamily').querySelectorAll('option');
  for (let i = 0; i < families.length; i++) {
    if (families[i].value == options.captainFontFamily) {
      document.querySelector('#captainFontFamily').selectedIndex = i;
      break;
    }
  }

  families = document.querySelector('#descriptionFontFamily').querySelectorAll('option');
  for (let i = 0; i < families.length; i++) {
    if (families[i].value == options.descriptionFontFamily) {
      document.querySelector('#descriptionFontFamily').selectedIndex = i;
      break;
    }
  }

  var gridItems = document.querySelectorAll('.grid-item');
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.remove('grid-item-active');
  }
  for (let i = 0; i < gridItems.length; i++) {
    if (gridItems[i].querySelector('i').outerHTML == options.arrowIcon) gridItems[i].classList.add('grid-item-active');
  }
}

function setEffectOption() {
  options.autoPlay = document.querySelector('#autoPlay').checked;
  options.hasCaptain = document.querySelector('#hasCaptain').checked;
  options.hasDescription = document.querySelector('#hasDescription').checked;
  this.options.displayDuration = document.querySelector('#displayDuration').value;
  this.options.backgroundDuration = document.querySelector('#backgroundDuration').value;
  this.options.backgroundDelay = document.querySelector('#backgroundDelay').value;
  this.options.captainDuration = document.querySelector('#captainDuration').value;
  this.options.captainDelay = document.querySelector('#captainDelay').value;
  options.captainFontSize = document.querySelector('#captainFontSize').value;
  options.descritpionFontSize = document.querySelector('#descritpionFontSize').value;
  this.options.descriptionDuration = document.querySelector('#descriptionDuration').value;
  this.options.descriptionDelay = document.querySelector('#descriptionDelay').value;
  this.options.captainColor = document.querySelector('#captainColor').value;
  this.options.descriptionColor = document.querySelector('#descriptionColor').value;
  this.options.textPosition = document.querySelector('#textPosition').value;
  this.options.navigationPosition = document.querySelector('#navigationPosition').value;
  if (document.querySelector('#horizontal').checked) this.options.navigationDirection = 'horizontal';
  else this.options.navigationDirection = 'vertical';
  this.options.navigationBackgroundColor = document.querySelector('#navigationBackgroundColor').value;
  this.options.navigationBorderColor = document.querySelector('#navigationBorderColor').value;
  this.options.navigationSize = this.document.querySelector('#navigationSize').value;
  this.options.navigationSpace = this.document.querySelector('#navigationSpace').value;
  this.options.hasNavigation = this.document.querySelector('#hasNavigation').checked;
  this.options.hasArrow = this.document.querySelector('#hasArrow').checked;
  this.options.arrowColor = this.document.querySelector('#arrowColor').value;
  this.options.arrowBackgroundColor = this.document.querySelector('#arrowBackgroundColor').value;

  this.options.captainFontFamily = document.querySelector('#captainFontFamily').value;
  this.options.descriptionFontFamily = document.querySelector('#descriptionFontFamily').value;

  if (this.options.effectType == 'transition') {
    if (document.querySelector('#slideHorizontal').checked) {
      this.options.slideDirection = 'horizontal';
    } else {
      this.options.slideDirection = 'vertical';
    }
  }

  var gridItems = document.querySelectorAll('.grid-item');

  for (let i = 0; i < gridItems.length; i++) {
    if (gridItems[i].className.includes('grid-item-active')) options.arrowIcon = gridItems[i].querySelector('i').outerHTML;
  }
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.remove('grid-item-active');
  }
  for (let i = 0; i < gridItems.length; i++) {
    if (gridItems[i].querySelector('i').outerHTML == options.arrowIcon) gridItems[i].classList.add('grid-item-active');
  }

  if (options.slideDirection == 'vertical' && options.effectType == 'transition') {
    document.querySelector('.slideshow-container').style.width = '600px';
    document.querySelector('.slideshow-container').style.height = '600px';
  } else {
    document.querySelector('.slideshow-container').style.width = '900px';
    document.querySelector('.slideshow-container').style.height = '500px';
  }

  document.querySelector('#tab2').checked = true;
  console.log(options);
  myWindowGlobalLibraryName.setSlideShowOptions(options);
}

function selectIcon(item) {
  var gridItem = document.querySelectorAll('.grid-item');

  for (let i = 0; i < gridItem.length; i++) {
    gridItem[i].classList.remove('grid-item-active');
  }
  item.classList.add('grid-item-active');
}
