from flask import Flask, request, jsonify
from database import db
from models import Employee, Device, Assignment
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///assets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/api/employees', methods=['POST'])
def create_employee():
    data = request.get_json()
    new_employee = Employee(name=data['name'], department=data['department'])
    db.session.add(new_employee)
    db.session.commit()
    return jsonify(new_employee.to_dict()), 201

@app.route('/api/devices', methods=['POST'])
def create_device():
    data = request.get_json()
    new_device = Device(type=data['type'], serial_number=data['serial_number'])
    db.session.add(new_device)
    db.session.commit()
    return jsonify(new_device.to_dict()), 201

@app.route('/api/devices/available', methods=['GET'])
def get_available_devices():
    available_devices = Device.query.filter_by(status='available').all()
    return jsonify([device.to_dict() for device in available_devices])

@app.route('/api/devices/assign', methods=['POST'])
def assign_device():
    data = request.get_json()
    device = Device.query.get(data['device_id'])
    if not device:
        return jsonify({"error": "Device not found."}), 404
    if device.status != 'available':
        return jsonify({"error": "Device is not available for assignment."}), 409

    new_assignment = Assignment(device_id=data['device_id'], employee_id=data['employee_id'])
    device.status = 'assigned'
    db.session.add(new_assignment)
    db.session.commit()
    return jsonify(new_assignment.to_dict_simple()), 201

@app.route('/api/devices/return', methods=['POST'])
def return_device():
    data = request.get_json()
    device = Device.query.get(data['device_id'])
    if not device:
        return jsonify({"error": "Device not found."}), 404

    assignment = Assignment.query.filter_by(device_id=data['device_id'], returned_date=None).first()
    if not assignment:
        return jsonify({"error": "No active assignment found for this device."}), 400

    assignment.returned_date = datetime.utcnow()
    device.status = 'available'
    db.session.commit()
    return jsonify({"message": "Device returned successfully."})

@app.route('/api/devices/maintenance', methods=['POST'])
def set_maintenance():
    data = request.get_json()
    device = Device.query.get(data['device_id'])
    if not device:
        return jsonify({"error": "Device not found."}), 404
    device.status = 'maintenance'
    db.session.commit()
    return jsonify({"message": "Device status updated to maintenance."})

@app.route('/api/employees/<int:id>/devices', methods=['GET'])
def get_employee_devices(id):
    assignments = Assignment.query.filter_by(employee_id=id, returned_date=None).all()
    devices = [assignment.device for assignment in assignments]
    return jsonify([device.to_dict() for device in devices])

@app.route('/api/devices/<int:id>/history', methods=['GET'])
def get_device_history(id):
    assignments = Assignment.query.filter_by(device_id=id).all()
    return jsonify([assignment.to_dict() for assignment in assignments])

if __name__ == '__main__':
    app.run(port=5001, debug=True)