/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - email
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       telegramId:
 *         type: string
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *           id:
 *             type: string
 *             format: int64
 */

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
module.exports = function createUser(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      set(email) {
        this.setDataValue('email', email ? email.toLowerCase() : null);
      },
    },

    telegramId: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: (/* models */) => {
        // user.hasMany(models.video);
      },
    },
  });

  return user;
};
