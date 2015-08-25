## default.bat ##

```
@echo off
REM The first line asks the user to choose a database name to be passed to its-electric.
set /p database= Select the database name to use with its-electric:  

:display
START "" "%UserProfile%\Desktop\its-electric\web\its-electric.html" 
echo Successfully called URL.

call :startup 1> log.txt 2> errors.txt
goto :eof
REM This is the its-electric command, with 600MB max memory (for big log dumps), SimpleLog logging.  Subroutine w/ label was necessary to get it to accept the log pipes.
:startup
"C:\Program Files\Java\jre6\bin\java.exe" -Xmx600m -Dorg.apache.commons.logging.Log=org.apache.commons.logging.impl.SimpleLog -Dorg.apache.commons.logging.SimpleLog.defaultlog=trace -jar its-electric-1.6.3.jar -g 192.168.1.100 -m 4 --max-points=2000000000 -d %database%
goto :eof
```


## download.bat ##

```
@echo off
set /p resolution= Input the resolution in seconds of data to download (1 is seconds, 60 is minutes...):  
START "" "http://localhost:8081/power?rangeStart=0&rangeEnd=2000000000&resolution=%resolution%&tqx=out:csv"
```