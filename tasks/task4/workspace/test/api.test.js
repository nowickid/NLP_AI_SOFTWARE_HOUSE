import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import { initializeDb } from '../src/database/database.js';

describe('Asset Management API', () => {
    beforeEach((done) => {
        initializeDb();
        setTimeout(done, 100);
    });

    describe('POST /api/employees', () => {
        it('should create a new employee', async () => {
            const res = await request(app)
                .post('/api/employees')
                .send({ name: 'John Doe', department: 'IT' });
            
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body.name).to.equal('John Doe');
        });
    });

    describe('POST /api/assets', () => {
        it('should create a new asset', async () => {
            const res = await request(app)
                .post('/api/assets')
                .send({ type: 'Laptop', serial_number: 'SN12345' });

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body.type).to.equal('Laptop');
            expect(res.body.status).to.equal('available');
        });
    });

    describe('GET /api/assets?status=available', () => {
        it('should list all available assets', async () => {
            await request(app)
                .post('/api/assets')
                .send({ type: 'Monitor', serial_number: 'SN67890' });

            const res = await request(app).get('/api/assets?status=available');

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            expect(res.body[0].type).to.equal('Monitor');
            expect(res.body[0].status).to.equal('available');
        });
    });

    describe('POST /api/assignments', () => {
        let employee;
        let asset;

        beforeEach(async () => {
            const employeeRes = await request(app).post('/api/employees').send({ name: 'Jane Smith', department: 'HR' });
            employee = employeeRes.body;
            const assetRes = await request(app).post('/api/assets').send({ type: 'Keyboard', serial_number: 'SNK1122' });
            asset = assetRes.body;
        });

        it('should successfully assign an available asset to an employee', async () => {
            const res = await request(app)
                .post('/api/assignments')
                .send({ employee_id: employee.id, asset_id: asset.id });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('assignment_id');
        });

        it('should fail to assign an asset that is already assigned', async () => {
            await request(app)
                .post('/api/assignments')
                .send({ employee_id: employee.id, asset_id: asset.id });

            const anotherEmployeeRes = await request(app).post('/api/employees').send({ name: 'Peter Jones', department: 'Finance' });
            const anotherEmployee = anotherEmployeeRes.body;

            const res = await request(app)
                .post('/api/assignments')
                .send({ employee_id: anotherEmployee.id, asset_id: asset.id });

            expect(res.status).to.equal(409);
        });
    });

    describe('POST /api/returns', () => {
        let employee;
        let asset;

        beforeEach(async () => {
            const employeeRes = await request(app).post('/api/employees').send({ name: 'Alice', department: 'Marketing' });
            employee = employeeRes.body;
            const assetRes = await request(app).post('/api/assets').send({ type: 'Mouse', serial_number: 'SNM3344' });
            asset = assetRes.body;
            await request(app)
                .post('/api/assignments')
                .send({ employee_id: employee.id, asset_id: asset.id });
        });

        it('should successfully return an assigned asset', async () => {
            const res = await request(app)
                .post('/api/returns')
                .send({ asset_id: asset.id });

            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Asset returned successfully.');
        });

        it('should fail to return an asset that is not currently assigned', async () => {
            await request(app).post('/api/returns').send({ asset_id: asset.id });

            const res = await request(app)
                .post('/api/returns')
                .send({ asset_id: asset.id });

            expect(res.status).to.equal(404);
        });
    });
    
    describe('POST /api/maintenance', () => {
        it('should successfully flag an asset for maintenance', async () => {
            const assetRes = await request(app).post('/api/assets').send({ type: 'Projector', serial_number: 'SNP5566' });
            const asset = assetRes.body;

            const res = await request(app)
                .post('/api/maintenance')
                .send({ asset_id: asset.id });

            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Asset has been flagged for maintenance.');
        });
    });

    describe('GET /api/employees/:id/assets', () => {
        it('should retrieve all assets currently assigned to a specific employee', async () => {
            const employeeRes = await request(app).post('/api/employees').send({ name: 'Asset Holder', department: 'Ops' });
            const employee = employeeRes.body;
            const asset1Res = await request(app).post('/api/assets').send({ type: 'Docking Station', serial_number: 'SNDS7788' });
            const asset1 = asset1Res.body;
            const asset2Res = await request(app).post('/api/assets').send({ type: 'Webcam', serial_number: 'SNWC9900' });
            const asset2 = asset2Res.body;

            await request(app).post('/api/assignments').send({ employee_id: employee.id, asset_id: asset1.id });
            await request(app).post('/api/assignments').send({ employee_id: employee.id, asset_id: asset2.id });

            const res = await request(app).get(`/api/employees/${employee.id}/assets`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
        });
    });

    describe('GET /api/assets/:id/history', () => {
        it('should retrieve the assignment history for a specific asset', async () => {
            const emp1Res = await request(app).post('/api/employees').send({ name: 'First User', department: 'R&D' });
            const emp1 = emp1Res.body;
            const emp2Res = await request(app).post('/api/employees').send({ name: 'Second User', department: 'QA' });
            const emp2 = emp2Res.body;
            const assetRes = await request(app).post('/api/assets').send({ type: 'Shared Tablet', serial_number: 'SNST1212' });
            const asset = assetRes.body;

            await request(app).post('/api/assignments').send({ employee_id: emp1.id, asset_id: asset.id });
            await request(app).post('/api/returns').send({ asset_id: asset.id });
            await request(app).post('/api/assignments').send({ employee_id: emp2.id, asset_id: asset.id });

            const res = await request(app).get(`/api/assets/${asset.id}/history`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
        });
    });
});