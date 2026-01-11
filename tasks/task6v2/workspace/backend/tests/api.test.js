const request = require('supertest');
const app = require('../src/index');
const { db, createTables } = require('../db/database');

beforeAll((done) => {
  createTables((err) => {
    if (err) return done(err);
    done();
  });
});

afterEach((done) => {
  db.serialize(() => {
    db.run('DELETE FROM assignments', () => {});
    db.run('DELETE FROM devices', () => {});
    db.run('DELETE FROM employees', () => {
        done();
    });
  });
});

afterAll((done) => {
  db.close((err) => {
    if (err) return done(err);
    done();
  });
});

describe('Employee API', () => {
  it('should create a new employee', async () => {
    const res = await request(app)
      .post('/api/employees')
      .send({ name: 'John Doe', department: 'IT' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('John Doe');
  });

  it('should fail to create an employee without a name', async () => {
    const res = await request(app)
      .post('/api/employees')
      .send({ department: 'IT' });
    expect(res.statusCode).toEqual(400);
  });
});

describe('Device and Assignment API', () => {
  it('should create a new device', async () => {
    const res = await request(app)
      .post('/api/devices')
      .send({ type: 'Laptop', serial_number: '12345' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.serial_number).toBe('12345');
  });

  it('should get available devices', async () => {
    await request(app)
      .post('/api/devices')
      .send({ type: 'Laptop', serial_number: '12345' });
    const res = await request(app).get('/api/devices/available');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].serial_number).toBe('12345');
  });

  it('should assign a device to an employee', async () => {
    const employeeRes = await request(app)
      .post('/api/employees')
      .send({ name: 'John Doe', department: 'IT' });
    const deviceRes = await request(app)
      .post('/api/devices')
      .send({ type: 'Laptop', serial_number: '12345' });

    const assignRes = await request(app)
      .post('/api/devices/assign')
      .send({ deviceId: deviceRes.body.id, employeeId: employeeRes.body.id });
    expect(assignRes.statusCode).toEqual(200);

    const availableDevicesRes = await request(app).get('/api/devices/available');
    expect(availableDevicesRes.body.length).toBe(0);

    const employeeDevicesRes = await request(app).get(`/api/employees/${employeeRes.body.id}/devices`);
    expect(employeeDevicesRes.body.length).toBe(1);
    expect(employeeDevicesRes.body[0].serial_number).toBe('12345');
  });

  it('should fail to assign an unavailable device', async () => {
    const employeeRes = await request(app)
        .post('/api/employees')
        .send({ name: 'John Doe', department: 'IT' });
    const deviceRes = await request(app)
        .post('/api/devices')
        .send({ type: 'Laptop', serial_number: '12345' });

    await request(app)
        .post('/api/devices/assign')
        .send({ deviceId: deviceRes.body.id, employeeId: employeeRes.body.id });

    const employee2Res = await request(app)
        .post('/api/employees')
        .send({ name: 'Jane Doe', department: 'IT' });

    const res = await request(app)
        .post('/api/devices/assign')
        .send({ deviceId: deviceRes.body.id, employeeId: employee2Res.body.id });
    expect(res.statusCode).toEqual(400);
  });

  it('should return a device', async () => {
    const employeeRes = await request(app)
      .post('/api/employees')
      .send({ name: 'John Doe', department: 'IT' });
    const deviceRes = await request(app)
      .post('/api/devices')
      .send({ type: 'Laptop', serial_number: '12345' });

    await request(app)
      .post('/api/devices/assign')
      .send({ deviceId: deviceRes.body.id, employeeId: employeeRes.body.id });

    const returnRes = await request(app).post(`/api/devices/${deviceRes.body.id}/return`);
    expect(returnRes.statusCode).toEqual(200);

    const availableDevicesRes = await request(app).get('/api/devices/available');
    expect(availableDevicesRes.body.length).toBe(1);
  });

  it('should set a device to maintenance', async () => {
    const deviceRes = await request(app)
      .post('/api/devices')
      .send({ type: 'Laptop', serial_number: '12345' });

    const maintenanceRes = await request(app).post(`/api/devices/${deviceRes.body.id}/maintenance`);
    expect(maintenanceRes.statusCode).toEqual(200);

    const availableDevicesRes = await request(app).get('/api/devices/available');
    expect(availableDevicesRes.body.length).toBe(0);
  });

  it('should get device history', async () => {
    const employee1Res = await request(app)
      .post('/api/employees')
      .send({ name: 'John Doe', department: 'IT' });
    const employee2Res = await request(app)
        .post('/api/employees')
        .send({ name: 'Jane Doe', department: 'IT' });
    const deviceRes = await request(app)
      .post('/api/devices')
      .send({ type: 'Laptop', serial_number: '12345' });

    await request(app)
      .post('/api/devices/assign')
      .send({ deviceId: deviceRes.body.id, employeeId: employee1Res.body.id });
    await request(app).post(`/api/devices/${deviceRes.body.id}/return`);
    await request(app)
      .post('/api/devices/assign')
      .send({ deviceId: deviceRes.body.id, employeeId: employee2Res.body.id });

    const historyRes = await request(app).get(`/api/devices/${deviceRes.body.id}/history`);
    expect(historyRes.statusCode).toEqual(200);
    expect(historyRes.body.length).toBe(2);
  });
});
