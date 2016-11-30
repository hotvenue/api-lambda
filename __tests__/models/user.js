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
