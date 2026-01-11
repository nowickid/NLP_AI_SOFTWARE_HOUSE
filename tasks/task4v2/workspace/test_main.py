from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app, get_db
from database import Base
import pytest

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="function")
def db_session():
    """Create a new database session for a test."""
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture(scope="function")
def test_client(db_session):
    """Create a test client that uses the test database."""
    def override_get_db():
        try:
            yield db_session
        finally:
            db_session.close()
    
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as client:
        yield client
    del app.dependency_overrides[get_db]


def test_crud_workflow(test_client):
    # 1. Create Asset
    asset_data = {"name": "Test Laptop", "description": "A powerful development machine", "value": 2500.00, "location": "Office A1"}
    response = test_client.post("/assets/", json=asset_data)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == asset_data["name"]
    assert "id" in data
    asset_id = data["id"]

    # 2. Read One Asset
    response = test_client.get(f"/assets/{asset_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == asset_data["name"]
    assert data["id"] == asset_id

    # 3. Read All Assets
    response = test_client.get("/assets/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0

    # 4. Update Asset
    update_data = {"name": "Upgraded Test Laptop", "value": 2750.50, "description": "Upgraded with more RAM", "location": "Office A2"}
    response = test_client.put(f"/assets/{asset_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == update_data["name"]
    assert data["value"] == 2750.50

    # 5. Delete Asset
    response = test_client.delete(f"/assets/{asset_id}")
    assert response.status_code == 200

    # 6. Verify Deletion
    response = test_client.get(f"/assets/{asset_id}")
    assert response.status_code == 404
