define(["jquery", "text!tpls/courseCategoryAdd.html", "arttemplate", "common/api"], function($, courseCategotyAddTpl, art, api) {
    return function() {
        $("#modalAddCourseCategory").remove();
        api.get("category/top", {}, function(res) {
            res.result.unshift({cg_id: 0, cg_name: "顶级分类"});
            var courseCategotyAdd = art.render(courseCategotyAddTpl, res);

            var $courseCategotyAdd = $(courseCategotyAdd)
            .on("submit", "form", function() {
                var formData = $(this).serialize();
                api.post("category/add", formData, function() {
                    $courseCategotyAdd.modal("hide");
                    $(".aside .list-group .category").trigger("click");
                });
                return false;
            })
            .appendTo("body").modal();
        });        
    }
});