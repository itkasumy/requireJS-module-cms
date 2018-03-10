define(["jquery", "text!tpls/courseTimeList.html", "common/api", "arttemplate", "courseTime/edit"], function($, courseTimeListTpl, api, art, courseTimeEdit) {
    return function(csId) {
        api.get("course/lesson", {"cs_id": csId}, function(res) {
            var courseTimeList = $(art.render(courseTimeListTpl, res.result))
            .on("click", ".btnEdit", function() {
                var ctId = $(this).parent().attr("ctId");
                courseTimeEdit(ctId);
            })
            .appendTo($(".main").empty());
        });
    }
});