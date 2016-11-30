const request = require('supertest');

const app = require('../../app');
const models = require('../../app/models');

describe('User', () => {
  let userId;

  beforeEach(() => models.sequelize.sync({ force: true })
    .then(() => Promise.all([
      models.user.create({ email: 'foo@bar.com' }),
      models.user.create({ email: 'bar@foo.com' }),
    ]))
    .then((users) => {
      userId = users[0].id;
    }));

  describe('Create', () => {
    it('POST /users should create a user', () => request(app)
      .post('/users')
      .send({ email: 'new@user.com' })
      .expect(201));

    it('POST /users should not create a user if no email', () => request(app)
      .post('/users')
      .expect(400)
      .expect((res) => {
        const err = res.body.errors;

        expect(err).toBeDefined();
        expect(err).toHaveLength(1);

        const errEmail = err[0];

        expect(errEmail.field).toBeDefined();
        expect(errEmail.field).toBe('email');
        expect(errEmail.message).toBeDefined();
        expect(errEmail.message).toBe('email cannot be null');
      }));

    it('POST /users should not create a user if existing email', () => request(app)
      .post('/users')
      .send({ email: 'foo@bar.com' })
      .expect(400)
      .expect((res) => {
        const err = res.body.errors;

        expect(err).toBeDefined();
        expect(err).toHaveLength(1);

        const errEmail = err[0];

        expect(errEmail.field).toBeDefined();
        expect(errEmail.field).toBe('email');
        expect(errEmail.message).toBeDefined();
        expect(errEmail.message).toBe('email must be unique');
      }));
  });

  describe('Read', () => {
    it('GET /users should return 2 users', () => request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        const users = res.body;

        expect(users).toHaveLength(2);

        const user = users[0];

        expect(user.id).toBeDefined();
        expect(user.email).toBeDefined();
        expect(user.telegramId).toBeDefined();
        expect(user.telegramId).toBeNull();
        expect(user.createdAt).toBeDefined();
        expect(user.updatedAt).toBeDefined();
      }));

    it('GET /users/:id should return a user', () => request(app)
      .get(`/users/${userId}`)
      .expect(200)
      .expect((res) => {
        const user = res.body;

        expect(user.id).toBeDefined();
        expect(user.email).toBeDefined();
        expect(user.telegramId).toBeDefined();
        expect(user.telegramId).toBeNull();
        expect(user.createdAt).toBeDefined();
        expect(user.updatedAt).toBeDefined();
      }));

    it('GET /users/:id should be 404 if the user doesn\'t exist', () => request(app)
      .get('/users/99')
      .expect(404));
  });
});
