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
    Gère les erreurs et retourne un message approprié en cas d'échec.
    """
    try:
        metrics_data = generate_latest()
        return Response(metrics_data, media_type=CONTENT_TYPE_LATEST)
    except Exception as e:
        error_message = f"Erreur lors de la récupération des métriques: {str(e)}"
        return Response(error_message, media_type="text/plain", status_code=500)
