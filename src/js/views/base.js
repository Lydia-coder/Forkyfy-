export const elements = {
  searchInput: document.querySelector(".search__field"),
  searchForm: document.querySelector(".search"),
  searchResult: document.querySelector(".results"),
  searchResultList: document.querySelector(".results__list")
};
// object containing all elements from dom

export const elementsStrings = {
  loader: "loader"
};

export const renderLoader = parent => {
  const loader = `
    <div class=${elementsStrings.loader}> 
    <svg> 
    <use href="img/icons.svg#icon-cw"></use>
    </svg>
    </div>
    
    `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementsStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
