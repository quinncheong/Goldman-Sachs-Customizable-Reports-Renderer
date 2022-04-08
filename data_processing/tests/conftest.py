from typing import Any, Generator

import pytest
from src import main
from fastapi import FastAPI
from fastapi.testclient import TestClient


@pytest.fixture(autouse=True)
def app() -> Generator[FastAPI, Any, None]:
    """
    Create a fresh database on each test case.
    """
    _app = main.get_application()
    yield _app


@pytest.fixture()
def client(app: FastAPI) -> Generator[TestClient, Any, None]:
    """
    Create a new FastAPI TestClient
    """
    with TestClient(app) as client:
        yield client
