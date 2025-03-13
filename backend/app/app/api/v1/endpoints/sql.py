import logging
from fastapi import APIRouter, Depends, logger
from fastapi_cache.decorator import cache
import asyncpg
from app.db.session import get_db_pool
from app.schemas.response_schema import IGetResponseBase, create_response
from app.schemas.tool_schemas.sql_tool_schema import ExecutionResult
from app.utils.sql import is_sql_query_safe

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/execute")
@cache(expire=600)
async def execute_sql(statement: str, pool: asyncpg.Pool = Depends(get_db_pool)) -> IGetResponseBase[ExecutionResult]:
    """Exécute une requête SQL et retourne le résultat."""
    if not is_sql_query_safe(statement):
        return create_response(
            message="SQL query contains forbidden keywords (DML, DDL statements)",
            data=None,
            meta={},
        )

    try:
        logger.info(f"Executing SQL: {statement[:100]}...")
        async with pool.acquire() as conn:
            async with conn.transaction():
                # Curseur côté serveur
                async with conn.cursor(statement) as cursor:
                    columns = [desc.name for desc in cursor.get_attributes()]
                    rows = []
                    async for row in cursor:
                        rows.append(dict(zip(columns, row)))

        logger.info(f"SQL query executed successfully: {len(rows)} rows returned")
        execution_result = ExecutionResult(
            raw_result=rows,
            affected_rows=None,
            error=None,
        )
    except Exception as e:
        logger.error(f"SQL execution error: {repr(e)}", exc_info=True)
        return create_response(
            message=str(e),
            data=None,
        )

    return create_response(
        message="Successfully executed SQL query",
        data=execution_result,
    )
