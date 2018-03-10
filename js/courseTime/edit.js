define(["jquery", "text!tpls/courseTimeEdit.html", "common/api", "arttemplate"], function($, courseTimeEditTpl, api, art) {
    return function(ctId) {
        api.get("course/chapter/edit", {"ct_id": ctId}, function(res) {
            var courseTimeEdit = $(art.render(courseTimeEditTpl, res.result))
            .on("submit", "form", function() {
                var formData = $(this).serialize();
                api.post("course/chapter/modify", formData, function() {
                    var ctCsId = res.result.ct_cs_id;
                    var courseTimeList = require("courseTime/list");
                    courseTimeList(ctCsId);
                    courseTimeEdit.modal("hide");
                });
                return false;
            })
            .appendTo($("body")).modal();
        });
    }
}); 