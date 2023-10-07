console.log(
  'I said nothing to see here!\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWell hello there...\nNothing to see here...'
);

window.gameVars = {};

if (!document.location.hash) {
  document.location.hash = document.querySelector('.show-start').id;
  document.location.reload();
} else {
  document.querySelector(document.location.hash).style.display = 'block';
  var func = function () {
    document.querySelector(document.location.hash).style.opacity =
      new Number(document.querySelector(document.location.hash).style.opacity) +
      0.1;
    if (document.querySelector(document.location.hash).style.opacity == 1) {
      clearTimeout(timeout);
    } else {
      timeout = setTimeout(function () {
        func();
      }, 50);
    }
  };
  var timeout = setTimeout(func, 50);
  if (
    '#' + document.querySelector('.show-start').id ==
    document.location.hash
  ) {
    document.querySelector('.title').style.display = 'none';
  }
}

function change_page_wrapper(page) {
  return function () {
    var func = function () {
      document.querySelector(document.location.hash).style.opacity =
        new Number(
          document.querySelector(document.location.hash).style.opacity
        ) - 0.1;
      if (document.querySelector(document.location.hash).style.opacity == 0) {
        clearTimeout(timeout);
        document.querySelector(document.location.hash).style.display = 'none';
        document.location.hash = page;
        document.location.reload();
      } else {
        timeout = setTimeout(function () {
          func();
        }, 50);
      }
    };
    var timeout = setTimeout(func, 50);
  };
}

var includes = Array.from(document.querySelectorAll('.include'));
for (var i in includes) {
  var item = includes[i];
  item.innerHTML = document.querySelector(item.dataset.include).innerHTML;
}
var buttons_change = Array.from(document.querySelectorAll('.change-page'));
for (var i in buttons_change) {
  var item = buttons_change[i];
  item.addEventListener('click', change_page_wrapper(item.dataset.toPage));
  if (Array.from(item.classList).includes('set-var')) {
    item.addEventListener('click', function () {
      gameVars[item.dataset.var] = eval(item.dataset.value);
    });
  }
}

var ending_divs = Array.from(document.querySelectorAll('.ending'));
for (var i in ending_divs) {
  var item = ending_divs[i];
  item.outerHTML = `
  You reached an ending! This is the ${item.dataset.endingTitle}. This is a ${item.dataset.endingFeeling} ending.<br><br><button class="change-page temporary-place-button" data-to-page="start">Restart?</button>
  `;
  document.querySelector('.temporary-place-button').onclick =
    change_page_wrapper(
      document.querySelector('.temporary-place-button').dataset.toPage
    );
}

var random_items = Array.from(document.querySelectorAll('.random'));
for (var i in random_items) {
  var item = random_items[i];
  item.innerHTML = eval(item.dataset.items)[
    Math.floor(Math.random() * eval(item.dataset.items).length)
  ];
}
