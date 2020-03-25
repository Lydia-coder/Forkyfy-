import Search from "./models/Search";
import * as searchView from "./views/searchView"; //import all functions
import { elements, renderLoader, clearLoader } from "./views/base";

/**global state of the app
 * - Search object
 * - current recipe object
 * - shoppinglist object
 * - liked recipes
 */
const state = {};

const controleSearch = async () => {
  // 1 get query from view
  const query = searchView.getInput(); // todo

  if (query) {
    // 2 new seacrh object and add it to state
    state.search = new Search(query);
    // 3 prepare ui for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);

    // 4 seeach for recipes
    await state.search.getResults();
    // 5 render results on ui
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controleSearch();
});

// index.js is controller
