define(["jquery", "text!tpls/courseBasicEdit.html", "common/api", "arttemplate"], function($, courseBasicEditTpl, api, art) {
    return function(csId) {
        api.get("course/basic", {"cs_id": csId}, function(res) {
            var courseTimeEdit = $(art.render(courseBasicEditTpl, res.result))
            .on("change", ".categoryTop", function() {
                var topId = $(this).val();
                api.get("category/child", {cg_id: topId}, function(res) {
                    var str = "";
                    res.result.forEach(function(v) {
                        str += "<option value='" + v.cg_id + "'>" + v.cg_name + "</option>";
                    });
                    courseTimeEdit.find(".categorySub").html(str);
                });                
            })        
            .on("submit", "form", function() {
                var formData = $(this).serialize();
                api.post("course/update/basic", formData, function() {
                    console.log("a");
                });
                return false;
            })
            .appendTo($(".main").empty());
        });
    }
}); 