from fastapi import FastAPI
from .api.routes import router


app = FastAPI(
    title='Mushroom Identifier API',
    description=(
        'AI-powered mushroom species '
        'identification API using ConvNeXt Tiny.'
    ),
    version='1.0.0'
)

app.include_router(router, prefix='/api')

@app.get('/health')
def health_check():
    return {
        'status': 'ok',
        'model': 'ConvNeXt Tiny'
    }