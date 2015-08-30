var Steam = require('steam');
var fs = require('fs');
var bot = new Steam.SteamClient();

if (fs.existsSync('sentryfile'))
{
    var sentry = fs.readFileSync('sentryfile');
    console.log('[STEAM] logging in with sentry ');
    bot.logOn({
      accountName: '',
      password: '',
      shaSentryfile: sentry
    });
}
else
{
    console.log('[STEAM] logging in without sentry');
    bot.logOn({
      accountName: '',
      password: '',
      authCode: ''
    });
}
function randomString(len, an){
    an = an&&an.toLowerCase();
    var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
    for(;i++<len;){
      var r = Math.random()*(max-min)+min <<0;
      str += String.fromCharCode(r+=r>9?r<36?55:61:48);
    }
    return str;
}
bot.on('loggedOn', function() {
    console.log('[STEAM] Logged in.');
	
    //bot.setPersonaState(Steam.EPersonaState.Online);
    //Tell steam we are playing games.
    //440=tf2
    //550=l4d2 
    //730=csgo
    //570=dota2
	
	bot.gamesPlayed([440, 550, 730, 570]);
});
 
bot.on('sentry', function(sentryHash)
{//A sentry file is a file that is sent once you have
//passed steamguard verification.
    console.log('[STEAM] Received sentry file.');
    fs.writeFile('sentryfile',sentryHash,function(err) {
    if(err){
      console.log(err);
    } else {
      console.log('[FS] Saved sentry file to disk.');
    }});
});
 
//Handle logon errors
bot.on('error', function(e) {
console.log('[STEAM] ERROR - Logon failed'+e.eresult);
    if (e.eresult == Steam.EResult.InvalidPassword)
    {
    console.log('Reason: invalid password');
    }
    else if (e.eresult == Steam.EResult.AlreadyLoggedInElsewhere)
    {
    console.log('Reason: already logged in elsewhere');
    }
    else if (e.eresult == Steam.EResult.AccountLogonDenied)
    {
    console.log('Reason: logon denied - steam guard needed');
    }
})