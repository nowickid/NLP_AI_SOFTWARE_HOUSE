from software_house.software_house import run_software_house
from config import WORKSPACE_DIR, DOCS_DIR
from dotenv import load_dotenv
from tokens_sum import get_token_counts, get_sum
import os
import logging
import json

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(message)s',
    datefmt='%H:%M:%S'
)


def save_file(file_path: str, content: str):
    print(content)
    with open(file_path, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    if not os.path.exists(WORKSPACE_DIR):
        os.makedirs(WORKSPACE_DIR)
    if not os.path.exists(DOCS_DIR):
        os.makedirs(DOCS_DIR)

    openApi = """
    openapi: 3.0.3
info:
  title: Asset Management API
  description: Simple API for managing employees, assets and assignments
  version: 1.0.0

servers:
  - url: http://localhost:3000/api
    description: Local server

paths:
  /employees:
    post:
      summary: Register a new employee
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - name
                - department
              properties:
                name:
                  type: string
                  example: John Doe
                department:
                  type: string
                  example: IT
      responses:
        '201':
          description: Employee created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Employee'

  /employees/{id}/assets:
    get:
      summary: Get assets assigned to employee
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: List of employee assets
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Asset'

  /assets:
    post:
      summary: Add a new asset
      description: Default status is 'available'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - type
                - serial_number
              properties:
                type:
                  type: string
                  example: Laptop
                serial_number:
                  type: string
                  example: SN123456789
      responses:
        '201':
          description: Asset created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Asset'

    get:
      summary: List assets
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum:
              - available
              - assigned
              - maintenance
          example: available
      responses:
        '200':
          description: List of assets
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Asset'

  /assets/{id}/history:
    get:
      summary: Get asset assignment history
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Assignment history
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/AssignmentHistory'

  /assignments:
    post:
      summary: Assign asset to employee
      description: Fails if asset is already assigned or in maintenance
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - asset_id
                - employee_id
              properties:
                asset_id:
                  type: integer
                  example: 123
                employee_id:
                  type: integer
                  example: 456
      responses:
        '201':
          description: Assignment created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Assignment'
        '409':
          description: Asset already assigned or in maintenance

  /returns:
    post:
      summary: Return asset from employee
      description: Changes asset status back to 'available'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - assignment_id
              properties:
                assignment_id:
                  type: integer
                  example: 789
      responses:
        '200':
          description: Asset returned

  /maintenance:
    post:
      summary: Flag asset as broken
      description: Changes asset status to 'maintenance'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - asset_id
              properties:
                asset_id:
                  type: integer
                  example: 123
                issue_description:
                  type: string
                  example: Screen not working
      responses:
        '201':
          description: Asset flagged for maintenance

components:
  schemas:
    Employee:
      type: object
      properties:
        id:
          type: integer
          example: 1
        name:
          type: string
          example: John Doe
        department:
          type: string
          example: IT

    Asset:
      type: object
      properties:
        id:
          type: integer
          example: 123
        type:
          type: string
          example: Laptop
        serial_number:
          type: string
          example: SN123456789
        status:
          type: string
          enum:
            - available
            - assigned
            - maintenance
          example: available

    Assignment:
      type: object
      properties:
        id:
          type: integer
          example: 789
        asset_id:
          type: integer
          example: 123
        employee_id:
          type: integer
          example: 1
        assigned_at:
          type: string
          format: date-time
          example: '2024-01-20T09:00:00Z'

    AssignmentHistory:
      type: object
      properties:
        assignment_id:
          type: integer
          example: 789
        employee_name:
          type: string
          example: John Doe
        assigned_at:
          type: string
          format: date-time
          example: '2024-01-20T09:00:00Z'
        returned_at:
          type: string
          format: date-time
          example: '2024-02-15T16:30:00Z'

    """
    # task = "Create a modern frontend application for Asset Management system that consumes the API endpoints defined in the provided OpenAPI specification file. The frontend should be visually stunning, highly polished, and provide an excellent user experience with smooth interactions and clear feedback for all actions. spec file: " + openApi
#     task ="""
# Create a fullstack Asset Management application that allows organizations to track and manage their device inventory and employee assignments.
# Use Cases:
# 1. Register new employees with their name and department
# 2. Add new devices to inventory (type, serial number) - default status must be 'available'
# 3. List devices that are currently available in stock
# 4. Assign assets to employees - this must fail if the asset is already assigned to someone else or is in maintenance
# 5. Process the return of an asset from an employee (change status back to 'available')
# 6. Flag an asset as broken (status 'maintenance')
# 7. View what assets a specific employee currently holds
# 8. View complete assignment history for any device (audit log)
# The frontend should be visually stunning, highly polished, and provide an excellent user experience with smooth interactions and clear feedback for all actions.
# """
    # task="Create a backend system for Asset Management that provides data persistence, executes business logic, and exposes all endpoints defined in the provided OpenAPI specification file. Use light local SQL-based database. spec file:{openApi}"
    task = """
    Create a fullstack Asset Management application that allows organizations to track and manage their device inventory and employee assignments.
Use Cases:
1. Register new employees with their name and department
2. Add new devices to inventory (type, serial number) - default status must be 'available'
3. List devices that are currently available in stock
4. Assign assets to employees - this must fail if the asset is already assigned to someone else or is in maintenance
5. Process the return of an asset from an employee (change status back to 'available')
6. Flag an asset as broken (status 'maintenance')
7. View what assets a specific employee currently holds
8. View complete assignment history for any device (audit log). The frontend should be visually stunning, highly polished, and provide an excellent user experience with smooth interactions and clear feedback for all actions.
    """
    save_file(os.path.join(DOCS_DIR, "task.txt"), task)
    run_software_house(task)

    input_tokens, output_tokens = get_token_counts()
    sum_data = get_sum()
    save_file(os.path.join(DOCS_DIR, "token_usage_summary.json"), json.dumps(sum_data, indent=4))
    logging.info("Software House run completed.")
    logging.info("  Total input tokens: %d", input_tokens)
    logging.info("  Total output tokens: %d", output_tokens)
