
const API = "https://www.themealdb.com/api/json/v1/1";

// API 1: Get random Italian recipes
async function getRecipes() {
    const response = await fetch(`${API}/filter.php?a=Italian`);
    const data = await response.json();

    displayRecipes(data.meals);
}

// API 2: Search recipes by name
async function searchRecipe() {
    const search = document.getElementById("searchInput").value;

    const response = await fetch(
        `${API}/search.php?s=${encodeURIComponent(search)}`
    );

    const data = await response.json();
    displayRecipes(data.meals);
}

// API 3: Get food categories
async function getCategories() {
    const response = await fetch(`${API}/categories.php`);
    const data = await response.json();

    const categoryList = document.getElementById("categoryList");

    categoryList.innerHTML = data.categories.map(category => `
        <button onclick="getCategory('${category.strCategory}')">
            ${category.strCategory}
        </button>
    `).join(" ");
}

// Display recipes
function displayRecipes(meals) {
    const recipeList = document.getElementById("recipeList");

    if (!meals) {
        recipeList.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipeList.innerHTML = meals.map(meal => `
        <div class="recipe-card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <a href="https://www.themealdb.com/meal/${meal.idMeal}"
               target="_blank">
               View Recipe
            </a>
        </div>
    `).join("");
}

// Filter recipes by category
async function getCategory(category) {
    const response = await fetch(
        `${API}/filter.php?c=${encodeURIComponent(category)}`
    );

    const data = await response.json();
    displayRecipes(data.meals);
}

// Load data when website opens
getRecipes();
getCategories();
