define(["jquery", "text!tpls/courseTimeList.html", "common/api", "arttemplate"], function ($, courseTimeListTpl, api, art) {
	return function (csId) {
		api.get("course/lesson", {
			"cs_id": csId
		}, function (res) {
			var courseTimeList = $(art.render(courseTimeListTpl, res.result))
				.appendTo($(".main").empty());
		});
	}
});