let content = document.querySelector(".maincontent");
let ingredientsContent = document.querySelector(".ingredients");
function writeOut(data) {
  let recipe = [];
  
  for (let index = 0; index < data.results.length; index++) {
    recipe[index] = {
      Name: data.results[index].title,
      Image: data.results[index].image,
      Id: data.results[index].id,
      Time: data.results[index].readyInMinutes,
      Dishtype: data.results[index].dishTypes,
      Summary: data.results[index].summary,
    };
    console.log(data.results[index]);

    let recipeDiv = document.createElement("div");
    let imgDiv = document.createElement("div");
    let recipeInfoDiv = document.createElement("div");
    let recipeName = document.createElement("h5");
    let recipeImage = document.createElement("img");
    let recipeTime = document.createElement("p");
    let recipeType = document.createElement("p");
    let recipeSum = document.createElement("p");
    let toRecipe = document.createElement("button");
    let toFavorite = document.createElement("button");

    recipeSum.innerHTML = recipe[index].Summary;
    toRecipe.innerHTML = "View";
    toRecipe.className = "recipebtn";
    toRecipe.id = "Recipe" + recipe[index].Id;
    toFavorite.innerHTML = "Favorite";
    toFavorite.className = "favoritebtn";
    toFavorite.id = "Favorite" + recipe[index].Id;
    recipeDiv.id = "recipediv";
    recipeInfoDiv.id = "info";
    imgDiv.id = "imgdiv";
    recipeImage.src = recipe[index].Image;
    recipeType.innerHTML = "<b>Type of meal:</b> <br>" + recipe[index].Dishtype;
    recipeTime.innerHTML =
      "<b>Time:</b> <br>Ready in " + recipe[index].Time + " minutes";
    recipeName.innerHTML = recipe[index].Name;

    imgDiv.appendChild(recipeImage);
    imgDiv.appendChild(recipeType);
    imgDiv.appendChild(recipeTime);
    imgDiv.appendChild(toRecipe);
    imgDiv.appendChild(toFavorite);

    recipeInfoDiv.appendChild(recipeName);
    recipeInfoDiv.appendChild(recipeSum);

    recipeDiv.appendChild(imgDiv);
    recipeDiv.appendChild(recipeInfoDiv);

    content.appendChild(recipeDiv);

    favoriteRecipe(recipe[index].Id);
    viewRecipe(recipe[index].Id);
  }
}

let list = [];

function writeOutFavorite(data) {
  console.log(data);
  let recipeDiv = document.createElement("div");
  let imgDiv = document.createElement("div");
  let recipeInfoDiv = document.createElement("div");
  let recipeName = document.createElement("h5");
  let recipeImage = document.createElement("img");
  let recipeTime = document.createElement("p");
  let recipeType = document.createElement("p");
  let recipeSum = document.createElement("p");
  let toRecipe = document.createElement("button");

  recipeSum.innerHTML = data.summary;
  toRecipe.innerHTML = "View";
  toRecipe.className = "recipebtn";
  toRecipe.id = "Recipe" + data.Id;
  recipeDiv.id = "recipediv";
  recipeInfoDiv.id = "info";
  imgDiv.id = "imgdiv";
  recipeImage.src = data.image;
  recipeType.innerHTML = "<b>Type of meal:</b> <br>" + data.dishTypes;
  recipeTime.innerHTML =
    "<b>Time:</b> <br>Ready in " + data.readyInMinutes + " minutes";
  recipeName.innerHTML = data.title;

  imgDiv.appendChild(recipeImage);
  imgDiv.appendChild(recipeType);
  imgDiv.appendChild(recipeTime);
  imgDiv.appendChild(toRecipe);

  recipeInfoDiv.appendChild(recipeName);
  recipeInfoDiv.appendChild(recipeSum);

  recipeDiv.appendChild(imgDiv);
  recipeDiv.appendChild(recipeInfoDiv);

  content.appendChild(recipeDiv);

  viewRecipe(data.Id);
}

function favoriteRecipe(id) {
  let toFavorite = document.getElementById("Favorite" + id);
  toFavorite.addEventListener("click", function () {
    list.push(id);
  
    console.log(list);
  });
}


function viewRecipe(id) {
  let toRecipe = document.getElementById("Recipe" + id);
  toRecipe.addEventListener("click", function () {
    removeElement();

    let sendString = id + "/analyzedInstructions?stepBreakdown=true";
    console.log(sendString);

    getApiInstructions(sendString);
  });
}
function writeOutRecipe(data) {
  let instructions = [];
  let ingredientsDiv = document.createElement("div");
  ingredientsDiv.id = "ingredients";
  let createAltHeader = document.createElement("h3");

  createAltHeader.innerHTML = "Steps";
  content.appendChild(createAltHeader);

  let createAltHeader2 = document.createElement("h3");

  createAltHeader2.innerHTML = "Ingredients";
  ingredientsDiv.appendChild(createAltHeader2);

  for (let index = 0; index < data.length; index++) {
    for (let i = 0; i < data[index].steps.length; i++) {
      for (let j = 0; j < data[index].steps[i].ingredients.length; j++) {
        let Ingredients = [];

        Ingredients[j] = data[index].steps[i].ingredients[j].name;
        console.log(Ingredients[j]);
        let ingredients = document.createElement("p");
        ingredients.innerHTML = Ingredients[j];

        ingredientsDiv.appendChild(ingredients);
        ingredientsContent.appendChild(ingredientsDiv);
      }

      instructions[i] = {
        Instruction: data[index].steps[i].step,
        Number: data[index].steps[i].number,
      };

      console.log(instructions[i].Number + instructions[i].Instruction);

      let recipeDiv = document.createElement("div");

      let instructionNumber = document.createElement("h5");

      let instructionStep = document.createElement("p");

      recipeDiv.id = "recipediv";
      instructionNumber.innerHTML = instructions[i].Number;
      instructionNumber.style = "margin-right : 15px;";

      instructionStep.innerHTML = instructions[i].Instruction;

      recipeDiv.appendChild(instructionNumber);
      recipeDiv.appendChild(instructionStep);

      content.appendChild(recipeDiv);
    }
  }
}
