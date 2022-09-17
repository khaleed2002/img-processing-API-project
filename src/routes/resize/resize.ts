import express from 'express';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const folderPath:string = path.resolve(__dirname,'..','..','..');
const route:express.Router = express.Router();
export function fileExist(path: string): boolean {
  try {
    if (fs.existsSync(path)) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
}
export async function resizeImg(
  source: string,
  width: number,
  height: number
): Promise<string> {
  const thumbPath = path.join(
    folderPath,
    'imgThumb',
    path.parse(source).name + `_thumb_${width}_${height}.jpg`
  );
  try {
    await sharp(source).resize(width, height).toFile(thumbPath);
  } catch (err) {
    console.log(err);
  }
  return thumbPath;
}
route.get('/', async (req, res) => {
  const width = Number(req.query.width as string),
    height = Number(req.query.height as string);

  const imgPath = path.join(
    folderPath,
    'imgs',
    `${req.query.filename}.jpg`
  );
  //check if image name is valid
  if (!fileExist(imgPath)) {
    return res.send(
      "<h1 style='color:red;font-weight:bold;'>Image you selected is not found,<h1><p>add it first to imgs folder</p>"
    );
  }
  //check if user enter both width & height
  if (req.query.width === undefined || req.query.height === undefined) {
    return res.send(
      "<h1 style='color:red;font-weight:bold;'>wrong parameters. Enter both width and height<h1>"
    );
  }

  //check if width and height are given and it's numbers
  if (isNaN(width) && isNaN(height)) {
    return res.send(
      "<h1 style='color:red;font-weight:bold;'>width and height parameters should be numbers<h1>"
    );
  } else if (isNaN(width)) {
    return res.send(
      "<h1 style='color:red;font-weight:bold;'>width parameter should be a number<h1>"
    );
  } else if (isNaN(height)) {
    return res.send(
      "<h1 style='color:red;font-weight:bold;'>height parameter should be a number<h1>"
    );
  }

  const thumbPath = path.join(
    folderPath,
    'imgThumb',
    path.parse(imgPath).name + `_thumb_${width}_${height}.jpg`
  );
  if (fileExist(thumbPath)) {
    return res.sendFile(thumbPath);
  } else {
    console.log(
      'new image created in thumb folder: ',
      path.parse(imgPath).name + `_thumb_${width}_${height}.jpg`
    );
    return res.sendFile(await resizeImg(imgPath, width, height));
  }
});

export default route;
