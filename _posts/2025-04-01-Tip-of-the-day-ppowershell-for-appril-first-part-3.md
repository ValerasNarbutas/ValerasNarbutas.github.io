---
title: Tip of the day - Powershell for April first. Tricks and pranks Part 3
author: valeras
date: 2025-03-23 10:55:00 +0800
categories:
  - TipOfTheDay
  - TipsAndTricks
tags:
  - powershell
  - tipoftheday
  - sharepoint
  - pranks
pin: false
slug: tip-day-powershell-april-part-3
comments: true
image:
  path: /img/posts/pranks3.png
  alt: Tip of the day - Powershell for April first 3
---

## Tip of the day: Aprils Fools Day pranks with Powershell Part 3

Apply these pranks to your colleagues' computers. They will be surprised and will have a good laugh.

> Note: These pranks are harmless and will not cause any damage to the computer. They are just for fun.
{: .prompt-info }

> Note: If you have any other ideas for pranks, please share them in the comments.
{: .prompt-info }

## Most useful commands

### Random Caps Lock Toggling:

```powershell
Add-Type -AssemblyName System.Windows.Forms
For ($i = 0; $i -lt 100; $i++) {
    [System.Windows.Forms.SendKeys]::SendWait("{CAPSLOCK}")
    Start-Sleep -Milliseconds 500
}
```
> Tip: You can replace `{CAPSLOCK}` with `{NUMLOCK}` or `{SCROLLLOCK}` to toggle those keys instead.
{: .prompt-info }

> Tip: Save as a script and run it in the background to annoy your colleagues.
{: .prompt-info }

### Change Their Prompt to a Funny Message:

```powershell

function prompt { "🤡 You have been hacked: PS> " }

```

> Tip: Add this function to your PowerShell profile to make it permanent.
{: .prompt-info }


### Fake typing Effect:

```powershell
$text = "You shouldn’t have left your PC unlocked... 😏"
foreach ($c in $text.ToCharArray()) {
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.SendKeys]::SendWait($c)
    Start-Sleep -Milliseconds 300
}
```

> Tip: Save as a script and run it in the background to annoy your colleagues. On execution it will start typing the message on the active window.
{: .prompt-info }


### Shift the screen slightly to make them think the display is off-center:

```powershell
Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.Screen]::AllScreens | ForEach-Object {
    rundll32.exe user32.dll,SwapMouseButton
}

# Switch back
# Add-Type @"
# using System;
# using System.Runtime.InteropServices;

# public class MouseHelper
# {
#     [DllImport("user32.dll")]
#     public static extern bool SwapMouseButton(bool fSwap);
# }
# "@
# [MouseHelper]::SwapMouseButton($false)

```

> Tip: this one very annoying, so use it wisely.
{: .prompt-info }

### Open random message box with a funny message:

```powershell
for ($i = 0; $i -lt 5; $i++) {
    [System.Windows.Forms.MessageBox]::Show("April Fools! 😜")
}
```

### Invert screen colors temporarily (Magnifier toggle) 

```powershell
Start-Process "magnify.exe"
Start-Sleep -Seconds 1
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Keyboard {
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo);
}
"@
# Ctrl + Alt + I keys pressed (invert colors)
[Keyboard]::keybd_event(0x11,0,0,0) # Ctrl down
[Keyboard]::keybd_event(0x12,0,0,0) # Alt down
[Keyboard]::keybd_event(0x49,0,0,0) # I down
[Keyboard]::keybd_event(0x49,0,2,0) # I up
[Keyboard]::keybd_event(0x12,0,2,0) # Alt up
[Keyboard]::keybd_event(0x11,0,2,0) # Ctrl up
Start-Sleep -Seconds 30
# Invert back by sending keys again
[Keyboard]::keybd_event(0x11,0,0,0)
[Keyboard]::keybd_event(0x12,0,0,0)
[Keyboard]::keybd_event(0x49,0,0,0)
[Keyboard]::keybd_event(0x49,0,2,0)
[Keyboard]::keybd_event(0x12,0,2,0)
[Keyboard]::keybd_event(0x11,0,2,0)
# Close magnifier
<!-- Stop-Process -Name magnify -Force -->

```

### Ultimate PowerShell Prank Script 

