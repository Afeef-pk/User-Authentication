const request = require('supertest');
const server = require('../index');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require("bcrypt");

jest.mock('../models/user'); 

describe('User Authentication', () => {
    afterAll(async () => {
       jest.clearAllMocks();
        await mongoose.connection.close();
        server.close(); 
    });

    it('should return 400 if user Registration Data is not provided', async () => {
        const response = await request(server)
          .post('/api/register')
          .send({});
        expect(response.status).toBe(400);
      });

      it('should register a new user', async () => {
        User.findOne.mockResolvedValue(null);
        const response = await request(server)
          .post('/api/register')
          .send({
            name: 'Test User',
            email:"test@example.com",
            mobile:"9876543210",
            password: 'password123',
          });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Signup successfull');
      });
      
      it('should return error message if user is already registered', async () => {
        User.findOne.mockResolvedValue({});
        const response = await request(server)
          .post('/api/register')
          .send({
            name: 'Test User',
            email: 'test@example.com',
            mobile: '9876543210',
            password: 'password123',
          });
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('message', 'User already exists');
      });

      it('should return 400 if user login Data is not provided', async () => {
        const response = await request(server)
          .post('/api/login')
          .send({});
        expect(response.status).toBe(400);
      });

      it('should return error message if user is not registered', async () => {
        User.findOne.mockResolvedValue(null);
        const response = await request(server)
          .post('/api/login')
          .send({
            email: 'test@example.com',
            password: 'password123'
          });
          expect(response.body).toHaveProperty('message', 'User not found');
        expect(response.status).toBe(404);
      });

      it('should login the user and return token', async () => {
        User.findOne.mockResolvedValue({
          email: 'test@example.com',
          password: await bcrypt.hash('password123', 10) 
      });
        const response = await request(server)
          .post('/api/login')
          .send({
            email:"test@example.com",
            password: 'password123'
          });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Login Successfull');
        const cookies = response.headers['set-cookie'];
        expect(cookies).toHaveLength(1)
      });
});
