window.onload = function() {
  const merrywrap = document.getElementById("merrywrap");
  const boxes = merrywrap.querySelectorAll(".giftbox");

  function init() {
    console.log(typeof boxes);
    boxes.forEach(function(box) {
      box.addEventListener("mouseover", addShake);
    });
    // box.addEventListener("mouseover", addShake(box), false);
  }

  const addShake = function (evt) {
    const box = evt.target;
    box.removeEventListener("mouseover", addShake);
    merrywrap.className = 'merrywrap shake';
    box.addEventListener("mouseout", removeShake);
  };

  const removeShake = function (evt) {
    const box = evt.target;
    box.removeEventListener("mouseout", removeShake);
    merrywrap.className = 'merrywrap';
    box.addEventListener("mouseover", addShake);
  };

  init();

};
