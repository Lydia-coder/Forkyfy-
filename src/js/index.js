import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import * as searchView from "./views/searchView"; //import all functions
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import { elements, renderLoader, clearLoader } from "./views/base";
// index.js is controller

/**global state of the app
 * - Search object
 * - current recipe object
 * - shoppinglist object
 * - liked recipes
 */
const state = {};
window.state = state;
/** SEARCH controller */

const controleSearch = async () => {
  // 1 get query from view
  const query = searchView.getInput(); // todo
  //const query = "pizza";
  if (query) {
    // 2 new seacrh object and add it to state
    state.search = new Search(query);
    // 3 prepare ui for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);
    try {
      // 4 seeach for recipes
      await state.search.getResults();
      // 5 render results on ui
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert("something went wrong");
      clearLoader();
    }
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controleSearch();
});

//testing
// window.addEventListener("load", (e) => {
//   e.preventDefault();
//   controleSearch();
// });

elements.searchResultPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/** RECIPE controller /#47746z*/
const controleRecipe = async () => {
  //get id from url
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // prepare ui for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    // highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    // create new recipe object
    state.recipe = new Recipe(id);

    //TESTING
    // window.r = state.recipe;

    // get recipe data and parse ingredients
    try {
      await state.recipe.getRecipe();
      //console.log(state.recipe.ingredients, "??");
      state.recipe.parseIngredients();

      // calc servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      //console.log(state.recipe);
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert("error processing recipe");
    }
  }
};
// window.addEventListener("hashchange", controleRecipe);
// window.addEventListener("load", controleRecipe);
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controleRecipe)
);
/**LIST Controller */

const controlList = () => {
  // Create a new list IF there in none yet
  if (!state.list) state.list = new List();

  // Add each ingredient to the list and UI
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};
// handle delete and update item events
elements.shopping.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;

  //handle delete button

  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    // delete from state
    state.list.deleteItem(id);
    // delte from ui
    listView.deleteItem(id);
  } else if (e.target.matches(".shopping__count-value")) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

// handeling recipe button clicks
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    // decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.undateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    // increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.undateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    controlList();
  }
  //console.log(state.recipe);
});
