$(document).ready(function() {
    // Getting jQuery references to the recipe ingredients, directions, recipe name, form, and category select
    var ingrdInput = $("#ingredients");
    var dirInput = $("#directions");
    var recNameInput = $("#recipeName");
    var cmsForm = $("#recipe");
    var categorySelect = $("#category-name");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a recipe)
    var url = window.location.search;
    var recipeId;
    var categoryId;
    // Sets a flag for whether or not we're updating a recipe to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the recipe id from the url
    // In '?recipe_id=1', recipeId is 1
    if (url.indexOf("?recipe_id=") !== -1) {
        recipeId = url.split("=")[1];
        getRecipeData(recipeId, "recipe");
    }
    // Otherwise if we have a category_id in our url, preset the category select box to be our Category
    else if (url.indexOf("?category_id=") !== -1) {
        categoryId = url.split("=")[1];
    }

    // Getting the categories, and their recipes
    getCategories();

    // A function for handling what happens when the form to create a new recipe is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the recipe if we are missing a ingredients, directions, recipe name, or category
        if (!recNameInput.val().trim() || !dirInput.val().trim() || !ingrdInput.val().trim() || !categorySelect.val()) {
            return;
        }
        // Constructing a newRecipe object to hand to the database
        var newRecipe = {
            recipe_name: recNameInput
                .val()
                .trim(),
            recipe_ingredients: ingrdInput
                .val()
                .trim(),
            recipe_directions: dirInput
                .val()
                .trim(),
            CategoryId: categorySelect.val()
        };

        // If we're updating a recipe run updateRecipe to update a recipe
        // Otherwise run submitRecipe to create a whole new recipe
        if (updating) {
            newRecipe.id = recipeId;
            updateRecipe(newRecipe);
        }
        else {
            submitRecipe(newRecipe);
        }
    }

    // Submits a new recipe and brings user to blog page upon completion
    function submitRecipe(recipe) {
        $.post("/api/recipes", recipe, function() {
            window.location.href = "/blog";
        });
    }

    // Gets recipe data for the current recipe if we're editing, or if we're adding to a categories existing recipes
    function getRecipeData(id, type) {
        var queryUrl;
        switch (type) {
            case "recipe":
                queryUrl = "/api/recipes/" + id;
                break;
            case "category":
                queryUrl = "/api/categories/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function(data) {
            if (data) {
                console.log(data.CategoryId || data.id);
                // If this recipe exists, prefill our cms forms with its data
                recNameInput.val(data.title);
                ingrdInput.val(data.body);
                dirInput.val(data.body);
                categoryId = data.CategoryId || data.id;
                // If we have a recipe with this id, set a flag for us to know to update the recipe
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get Categories and then render our list of Categories
    function getCategories() {
        $.get("/api/categories", renderCategoryList);
    }
    // Function to either render a list of categories, or if there are none, direct the user to the page
    // to create an category first
    function renderCategoryList(data) {
        if (!data.length) {
            window.location.href = "/categories";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createCategoryRow(data[i]));
        }
        categorySelect.empty();
        console.log(rowsToAdd);
        console.log(categorySelect);
        categorySelect.append(rowsToAdd);
        categorySelect.val(categoryId);
    }

    // Creates the category options in the dropdown
    function createCategoryRow(category) {
        var listOption = $("<option>");
        listOption.attr("value", category.id);
        listOption.text(category.name);
        return listOption;
    }

    // Update a given recipe, bring user to the blog page when done
    function updateRecipe(recipe) {
        $.ajax({
            method: "PUT",
            url: "/api/recipes",
            data: recipe
        })
            .then(function() {
                window.location.href = "/blog";
            });
    }
});