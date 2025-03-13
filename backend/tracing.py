from opentelemetry import trace
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

def init_tracer(app):
    """
    Initialise le traçage pour l'application FastAPI.
    """
    resource = Resource(attributes={
        SERVICE_NAME: "fastapi_service"
    })
    provider = TracerProvider(resource=resource)
    trace.set_tracer_provider(provider)

    span_processor = BatchSpanProcessor(ConsoleSpanExporter())
    provider.add_span_processor(span_processor)

    FastAPIInstrumentor.instrument_app(app, tracer_provider=provider)