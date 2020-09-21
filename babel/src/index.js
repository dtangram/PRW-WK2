import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



$(document).ready(function(){
  const nameInput = $(".name");
  const descInput = $(".desc");
  const categoryInput = $(".category");
  const errorName = $(".errorName");
  const errorDesc = $(".errorDesc");
  const errorCategory = $(".errorCategory");

  let nameVal = nameInput.val();
  let descVal = descInput.val();
  let categoryVal = categoryInput.val();


  $.ajax({
    type: "GET",
    url: "https://api.myjson.com/bins/gg3eh",
    dataType: "json",
    success: function(recipe){
      $.each(recipe, function(i, recipes){
        $("section:nth-child(3) div:nth-child(1)").append("<article><img src='img/bourbonSteak.jpg'> <p>" + recipes[0].category + "</p> <h3>" + recipes[0].title + "</h3> <p>" + recipes[0].description + "</p> <p>" + recipes[0].starRating + "</p><img class='deleteBTN' src='img/delete.png'></article>");
        $("section:nth-child(3) div:nth-child(1)").append("<article><img src='img/deviledeggs.jpg'> <p>" + recipes[1].category + "</p> <h3>" + recipes[1].title + "</h3> <p>" + recipes[1].description + "</p> <p>" + recipes[1].starRating + "</p><img class='deleteBTN' src='img/delete.png'></article>");
        $("section:nth-child(3) div:nth-child(1)").append("<article><img src='img/keylimepie.jpg'> <p>" + recipes[2].category + "</p> <h3>" + recipes[2].title + "</h3> <p>" + recipes[2].description + "</p> <p>" + recipes[2].starRating + "</p><img class='deleteBTN' src='img/delete.png'></article>");
        $("section:nth-child(3) div:nth-child(1)").append("<article><img src='img/bakedOatmeal.jpg'> <p>" + recipes[3].category + "</p> <h3>" + recipes[3].title + "</h3> <p>" + recipes[3].description + "</p> <p>" + recipes[3].starRating + "</p><img class='deleteBTN' src='img/delete.png'></article>");
      });
    }
  });



  // FORM VALIDATION
  nameInput.focus();

  nameInput.focusout("blur", checkName, false);
  descInput.focusout("blur", checkDesc, false);
  categoryInput.focusout("blur", checkCategory, false);

  var modalPopups = function(inputField, inputValid){
    var formOBJ = {};

    formOBJ.inputField = inputField;
    formOBJ.inputValid = inputValid;

    formOBJ.inputBorder = function(){
      if(formOBJ.inputValid.length <= 0){
        $(formOBJ.inputField).css("border", "solid 2px #FF0000");
      }

      else if(formOBJ.inputValid.length < 4){
        $(formOBJ.inputField).css("border", "solid 2px #FF0000");
      }
    };

    return formOBJ;
  };

  let nameInput1 = modalPopups(nameInput, nameVal);
  let descInput1 = modalPopups(descInput, descVal);
  let categoryInput1 = modalPopups(categoryInput, categoryVal);



  //NAME VALIDATION
  function checkName(){
    if(this.value.length <= 0){
      nameInput1.inputBorder();
      errorName.html("Enter recipe name");
    }

    else if(this.value.length < 4){
      nameInput1.inputBorder();
      errorName.html("Not a valid recipe name");
    }

    else{
      nameInput.css("border", "0");
      errorName.html("");
    }
  }

  //EMAIL VALIDATION
  function checkDesc(){
    if(this.value.length <= 0){
      descInput1.inputBorder();
      errorDesc.html("Enter a description");
    }

    else if(this.value.length < 4){
      descInput1.inputBorder();
      errorDesc.html("Not a valid description");
    }

    else{
      descInput.css("border", "0");
      errorDesc.html("");
    }
  }

  //CATEGORY VALIDATION
  function checkCategory(){
    if(this.value.length <= 0){
      categoryInput1.inputBorder();
      errorCategory.html("Enter a category");
    }

    else if(this.value.length < 4){
      categoryInput1.inputBorder();
      errorCategory.html("Not a valid category");
    }

    else{
      categoryInput.css("border", "0");
      errorCategory.html("");
    }
  }

  //LOCAL STORAGE
  nameVal = localStorage.getItem('nameVal');
  descVal = localStorage.getItem('descVal');
  categoryVal = localStorage.getItem('categoryVal');

  if(localStorage.getItem('nameVal') && localStorage.getItem('descVal') && localStorage.getItem('categoryVal')){
      $("section:nth-child(3) div:nth-child(2)").css("display", "block").html("<p>" + nameVal + "</p>" + "<p>" + descVal + "</p>" + "<p>" + categoryVal + "</p> <img class='deleteBTN' src='img/delete.png'>");
  }

  //SUBMIT
  $("#menuForm").submit(function(event){
    event.preventDefault();

    nameVal = nameInput.val();
    descVal = descInput.val();
    categoryVal = categoryInput.val();

    //LOCAL STORAGE
    localStorage.setItem('nameVal', nameVal);
    localStorage.setItem('descVal', descVal);
    localStorage.setItem('categoryVal', categoryVal);

    $("section:nth-child(3) div:nth-child(2)").css("display", "block").html("<p>" + nameVal + "</p>" + "<p>" + descVal + "</p>" + "<p>" + categoryVal + "</p> <img class='deleteBTN' src='img/delete.png'>");
  });


  //DELETE MENUS
  $("section:nth-child(3)").on("click", ".deleteBTN", function(){
    $(this).closest("article, div:nth-child(2)").remove();
  });
});
