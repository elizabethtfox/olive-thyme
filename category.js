$(document).ready(function() {
    //Getting references to the category input and category container, as well as the table body
    var categoryInput = $("category-name");
    var categoryList = $("tbody");
    var categoryContainer =$(".category-container");

    //Adding event listeners to the form to create a new object, and the button to delete 
    //A category
    $(document).on("submit", "#category-form", handleCategoryFormSubmit);
    $(document).on("click", ".delete-author", handleDeleteButtonPress);

    //Getting the initial list of categories
    getCategories();

    //A function to handle what happens when the form is submitted to create a new category
    function handleCategoryFormSubmit(event) {
        event.preventDefault();
        //Do not do anything if the name fields has not been filled out
        if (!categoryInput.val().trim().trim()) {
            return;
        }
        //Calling the upsertCategory function and passing in the value of the category input
        upsertCategory({
            category: categoryInput
            .val()
            .trim()
        });
    }
    //A function for creating a category. Calls getCategory upon completion
    function upsertCategory(categoryData) {
        $.post("/api/categories", categoryData)
        .then(getCategory);
    }

    // Function for creating a new list row for authors
    function createCategoryRow(categoryData) {
        var newTr = $("<tr>");
        newTr.data("category", categoryData);
        newTr.append("<td>" + categoryData.name + "</td>");
        newTr.append("<td> " + categoryData.Recipe.length + "</td>");
        newTr.append("<td><a href='../test/main.html?category_id=" + categoryData.id + "'>Home</a></td>");
        newTr.append("<td><a href='../test/options.html?category_id=" + categoryData.id + "'>Options</a></td>");
        newTr.append("<td><a href='../test/recipe.html?category_id=" + categoryData.id + "'>Create a Recipe</a></td>");
        newTr.append("<td><a href='../test/savedRecipes.html?category_id=" + categoryData.id + "'>Saved Recipes</a></td>");
        newTr.append("<td><a href='../test/category.html?category_id=" + categoryData.id + "'>Categories</a></td>");
        newTr.append("<td><a href='../test/shoppingList.html?category_id=" + categoryData.id + "'>Shopping List</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-category'>Delete Category</a></td>");
        return newTr;
    } 

    //Function for retrieving categories and getting them ready to be rendered to the page
    function getCategories() {
        $.get("/api/categories", function(data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createCategoryRow(data[i]));
            }
            renderCategoryList(rowsToAdd);
            categoryInput.val("");
        });

    }

    //A function for rendering the list of categories to the page
    function renderCategoryList(rows) {
        categoryList.children().not(":last").remove();
        categoryContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            categoryList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    //Function for handling what to render when there are no categories
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert-alert-danger");
        alertDiv.text("You must create a category before you can create a recipe");
        categoryContainer.append(alertDiv);
    }

    //Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("author");
        var id = listItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/categories/" + id
        })
        .then(getCategories);
    }
});

            
        
    

