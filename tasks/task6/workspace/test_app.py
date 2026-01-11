import unittest
import json
from app import app, db
from models import Employee, Device, Assignment

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_employee_devices_and_device_history(self):
        # 1. Create an employee and two devices
        employee_response = self.app.post('/api/employees',
                                           data=json.dumps({'name': 'John Doe', 'department': 'IT'}),
                                           content_type='application/json')
        self.assertEqual(employee_response.status_code, 201)
        employee_data = json.loads(employee_response.data)
        employee_id = employee_data['id']

        device1_response = self.app.post('/api/devices',
                                          data=json.dumps({'type': 'Laptop', 'serial_number': 'LAP123'}),
                                          content_type='application/json')
        self.assertEqual(device1_response.status_code, 201)
        device1_data = json.loads(device1_response.data)
        device1_id = device1_data['id']

        device2_response = self.app.post('/api/devices',
                                          data=json.dumps({'type': 'Phone', 'serial_number': 'PHN456'}),
                                          content_type='application/json')
        self.assertEqual(device2_response.status_code, 201)
        device2_data = json.loads(device2_response.data)
        device2_id = device2_data['id']

        # 2. Assign both devices to the employee
        assign1_response = self.app.post('/api/devices/assign',
                                         data=json.dumps({'device_id': device1_id, 'employee_id': employee_id}),
                                         content_type='application/json')
        self.assertEqual(assign1_response.status_code, 201)

        assign2_response = self.app.post('/api/devices/assign',
                                         data=json.dumps({'device_id': device2_id, 'employee_id': employee_id}),
                                         content_type='application/json')
        self.assertEqual(assign2_response.status_code, 201)

        # 3. Call GET /api/employees/<id>/devices to verify that the employee has 2 devices
        employee_devices_response = self.app.get(f'/api/employees/{employee_id}/devices')
        self.assertEqual(employee_devices_response.status_code, 200)
        employee_devices_data = json.loads(employee_devices_response.data)
        self.assertEqual(len(employee_devices_data), 2)

        # 4. Return one of the devices
        return_response = self.app.post('/api/devices/return',
                                        data=json.dumps({'device_id': device1_id}),
                                        content_type='application/json')
        self.assertEqual(return_response.status_code, 200)

        # 5. Call GET /api/employees/<id>/devices again to verify the employee now has only 1 device
        employee_devices_response_after_return = self.app.get(f'/api/employees/{employee_id}/devices')
        self.assertEqual(employee_devices_response_after_return.status_code, 200)
        employee_devices_data_after_return = json.loads(employee_devices_response_after_return.data)
        self.assertEqual(len(employee_devices_data_after_return), 1)
        self.assertEqual(employee_devices_data_after_return[0]['id'], device2_id)

        # 6. Call GET /api/devices/<id>/history for the returned device to verify its full history is present
        device_history_response = self.app.get(f'/api/devices/{device1_id}/history')
        self.assertEqual(device_history_response.status_code, 200)
        device_history_data = json.loads(device_history_response.data)
        self.assertEqual(len(device_history_data), 1)
        self.assertIsNotNone(device_history_data[0]['returned_date'])

if __name__ == '__main__':
    unittest.main()