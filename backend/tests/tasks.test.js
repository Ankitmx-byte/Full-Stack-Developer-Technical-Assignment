const request = require('supertest');
const app = require('../server');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');

// Mock data to ensure clean state
describe('Task API Endpoints', () => {
  beforeAll(() => {
    // Clear data before tests
    fs.writeFileSync(dataPath, '[]', 'utf8');
  });

  afterAll(() => {
    // Cleanup if necessary
    if (fs.existsSync(dataPath)) {
      fs.unlinkSync(dataPath);
    }
  });

  let taskId;

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('Test Task');
    expect(res.body.completed).toEqual(false);
    taskId = res.body.id;
  });

  it('should fail to create a task without a title', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({});
    expect(res.statusCode).toEqual(400);
  });

  it('should get all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].title).toEqual('Test Task');
  });

  it('should update a task as completed', async () => {
    const res = await request(app)
      .patch(`/tasks/${taskId}`)
      .send({
        completed: true
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.completed).toEqual(true);
  });

  it('should delete a task', async () => {
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.statusCode).toEqual(204);

    const getRes = await request(app).get('/tasks');
    expect(getRes.body.length).toEqual(0);
  });
});
