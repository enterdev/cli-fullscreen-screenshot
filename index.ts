declare const require: any;
declare const process: any;

export class Screenshot
{
    constructor(config, callback:Function = null)
    {
        require(`./platforms/${process.platform}.js`)(config, function(error)
        {
            if (callback !== null)
                callback(error);
        });
    }
}