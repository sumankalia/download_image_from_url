const https = require("https"); // or 'https' for https:// URLs
const fs = require("fs");

// "https://images.freeimages.com/images/large-previews/af4/sparklers-2-1200038.jpg",
//       "https://images.freeimages.com/images/large-previews/3b2/prague-conference-center-1056491.jpg",
//       "https://images.freeimages.com/images/large-previews/8b6/pumpkin-1327212.jpg",
//       "https://images.freeimages.com/images/large-previews/4b2/walking-on-the-mountain-1-1566594.jpg",

exports.create = async (req, res) => {
  try {
    console.log(req.file);
    const image = req.file;

    let imagePath = "";
    if (image) {
      imagePath = image.path;
    }

    res.json({
      success: 1,
      file: {
        url: `http://localhost:4001/${imagePath}`,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.createByUrl = async (req, res) => {
  try {
    console.log(req.body);
    const { url } = req.body;

    const name = Date.now().toString();
    const imagePath = `public/urls/${name}.jpg`;
    const file = fs.createWriteStream(`./${imagePath}`);
    https.get(url, (response) => {
      console.log(response);
      response.pipe(file);

      file.on("finish", () => {
        console.log("Download Complete");
        file.close();
        res.json({
          success: 1,
          file: {
            url: `https://localhost:4001/${imagePath}`,
          },
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
