# -*- coding: utf-8 -*-
# mypy: disable-error-code="attr-defined"
from fastapi import APIRouter
import logging
from fastapi import APIRouter, Depends, logger
from fastapi_cache.decorator import cache
import asyncpg
import os
from dotenv import load_dotenv

from app.schemas.response_schema import IGetResponseBase, create_response
from app.schemas.tool_schemas.sql_tool_schema import ExecutionResult
from app.utils.sql import is_sql_query_safe

load_dotenv('/home/sydsyd/source/repos/agentkit/.env')

router = APIRouter()
logger = logging.getLogger(__name__)

pool = None

async def init_pool():
    global pool
    database_user = os.getenv('DATABASE_USER')
    database_password = os.getenv('DATABASE_PASSWORD')
    database_host = os.getenv('DATABASE_HOST')
    database_name = os.getenv('DATABASE_NAME')
    database_port = os.getenv('DATABASE_PORT')

    dsn = f"postgresql://{database_user}:{database_password}@{database_host}:{database_port}/{database_name}"
    pool = await asyncpg.create_pool(dsn=dsn)

@router.on_event("startup")
async def startup():
    await init_pool()

@router.get("/execute")
@cache(expire=600)  # -> Bug on POST requests https://github.com/long2ice/fastapi-cache/issues/113
async def execute_sql(
        statement: str,
) -> IGetResponseBase[ExecutionResult]:
    """Executes an SQL query on the database and returns the result."""
    if not is_sql_query_safe(statement):
        return create_response(
            message="SQL query contains forbidden keywords (DML, DDL statements)",
            data=None,
            meta={},
        )
    if pool is None:
        return create_response(
            message="SQL query execution is disabled",
            data=None,
            meta={},
        )

    try:
        logger.info(f"Executing SQL: {statement[:100]}...")
        async with pool.acquire() as connection:
            async with connection.transaction():
                async with connection.cursor(statement) as cursor:
                    columns = [desc.name for desc in cursor.get_attributes()]
                    rows = []
                    async for row in cursor:
                        rows.append(row)
                    logger.info(f"SQL query executed successfully: {len(rows)} rows returned")
                    execution_result = ExecutionResult(
                        raw_result=[
                            dict(zip(columns, row))
                            for row in rows
                        ],
                        affected_rows=None,
                        error=None,
                    )
    except Exception as e:
        logger.error(f"SQL execution error: {repr(e)}", exc_info=True)
        return create_response(
            message=repr(e),
            data=None,
        )

    return create_response(
        message="Successfully executed SQL query",
        data=execution_result,
    )