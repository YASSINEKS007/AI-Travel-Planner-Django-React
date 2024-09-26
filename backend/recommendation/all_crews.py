from .activities_crew import activities_crew
from .flights_crew import flights_crew
from .restaurants_crew import restaurants_crew
import json


llm: str = "ollama/llama3.1"


def execute_crews(criteria: str, city_origin: str, city_destination: str, departure_date: str, return_date: str, adults: int):
    flights_crew_result = flights_crew(
        llm=llm, criteria=criteria, city_origin=city_origin,
        city_destination=city_destination, departure_date=departure_date,
        return_date=return_date, adults=1).kickoff()

    activities_crew_result = activities_crew(
        llm=llm, criteria=criteria, destination_city=city_destination).kickoff()

    restaurants_crew_result = restaurants_crew(
        llm=llm, criteria=criteria, destination_city=city_destination).kickoff()

    flight_data = json.loads(str(flights_crew_result))
    activities_data = json.loads(str(activities_crew_result))
    restaurants_data = json.loads(str(restaurants_crew_result))

    return flight_data, activities_data, restaurants_data
