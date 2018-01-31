# Video Recorder

## Raspberry Pi project

- Plays music while recording slow motion video that is FTP'd to various remote servers
- Uses chromium to display a browser based UI running on express

## TODO

- Build the FTP process
- Rebuild the conversion/review process as described below in App Flow
- Ensure file naming of files in converted dir is correctly described in App Flow below
- Rework the files/dir/names sent to the bash scripts, do not hardcode params in bash scripts
- Create a tool for easily curating the best recordings

## App Flow

- Initialization
  - FTP: Start the FTP process, transfers files in the converted directory to various FTP servers
    - Watches the converted directory and FTPs files as they arrive
	- Ensures a connection to a randomly chosen remote FTP server
	- Transfers files to the server
  - AUDIO: Start the audio process, randomly plays files in the music dir
  - UI/CAMERA: Start the UI, an express framework site
    - Record buttons turn on the camera and creates a preview displayed on the touchscreen
	  - The preview is saved to preview.h264
	- After the preview is played, the actual recording takes place
	  - The recording is saved to recording.h264
	- After the recording is done, the video is converted into a slow motion video
	  - The recording is saved to converting.h264 during conversion
	  - The recording is saved to converted.h264 after conversion
	- After the conversion, the video is played for review on the touchscreen
	  - The user can save or delete the video, if the user does not choose an action, the video is automatically saved
	    - On save (or no action), the converted.h264 file is moved and renamed in the converted dir as YYYYMMDD-no-consent.mp4
		  - (The ext is changed here b/c .mp4 is better recognized. .h264 seems to only work for the conversion process.)
		- On delete, the file is not moved to the converted dir
    - The UI is reset and all camera/video/conversion processes are killed

## Setup

### Raspberry PI

- Format SD card with SD Formatter
- Write Raspian Img with Win32DiskImager
- Run Menu > Preferences > Raspberry Pi Configuration
  - System
    - Change Password
    - Disable Splash Screen
  - Interfaces
    - Enable
      - Camera
      - SSH
  - Localisation
    - Locale
      - en, US, UTF-8
    - Timezone
      - America, Denver
    - Keyboard
      - United States, English (US)
    -WiFi Country
      - US United States
- Update Raspbian
  - ```sudo apt update```
  - ```sudo apt full-upgrade```
- Install dependencies
  - ```sudo apt-get install vim```
  - ```sudo apt-get install mpg123```
  - ```sudo apt-get install gpac``` (MP4Box)
  - ```sudo npm install -g grunt-cli```
- Update Node (see below)
- Remove Bloatware (see below)
- Disable Screen Saver (see below)
- Auto start (see below)
- Set default display (see below)
- Desktop Icons (see below)
- Set default audio output (see below)

### Desktop Icons

[How To](http://www.raspberry-projects.com/pi/pi-operating-systems/raspbian/gui/desktop-shortcuts)

Create symbolic links

```
ln -s ~/video-recorder-player/desktop/video-recorder-player.desktop ~/Desktop/video-recorder-player.desktop
```

### Disable Screen Saver

[How To](https://www.raspberrypi.org/forums/viewtopic.php?f=91&t=163316)

```
vim ~/.config/lxsession/LXDE-pi/autostart
```

Update to:

```
#@xscreensaver -no-splash # comment this line out to disable screensaver
@xset s off
@xset -dpms
@xset s noblank
```

### Auto Start

[How To](https://obrienlabs.net/setup-raspberry-pi-kiosk-chromium/)

Ensure ~/.config/autostart/ exists before creating symlink

```
ln -s ~/video-recorder-player/desktop/video-recorder-player-autostart.desktop ~/.config/autostart/video-recorder-player-autostart.desktop
```

### Set default display

```sudo vim /boot/config.txt```

```
# TWG EDITS

# make hdmi default
#display_default_lcd=0
#make lcd default
display_default_lcd=1
```

### Remove Bloatware

[How To A](http://raspi.tv/2016/how-to-free-up-some-space-on-your-raspbian-sd-card-remove-wolfram-libreoffice)

[How To B](https://project.altservice.com/issues/418)

```
sudo apt-get remove --purge wolfram-engine libreoffice*
sudo apt-get autoremove
sudo apt-get clean
rm -rf /home/pi/python_games
```

### Update NodeJS

[How To](http://thisdavej.com/beginners-guide-to-installing-node-js-on-a-raspberry-pi/)

```
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt install nodejs
```
### Set default audio output

```sudo raspi-config```

Advanced Options > Audio > Force 3.5 mm

## Notes

Projector resolution: 1280x800
Display resoultion: 800x480

## Misc

Funded in part by The AZBurners Art Fund
