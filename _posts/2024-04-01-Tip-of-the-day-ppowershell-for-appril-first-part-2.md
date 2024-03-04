---
title: Tip of the day - Powershell for April first. Tricks and pranks Part 2
author: valeras
date: 2024-03-04 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - powershell
  - tipoftheday
  - sharepoint
  - pranks
pin: false
slug: tip-day-powershell-april-part-2
comments: true
image:
  path: /img/posts/pranks2.png
  alt: Tip of the day - Powershell for April first 2
---

## Tip of the day: Aprils Fools' Day pranks with Powershell Part 2

Apply these pranks to your colleagues' computers. They will be surprised and will have a good laugh.

> Note: These pranks are harmless and will not cause any damage to the computer. They are just for fun.
{: .prompt-info }

> Note: If you have any other ideas for pranks, please share them in the comments.
{: .prompt-info }

## Most useful commands

### Random Mouse Movements:

```powershell
Add-Type -AssemblyName System.Windows.Forms
For ($i = 0; $i -lt 100; $i++) {
    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point((Get-Random -Min 0 -Max 1920), (Get-Random -Min 0 -Max 1080))
    Start-Sleep -Milliseconds 500
}
```	

### Change the System Volume Randomly:

```powershell
$volume = New-Object -ComObject WScript.Shell
For ($i = 0; $i -le 10; $i++) {
    $volume.SendKeys([char]175) # Volume Up
    Start-Sleep -Milliseconds 200
    $volume.SendKeys([char]174) # Volume Down
}
```

### Narrator Announces Fake Updates: 

```powershell
Add-Type -AssemblyName System.Speech
$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speak.Speak('Installing mandatory updates for Clippy, your helpful office assistant. Please do not turn off your computer.')
```

###  Random Error Message Pop-ups:

```powershell
[Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms')
[System.Windows.Forms.MessageBox]::Show('Error 404: Keyboard not found. Press F1 to continue.', 'System Error', [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
```

### Open a Random Website in the Default Browser Periodically:

```powershell
$websites = @('http://example.com', 'http://example.org', 'http://example.net')
while ($true) {
    Start-Process (Get-Random -InputObject $websites)
    Start-Sleep -Seconds (Get-Random -Min 300 -Max 1800) # Randomly between 5 minutes to 30 minutes
}
```

###  Hide All Icons on Desktop:

```powershell
$path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced'
Set-ItemProperty -Path $path -Name HideIcons -Value 1
Stop-Process -Name explorer -Force
Start-Process explorer
```

### Change Desktop Background to a Funny Image:

```powerShell
# Ensure the path to the image is correct and accessible
Set-ItemProperty -Path 'HKCU:\Control Panel\Desktop' -Name Wallpaper -Value 'C:\path\to\funny-image.jpg'
RUNDLL32.EXE user32.dll, UpdatePerUserSystemParameters

```

### Infinite Loop of notepad opening and closing:
```bash
while ($true) {
    Start-Process notepad
    Start-Sleep -Seconds 10
    Get-Process notepad | Stop-Process
    Start-Sleep -Seconds 5
}
```

If you missed the first part of the pranks, you can find them here > [Tip of the day - Powershell for April first. Tricks and pranks](https://valerasnarbutas.github.io/posts/tip-day-powershell-april/).
