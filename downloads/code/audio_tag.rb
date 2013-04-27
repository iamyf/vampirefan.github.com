# Title:
#		Octopress audio-player Audio Tag
# Author:
#		vampirefan
# Syntax:
#		{% audio artists url/to/mp3 titles %}
#		{% audio artists url/to/mp3  %}
#		{% audio url/to/mp3 titles %}
#		{% audio url/to/mp3 %}
# Example:
#		{% audio artists http://example.org/music.mp3 the song %}
# Output:
#		<p id="audioplayertitles">Alternative content</p><script type="text/javascript">AudioPlayer.embed("audioplayertitles", {soundFile: "http://example.org/music.mp3",titles:"the song"});</script>
#########################################################################################
# Important!
# Please Add the following into the {root_url}/source/_includes/custom/head.html
#
# <script type="text/javascript" src="http://wpaudioplayer.com/wp-content/plugins/audio-player/assets/audio-player.js?ver=2.0.4.1"></script>   
# <script type="text/javascript">  
#     AudioPlayer.setup("http://wpaudioplayer.com/wp-content/plugins/audio-player/assets/player.swf?ver=2.0.4.1", {
#     	transparentpagebg: "yes",  
#         width: 290
#     });  
# </script>  
#########################################################################################
module Jekyll
	class AudioTag < Liquid::Tag
		@audio = nil
		# def initialize(tag_name, markup, tokens)
		# 	if markup =~ /((https?:\/\/|\/)(\S+))(\s+(\d+)\s(\d+))?(\s+(https?:\/\/|\/)(\S+))?/i
		# 		@file =$1
		# 		@titles = $4
		# 		@num = $5
		# 		super
		# 	end
		# end
		ArtistsUrlTitle = /(\S[\S\s]*)\s+(https?:\/\/)(\S+)\s+(.+)/i
	    ArtistsUrl = /(\S[\S\s]*)\s+(https?:\/\/)(\S+)/i
	   	UrlTitle = /((https?:\/\/)(\S+))\s+(.+)/i
	    def initialize(tag_name, markup, tokens)
			@file = nil
			@titles = nil
			@artists = nil
			if markup =~ ArtistsUrlTitle
				@file = "#{$2 + $3}"
				@titles = "#{$4}"
				@artists = "#{$1}"
			elsif markup =~ ArtistsUrl
				@file = "#{$2 + $3}"
				@artists = "#{$1}"
			elsif markup =~ UrlTitle
				@file = "#{$1}"
				@titles = "#{$4}"
			else
				@file = markup
				@titles = "A nice Song"
			end	
			super
	    end

		def render(context)
			output = super
			audio = %Q{<p id="audioplayer#{@titles}">Alternative content</p>}
			audio+= %Q{<script type="text/javascript">}
			audio+= %Q{AudioPlayer.embed("audioplayer#{@titles}", }
			audio+= %Q{{soundFile: "#{@file}",titles:"#{@titles}",artists:"#{@artists}"});</script>}
		end
	end
end

Liquid::Template.register_tag('audio', Jekyll::AudioTag)