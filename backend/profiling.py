import pyroscope

def start_profiling():
    """
    Démarre le profilage de l'application avec Pyroscope.
    """
    pyroscope.start(
        application_name="fastapi_service",
        server_address="http://pyroscope:4040",
        sample_rate=100,
        upload_interval=10
    )