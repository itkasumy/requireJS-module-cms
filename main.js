require.config({
	baseUrl: "js",
	paths: {
		jquery: "lib/jquery-2.1.4",
		cookie: "lib/jquery.cookie",
		text: "lib/text",
		tpls: "../tpls",
		arttemplate: "lib/template-web",
		bootstrap: "../assets/bootstrap/js/bootstrap",
		datetime: "../assets/datetimepicker/js/bootstrap-datetimepicker",
		upload: "../assets/uploadify/jquery.uploadify",
		shim: {
			bootstrap: {
				deps: ["jquery"]
			},
			datetime: {
				deps: ["bootstrap"]
			},
			upload: {
				deps: ["jquery"]
			}
		}
	}
});

require(["jquery", "teacher/list", "courseCategory/list", "courseManager/list", "courseManager/add", "courseManager/editCourseTime", "common/personalPart", "text!tpls/loading.html", "cookie"], function ($, teacherList, couseCategoryList, courseManagerList, courseManagerAdd, editCourseTime, personalPart, loadingTpl) {
	var modalLoading = $(loadingTpl);
	$.ajaxSetup({
		beforeSend: function () {
			$(loadingTpl).appendTo("body").modal();
		},
		complete: function () {
			$("#modalLoading").modal("hide");
			$("#modalLoading").remove();
		}
	})
	var userInfoStr = $.cookie("userInfo");
	if(!userInfoStr) {
		location.href = "/login.html";
		return;
	}
	var userInfo = JSON.parse(userInfoStr);

	$(".profile .imgContainer img").attr("src", userInfo.tc_avatar);
	$(".profile h4").text(userInfo.tc_name);

	$(".aside .list-group").on("click", "a", function () {
		$(this).addClass("active").siblings().removeClass("active");
		if ($(this).hasClass("chart")) {
			$(".contentContainer .main").html($(this).text());
		} else if ($(this).hasClass("teacherManager")) {
			teacherList();
		} else if ($(this).hasClass("category")) {
			couseCategoryList();
		} else if ($(this).hasClass("courseManager")) {
			courseManagerList();
		}
	});

	$(".aside .list-group .courseManager").on("dblclick", function () {
		$(this).siblings(".subMenu").toggleClass("hide");
	});

	$(".aside .list-group .addCourse").on("click", function () {
		courseManagerAdd();
	});
	/*$(".aside .list-group .courseTimeManager").on("click", function() {
		var csId = $(this).attr("csId");
		editCourseTime(csId);
	});*/

	$(".personalPart").on("click", function () {
		personalPart();
	})

	$(".aside .list-group .teacherManager").trigger("click");
});