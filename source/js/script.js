window.onload = function() {
  const merrywrap = document.getElementById(`merrywrap`);
  const boxes = merrywrap.querySelectorAll(`.giftbox`);

  const init = () => {
    boxes.forEach(function(box) {
      const activeAreas = box.querySelectorAll(`.active-area`);
      activeAreas.forEach(function(area) {
        area.addEventListener(`mouseover`, function(evt) {
          addShake(evt, box);
        });
      });
    });
  };


  const addShake = function (evt, box) {
    const area = evt.target;
    if (box) {
      box.classList.add(`shake`, `shadow`);
    }
    area.removeEventListener(`mouseover`, addShake);
    area.addEventListener(`mouseout`, function(){
      removeShake(evt, box)
    });
  };

  const removeShake = function (evt, box) {

    const area = evt.target;
    if(box) {box.classList.remove(`shake`, `shadow`);}
    // if(box) {box.classList.remove("shake");}
    area.removeEventListener(`mouseout`, removeShake);
    area.addEventListener(`mouseover`, addShake);
  };

  init();

};
