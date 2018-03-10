define(["jquery", "text!tpls/courseCategoryList.html", "arttemplate", "courseCategory/add", "courseCategory/edit"], function($, courseCategoryListTpl, art, courseCategoryAdd, courseCategoryEdit) {
    return function() {
        $.get("/api/category", {}, function(res) {
            if(!res.code == 200) throw new Error(res.msg);

            var $courseCategoryList = $(art.render(courseCategoryListTpl, res))
            .on("click", "#btnAddCategory", function() {
                courseCategoryAdd();
            })
            .on("click", ".edit", function() {
                var cgId = $(this).parent().attr("cgId");
                courseCategoryEdit(cgId);
            })
            .appendTo($(".contentContainer .main").empty());
        });
    }
});