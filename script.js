window.onload = function() {
  var merrywrap = document.getElementById("merrywrap");
  var box = merrywrap.getElementsByClassName("giftbox")[0];
  var step = 1;
  var isShake = false;

  function init() {
    box.addEventListener("mouseover", addShake, false);
  }

  function addShake() {
    box.removeEventListener("mouseover", addShake, false);
    merrywrap.className = 'merrywrap shake';
    box.addEventListener("mouseout", removeShake, false);
  }

  function removeShake() {
    box.removeEventListener("mouseout", removeShake, false);
    merrywrap.className = 'merrywrap';
    box.addEventListener("mouseover", addShake, false);
  }

  init();

}
