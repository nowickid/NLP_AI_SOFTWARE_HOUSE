from sqlalchemy.orm import Session

import models, schemas


def get_asset(db: Session, asset_id: int):
    return db.query(models.Asset).filter(models.Asset.id == asset_id).first()


def get_assets(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Asset).offset(skip).limit(limit).all()


def create_asset(db: Session, asset: schemas.AssetCreate):
    db_asset = models.Asset(**asset.dict())
    db.add(db_asset)
    db.commit()
    db.refresh(db_asset)
    return db_asset


def update_asset(db: Session, asset_id: int, asset: schemas.AssetUpdate):
    db_asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
    if db_asset:
        for key, value in asset.dict().items():
            setattr(db_asset, key, value)
        db.commit()
        db.refresh(db_asset)
    return db_asset


def delete_asset(db: Session, asset_id: int):
    db_asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
    if db_asset:
        db.delete(db_asset)
        db.commit()
    return db_asset
