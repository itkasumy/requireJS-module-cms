define(["jquery", "text!tpls/courseCategoryEdit.html", "arttemplate", "common/api"], function($, courseCategoryEditTpl, art, api) {
    return function(cgId) {
        $("#modalEditCourseCategory").remove();
        api.get("category/edit", {cg_id: cgId}, function(res) {
            res.result.top.unshift({
                "cg_id": 0,
                "cg_name": "顶级分类"
            });
            var $courseCategoryEdit = $(art.render(courseCategoryEditTpl, res.result))
            .on("submit", "form", function() {
                var formData = $(this).serialize();
                api.post("category/modify", formData, function() {
                    $courseCategoryEdit.modal("hide");
                    $(".aside .list-group .category").trigger("click");
                });
                return false;
            })
            .appendTo("body").modal();
        });
        
    }
});