window.onload = function() {
  const merrywrap = document.querySelector(`#merrywrap`);
  const boxes = merrywrap.querySelectorAll(`.giftbox`);
  const overlay = document.querySelector(`#overlay`);
  let activeBox = null;

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
            openBox(box);
            box.removeEventListener(`click`, _listener, false);
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
    };
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
   * Добавляет классы, отвечающие за события при открытии коробки
   * @param box
   */
  const openBox = (box) => {
    box.removeEventListener(`click`, openBox);
    removeShake(box);
    box.classList.add(`opened`);
    overlay.classList.add(`overlay`);
    console.log('click');
  };

  init();

};
