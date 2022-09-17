import { fileExist, resizeImg } from '../routes/resize/resize';
import path from 'path';
import fs from 'fs';
describe('Testing functions in resize file', () => {
  const projectPath = path.resolve(__dirname,'..','..');
  describe('test file existance', () => {
    it('if file is exist', () => {
      //testing on package.json file
      const packPath = path.join(projectPath, 'package.json');
      expect(fileExist(packPath)).toBeTruthy();
    });
    it('if file is not exist', () => {
      const falsePath = path.join(projectPath, 'pack.json');
      expect(fileExist(falsePath)).toBeFalsy();
    });
  });
  it('resizing an image', async () => {
    const imgPath = path.join(projectPath, 'imgs', 'fjord.jpg');
    const newImgPath = resizeImg(imgPath, 500, 700);
    expect(fileExist((await (newImgPath as unknown)) as string)).toBeTruthy();
    //delete created image after finish testing
    fs.unlinkSync(
      path.join(path.resolve(), 'imgThumb', 'fjord_thumb_500_700.jpg')
    );
  });
});
