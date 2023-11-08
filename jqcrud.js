$(function() {
    loadRecipies();
    $("#recipies").on("click", ".style", handleDelete);
    $("#recipies").on("click", ".styles", handleUpdate);
    $("#addBtn").click( addRecipie);
    $("#updateSave").click( function(){
        var id = $("#updateId").val();
        var title = $("#updateTitle").val();
        var body = $("#updateBody").val();
        
        $.ajax({
            url: "https://usman-fake-api.herokuapp.com/api/recipes/"+id,
            data:{title, body},
            method:"PUT",
            success: function(response) {
                console.log(response);
                loadRecipies();
                $("#updateModal").modal("hide");        
            }
        });
    });
});

 function handleUpdate() {
    $("#updateModal").modal("show");
    var btn = $(this);
    var parentDiv = btn.closest(".recipie");
    let id = parentDiv.attr("data-id");
    $.get("https://usman-fake-api.herokuapp.com/api/recipes/"+id, function(response){
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateBody").val(response.body);
        $("#updateModal").modal("show");
    });
}
function addRecipie(){
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/recipes",
        method:"POST",
        data:{title, body},
        success:function( response ) {
            console.log(response);
            loadRecipies();
        }
    });
}
function handleDelete(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipie");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/recipes/"+id,
        method:"DELETE",
        success: function()
        {
            loadRecipies();
        }
    });

}
function loadRecipies(){
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/recipes",
        method: "GET",
        error:function(response){
            var recipies = $("#recipies");
            recipies.html("An Error has occured");
        },
        success: function(response) {
            console.log(response);
            var recipies = $("#recipies");
            recipies.empty();
            for( var i=0; i<response.length; i++) {
                var rec = response[i];
                recipies.append(`<div class="recipie" data-id="${rec._id}"><h3>${rec.title}</h3><p><button class="style">delete</button> <button class="styles">Edit</button>${rec.body}</p></div>`);
                /* recipies.append("<div><h3>"+ rec.title +"</h3></div>"); */
            }
        }
    });
}