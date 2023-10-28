const User = require('../models/user');
const authRoutes = require('./auth');

describe('authRoutes', () => {
  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const validatedData = {
        fullName: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123'
      };
      const hashedPassword = 'hashedPassword123';

      const user = new User({
        fullName: validatedData.fullName,
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword
      });

      jest.spyOn(User, 'create').mockResolvedValue(user);

      const req = {
        body: validatedData
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await authRoutes.signup(req, res);

      expect(User.create).toHaveBeenCalledWith({
        fullName: validatedData.fullName,
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ user });
    });
  });
});