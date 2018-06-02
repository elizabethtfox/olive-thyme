$(document).ready(function() {
    /* global moment */

    // savedRecipes Container holds all of our posts
    var savedRecipesContainer = $(".recipe-container");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleRecipeDelete);
    $(document).on("click", "button.edit", handleRecipeEdit);
    // Variable to hold our posts
    var recipes;

    // The code below handles the case where we want to get recipe posts for a specific category
    // Looks for a query param in the url for category_id
    var url = window.location.search;
    var categoryId;
    if (url.indexOf("?category_id=") !== -1) {
        categoryId = url.split("=")[1];
        getRecipes(categoryId);
    }
    // If there's no categoryId we just get all posts as usual
    else {
        getRecipes();
    }


    // This function grabs recipes from the database and updates the view
    function getRecipes(category) {
        categoryId = category || "";
        if (categoryId) {
            categoryId = "/?category_id=" + categoryId;
        }
        $.get("/api/recipes" + categoryId, function(data) {
            console.log("Recipes", data);
            recipes = data;
            if (!recipes || !recipes.length) {
                displayEmpty(category);
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete recipes
    function deleteRecipes(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/recipes/" + id
        })
            .then(function() {
                getRecipes(postCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed recipe HTML inside savedRecipesContainer
    function initializeRows() {
        savedRecipesContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        savedRecipesContainer.append(postsToAdd);
    }

    // This function constructs a recipe's HTML
    function createNewRow(recipe) {
        var formattedDate = new Date(recipe.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newRecipeCard = $("<div>");
        newRecipeCard.addClass("card");
        var newRecipeCardHeading = $("<div>");
        newRecipeCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newRecipeName = $("<h2>");
        var newRecipeDate = $("<small>");
        var newRecipeCategory = $("<h5>");
        newRecipeCategory.text("Written by: " + post.Category.name);
        newRecipeCategory.css({
            float: "right",
            color: "blue",
            "margin-top":
                "-10px"
        });
        var newRecipeCardBody = $("<div>");
        newRecipeCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newRecipeName.text(post.title + " ");
        newPostBody.text(post.body);
        newRecipeDate.text(formattedDate);
        newRecipeName.append(newRecipeDate);
        newRecipeCardHeading.append(deleteBtn);
        newRecipeCardHeading.append(editBtn);
        newRecipeCardHeading.append(newRecipeName);
        newRecipeCardHeading.append(newRecipeCategory);
        newRecipeCardBody.append(newPostBody);
        newRecipeCard.append(newRecipeCardHeading);
        newRecipeCard.append(newRecipeCardBody);
        newRecipeCard.data("post", post);
        return newRecipeCard;
    }

    // This function figures out which recipe we want to delete and then calls deleteRecipe
    function handleRecipeDelete() {
        var currentRecipe = $(this)
            .parent()
            .parent()
            .data("post");
        deleteRecipes(currentRecipe.id);
    }

    // This function figures out which recipe we want to edit and takes it to the appropriate url
    function handleRecipeEdit() {
        var currentRecipe = $(this)
            .parent()
            .parent()
            .data("post");
        window.location.href = "/cms?recipe_id=" + currentRecipe.id;
    }

    // This function displays a message when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Category #" + id;
        }
        savedRecipesContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No recipes yet" + partial + ", navigate <a href='/cms" + query +
            "'>here</a> in order to get started.");
        savedRecipesContainer.append(messageH2);
    }

});