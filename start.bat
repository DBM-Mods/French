@echo off
echo Starting NomDuBot...
:main
node bot.js
echo Restarting the bot because something went wrong
goto main