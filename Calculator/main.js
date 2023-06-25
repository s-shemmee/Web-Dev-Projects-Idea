// Selecting the necessary elements
var $keys = $(".calculator button"); // All the buttons
var $screen = $(".screen"); // The screen element where the calculations are displayed

// Variables
var decimal = false; // Flag to track if a decimal point has been added
var operators = ["+", "-", "x", "÷"]; // Array of operators

// Event handler for button clicks
$keys.click(function () {
  var keyVal = $(this).data("val"); // Get the value of the clicked button
  output = $(".screen").html(); // Get the current content of the screen

  console.log(keyVal);

  // Clear button
  if (keyVal == "clear") {
    $screen.html(""); // Clear the screen
    decimal = false; // Reset the decimal flag
  }
  // Equal button
  else if (keyVal == "=") {
    var equation = output; // Get the equation from the screen
    var lastChar = equation[equation.length - 1]; // Get the last character of the equation

    // Replace 'x' with '*' and '÷' with '/' for evaluation
    equation = equation.replace(/x/g, "*").replace(/÷/g, "/");

    // Remove the last character if it is an operator or a decimal point
    if (operators.indexOf(lastChar) > -1 || lastChar == ".")
      equation = equation.replace(/.$/, "");

    // Evaluate the equation and display the result on the screen
    if (equation) {
      $screen.html(eval(equation));
    }

    decimal = false; // Reset the decimal flag
  }
  // Operator buttons
  else if ($(this).parent().is(".operators")) {
    var lastChar = output[output.length - 1]; // Get the last character of the output

    // Append the operator to the screen if it is not empty and the last character is not an operator
    if (output != "" && operators.indexOf(lastChar) == -1) {
      $screen.html($screen.html() + keyVal);
    }
    // Append the '-' sign to the screen if it is empty and the clicked button is '-'
    else if (output == "" && keyVal == "-") {
      $screen.html($screen.html() + keyVal);
    }

    // Replace the last operator on the screen with the clicked operator if the last character is an operator and the output length is greater than 1
    if (operators.indexOf(lastChar) > -1 && output.length > 1) {
      $screen.html($screen.html().replace(/.$/, keyVal));
    }

    decimal = false; // Reset the decimal flag
  }
  // Decimal button
  else if (keyVal == ".") {
    // Add the decimal point to the screen if the decimal flag is not set
    if (!decimal) {
      $screen.html($screen.html() + keyVal);
      decimal = true; // Set the decimal flag
    }
  }
  // Number buttons
  else {
    $screen.html($screen.html() + keyVal); // Append the clicked button value to the screen
  }
});

// Keyboard events
$(window)
  .keydown(function (e) {
    console.log(e.which);
    var key;

    // Map the key codes to their corresponding values
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

    // Trigger a click event on the corresponding button with the matching value
    $('[data-val="' + key + '"]')
      .addClass("active")
      .click();
  })
  .keyup(function () {
    $(".active").removeClass("active"); // Remove the active class from the button
  });

// Automatic button click sequence
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
            $('[data-val="x"]').click();
              .delay(200)
              .queue(function () {
                $('[data-val="7"]').click();
              });
          });
      });
  });
