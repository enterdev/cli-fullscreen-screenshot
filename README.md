cli-fullscreen-screenshot
=========================
This tool allows capturing fullscreen multiscreen screenshots.
Supports Windows (win32), OSX (darwin)

Windows version uses nircmd (http://nircmd.nirsoft.net)
OSX version uses imagemagick (http://imagemagick.org)

Installation
============
TBD

Usage
=====
```
let screenshotTool = require('cli-fullscreen-screenshot');

let screenshotFilename = path.join(__dirname, '/tmp/screenshot_' + Math.random() + '.png');
let screenshotConfig   = {
    outfile: screenshotFilename
};

new screenshotTool.Screenshot(screenshotConfig, (error) =>
{
    if (error)
        console.log('Screenshot failed', error);
    else
        console.log('Screenshot created', screenshotFilename);
});
```


Building ImageMagick on OSX
===========================
for development purposes
```
cd ~
wget http://ftp.nluug.nl/ImageMagick/ImageMagick-7.0.3-9.tar.gz
wget http://www.imagemagick.org/download/delegates/libpng-1.6.24.tar.gz
tar xvzf ImageMagick-7.0.3-9.tar.gz
tar xvzf libpng-1.6.24.tar.gz
mv libpng-1.6.24 ImageMagick-7.0.3-9/png
cd ImageMagick-7.0.3-9/png

./configure --disable-shared --disable-dependency-tracking
make

cd ..
./configure --disable-shared --enable-delegate-build --disable-dependency-tracking --prefix=/tmp/ImageMagick-7.0.3 --with-png --with-quantum-depth=8
make
```

TODO: 
* investigate: --enable-osx-universal-binary
* speed up on OSX
* add Linux support
