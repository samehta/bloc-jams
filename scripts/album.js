var albumAcidRap = {
  title: 'Acid Rap',
  artist: 'Chance The Rapper',
  label: 'Independent',
  year: '2013',
  albumArtUrl: 'assets/images/album_covers/acid.jpg',
  songs: [
    { title: 'Good Ass Intro (feat. BJ The Chicago Kid, Lili K & Kiara Lanier)', duration: '3:59' },
    { title: 'Pusha Man (feat. Nate Fox & Lili K)', duration: '7:24' },
    { title: 'Cocoa Butter Kisses (feat. Vic Mensa & Twista)', duration: '5:07' },
    { title: 'Juice', duration: '3:35'},
    { title: 'Lost (feat. Noname Gypsy)', duration: '3:05'},
    { title: 'Everybody\'s Something (feat. Saba & BJ The Chicago Kid)', duration: '4:37'},
    { title: 'Interlude (That\'s Love)', duration: '2:30'},
    { title: 'Favorite Song (feat. Childish Gambino)', duration: '3:05'},
    { title: 'NaNa (feat. Action Bronson)', duration: '3:21'},
    { title: 'Smoke Again (feat. Ab-Soul)', duration: '4:33'},
    { title: 'Acid Rain', duration: '3:36'},
    { title: 'Chain Smoker', duration: '3:31'},
    { title: 'Everything\'s Good (Good Ass Outro)', duration: '5:33'}
  ]
};

var albumControlSystem = {
  title: 'Control System',
  artist: 'Ab-Soul',
  label: 'Top Dawg Entertainment',
  year: '2012',
  albumArtUrl: 'assets/images/album_covers/control.jpg',
  songs: [
    { title: 'Soulo Ho3 (feat. Jhené Aiko)', duration: '3:57' },
    { title: 'Track Two', duration: '4:03' },
    { title: 'Bohemian Grove', duration: '4:23' },
    { title: 'Terrorist Threats (feat. Jhené Aiko & Danny Brown)', duration: '4:24'},
    { title: 'Pineal Gland', duration: '3:52'},
    { title: 'Double Standards', duration: '4:21'},
    { title: 'Mixed Emotions', duration: '4:08'},
    { title: 'SOPA (feat. Schoolboy Q)', duration: '4:09'},
    { title: 'Lust Demons (feat. Jay Rock & BJ the Chicago Kid)', duration: '3:41'},
    { title: 'ILLuminate (feat. Kendrick Lamar)', duration: '5:07'},
    { title: 'A Rebellion (feat. Alori Joh)', duration: '3:48'},
    { title: 'Showin\' Love', duration: '4:57'},
    { title: 'Empathy (feat. Alori Joh & JaVonte)', duration: '3:01'},
    { title: 'Nothing\'s Something', duration: '2:30'},
    { title: 'Beautiful Death (feat. Punch & Ashtrobot)', duration: '4:30'},
    { title: 'The Book of Soul', duration: '5:11'},
    { title: 'Black Lip Bastard (Remix) (feat. Black Hippy)', duration: '5:49'}
  ]
};

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
  + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
  + ' <td class="song-item-title">' + songName + '</td>'
  + ' <td class="song-item-duration">' + songLength + '</td>'
  + '</tr>'
  ;

  return $(template);
};

var setCurrentAlbum = function(album) {
  var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.title);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + ' ' + album.label);
	$albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for (var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
		$albumSongList.append($newRow);
  }
};

var findParentByClassName = function(element, targetClass) {
  if (element) {
    var currentParent = element.parentElement;
    while (currentParent.className != targetClass) {
      currentParent = currentParent.parentElement;
    }
    return currentParent;
  }
};

var getSongItem = function(element) {
  switch (element.className) {
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName(element, 'song-item-number');
    case 'album-view-song-item':
      return element.querySelector('.song-item-number');
    case 'song-item-title':
    case 'song-item-duration':
      return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
    case 'song-item-number':
      return element;
    default:
      return;
  }
};

var clickHandler = function(targetElement) {
  var songItem = getSongItem(targetElement);
  if (currentlyPlayingSong === null) {
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
      songItem.innerHTML = playButtonTemplate;
      currentlyPlayingSong = null;
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
      var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

window.onload = function() {
  setCurrentAlbum(albumAcidRap);
  
  songListContainer.addEventListener('mouseover', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
      var songItem = getSongItem(event.target);

			if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
				songItem.innerHTML = playButtonTemplate;
			}
    }
    
    for (var i = 0; i < songRows.length; i++) {
      songRows[i].addEventListener('mouseleave', function(event) {
        var songItem = getSongItem(event.target);
				var songItemNumber = songItem.getAttribute('data-song-number');

				if (songItemNumber !== currentlyPlayingSong) {
					songItem.innerHTML = songItemNumber;
				}
      });
      
      songRows[i].addEventListener('click', function(event) {
      	clickHandler(event.target);
      });
    }
  });
}