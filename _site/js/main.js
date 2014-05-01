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
		var job     = $.when(target.parent(), request);
		job.then(applyStats);
		return job;
	}

	function applyStats(target, stats) {
		stats = stats[0].data;
		if (!stats.forks_url) return target;
		target = github.statNode().appendTo(target);
		animateCount(target.children('.forks')
			.attr('href', stats.forks_url)
			.children('em'), stats.forks_count);
		animateCount(target.children('.stars')
			.attr('href', stats.stargazers_url)
			.children('em'), stats.stargazers_count);
		return target;
	}

	function animateCount(container, count, i) {
		container.html(i = i || 1);
		if (i < count)
			setTimeout($.proxy(animateCount, null, container, count, i+1), 10);
	}

});