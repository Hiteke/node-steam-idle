# Idling Hours on Steam.

# Installation
Configure Idle.js

#Get all AppID's 
```javascript
var allgames = "";
for (var index in rgGames) {
   var item = rgGames[index];
   if (!item.client_summary) continue;
   allgames += item.appid + ", ";
}
allgames = allgames.slice(0,-2);
console.log(allgames);
```

#only games with card drop
http://steamcommunity.com/id/{YOUR_ID}/badges
```javascript
var games = "";
jQuery('.badge_title_playgame > a').each(function(){
  href = jQuery(this).attr('href');
  href = href.substr(12);
  games += (href + ", ");
});
games = games.slice(0,-2);
console.log(games);
```

# Usage
See example.js for the usage of some of the available API.
execute the Idle.js with node
> node Idle.js

