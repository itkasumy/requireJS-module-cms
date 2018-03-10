define(["jquery"], function ($) {
	return {
		ajax: function (type, url, data, callback) {
			$[type]("/api/" + url, data, function (res) {
				if (res.code != 200) throw new Error(res.msg);

				callback && callback(res);
			});
		},
		get: function (url, data, callback) {
			this.ajax("get", url, data, callback);
		},
		post: function (url, data, callback) {
			this.ajax("post", url, data, callback);
		}
	}
});