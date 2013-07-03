// Player creation index
var jpCount = 1;

// Replace all HTML5 video and audio tags in given selector with jPlayer equivalents
function jpUpdate(target) {
	var audios = $(target).find('audio');
	audios.each(function(i){
		if (!ie8_lower) {
			$(this).get(0).pause();
		}
		initAudio($(this));
	});
	
	var videos = $(target).find('video');
	videos.each(function(i){
		if (!ie8_lower) {
			$(this).get(0).pause();
		}
		initVideo($(this));
	});
}

// Insert a new audio jPlayer and controller with given ID into insert selectors. Return player element
function genAudio(id, insertControls, insertPlayer) {
	var player = genPlayer(id);
	if (insertControls) {
		var controls = genControls('audio');
		$(controls).appendTo(insertControls);
	}
	return $(player).appendTo(insertPlayer);
}

// Insert a new video jPlayer and controller with given ID into insert selectors. Return player element
function genVideo(id, insertControls, insertPlayer) {
	var player = genPlayer(id);
	var controls = genControls('video');
	var returner = $(player).appendTo(insertPlayer);
	$(controls).appendTo(insertControls);
	return returner;
}

function genControls(playerType) {
	var jpClass = "";
	
	switch (playerType) {
		case 'audio':
			jpClass = 'jp-audio';
			break;
		case 'video':
			jpClass = 'jp-video';
			break
	}
	
	var controls = '<div id="jp_container_' + jpCount + '" class="' + jpClass + '">';
		controls +=		'<div class="jp-type-single">';
		controls +=			'<div class="jp-gui jp-interface">';
		controls +=				'<ul class="jp-controls">';
		controls +=					'<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>';
		controls +=					'<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>';
		controls +=					'<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>';
		controls +=				'</ul>';
		controls +=				'<div class="jp-progress">';
		controls +=					'<div class="jp-seek-bar">';
		controls +=						'<div class="jp-play-bar"></div>';
		controls +=					'</div>';
		controls +=				'</div>';
		controls +=				'<div class="jp-time-holder">';
		controls +=					'<div class="jp-current-time"></div>';
		controls +=					'<div class="jp-duration"></div>';
		controls +=				'</div>';
		controls +=			'</div>';
		controls +=			'<div class="jp-no-solution">';
		controls +=				'<span>Update Required</span>';
		controls +=				'To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>. Sorry for the inconvenience.';
		controls +=			'</div>';
		controls +=		'</div>';
		controls += '</div>';
		
		jpCount++;
		return controls;
}

function genPlayer(id) {
	return '<div id="' + id + '" class="jp-jplayer"></div>';
}

function initAudio(replaceTar) {
	// Extract audio file
	var srcs = [];
	var files = {};
	$(replaceTar).find('source').each(function(i){
		var thisrc = $(this).attr('src');
		var ext = thisrc.substring( thisrc.lastIndexOf(".") + 1 );
		srcs.push(ext);
		files[ext] = thisrc;
	});
	
	var replacer = $('<div class="jp-rep audio-rep"></div>');
	var wrapper = replaceTar.replaceWith(replacer);
	var repAudio = genAudio('audio_' + jpCount, replacer, replacer);
	repAudio.jPlayer({
		ready: function (event) {
			$(this).jPlayer("setMedia", files);
		},
		swfPath: "scripts/jPlayer",
		cssSelectorAncestor: '#jp_container_' + (jpCount - 1),
		wmode: "window"
	});
	pauseOthers(repAudio);
}

function initVideo(replaceTar) {
	// Extract video file
	var srcs = [];
	var files = {};
	$(replaceTar).find('source').each(function(i){
		var thisrc = $(this).attr('src');
		var ext = thisrc.substring( thisrc.lastIndexOf(".") + 1 );
		switch (ext) {
			case 'ogg':
				ext = 'ogv';
				break;
			case 'mp4':
				ext = 'm4v';
				break;
		}
		srcs.push(ext);
		files[ext] = thisrc;
	});
	
	var replacer = $('<div class="jp-rep video-rep"></div>');
	var wrapper = replaceTar.replaceWith(replacer);
	var repVideo = genVideo('video_' + jpCount, replacer, replacer);
	repVideo.jPlayer({
		ready: function (event) {
			$(this).jPlayer("setMedia", files);
			$(this).jPlayer("pause", 0.01);
		},
		swfPath: "scripts/jPlayer",
		cssSelectorAncestor: '#jp_container_' + (jpCount - 1),
		supplied: srcs.toString(),
		size: {
			width: '420px',
			height: '315px',
			cssClass: "jp-video-rep"
		},
		wmode: 'window'
	});
	pauseOthers(repVideo);
}