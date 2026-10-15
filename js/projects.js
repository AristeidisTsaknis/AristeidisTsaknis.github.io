/**
 * PROJECT DATA STORE
 * Content for the expanded project views. Rendered by main.js.
 */
window.PROJECT_DATA = {
    'iot-pipeline': {
        title: "Modular IoT Real-Time Data Pipeline",
        body: `
            <div class="expanded-split">
                <div class="split-text">
                    <h3>01. The Architecture</h3>
                    <p>Designed a config-driven, production-style ingestion pipeline structured into clean Ingest, Transform, and Load layers. The system dynamically adapts to real-time MQTT streaming, buffered micro-batching, or scheduled HTTP batch ingestion based on a centralized YAML configuration.</p>
                    <br>
                    
                    <h3>02. Data Quality & Resiliency</h3>
                    <p>Built with a "safety-first" engineering mindset. The transformation layer strictly enforces YAML-defined schemas, performing automatic type casting and missing field checks. Invalid rows are automatically routed to a Dead-Letter Queue (DLQ) rather than crashing the pipeline, ensuring zero data loss and high availability.</p>
                    <br>

                    <h3>03. Smart Enrichment</h3>
                    <p>Engineered automated metadata extraction (e.g., dynamically parsing <code>device_id</code> from wildcard MQTT topics) and implemented computed feature engineering evaluated at runtime using Jinja2 expressions.</p>

                    <div class="tech-stack-box">
                        1. Architecture: Streaming & Batch ETL, DLQ Handling<br>
                        2. Protocols: MQTT, HTTP, WebSockets<br>
                        3. Core Logic: Python, Schema Validation<br>
                        4. Configuration: YAML, Jinja2 Expressions
                    </div>

                    <a href="https://github.com/AristeidisTsaknis/IoT-Pipeline" target="_blank" rel="noopener noreferrer" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual">
                    <div class="terminal">
                        <div class="terminal-bar">
                            <span class="terminal-dot terminal-dot--red"></span>
                            <span class="terminal-dot terminal-dot--yellow"></span>
                            <span class="terminal-dot terminal-dot--green"></span>
                            <span class="terminal-title">settings.yaml</span><span class="terminal-note">Illustrative output</span>
                        </div>
                        <div class="terminal-body">
                            <span class="t-pink">ingestion:</span><br>
                            &nbsp;&nbsp;<span class="t-cyan">mode:</span> <span class="t-yellow">"stream"</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-muted"># batch | stream</span><br>
                            &nbsp;&nbsp;<span class="t-cyan">source:</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="t-cyan">type:</span> <span class="t-yellow">"mqtt"</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="t-cyan">config:</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-cyan">broker_url:</span> <span class="t-yellow">"test.mosquitto.org"</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-cyan">port:</span> <span class="t-yellow">8081</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-cyan">topic:</span> <span class="t-yellow">"test/iot/#"</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-cyan">websocket:</span> <span class="t-pink">true</span><br><br>
                            <span class="t-pink">transform:</span><br>
                            &nbsp;&nbsp;<span class="t-cyan">enrich:</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="t-cyan">add_timestamp:</span> <span class="t-pink">true</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="t-cyan">route_invalid_to_dlq:</span> <span class="t-pink">true</span><br>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    'smart-home-iot': {
        title: "Smart Home Energy Data Platform",
        body: `
            <div class="expanded-split">
                <div class="split-text">
                    <h3>01. End-to-End Architecture</h3>
                    <p>Architected a comprehensive IoT telemetry platform using the Medallion data design. A custom Python simulator generates realistic device metrics, which are routed through an MQTT broker. An ingestion service validates payloads against strict JSON schemas before persisting them into a MongoDB Bronze layer.</p>
                    <br>
                    
                    <h3>02. Orchestration & State Management</h3>
                    <p>Designed stateful, Airflow-orchestrated ETL pipelines to handle the heavy lifting. The Bronze → Silver ETL normalizes raw JSON into relational Postgres tables. To ensure idempotency and safety, the pipeline utilizes an <code>etl_offsets</code> table, continuously tracking the last-processed timestamps per device so jobs can resume safely without data duplication.</p>
                    <br>

                    <h3>03. Delivery & Infrastructure</h3>
                    <p>The Silver → Gold ETL produces daily kWh and cost aggregates across device, room, and home dimensions. The entire ecosystem—Mosquitto, MongoDB, Postgres, Airflow, and a Streamlit dashboard—is containerized and deployed via Docker Compose for true Infrastructure-as-Code (IaC).</p>

                    <div class="tech-stack-box">
                        1. Architecture: Medallion, Incremental ETL, IaC<br>
                        2. Orchestration & Ingestion: Airflow, MQTT (Mosquitto)<br>
                        3. Databases: PostgreSQL (Relational), MongoDB (NoSQL)<br>
                        4. Application Layer: Docker Compose, Streamlit, FastAPI
                    </div>

                    <a href="https://github.com/AristeidisTsaknis/Smart-Energy-Environment-Dashboard-for-a-Home" target="_blank" rel="noopener noreferrer" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual">
                    <div class="terminal">
                        <div class="terminal-bar">
                            <span class="terminal-dot terminal-dot--red"></span>
                            <span class="terminal-dot terminal-dot--yellow"></span>
                            <span class="terminal-dot terminal-dot--green"></span>
                            <span class="terminal-title">bronze_to_silver_etl.log</span><span class="terminal-note">Illustrative output</span>
                        </div>
                        <div class="terminal-body">
                            <span class="t-muted">$</span> docker compose run --rm airflow-scheduler python -m services.etl.bronze_to_silver<br>
                            <span class="t-cyan">[INFO]</span> Initializing DB connections (MongoDB, PostgreSQL)...<br>
                            <span class="t-cyan">[INFO]</span> Fetching latest watermark from <i>etl_offsets</i> table.<br>
                            <span class="t-yellow">[STATE]</span> Resuming from offset: 2026-04-12T08:00:00Z<br><br>
                            
                            <span class="t-muted">-- Executing Bronze → Silver Extraction --</span><br>
                            <span class="t-green">[EXTRACT]</span> Retrieved 14,205 new MQTT telemetry documents.<br>
                            <span class="t-green">[TRANSFORM]</span> Applying JSON schema normalization & deduplication.<br>
                            <span class="t-green">[LOAD]</span> Upserting validated readings to Postgres (Silver)...<br><br>
                            
                            <span class="t-cyan">[INFO]</span> Updating <i>etl_offsets</i> to 2026-04-13T08:00:00Z.<br>
                            <span class="t-green t-bold">[SUCCESS]</span> Pipeline execution completed in 4.2s.<br>
                            <span class="t-yellow t-cursor">█</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    'nutrition-pipeline': {
        title: "Smart Nutrition & Wellness Data Platform",
        body: `
            <div class="expanded-split">
                <div class="split-text">
                    <h3>01. The Infrastructure Challenge</h3>
                    <p>Health data is inherently messy and multimodal. This project tackles the ingestion of asynchronous data formats (Nutrition CSVs, Smartwatch JSON payloads, and Weather API data) into a unified Medallion architecture.</p>
                    <br>
                    
                    <h3>02. Event-Driven Processing</h3>
                    <p>Built an event-driven ingestion pipeline utilizing a custom drop-zone watcher to trigger processing upon new data arrival. Raw data lands in an S3-compatible MinIO bucket (Bronze), is rigorously normalized into Parquet format (Silver), and finally loaded into ClickHouse for highly performant analytical querying (Gold).</p>
                    <br>

                    <h3>03. Analytics, Delivery & AI</h3>
                    <p>Engineered an automated insights engine to flag anomalies, compute rolling Z-scores, and identify health trends. The final data models are exposed through Streamlit dashboards, featuring an experimental AI-powered executive summary hook powered by Hugging Face (BART) NLP models.</p>

                    <div class="tech-stack-box">
                        1. Data Warehouse: ClickHouse (OLAP)<br>
                        2. Object Storage: MinIO (S3)<br>
                        3. Architecture: Medallion (Bronze, Silver, Gold)<br>
                        4. BI & AI: Streamlit, Hugging Face
                    </div>

                    <a href="https://github.com/AristeidisTsaknis/Smart-Nutrition-and-Wellness-Data-Platform" target="_blank" rel="noopener noreferrer" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual">
                    <div class="terminal">
                        <div class="terminal-bar">
                            <span class="terminal-dot terminal-dot--red"></span>
                            <span class="terminal-dot terminal-dot--yellow"></span>
                            <span class="terminal-dot terminal-dot--green"></span>
                            <span class="terminal-title">tools/dropzone_watcher.py</span><span class="terminal-note">Illustrative output</span>
                        </div>
                        <div class="terminal-body">
                            <span class="t-muted">$</span> python -m tools.dropzone_watcher<br>
                            <span class="t-cyan">[SYS]</span> Initializing watchdog on /dropzone_smartwatch/...<br>
                            <span class="t-yellow">[EVENT]</span> New payload detected: hr_sleep_data_sync.json<br><br>
                            
                            <span class="t-muted">-- Executing Pipeline --</span><br>
                            <span class="t-green">[BRONZE]</span> Ingesting raw JSON to MinIO bucket... OK<br>
                            <span class="t-green">[SILVER]</span> Normalizing schema to smartwatch_daily.parquet... OK<br>
                            <span class="t-green">[GOLD]</span> Computing 7-day rolling features... OK<br>
                            <span class="t-green">[GOLD]</span> Upserting analytics tables to ClickHouse... OK<br><br>
                            
                            <span class="t-pink">[INSIGHTS ENGINE]</span> Running anomaly detection...<br>
                            <span class="t-yellow">>> Alert: Elevated resting HR deviation (+1.8σ) detected.</span><br>
                            <span class="t-cyan">[AI_SUMMARY]</span> Generating HuggingFace weekly brief... OK<br>
                            <span class="t-yellow t-cursor">█</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    'fish-feeder': {
        title: "IoT Smart Fish Feeder",
        body: `
            <div class="expanded-split">
                <div class="split-text">
                    <h3>01. Hardware & Edge Logic</h3>
                    <p>Engineered a stateful IoT device using an ESP8266 (NodeMCU) to automate aquarium maintenance. The firmware, written in C++, manages real-time DHT11 sensor readings and utilizes the onboard EEPROM to ensure the feeding schedule persists even across power cycles—a critical requirement for system reliability.</p>
                    <br>
                    
                    <h3>02. The Communication Bridge</h3>
                    <p>Implemented a bi-directional MQTT communication layer. The device publishes environmental telemetry (temperature/humidity) to a Mosquitto broker, while simultaneously subscribing to command topics. This allows for both scheduled autonomous actions and "on-demand" manual overrides via a web-based Flask interface.</p>
                    <br>

                    <h3>03. Full-Stack Data Logging</h3>
                    <p>Developed a Flask backend to act as the central nervous system, consuming MQTT streams and persisting historical data into a PostgreSQL database. The project features a live dashboard that visualizes environmental trends and system health, providing a complete view of the "connected" aquarium.</p>

                    <div class="tech-stack-box">
                        1. Embedded: ESP8266, C++, EEPROM Persistence<br>
                        2. IoT Protocols: MQTT (Mosquitto), REST API<br>
                        3. Backend & DB: Python, Flask, PostgreSQL<br>
                        4. Frontend: HTML/JS, Chart.js Telemetry
                    </div>

                    <a href="https://github.com/AristeidisTsaknis/IoT-Smart-Fish-Feeder" target="_blank" rel="noopener noreferrer" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual">
                    <div class="terminal">
                        <div class="terminal-bar">
                            <span class="terminal-dot terminal-dot--red"></span>
                            <span class="terminal-dot terminal-dot--yellow"></span>
                            <span class="terminal-dot terminal-dot--green"></span>
                            <span class="terminal-title">mqtt_broker_stream.log</span><span class="terminal-note">Illustrative output</span>
                        </div>
                        <div class="terminal-body">
                            <span class="t-muted">[TOPIC]</span> <span class="t-cyan">tank/telemetry/env</span><br>
                            <span class="t-green">{"temp": 24.5, "hum": 62, "ts": "1672531200"}</span><br><br>
                            
                            <span class="t-pink">[CMD] Incoming Manual Override...</span><br>
                            <span class="t-muted">[TOPIC]</span> <span class="t-yellow">tank/commands/feed</span><br>
                            <span class="t-green">{"action": "trigger_motor", "duration_ms": 500}</span><br><br>
                            
                            <span class="t-muted">-- ESP8266 Serial Output --</span><br>
                            <span class="t-cyan">[FIRMWARE]</span> MQTT Callback received.<br>
                            <span class="t-cyan">[FIRMWARE]</span> Activating Servo... OK.<br>
                            <span class="t-cyan">[FIRMWARE]</span> Updating last_feed_time in EEPROM.<br>
                            <span class="t-yellow t-cursor">█</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    'stock-scraper': {
        title: "Stock Market ETL & Orchestration",
        body: `
            <div class="expanded-split">
                <div class="split-text">
                    <h3>01. The Objective</h3>
                    <p>Engineered an automated data pipeline designed to continuously extract, process, and store volatile market data—specifically tracking top gainers, losers, and most active stocks—directly from Yahoo Finance.</p>
                    <br>
                    
                    <h3>02. The ETL Architecture</h3>
                    <p>Developed a robust, modular ETL workflow. The <strong>Extraction</strong> layer utilizes BeautifulSoup and Requests to parse raw HTML targets. The <strong>Transformation</strong> layer relies on Pandas to sanitize inputs, handle missing values, and strictly type-cast metrics (like percentages to floats). Finally, the <strong>Load</strong> layer leverages SQLAlchemy to persist the structured records into a PostgreSQL database.</p>
                    <br>

                    <h3>03. Orchestration & Monitoring</h3>
                    <p>To ensure consistent data delivery without manual intervention, the entire workflow is orchestrated as an Apache Airflow DAG. The system is fortified with comprehensive file-based logging to monitor pipeline health, track task execution, and quickly isolate scraping anomalies caused by upstream DOM changes.</p>

                    <div class="tech-stack-box">
                        1. Orchestration: Apache Airflow<br>
                        2. Extraction: Python, BeautifulSoup4, Requests<br>
                        3. Transformation: Pandas DataFrames<br>
                        4. Database: PostgreSQL, SQLAlchemy ORM
                    </div>

                    <a href="https://github.com/AristeidisTsaknis/stock-data-scraping" target="_blank" rel="noopener noreferrer" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual">
                    <div class="terminal">
                        <div class="terminal-bar">
                            <span class="terminal-dot terminal-dot--red"></span>
                            <span class="terminal-dot terminal-dot--yellow"></span>
                            <span class="terminal-dot terminal-dot--green"></span>
                            <span class="terminal-title">test_pipeline.py</span><span class="terminal-note">Illustrative output</span>
                        </div>
                        <div class="terminal-body">
                            <span class="t-muted">$</span> python test.py<br>
                            <span class="t-cyan">[INFO]</span> Initiating Stock Data ETL Pipeline...<br><br>
                            
                            <span class="t-muted">-- Extract Phase --</span><br>
                            <span class="t-green">[EXTRACT]</span> Scraped /gainers ... OK (30 records)<br>
                            <span class="t-green">[EXTRACT]</span> Scraped /losers ... OK (30 records)<br>
                            <span class="t-green">[EXTRACT]</span> Scraped /most-active ... OK (30 records)<br><br>
                            
                            <span class="t-muted">-- Transform Phase --</span><br>
                            <span class="t-cyan">[TRANSFORM]</span> Cleansing strings, converting % to float...<br>
                            <span class="t-yellow">[WARN]</span> Null value detected in Ticker: 'XYZ'. Row dropped.<br><br>
                            
                            <span class="t-muted">-- Load Phase --</span><br>
                            <span class="t-cyan">[LOAD]</span> Connecting to postgresql://stocks_db...<br>
                            <span class="t-green">[LOAD]</span> Bulk inserting 89 validated records... OK.<br>
                            <span class="t-green t-bold">[SUCCESS]</span> Pipeline executed in 1.84 seconds.<br>
                            <span class="t-yellow t-cursor">█</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    'dim-reduction': {
        title: "Dimensionality Reduction Library",
        body: `
            <div class="expanded-split">
                <div class="split-text">
                    <h3>01. The Objective</h3>
                    <p>High-dimensional data often leads to overfitting and massive computational overhead. My goal was to systemize the feature selection process by developing a custom Python package that provides a unified, scikit-learn-compatible API for over 15 distinct Dimensionality Reduction (DR) and Feature Selection (FS) methods.</p>
                    <br>
                    
                    <h3>02. Algorithms & Architecture</h3>
                    <p>The library implements both standard and advanced techniques, including PCA, LDA, SVD, t-SNE, LLE, ISOMAP, and Boruta. The architecture was specifically designed for modularity, allowing data scientists to rapidly experiment with and integrate these methods directly into existing ML pipelines.</p>
                    <br>

                    <h3>03. The Core Innovation</h3>
                    <p>The standout feature of this package is its <strong>Automated Dimension Calculation</strong> engine. Leveraging libraries like <code>kneed</code> and <code>statsmodels</code>, the package can dynamically calculate the mathematical elbow and determine the absolute optimal number of dimensions for algorithms like MDS, LLE, and ISOMAP—completely eliminating the need for manual hyperparameter tuning.</p>

                    <div class="tech-stack-box">
                        1. Algorithms: PCA, SVD, t-SNE, Boruta, ISOMAP, MDS<br>
                        2. Key Feature: Automated Dimensionality Estimation<br>
                        3. Core Libraries: NumPy, SciPy, Scikit-learn, Kneed<br>
                        4. Focus: Open-Source Package Dev, ML Math
                    </div>

                    <a href="https://github.com/AristeidisTsaknis/Dimensionality-reduction-and-feature-selection-methods" target="_blank" rel="noopener noreferrer" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual">
                    <div class="terminal">
                        <div class="terminal-bar">
                            <span class="terminal-dot terminal-dot--red"></span>
                            <span class="terminal-dot terminal-dot--yellow"></span>
                            <span class="terminal-dot terminal-dot--green"></span>
                            <span class="terminal-title">auto_dim_estimation.py</span><span class="terminal-note">Illustrative output</span>
                        </div>
                        <div class="terminal-body">
                            <span class="t-pink">from</span> dimensionality_reduction <span class="t-pink">import</span> G_MDS<br>
                            <span class="t-pink">from</span> sklearn.datasets <span class="t-pink">import</span> load_iris<br><br>
                            
                            <span class="t-muted"># Load high-dimensional sample data</span><br>
                            x, y = load_iris(return_X_y=<span class="t-cyan">True</span>)<br><br>

                            <span class="t-muted"># Initialize Generalized Multidimensional Scaling</span><br>
                            g_mds = G_MDS()<br><br>
                            
                            <span class="t-muted"># Engine dynamically explores loss across all dimensions</span><br>
                            <span class="t-cyan">print</span>(<span class="t-yellow">"Analyzing mathematical elbow for optimal reduction..."</span>)<br>
                            values, finished = g_mds.explore_dimensions(x)<br>
                            optimal_dims = g_mds.find_optimal_components(values, finished, x.shape[<span class="t-yellow">1</span>])<br><br>
                            
                            <span class="t-cyan">print</span>(<span class="t-yellow">f"Optimal components calculated: {optimal_dims}"</span>)<br><br>
                            
                            <span class="t-green">>> Analyzing mathematical elbow for optimal reduction...</span><br>
                            <span class="t-green">>> Optimal components calculated: 2</span><br>
                            <span class="t-yellow t-cursor">█</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    'asd-ml-research': {
        title: "ASD Facial Classification Models",
        body: `
            <div class="expanded-split">
                <div class="split-text">
                    <h3>01. The Research Objective</h3>
                    <p>Addressed a complex computer vision classification challenge: identifying patterns and features within facial data to aid in the early identification of children with Autism Spectrum Disorder (ASD). This work was peer-reviewed and published in the 6th International Conference on ICT Integration.</p>
                    <br>
                    
                    <h3>02. Robust Data Augmentation</h3>
                    <p>Machine learning models are only as good as their data. To prevent overfitting and ensure model generalization, I engineered a rigorous image preprocessing pipeline. This included programmatic facial cropping, horizontal flipping, random rotational variance (-45 to 45 degrees), and the injection of Salt and Pepper noise to simulate real-world environmental degradation.</p>
                    <br>

                    <h3>03. Modeling & Evaluation</h3>
                    <p>Developed and evaluated three distinct mathematical approaches: Support Vector Machines (SVM) for hyper-plane discrimination, Random Forests for robust bagging, and Gradient Boosting Classifiers for sequential error-correction. The ensemble techniques significantly enhanced overall classification accuracy.</p>

                    <div class="tech-stack-box">
                        1. Domain: Computer Vision, Healthcare AI<br>
                        2. Algorithms: Gradient Boosting, Random Forest, SVM<br>
                        3. Preprocessing: Image Augmentation, Noise Injection<br>
                        4. Recognition: Published Academic Research
                    </div>

                    <a href="https://pubs.aip.org/aip/acp/article-abstract/3220/1/050013/3315891" target="_blank" rel="noopener noreferrer" class="action-btn">
                        READ ACADEMIC PUBLICATION
                    </a>
                </div>

                <div class="split-visual">
                    <div class="terminal">
                        <div class="terminal-bar">
                            <span class="terminal-dot terminal-dot--red"></span>
                            <span class="terminal-dot terminal-dot--yellow"></span>
                            <span class="terminal-dot terminal-dot--green"></span>
                            <span class="terminal-title">train_asd_classifier.py</span><span class="terminal-note">Illustrative output</span>
                        </div>
                        <div class="terminal-body">
                            <span class="t-muted">$</span> python train_asd_classifier.py<br>
                            <span class="t-cyan">[INFO]</span> Loading Facial_data_ASD dataset...<br><br>
                            
                            <span class="t-muted">-- Preprocessing & Augmentation --</span><br>
                            <span class="t-green">[AUGMENT]</span> Applying facial bounding box crops... OK<br>
                            <span class="t-green">[AUGMENT]</span> Injecting rotation matrix (-45°, 45°)... OK<br>
                            <span class="t-green">[AUGMENT]</span> Applying Salt & Pepper noise distribution... OK<br>
                            <span class="t-cyan">[INFO]</span> Training set expanded to robust variance.<br><br>
                            
                            <span class="t-muted">-- Model Training Loop --</span><br>
                            <span class="t-yellow">[TRAIN]</span> Fitting Support Vector Machine (RBF Kernel)...<br>
                            <span class="t-yellow">[TRAIN]</span> Fitting Random Forest Ensemble...<br>
                            <span class="t-yellow">[TRAIN]</span> Fitting Gradient Boosting Classifier...<br><br>
                            
                            <span class="t-green t-bold">>> Evaluating cross-validation metrics:</span><br>
                            <span class="t-green">>> Gradient Boosting AUC: 0.91 | Target Accuracy Reached</span><br>
                            <span class="t-yellow t-cursor">█</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
};
