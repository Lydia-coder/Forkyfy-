// where we get search query strings from user interface and where we print the resulst of the search
import { elements } from "./base";
export const getInput = () => elements.searchInput.value; // to get value of input field
export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
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
const litmitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
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

const renderRecipe = recipe => {
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

export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};
