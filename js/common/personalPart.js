define(["jquery", "arttemplate", "text!tpls/personalPart.html", "common/api", "bootstrap", "datetime"], function ($, art, personalPartTpl, api) {
	return function () {
		$.fn.datetimepicker.dates['zh-CN'] = {
			days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
			daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
			daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
			months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			today: "今天",
			suffix: [],
			meridiem: ["上午", "下午"]
		};

		api.get("teacher/profile", {}, function (res) {
			$.getJSON("/js/city.json", function (data) {
				console.log(data);
				var personal = $(art.render(personalPartTpl, res.result))
					.on("submit", "form", function () {
						var formData = $(this).serialize();
						api.post("teacher/modify", formData, function () {
							personal.modal("hide");
						});
						return false;
					})
					.on("change", ".province", function () {
						var province = $(this).val();
						data.forEach(function (provinc, index) {
							if (province == provinc.name) {
								var cities = data[index].sub;
								personal.find(".city").empty();
								cities.forEach(function (city, idx) {
									personal.find(".city").append("<option>" + city.name + "</option>");
								});
							}
						});
					})
					.appendTo("body").modal();

				personal.find(".joinDate").datetimepicker({
					format: "yyyy-mm-dd",
					language: "zh-CN",
					autoclose: true,
					todayHighlight: true,
					todayBtn: true,
					minView: "month"
				});
				personal.find(".birthday").datetimepicker({
					format: "yyyy-mm-dd",
					language: "zh-CN",
					autoclose: true,
					todayHighlight: true,
					todayBtn: true,
					minView: "month"
				});
				data.forEach(function (provinc) {
					personal.find(".province").append("<option>" + provinc.name + "</option>");
				})
			})
		})
	}
});