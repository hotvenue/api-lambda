describe('Log', () => {
  const consoleLog = console.log;

  beforeAll(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = consoleLog;
  });

  it('should log something', () => {
    console.log('foo');

    expect(console.log).lastCalledWith('foo');
  });
});
