#jplayer Converter

Simple script for automatically making jplayer instances out of HTML5 video and audio tags

HTML5 tags are fantastic but ensure backwards compatibility can be complicated. This script can magically convert all HTML video and audio tags within a given jQuery selector into fantastically versatile jplayer instances.

##Use:

Simply pass the ```jpUpdate``` function a jQuery selector string and it will replace all audio and video tags therein with to player instances.

##Dependencies:

This script requires jQuery and jPlayer 2.3.0 to function properly.

##Limitations:

Currently the script has all player options hardcoded in though these could be changed after the fact. Also since it pollutes the global scope it could cause conflicts.

##TODO:
* Clean up scope
* Use prototype object for instancing
* Add jplayer options support