We have developed a web application that bridges the gap between researchers and enthusiasts in exoplanet discovery. It combines machine learning tools for data-driven analysis with learning resources to make exoplanet science accessible and engaging.
Explore section - Hosts two ML models trained on TESS and Kepler datasets.
Light Curve Analyzer section - A platform to extract data from light curve or pixel files and also to generate light curves from given data.
Learn section – Offers a structured article series on the science of exoplanets and detection techniques.
Planets section – Provides a searchable catalog of discovered exoplanets with data visualizations of planetary and stellar features.
Updates section – Integrated with the Science Daily API to deliver the latest news on exoplanet discoveries in real time.
Space section – Embeds NASA’s Eyes on Exoplanets, offering a 3D environment to explore stars and planetary systems.
This project makes exoplanet science more accessible by combining machine learning, data visualization, and educational resources in one platform. It empowers researchers to accelerate discovery while helping students and enthusiasts learn and explore, bridging the gap between science and public engagement.

NASA-Space-Apps-2025-Web-App/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js 13+ app directory
│   ├── components/          # Reusable React components
│   ├── lib/                # Utility libraries
│   ├── public/             # Static assets
│   ├── Dockerfile.frontend # Frontend Docker configuration
│   └── README.md           # Frontend documentation
├── backend_ml/              # FastAPI backend for ML inference
│   ├── models/             # ONNX model files
│   ├── main.py             # Main FastAPI application
│   ├── test_inference.py   # Testing utilities
│   ├── check_accuracy.py   # Model accuracy utilities
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend Docker configuration
│   └── README.md           # Backend documentation
├── lightcurve/             # Separate lightcurve analysis module
└── docker-compose.yml      # Docker orchestration