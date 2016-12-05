if (('www.azof.fr' === location.host) && (location.protocol !== 'https:')) {
    location.protocol = "https";
}

require.config({
	paths: {
		jquery: 'third_party/jquery'
	}
});

require(['jquery', 'github'], function($, github){

	'use strict';

	$('aside a[href*="github.com"]:first-child').each(getStats);

	function getStats(i, el) {
		var target  = $(el);
		var repo    = target.attr('href').match('github.com/(.+)$')[1]
		var request = github.getRepoDetails(repo);
		var job     = $.when(target, request);
		job.then(applyStats);
		return job;
	}

	function applyStats(target, stats) {
		var container = target.parent();
		stats = stats[0].data;
		if (!stats.forks_url) return;
		var href = target.attr('href');
		var node = github.statNode().appendTo(container);
		animateCount(node.children('.forks').attr('href', href)
			.children('em'), stats.forks_count);
		animateCount(node.children('.stars').attr('href', href)
			.children('em'), stats.stargazers_count);
	}

	function animateCount(container, count, i) {
		container.html(i = i || 1);
		if (i < count)
			setTimeout($.proxy(animateCount, null, container, count, i+1), 10);
	}

});