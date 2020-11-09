window.onload = function() {
  const merrywrap = document.getElementById(`merrywrap`);
  const boxes = merrywrap.querySelectorAll(`.giftbox`);
  let activeBox;

  /**
   * Добавляем каждой коробке обработчик события наведения курсора
   * При наведении курсора на коробку добавляем ей обработчик клика на эту коробку и
   * обработчик события ухода курсора с этой коробки
   */
  const init = () => {
    boxes.forEach((box) => {
      box.addEventListener(`mouseover`, function _handler() {
          console.log(activeBox);
          console.log('2');
          activeBox = box;
          addShake(box);

        box.addEventListener(`click`, function() {
          openBox(box)
        }, true);

      },true);

    });
  };

  /**
   * Добавляет классы, отвечающие за визуальное отображение коробки на короторой находится курсор
   * @param evt
   * @param box
   */
  const addShake = (box) => {
    if (box) {
      // box.classList.add(`shake`, `shadow`, `scaled`);
      box.classList.add(`shadow`);
      box.addEventListener(`mouseout`, () => {
        removeShake(box)
      });
      // box.addEventListener(`click`, function(evt) {
      //   openBox(evt, box);
      // })
    };
  };

  /**
   * Убирает классы, отвечающие за визуальное отображение коробки на короторой находится курсор
   * @param evt
   * @param box
   */
  const removeShake = (box) => {
    if (box) {
      // activeBox = '';
      box.classList.remove(`shake`, `shadow`, `scaled`);
      // box.removeEventListener(`click`, openBox);
    }
  };

  /**
   * Добавляет классы, отвечающие за события при открытии коробки
   * @param evt
   * @param box
   */
  const openBox = (box) => {
    // box.removeEventListener(`click`, openBox);
    console.log('event: ', box);
    // console.log('opened a box ', box);
  };

  init();

};
