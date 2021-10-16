import multer = require('multer');
import path = require('path');
import crypto = require('crypto');


const uploadFolder = path.resolve(__dirname,'..','..','uploads');

export default{
    directory:uploadFolder,
    storage: multer.diskStorage({
        destination:uploadFolder,
        filename(request,file,callback){
            const fileHash = crypto.randomBytes(10).toString('hex');

            const filename = `${fileHash}-${file.originalname}`

            callback(null, filename)
        }
    })
}