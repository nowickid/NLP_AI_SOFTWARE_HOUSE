from sqlalchemy import Column, Integer, String, Float
from database import Base

class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    value = Column(Float)
    location = Column(String)