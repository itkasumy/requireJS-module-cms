define(["jquery", "common/api", "text!tpls/courseManagerList.html", "courseTime/list", "courseTime/editBasicInfo", "arttemplate", "course/pic"], function ($, api, courseManagerListTpl, courseTimeList, editBasicInfo, art, coursePic) {
	return (function () {
		api.get("course", {}, function (res) {
			var courseManagerList = $(art.render(courseManagerListTpl, res.result))
				.on("click", ".editCourseTime", function () {
					var csId = $(this).parent().attr("csId");
					// $(".aside .list-group .courseTimeManager").attr("csId", csId).trigger("click");
					courseTimeList(csId);
				})
				.on("click", ".editBasicInfo", function () {
					var csId = $(this).parent().attr("csId");
					editBasicInfo(csId);
				})
				.on("click", "img", function () {
					var csId = $(this).parent().attr("csId");
					coursePic(csId);
				})
				.appendTo($(".main").empty());
		});
	});
});