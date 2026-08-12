from app.repositories.destination_repository import DestinationRepository


class DestinationService:

    @staticmethod
    def get_all():
        return DestinationRepository.get_all_destinations()

    @staticmethod
    def get_details(name: str):
        return DestinationRepository.get_destination_details(name)

    @staticmethod
    def get_activities(name: str):
        return DestinationRepository.get_activities(name)

    @staticmethod
    def get_recommendations(name: str):
        return DestinationRepository.get_recommendations(name)

    @staticmethod
    def search(search: str):
        return DestinationRepository.search_destinations(search)
