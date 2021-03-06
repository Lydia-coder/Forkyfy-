// where we get search query strings from user interface and where we print the resulst of the search
import { elements } from "./base";
export const getInput = () => elements.searchInput.value; // to get value of input field
export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
  elements.searchResultPages.innerHTML = "";
};

export const highlightSelected = (id) => {
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
  resultsArr.forEach((el) => {
    el.classList.remove("results__link--active");
  });

  document
    .querySelector(`.results__link[href="#${id}"]`)
    .classList.add("results__link--active");
};

// pasta with tomato and spinisch
// cur.length = length in letters of current word
/**
 * acc: 0/ acc + cur.length = 5 / newTitle = ["pasta"]  add word to array
 * acc: 5/ acc + cur.length = 9 / newTitle = ["pasta, with"]
 * acc: 9/ acc + cur.length = 15 / newTitle = ["pasta, with, tomato"]
 * acc: 15/ acc + cur.length = 18 / newTitle = ["pasta, with, tomato"]
 * acc: 18/ acc + cur.length = 24 / newTitle = ["pasta, with, tomato"]
 */
export const litmitRecipeTitle = (title, limit = 17) => {
  const newTitle = []; // adding to array isnt really mutating the array, that is why here we can use const 
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  // private function
  const markup = `
  <li>
                    <a class="results__link " href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${litmitRecipeTitle(
                              recipe.title
                            )}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
                <li>
  `;

  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

// type : prev or next
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto= ${
  type == "prev" ? page - 1 : page + 1
} >

<span>Page ${type == "prev" ? page - 1 : page + 1}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${
      type == "prev" ? "left" : "right"
    }"></use>
</svg>
</button>



`;

const renderButtons = (page, numResults, resultsPerPage) => {
  const pages = Math.ceil(numResults / resultsPerPage);

  let button;
  if (page === 1) {
    // button to go the next page
    button = createButton(page, "next");
  } else if (page < pages && pages > 1) {
    // both buttons
    button = `${createButton(page, "prev")}
              ${createButton(page, "next")}`;
  } else if (page === pages) {
    // only button to go to prev page
    button = createButton(page, "prev");
  }

  elements.searchResultPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
  // render suts of current page
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  // render pagination buttons
  renderButtons(page, recipes.length, resultsPerPage);
};
