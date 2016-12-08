module.exports = function(options, callback)
{
    let fs           = require('fs');
    let childProcess = require('child_process');
    let path         = require('path');

    let cmd               = 'screencapture';
    let screenCaptureArgs = [
        '-t',
        path.extname(options.outfile).toLowerCase().substring(1),
        '-x'
    ];

    if (typeof options.screenParams !== 'undefined' && options.screenParams.screens.length > 1)
    {
        let ext  = path.extname(options.outfile);
        let base = path.basename(options.outfile, ext);
        let dir  = path.dirname(options.outfile);
        for (let i = 0; i < options.screenParams.screens.length; i++)
            screenCaptureArgs.push(path.join(dir, base + '_' + i + ext));
    }
    else
        screenCaptureArgs.push(options.outfile);

    let screencaptrue = childProcess.spawn(cmd, screenCaptureArgs);

    screencaptrue.on('close', function(/*code, signal*/)
    {
        try
        {
            //if multiple screens need to concat
            if (typeof options.screenParams !== 'undefined' && options.screenParams.screens.length > 1)
            {
                let env                   = Object.create(process.env);
                env.DYLD_LIBRARY_PATH     = path.join(__dirname, 'vendor', 'darwin', 'ImageMagick-7.0.3', 'lib');
                env.MAGICK_CONFIGURE_PATH =
                    path.join(__dirname, 'vendor', 'darwin', 'ImageMagick-7.0.3', 'etc', 'ImageMagick-7');

                let cmd         = path.join(__dirname, 'vendor', 'darwin', 'ImageMagick-7.0.3', 'bin', 'magick');
                let imagickArgs =
                        ['-size', options.screenParams.canvas.w + 'x' + options.screenParams.canvas.h, 'xc:black'];
                let ext         = path.extname(options.outfile);
                let base        = path.basename(options.outfile, ext);
                let dir         = path.dirname(options.outfile);
                for (let i = 0; i < options.screenParams.screens.length; i++)
                {
                    fs.statSync(path.join(dir, base + '_' + i + ext));

                    imagickArgs.push(path.join(dir, base + '_' + i + ext));
                    imagickArgs.push('-geometry');
                    imagickArgs.push('+' + options.screenParams.screens[i].x + '+' + options.screenParams.screens[i].y);
                    imagickArgs.push('-composite');
                }
                imagickArgs.push(options.outfile);

                let imagickChild = childProcess.spawn(cmd, imagickArgs, {env: env});
                imagickChild.on('close', function(error)
                {
                    callback(null);
                    for (let i = 0; i < options.screenParams.screens.length; i++)
                        fs.unlink(path.join(dir, base + '_' + i + ext));
                });
            }
            else
            {
                fs.statSync(options.outfile);
                callback(null);
            }
        }
        catch (error)
        {
            callback('file_not_found');
        }
    });
};