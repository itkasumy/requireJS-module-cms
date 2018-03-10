define(["jquery", "text!tpls/courseManagerAdd.html", "common/api"], function ($, courseManagerAddTpl, api) {
	return function () {
		$("#modalAddCourse").remove();
		var courseManagerAdd = $(courseManagerAddTpl)
			.on("submit", "form", function () {
				var formData = $(this).serialize();
				api.post("course/create", formData, function () {
					courseManagerAdd.modal("hide");

					$(".aside .list-group .courseManager").trigger("click");
				});
				return false;
			})
			.appendTo("body").modal();
	};
});