```powershell

Add-Type @"
using System;
using System.Runtime.InteropServices;
public class MouseHelper {
    [DllImport("user32.dll")]
    public static extern bool SwapMouseButton(bool fSwap);
}
public class CDTray {
    [DllImport("winmm.dll")]
    public static extern int mciSendString(string command, string returnValue, int returnLength, int winHandle);
}
"@
Add-Type -AssemblyName System.Windows.Forms

function Swap-MouseButtons {
    [MouseHelper]::SwapMouseButton($true)
    [System.Windows.Forms.MessageBox]::Show("System Configuration: Mouse re-mapped successfully!","System")
    Start-Sleep -Seconds 30
    [MouseHelper]::SwapMouseButton($false)
}

function Invert-Screen {
    Start-Process "magnify.exe"
    Start-Sleep -Seconds 2
    $VK_CTRL = 0x11; $VK_ALT = 0x12; $VK_I = 0x49
    Add-Type @"
using System.Runtime.InteropServices;
public class Keyboard {
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo);
}
"@
    function Send-Keys($vk1,$vk2,$vk3){
        [Keyboard]::keybd_event($vk1,0,0,0)
        [Keyboard]::keybd_event($vk2,0,0,0)
        [Keyboard]::keybd_event($vk3,0,0,0)
        [Keyboard]::keybd_event($vk3,0,2,0)
        [Keyboard]::keybd_event($vk2,0,2,0)
        [Keyboard]::keybd_event($vk1,0,2,0)
    }
    Send-Keys $VK_CTRL $VK_ALT $VK_I
    Start-Sleep -Seconds 20
    Send-Keys $VK_CTRL $VK_ALT $VK_I
    Stop-Process -Name magnify -Force
}


function Rotate-Screen {
    Add-Type @"
using System;
using System.Runtime.InteropServices;
public class Display {
    [DllImport("user32.dll")]
    public static extern int ChangeDisplaySettings(ref DEVMODE devMode, int flags);
    [DllImport("user32.dll")]
    public static extern bool EnumDisplaySettings(string deviceName, int modeNum, ref DEVMODE devMode);
    public const int ENUM_CURRENT_SETTINGS = -1;
    public const int CDS_UPDATEREGISTRY = 0x01;
    [StructLayout(LayoutKind.Sequential)]
    public struct DEVMODE {
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 32)]
        public string dmDeviceName;
        public short dmSpecVersion;
        public short dmDriverVersion;
        public short dmSize;
        public short dmDriverExtra;
        public int dmFields;
        public int dmPositionX;
        public int dmPositionY;
        public int dmDisplayOrientation;
        public int dmDisplayFixedOutput;
        public short dmColor;
        public short dmDuplex;
        public short dmYResolution;
        public short dmTTOption;
        public short dmCollate;
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 32)]
        public string dmFormName;
        public short dmLogPixels;
        public int dmBitsPerPel;
        public int dmPelsWidth;
        public int dmPelsHeight;
        public int dmDisplayFlags;
        public int dmDisplayFrequency;
        public int dmICMMethod;
        public int dmICMIntent;
        public int dmMediaType;
        public int dmDitherType;
        public int dmReserved1;
        public int dmReserved2;
        public int dmPanningWidth;
        public int dmPanningHeight;
    }
}
"@
    $devmode = New-Object Display+DEVMODE
    $devmode.dmSize = [System.Runtime.InteropServices.Marshal]::SizeOf($devmode)
    [Display]::EnumDisplaySettings($null, [Display]::ENUM_CURRENT_SETTINGS, [ref]$devmode) | Out-Null
    $devmode.dmDisplayOrientation = 1
    [Display]::ChangeDisplaySettings([ref]$devmode, [Display]::CDS_UPDATEREGISTRY)
    Start-Sleep -Seconds 20
    $devmode.dmDisplayOrientation = 0
    [Display]::ChangeDisplaySettings([ref]$devmode, [Display]::CDS_UPDATEREGISTRY)
}

function Random-Popups {
    1..7 | ForEach-Object {
        Start-Sleep -Seconds (Get-Random -Minimum 5 -Maximum 12)
        [System.Windows.Forms.MessageBox]::Show("Critical system alert #$($_). Please restart immediately. Just kidding. 😜","Windows Security")
    }
}

$pranks = @("Swap-MouseButtons","Invert-Screen","Rotate-Screen","Random-Popups")

# Launch them all in random order with pauses for maximum confusion
$pranks | Sort-Object {Get-Random} | ForEach-Object {
    Start-Sleep -Seconds (Get-Random -Minimum 10 -Maximum 20)
    Write-Host "Running prank: $_"
    Invoke-Command -ScriptBlock (Get-Command $_).ScriptBlock
}

[System.Windows.Forms.MessageBox]::Show("All systems restored. Happy April Fools! 😁","Windows")

```

> Tip: This is ultimate prank script, use it wisely.
{: .prompt-info }


If you missed the first part of the pranks, you can find them here > 
> [Tip of the day - Powershell for April first. Tricks and pranks](https://valerasnarbutas.github.io/posts/tip-day-powershell-april/)

> [Tip of the day - Powershell for April first. Tricks and pranks Part 2](https://valerasnarbutas.github.io/posts/tip-day-powershell-april-part-2/)
