from pydantic import BaseModel

class AssetBase(BaseModel):
    name: str
    description: str | None = None
    value: float
    location: str

class AssetCreate(AssetBase):
    pass

class AssetUpdate(AssetBase):
    pass

class Asset(AssetBase):
    id: int

    class Config:
        orm_mode = True
