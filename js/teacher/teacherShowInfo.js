define(["jquery", "text!tpls/teacherShowInfo.html", "arttemplate", "bootstrap"], function($, teacherShowInfoTpl, art) {
    return function(tcId) {
        $("#modalTeacherInfo").remove();

        $.post("/api/teacher/view", {"tc_id": tcId}, function(res) { 
            if(res.code != 200) throw new Error(res.msg);
            var teacherShowInfo = art.render(teacherShowInfoTpl, res.result);
            $(teacherShowInfo).appendTo($("body")).modal();
        });
    }
});