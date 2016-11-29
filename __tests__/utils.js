const utils = module.exports = {
  createEvent(path, method = 'get', query = null, body = null) {
    return {
      body: JSON.stringify(body),
      resource: '/{proxy+}',
      queryStringParameters: query,
      httpMethod: method.toUpperCase(),
      path,
    };
  },
};

describe('Utils', () => {
  it('should return the right AWS Lambda Event', () => {
    const event = utils.createEvent('/foo/bar', 'post', { foo: 'bar' }, { foo: 'bar' });

    expect(event).toEqual({
      body: '{"foo":"bar"}',
      resource: '/{proxy+}',
      queryStringParameters: { foo: 'bar' },
      httpMethod: 'POST',
      path: '/foo/bar',
    });
  });
});
