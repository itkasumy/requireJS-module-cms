define(["jquery", "text!tpls/teacherAdd.html", "arttemplate", "bootstrap", "datetime"], function($, teacherAddTpl, art) {
    $.fn.datetimepicker.dates['zh-CN'] = {
			days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
			daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
			daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
			months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			today: "今天",
			suffix: [],
			meridiem: ["上午", "下午"]
	};

    return function() {
        $("#modalAddTeacher").remove();
        var teacherAdd = $(teacherAddTpl)
        .on("submit", "form", function() {
            var formData = $(this).serialize();
            $.post("/api/teacher/add", formData, function(res) {
                if(res.code != 200) throw new Error(res.msg);

                $(".aside .list-group .teacherManager").trigger("click");
            });
            teacherAdd.modal("hide");
            return false;
        })
        .appendTo($("body")).modal();

        teacherAdd.find(".dateJoin").datetimepicker({
            format: "yyyy-mm-dd",
            language: "zh-CN",
            autoclose: true,
            todayHighlight: true,
            todayBtn: true,
            minView: "month"
        });
    }
});