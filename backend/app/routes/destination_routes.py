from fastapi import APIRouter, HTTPException, Query
from app.services.destination_service import DestinationService

router = APIRouter(prefix="/destinations", tags=["Destinations"])


@router.get("")
def get_destinations(search: str | None = Query(default=None, min_length=1)):
    if search:
        return DestinationService.search(search)
    return DestinationService.get_all()


@router.get("/{name}/activities")
def get_activities(name: str):
    return DestinationService.get_activities(name)


@router.get("/{name}/recommendations")
def get_recommendations(name: str):
    return DestinationService.get_recommendations(name)


@router.get("/{name}")
def get_destination(name: str):
    destination = DestinationService.get_details(name)
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    return destination
