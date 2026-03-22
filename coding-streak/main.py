from pydantic import BaseModel, Field
from fastapi import FastAPI, Query
from enum import Enum
from datetime import date
from typing_extensions import Literal, Annotated, Any

openapi_tags = [
    {
        "name": "root",
        "description": "Root endpoint for basic health checks and general information.",
    },
    {
        "name": "dataset",
        "description": "Manage specific items in the database.",
        "externalDocs": {
            "description": "Items external docs",
            "url": "https://fastapi.tiangolo.com/tutorial/metadata/",
        },
    },
    {
        "name": "streaks",
        "description": "Operations with streaks. The **streak** logic goes here.",
    },
]

app = FastAPI(openapi_tags=openapi_tags)


class FilterParams(BaseModel):
    start_date: date
    end_date: date
    size: int = Field(100, gt=0, le=100)
    offset: int = Field(0, ge=0)
    order_by: Literal["created_at", "updated_at"] = "created_at"
    order_direction: Literal["asc", "desc"] = "asc"


class StreakItemStatus(str, Enum):
    Completed = "completed"
    Missed = "missed"


class PaginationParams(BaseModel):
    total: int
    size: int
    page: int
    pages: int


class StreakRecord(BaseModel):
    user_id: int
    status: StreakItemStatus
    date: date


class StreakListResponse(BaseModel):
    items: list[StreakRecord]
    filter: FilterParams
    pagination: PaginationParams


@app.get("/", tags=["root"])
def read_root():
    return {"ping": "pong"}


@app.get('/dataset/streaks/streak-statuses', tags=["dataset"])
def read_streak_statuses() -> list[StreakItemStatus]:
    return list(StreakItemStatus)


@app.post('/{user_id}/streaks', tags=["streaks"])
def create_streak_record(user_id: int, record: StreakRecord):
    record.user_id = user_id
    # Here you would typically save the record to a database
    return {"message": "Streak record created successfully", "record": record}


@app.get('/{user_id}/streaks', tags=["streaks"])
def get_streak_records(user_id: int, filter_query: Annotated[FilterParams, Query()]) -> StreakListResponse:
    # Here you would typically retrieve records from a database
    # For demonstration, we return a static list of records
    return {
        "items": [
            StreakRecord(
                user_id=user_id, status=StreakItemStatus.Completed, date=date(2024, 6, 1)),
            StreakRecord(
                user_id=user_id, status=StreakItemStatus.Missed, date=date(2024, 6, 2)),
        ],
        "filter": filter_query,
        "pagination": PaginationParams(total=2, size=filter_query.size, page=1, pages=1)

    }


@app.get('/{user_id}/streaks/{streak_id}', tags=["streaks"])
def get_streak_record(user_id: int, streak_id: int) -> StreakRecord:
    # Here you would typically retrieve a specific record from a database
    # For demonstration, we return a static record
    return StreakRecord(user_id=user_id, status=StreakItemStatus.Completed, date=date(2024, 6, 1))
