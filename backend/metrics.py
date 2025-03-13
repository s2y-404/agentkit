from fastapi import APIRouter, Response
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST

router = APIRouter()

REQUEST_COUNT = Counter(
    'request_count', 'Nombre total de requêtes HTTP', ['method', 'endpoint', 'http_status']
)
REQUEST_LATENCY = Histogram(
    'request_latency_seconds', 'Latence des requêtes HTTP en secondes', ['endpoint']
)

@router.get("/metrics")
def metrics():
    """
    Expose toutes les métriques au format Prometheus.
    """
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
