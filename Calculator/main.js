var $keys = $(".calculator button");
var $screen = $(".screen");
var decimal = false;
var operators = ["+", "-", "x", "÷"];

$keys.click(function () {
  var keyVal = $(this).data("val");
  output = $(".screen").html();

  console.log(keyVal);

  // clear
  if (keyVal == "clear") {
    $screen.html("");
    decimal = false;
  }
  // equal
  else if (keyVal == "=") {
    var equation = output;
    var lastChar = equation[equation.length - 1];
    equation = equation.replace(/x/g, "*").replace(/÷/g, "/");
    if (operators.indexOf(lastChar) > -1 || lastChar == ".")
      equation = equation.replace(/.$/, "");
    if (equation) {
      $screen.html(eval(equation));
    }
    decimal = false;
  }
  // operators
  else if ($(this).parent().is(".operators")) {
    var lastChar = output[output.length - 1];
    if (output != "" && operators.indexOf(lastChar) == -1) {
      $screen.html($screen.html() + keyVal);
    } else if (output == "" && keyVal == "-") {
      $screen.html($screen.html() + keyVal);
    }
    if (operators.indexOf(lastChar) > -1 && output.length > 1) {
      $screen.html($screen.html().replace(/.$/, keyVal));
    }
    decimal = false;
  }
  // decimal
  else if (keyVal == ".") {
    if (!decimal) {
      $screen.html($screen.html() + keyVal);
      decimal = true;
    }
  }
  // buttons
  else {
    $screen.html($screen.html() + keyVal);
  }
});

$(window)
  .keydown(function (e) {
    console.log(e.which);
    switch (e.which) {
      case 96:
        key = 0;
        break;
      case 97:
        key = 1;
        break;
      case 98:
        key = 2;
        break;
      case 99:
        key = 3;
        break;
      case 100:
        key = 4;
        break;
      case 101:
        key = 5;
        break;
      case 102:
        key = 6;
        break;
      case 103:
        key = 7;
        break;
      case 104:
        key = 8;
        break;
      case 105:
        key = 9;
        break;
      case 111:
        key = "÷";
        break;
      case 109:
        key = "-";
        break;
      case 106:
        key = "x";
        break;
      case 107:
        key = "+";
        break;
      case 13:
        key = "=";
        break;
      case 110:
        key = ".";
        break;
      case 27:
        key = "clear";
        break;
      default:
        return false;
    }

    $('[data-val="' + key + '"]')
      .addClass("active")
      .click();
  })
  .keyup(function () {
    $(".active").removeClass("active");
  });

$('[data-val="clear"]')
  .click()
  .delay(100)
  .queue(function () {
    $('[data-val="1"]')
      .click()
      .delay(200)
      .queue(function () {
        $('[data-val="3"]')
          .click()
          .delay(200)
          .queue(function () {
            $('[data-val="x"]')
              .click()
              .delay(200)
              .queue(function () {
                $('[data-val="7"]').click();
              });
          });
      });
  });
