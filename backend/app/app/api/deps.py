import aioredis
import asyncio
import logging
from collections.abc import AsyncGenerator
from fastapi.security import OAuth2PasswordBearer
from fastapi_nextauth_jwt import NextAuthJWT
from langchain_community.storage import RedisStore
from redis import Redis as RedisSync
from redis.asyncio import Redis
from sqlmodel.ext.asyncio.session import AsyncSession
from starlette.requests import Request
from app.core.config import settings
from app.db.session import SessionLocal, SessionLocalCelery
from app.utils.minio_client import MinioClient

# Configuration des logs
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Stockage de la connexion Redis globale
redis_pool = None

# Initialisation de la connexion Redis au démarrage
async def init_redis():
    global redis_pool
    try:
        logger.info("Initializing Redis connection...")
        redis_pool = await aioredis.from_url(
            f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}",
            max_connections=100,  # Augmente le nombre max de connexions concurrentes
            socket_keepalive=True,  # Réduit les reconnexions inutiles
            socket_timeout=5,  # Empêche les blocages longs
            encoding="utf-8",
            decode_responses=True,
        )
        logger.info("Redis connection initialized successfully ✅")
    except Exception as e:
        logger.error(f"Failed to initialize Redis: {e}")

# Exécuter init_redis() au démarrage
asyncio.create_task(init_redis())

# Récupération du client Redis global
async def get_redis_client() -> Redis:
    """Utilise la connexion Redis globale pour éviter la latence d'initialisation"""
    if redis_pool is None:
        logger.error("Redis client is not initialized! ❌")
        raise RuntimeError("Redis client is not initialized!")
    logger.info("Returning Redis client instance ✅")
    return redis_pool

# OAuth2 pour l'authentification
reusable_oauth2 = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/login/access-token")

# Gestion de Redis Store
def get_redis_store() -> RedisStore:
    logger.info("Returning Redis Store instance ✅")
    return RedisStore(
        redis_url=f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}",
        client_kwargs={"db": 2},
        namespace="embedding_caches",
    )

# Client Redis synchrone
def get_redis_client_sync() -> RedisSync:
    logger.info("Creating synchronous Redis client instance ✅")
    return RedisSync(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        db=0,
        decode_responses=True,
    )

# Gestion de la session PostgreSQL
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    logger.info("Creating new async database session for PostgreSQL ✅")
    async with SessionLocal() as session:
        yield session
        logger.info("Closing PostgreSQL session ✅")

async def get_jobs_db() -> AsyncGenerator[AsyncSession, None]:
    logger.info("Creating new async database session for Celery Jobs ✅")
    async with SessionLocalCelery() as session:
        yield session
        logger.info("Closing Celery Jobs database session ✅")

# MinIO authentication
def minio_auth() -> MinioClient:
    logger.info("Initializing MinIO client ✅")
    return MinioClient(
        access_key=settings.MINIO_ROOT_USER,
        secret_key=settings.MINIO_ROOT_PASSWORD,
        bucket_name=settings.MINIO_BUCKET,
        minio_url=settings.MINIO_URL,
    )

# Gestion des tokens JWT
def get_jwt(req: Request) -> NextAuthJWT:
    logger.info("Processing JWT authentication request ✅")
    if not settings.ENABLE_AUTH:
        logger.warning("Authentication is disabled ❌")
        return None
    if not settings.NEXTAUTH_SECRET:
        logger.error("Authentication enabled, but NextAuth secret is missing ❌")
        raise ValueError("Authentication enabled, but NextAuth secret is not set")

    logger.info("Returning NextAuthJWT instance ✅")
    return NextAuthJWT(
        secret=settings.NEXTAUTH_SECRET,
        csrf_prevention_enabled=False,
    )(req)
