const path = require('path');

const cloud = require('../../app/libraries/cloud');

describe('Cloud', () => {
  const dir = path.join(__dirname, '..', 'assets');

  const filename1 = 'file1.txt';
  const filename2 = 'file2.txt';

  const file1 = path.join(dir, filename1);
  const file2 = path.join(dir, filename2);

  beforeEach(() => Promise.all([
    cloud.upload(file1, filename1),
    cloud.upload(file2, filename2),
  ]));

  afterEach(() => Promise.all([
    cloud.delete(filename1),
    cloud.delete(filename2),
  ]));
});
