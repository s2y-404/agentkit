from fastapi import APIRouter, Depends
from fastapi_cache.decorator import cache
import asyncpg
from app.db.session import get_db_pool
from app.schemas.response_schema import IGetResponseBase, create_response
from app.schemas.tool_schemas.sql_tool_schema import ExecutionResult
from app.utils.sql import is_sql_query_safe

router = APIRouter()

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
        async with pool.acquire() as conn:
            async with conn.transaction():
                # Curseur côté serveur
                async with conn.cursor(statement) as cursor:
                    columns = [desc.name for desc in cursor.get_attributes()]
                    rows = []
                    async for row in cursor:
                        rows.append(dict(zip(columns, row)))

        execution_result = ExecutionResult(
            raw_result=rows,
            affected_rows=None,
            error=None,
        )
    except Exception as e:
        return create_response(
            message=str(e),
            data=None,
        )

    return create_response(
        message="Successfully executed SQL query",
        data=execution_result,
    )
