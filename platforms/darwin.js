module.exports = function(options, callback)
{
    let fs           = require('fs');
    let childProcess = require('child_process');
    let path         = require('path');

    let binPath = path.join(__dirname, 'vendor', 'darwin', 'trap');
    let nircmd = childProcess.spawn(binPath, ['-i', options.outfile]);
    nircmd.on('close', function(/*code, signal*/)
    {
        try
        {
            fs.statSync(options.outfile);
            callback(null);
        }
        catch (error)
        {
            callback('file_not_found');
        }
    });
};