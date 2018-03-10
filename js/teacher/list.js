define(["jquery", "text!tpls/teacherList.html", "arttemplate", "teacher/teacherShowInfo", "teacher/add", "teacher/edit"], function($, teacherListTpl, art, teacherShowInfo, teacherAdd, teacherEdit) {
    return function() {
        $.get("/api/teacher", {}, function(res) {
            if(!res.code == 200) throw new Error(res.msg);

            var teacherListStr = art.render(teacherListTpl, res);

            $(teacherListStr).on("click", ".btnStatus", function() {
                var that = $(this);
                var data = {
                    tc_status: that.parent().attr("tcStatus"),
                    tc_id: that.parent().attr("tcId")
                };
                $.post("/api/teacher/handle", data, function(res) {
                    if(!res.code == 200) throw new Error(res.msg);

                    var tcStatus = res.result.tc_status;

                    that.text(tcStatus == 0 ? "注销" : "启用");
                    that.parent().attr("tcStatus", tcStatus);
                    that.parent().siblings(".tcStatus").text(tcStatus == 0 ? "启用" : "注销")
                });
            }).on("click", ".showInfo", function() {
                teacherShowInfo($(this).parent().attr("tcId"));
            }).on("click", "#btnAddTeacher", function() {
                teacherAdd();
            }).on("click", ".edit", function() {
                teacherEdit($(this).parent().attr("tcId"));
            })
            .appendTo($(".contentContainer .main").empty());

            
        });
    }
});