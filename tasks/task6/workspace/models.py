from database import db
from sqlalchemy.sql import func
from sqlalchemy import Enum

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'department': self.department
        }

class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    serial_number = db.Column(db.String(100), unique=True, nullable=False)
    status = db.Column(Enum('available', 'assigned', 'maintenance', name='device_status_enum'), default='available', nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'serial_number': self.serial_number,
            'status': self.status
        }

class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    device_id = db.Column(db.Integer, db.ForeignKey('device.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    assigned_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    returned_date = db.Column(db.DateTime(timezone=True), nullable=True)

    device = db.relationship('Device')
    employee = db.relationship('Employee')

    def to_dict(self):
        # A more detailed representation for history
        return {
            'id': self.id,
            'device': self.device.to_dict(),
            'employee': self.employee.to_dict(),
            'assigned_date': self.assigned_date.isoformat(),
            'returned_date': self.returned_date.isoformat() if self.returned_date else None
        }

    def to_dict_simple(self):
        return {
            'id': self.id,
            'device_id': self.device_id,
            'employee_id': self.employee_id,
            'assigned_date': self.assigned_date.isoformat(),
            'returned_date': self.returned_date.isoformat() if self.returned_date else None
        }