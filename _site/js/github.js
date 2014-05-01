define("github", ["jquery"], function($){

	"use strict";

	var token = "0ad7fe672ad82427e61e9633cd3876b0dbccd5cc";

	return {

		getRepoDetails: function(repoName) {
			return $.getJSON("https://api.github.com/repos/"+repoName+"?access_token="+token+"&callback=?");
		},

		statNode: function() {
			return $('<span class="github-stats">'+
				'<a class="forks"><i class="fa fa-code-fork"></i><em>--</em><label>Forks</label></a>' +
				'<a class="stars"><i class="fa fa-star"></i><em>--</em><label>Stars</label></a>' +
			'</span>');
		}

	};

});