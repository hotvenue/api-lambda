'use strict';

const fs = require('fs');
const path = require('path');

const cloud = require('../../app/libraries/cloud');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000; // eslint-disable-line no-undef

describe('Cloud', () => {
  const dir = path.join(__dirname, '..', 'assets');

  const filename1 = 'file1.txt';
  const filename2 = 'file2.txt';
  const filename3 = 'file3.txt';

  const file1 = path.join(dir, filename1);
  const file2 = path.join(dir, filename2);
  const file3 = path.join(dir, filename3);

  beforeEach(() => Promise.all([
    cloud.upload(file1, filename1),
  ]));

  afterEach(() => Promise.all([
    cloud.delete(filename1),
    cloud.delete(filename2),
  ]));

  it('should upload a file', () => cloud.upload(file2, filename2)
      .then(() => cloud.check(filename2))
      .then((meta) => {
        expect(meta).toBeDefined();
        expect(meta).toBeInstanceOf(Object);
        expect(meta.AcceptRanges).toBeDefined();
        expect(meta.LastModified).toBeDefined();
        expect(meta.ContentLength).toBe('0');
        expect(meta.ETag).toBeDefined();
        expect(meta.ContentType).toBe('application/octet-stream');
      }));

  it('should download a file', () => cloud.download(filename1, file3)
    .then(() => fs.statSync(file3))
    .then((stats) => {
      expect(stats).toBeDefined();
      expect(stats.isFile()).toBeTruthy();

      fs.unlinkSync(file3);
    }));

  it('should download the content of a file', () => cloud.download(filename1)
    .then((body) => {
      expect(body).toBeDefined();
      expect(body).toBeInstanceOf(Buffer);
    }));

  it('should delete a file', () => cloud.delete(filename1)
    .then(() => cloud.check(filename1))
    .catch(err => expect(err.code).toBe('NotFound')));

  it('should copy a file', () => cloud.copy(filename1, filename2)
    .then(() => cloud.check(filename2)));
});
