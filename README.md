cli-fullscreen-screenshot
=========================
This tool allows capturing fullscreen multiscreen screenshots.
Supports Windows (win32), OSX (darwin)

Windows version uses nircmd (http://nircmd.nirsoft.net)

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

TODO: 
* investigate: --enable-osx-universal-binary
* speed up on OSX
* add Linux support
