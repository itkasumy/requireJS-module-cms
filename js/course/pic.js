define(["jquery", "text!tpls/coursePic.html", "arttemplate", "common/api", "upload"], function ($, coursePicTpl, art, api) {
	return function (csId) {
		api.get("course/picture", {
			cs_id: csId
		}, function (res) {
			var $coursePic = $(art.render(coursePicTpl, res.result))
				.appendTo($(".main").empty());

			$("#picUpload").uploadify({
				"fileObjName": "cs_cover_original",
				"formData": {
					cs_id: csId
				},
				"swf": "../../assets/uploadify/uploadify.swf",
				"uploader": "api/uploader/cover",
				"itemTemplate": "<span></span>",
				"onUploadSuccess": function (file, data, response) {
					$(".aside .list-group .courseManager").trigger("click");
				}
			});

		});
	}
});