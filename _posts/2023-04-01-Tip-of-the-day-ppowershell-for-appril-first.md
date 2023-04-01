---
title: Tip of the day - Powershell for April first. Tricks and pranks
author: valeras
date: 2023-04-01 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - powershell
  - tipoftheday
  - sharepoint
  - pranks
pin: false
slug: tip-day-powershell-april
comments: true
image:
  path: /img/posts/pranks.png
  alt: Tip of the day - Powershell for April first
---

## Tip of the day: Aprils Fools' Day pranks with Powershell

Apply these pranks to your colleagues' computers. They will be surprised and will have a good laugh.

> Note: These pranks are harmless and will not cause any damage to the computer. They are just for fun.
{: .prompt-info }

> Note: If you have any other ideas for pranks, please share them in the comments.
{: .prompt-info }

### Most useful commands

1. Self destruct the computer:

```powershell
Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak("A critical system error has occurred, the computer will self destruct in 20 . 19 . 18 . 17 . 16 . 15 . 10 . 9 . 8 . 7 . 6 . 5 . 4 . 3 . 2 . 1 . 0 . 0 . 0 .  This has been a test of the Windows Emergency Alert System");
```	

2. Help message:

```powershell
Add-Type -AssemblyName System.speech
$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speak.Speak('Come see the violence inherent in the system. Help! Help! Im being repressed!')
```

3. Set mouse sensitivity to 200: 

```powershell
   set-itemProperty 'HKCU:\Control Panel\Mouse' -name MouseSensitivity -value 200
```

4.  Change the wallpaper to a funny meme or a picture of a colleague's pet:

```powershell
    Set-ItemProperty -path 'HKCU:\Control Panel\Desktop' -name wallpaper -value 'C:\path\to\image.jpg'
```

5.  Play a funny sound effect when a colleague opens a program:

```powershell
   Add-Type -AssemblyName PresentationCore
  $player = New-Object System.Windows.Media.MediaPlayer
  $player.Open('C:\path\to\funny-sound-effect.wav')
  Start-Sleep -Seconds 2
  $player.Play()

```

6.  Change the font style and size of a colleague's text editor:

```powershell
    Set-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Notepad" -Name "lfFaceName" -Value "Comic Sans MS"
    Set-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Notepad" -Name "lfHeight" -Value "20"

```

7.  Add a funny message to the Windows lock screen:

```powershell
    $lockScreenMessage = "Don't worry, I won't tell anyone about your secret love for pineapple pizza!"
    Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System" -Name "legalnoticecaption" -Value "April Fools' Day"
    Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System" -Name "legalnoticetext" -Value $lockScreenMessage

```

8. Play imperial march:

```powerShell
[console]::beep(440,500)      
[console]::beep(440,500)
[console]::beep(440,500)       
[console]::beep(349,350)       
[console]::beep(523,150)       
[console]::beep(440,500)       
[console]::beep(349,350)       
[console]::beep(523,150)       
[console]::beep(440,1000)
[console]::beep(659,500)       
[console]::beep(659,500)       
[console]::beep(659,500)       
[console]::beep(698,350)       
[console]::beep(523,150)       
[console]::beep(415,500)       
[console]::beep(349,350)       
[console]::beep(523,150)       
[console]::beep(440,1000)
```
