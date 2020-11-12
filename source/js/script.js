window.onload = function() {
  const merrywrap = document.querySelector(`#merrywrap`);
  const boxes = merrywrap.querySelectorAll(`.giftbox`);
  const overlay = document.querySelector(`#overlay`);
  const openingGiftWrap = merrywrap.querySelector(`#opening-wrap`);
  let activeBox = null;
  let step=1;
  const STEP_MINUTES=[1000,2000,1000,1000];

  /**
   * Добавляем каждой коробке обработчик события наведения курсора
   * При наведении курсора на коробку добавляем ей обработчик клика на эту коробку и
   * обработчик события ухода курсора с этой коробки
   */
  const init = () => {
    boxes.forEach((box) => {
      box.addEventListener(`mouseover`, function _handler() {

        if(!activeBox || box !== activeBox) {
          activeBox = box;
          box.addEventListener(`click`, function _listener() {
            selectBox(box);
            box.removeEventListener(`click`, _listener, true);
            box.removeEventListener(`mouseover`, _handler, true);
          }, true);
        }

        addShake(box);
      },true);

    });
  };

  /**
   * Добавляет классы, отвечающие за визуальное отображение коробки на короторой находится курсор
   * @param box
   */
  const addShake = (box) => {
    if (box) {
      box.classList.add(`shake`, `shadow`, `scaled`);
      box.addEventListener(`mouseout`, () => {
        removeShake(box)
      });
    }
  };

  /**
   * Убирает классы, отвечающие за визуальное отображение коробки на короторой находится курсор
   * @param box
   */
  const removeShake = (box) => {
    if (box) {
      box.classList.remove(`shake`, `shadow`, `scaled`);
    }
  };

  /**
   * Добавляет классы, отвечающие за события при выборе коробки для открытия
   * @param box
   */
  const selectBox = (box) => {
    removeShake(box);
    box.classList.add(`selected`);
    overlay.classList.add(`overlay`);
    openingGiftWrap.classList.add(`opening-wrap`);

    box.addEventListener(`click`, function _handler() {
      openBox(box);
      box.removeEventListener(`click`, _handler, true);
    }, true);
  };

  const openBox = (box) => {
    // console.log(`open box`, box);
    box.classList.add(`step-10`);
    stepClass(box, 1);
  };

  const stepClass = (box, step) => {
    console.log('1', box.classList);
    box.classList.remove(function(css) {
      return (css.match(/step-../g) || []).join('');
    });
    console.log('2', box.classList);
    // box.className='merrywrap';
    // box.className='merrywrap step-'+step;
  };

  init();

};
