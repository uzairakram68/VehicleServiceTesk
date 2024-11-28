const cloudinary = require("../utility/cloudinary");

const dto = (status, body, message) => {
  return {
    status: status,
    body: body,
    message: message,
  };
};

//-------upload files to cloudinary
const uploadFilesToCloudinary = async (files) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.secure_url);
      });
    });
  });

  const urls = await Promise.all(uploadPromises);

  //------- Cleanup local files after upload
  files.forEach((file) => {
    fs.unlink(file.path, (err) => {
      if (err) console.error(`Failed to delete file: ${file.path}`, err);
    });
  });

  return urls;
};

module.exports = { dto, uploadFilesToCloudinary };
