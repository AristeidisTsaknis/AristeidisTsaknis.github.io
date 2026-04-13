/**
 * PORTFOLIO INTERACTIVITY & STATE MANAGEMENT
 * Handles Theme Toggling, Data Store, Smooth Scrolling (Lenis), and FLIP Animations for Modals.
 */

// ==========================================================================
// 01. THEME MANAGEMENT
// ==========================================================================
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

document.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('#theme-btn');
    if (themeBtn) {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
});

// ==========================================================================
// 02. PROJECT DATA STORE
// ==========================================================================
const projectData = {
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

                    <a href="https://github.com/AristeidisTsaknis/IoT-Pipeline" target="_blank" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual" style="width: 100%;">
                    <div style="background: #111; border-radius: 8px; border: 1px solid var(--border-color); width: 100%; max-width: 850px; margin: 0 auto; font-family: monospace; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
                        <div style="background: #222; padding: 12px 16px; display: flex; align-items: center; border-bottom: 1px solid var(--border-color);">
                            <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #27c93f; border-radius: 50%; margin-right: 16px;"></div>
                            <span style="color: #888; font-size: 0.75rem; letter-spacing: 1px;">settings.yaml</span>
                        </div>
                        <div style="padding: 2rem; color: #e6e6e6; line-height: 1.8; font-size: 0.95rem; text-align: left;">
                            <span style="color: #ff66cc;">ingestion:</span><br>
                            &nbsp;&nbsp;<span style="color: #00ccff;">mode:</span> <span style="color: #ffcc00;">"stream"</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #666;"># batch | stream</span><br>
                            &nbsp;&nbsp;<span style="color: #00ccff;">source:</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00ccff;">type:</span> <span style="color: #ffcc00;">"mqtt"</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00ccff;">config:</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00ccff;">broker_url:</span> <span style="color: #ffcc00;">"test.mosquitto.org"</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00ccff;">port:</span> <span style="color: #ffcc00;">8081</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00ccff;">topic:</span> <span style="color: #ffcc00;">"test/iot/#"</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00ccff;">websocket:</span> <span style="color: #ff66cc;">true</span><br><br>
                            <span style="color: #ff66cc;">transform:</span><br>
                            &nbsp;&nbsp;<span style="color: #00ccff;">enrich:</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00ccff;">add_timestamp:</span> <span style="color: #ff66cc;">true</span><br>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00ccff;">route_invalid_to_dlq:</span> <span style="color: #ff66cc;">true</span><br>
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

                    <a href="https://github.com/AristeidisTsaknis/Smart-Energy-Environment-Dashboard-for-a-Home" target="_blank" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual" style="width: 100%;">
                    <div style="background: #111; border-radius: 8px; border: 1px solid var(--border-color); width: 100%; max-width: 850px; margin: 0 auto; font-family: monospace; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
                        <div style="background: #222; padding: 12px 16px; display: flex; align-items: center; border-bottom: 1px solid var(--border-color);">
                            <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #27c93f; border-radius: 50%; margin-right: 16px;"></div>
                            <span style="color: #888; font-size: 0.75rem; letter-spacing: 1px;">bronze_to_silver_etl.log</span>
                        </div>
                        <div style="padding: 2rem; color: #e6e6e6; line-height: 1.8; font-size: 0.95rem; text-align: left;">
                            <span style="color: #666;">$</span> docker compose run --rm airflow-scheduler python -m services.etl.bronze_to_silver<br>
                            <span style="color: #00ccff;">[INFO]</span> Initializing DB connections (MongoDB, PostgreSQL)...<br>
                            <span style="color: #00ccff;">[INFO]</span> Fetching latest watermark from <i>etl_offsets</i> table.<br>
                            <span style="color: #ffcc00;">[STATE]</span> Resuming from offset: 2026-04-12T08:00:00Z<br><br>
                            
                            <span style="color: #666;">-- Executing Bronze → Silver Extraction --</span><br>
                            <span style="color: #27c93f;">[EXTRACT]</span> Retrieved 14,205 new MQTT telemetry documents.<br>
                            <span style="color: #27c93f;">[TRANSFORM]</span> Applying JSON schema normalization & deduplication.<br>
                            <span style="color: #27c93f;">[LOAD]</span> Upserting validated readings to Postgres (Silver)...<br><br>
                            
                            <span style="color: #00ccff;">[INFO]</span> Updating <i>etl_offsets</i> to 2026-04-13T08:00:00Z.<br>
                            <span style="color: #27c93f; font-weight: bold;">[SUCCESS]</span> Pipeline execution completed in 4.2s.<br>
                            <span style="color: #ffcc00; animation: blink 1s step-end infinite;">█</span>
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

                    <a href="https://github.com/AristeidisTsaknis/Smart-Nutrition-and-Wellness-Data-Platform" target="_blank" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual" style="width: 100%;">
                    <div style="background: #111; border-radius: 8px; border: 1px solid var(--border-color); width: 100%; max-width: 850px; margin: 0 auto; font-family: monospace; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
                        <div style="background: #222; padding: 12px 16px; display: flex; align-items: center; border-bottom: 1px solid var(--border-color);">
                            <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #27c93f; border-radius: 50%; margin-right: 16px;"></div>
                            <span style="color: #888; font-size: 0.75rem; letter-spacing: 1px;">tools/dropzone_watcher.py</span>
                        </div>
                        <div style="padding: 2rem; color: #e6e6e6; line-height: 1.8; font-size: 0.95rem; text-align: left;">
                            <span style="color: #666;">$</span> python -m tools.dropzone_watcher<br>
                            <span style="color: #00ccff;">[SYS]</span> Initializing watchdog on /dropzone_smartwatch/...<br>
                            <span style="color: #ffcc00;">[EVENT]</span> New payload detected: hr_sleep_data_sync.json<br><br>
                            
                            <span style="color: #666;">-- Executing Pipeline --</span><br>
                            <span style="color: #27c93f;">[BRONZE]</span> Ingesting raw JSON to MinIO bucket... OK<br>
                            <span style="color: #27c93f;">[SILVER]</span> Normalizing schema to smartwatch_daily.parquet... OK<br>
                            <span style="color: #27c93f;">[GOLD]</span> Computing 7-day rolling features... OK<br>
                            <span style="color: #27c93f;">[GOLD]</span> Upserting analytics tables to ClickHouse... OK<br><br>
                            
                            <span style="color: #ff66cc;">[INSIGHTS ENGINE]</span> Running anomaly detection...<br>
                            <span style="color: #ffcc00;">>> Alert: Elevated resting HR deviation (+1.8σ) detected.</span><br>
                            <span style="color: #00ccff;">[AI_SUMMARY]</span> Generating HuggingFace weekly brief... OK<br>
                            <span style="color: #ffcc00; animation: blink 1s step-end infinite;">█</span>
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

                    <a href="https://github.com/AristeidisTsaknis/IoT-Smart-Fish-Feeder" target="_blank" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual" style="width: 100%;">
                    <div style="background: #111; border-radius: 8px; border: 1px solid var(--border-color); width: 100%; max-width: 850px; margin: 0 auto; font-family: monospace; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
                        <div style="background: #222; padding: 12px 16px; display: flex; align-items: center; border-bottom: 1px solid var(--border-color);">
                            <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #27c93f; border-radius: 50%; margin-right: 16px;"></div>
                            <span style="color: #888; font-size: 0.75rem; letter-spacing: 1px;">mqtt_broker_stream.log</span>
                        </div>
                        <div style="padding: 2rem; color: #e6e6e6; line-height: 1.8; font-size: 0.95rem; text-align: left;">
                            <span style="color: #666;">[TOPIC]</span> <span style="color: #00ccff;">tank/telemetry/env</span><br>
                            <span style="color: #27c93f;">{"temp": 24.5, "hum": 62, "ts": "1672531200"}</span><br><br>
                            
                            <span style="color: #ff66cc;">[CMD] Incoming Manual Override...</span><br>
                            <span style="color: #666;">[TOPIC]</span> <span style="color: #ffcc00;">tank/commands/feed</span><br>
                            <span style="color: #27c93f;">{"action": "trigger_motor", "duration_ms": 500}</span><br><br>
                            
                            <span style="color: #666;">-- ESP8266 Serial Output --</span><br>
                            <span style="color: #00ccff;">[FIRMWARE]</span> MQTT Callback received.<br>
                            <span style="color: #00ccff;">[FIRMWARE]</span> Activating Servo... OK.<br>
                            <span style="color: #00ccff;">[FIRMWARE]</span> Updating last_feed_time in EEPROM.<br>
                            <span style="color: #ffcc00; animation: blink 1s step-end infinite;">█</span>
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

                    <a href="https://github.com/AristeidisTsaknis/stock-data-scraping" target="_blank" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual" style="width: 100%;">
                    <div style="background: #111; border-radius: 8px; border: 1px solid var(--border-color); width: 100%; max-width: 850px; margin: 0 auto; font-family: monospace; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
                        <div style="background: #222; padding: 12px 16px; display: flex; align-items: center; border-bottom: 1px solid var(--border-color);">
                            <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #27c93f; border-radius: 50%; margin-right: 16px;"></div>
                            <span style="color: #888; font-size: 0.75rem; letter-spacing: 1px;">test_pipeline.py</span>
                        </div>
                        <div style="padding: 2rem; color: #e6e6e6; line-height: 1.8; font-size: 0.95rem; text-align: left;">
                            <span style="color: #666;">$</span> python test.py<br>
                            <span style="color: #00ccff;">[INFO]</span> Initiating Stock Data ETL Pipeline...<br><br>
                            
                            <span style="color: #666;">-- Extract Phase --</span><br>
                            <span style="color: #27c93f;">[EXTRACT]</span> Scraped /gainers ... OK (30 records)<br>
                            <span style="color: #27c93f;">[EXTRACT]</span> Scraped /losers ... OK (30 records)<br>
                            <span style="color: #27c93f;">[EXTRACT]</span> Scraped /most-active ... OK (30 records)<br><br>
                            
                            <span style="color: #666;">-- Transform Phase --</span><br>
                            <span style="color: #00ccff;">[TRANSFORM]</span> Cleansing strings, converting % to float...<br>
                            <span style="color: #ffcc00;">[WARN]</span> Null value detected in Ticker: 'XYZ'. Row dropped.<br><br>
                            
                            <span style="color: #666;">-- Load Phase --</span><br>
                            <span style="color: #00ccff;">[LOAD]</span> Connecting to postgresql://stocks_db...<br>
                            <span style="color: #27c93f;">[LOAD]</span> Bulk inserting 89 validated records... OK.<br>
                            <span style="color: #27c93f; font-weight: bold;">[SUCCESS]</span> Pipeline executed in 1.84 seconds.<br>
                            <span style="color: #ffcc00; animation: blink 1s step-end infinite;">█</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    'dim-reduction': {
        title: "Automated Dimensionality Reduction Library",
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

                    <a href="https://github.com/AristeidisTsaknis/Dimensionality-reduction-and-feature-selection-methods" target="_blank" class="action-btn">
                        VIEW GITHUB REPOSITORY
                    </a>
                </div>

                <div class="split-visual" style="width: 100%;">
                    <div style="background: #111; border-radius: 8px; border: 1px solid var(--border-color); width: 100%; max-width: 850px; margin: 0 auto; font-family: monospace; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
                        <div style="background: #222; padding: 12px 16px; display: flex; align-items: center; border-bottom: 1px solid var(--border-color);">
                            <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #27c93f; border-radius: 50%; margin-right: 16px;"></div>
                            <span style="color: #888; font-size: 0.75rem; letter-spacing: 1px;">auto_dim_estimation.py</span>
                        </div>
                        <div style="padding: 2rem; color: #e6e6e6; line-height: 1.8; font-size: 0.95rem; text-align: left;">
                            <span style="color: #ff66cc;">from</span> dimensionality_reduction <span style="color: #ff66cc;">import</span> G_MDS<br>
                            <span style="color: #ff66cc;">from</span> sklearn.datasets <span style="color: #ff66cc;">import</span> load_iris<br><br>
                            
                            <span style="color: #666;"># Load high-dimensional sample data</span><br>
                            x, y = load_iris(return_X_y=<span style="color: #00ccff;">True</span>)<br><br>

                            <span style="color: #666;"># Initialize Generalized Multidimensional Scaling</span><br>
                            g_mds = G_MDS()<br><br>
                            
                            <span style="color: #666;"># Engine dynamically explores loss across all dimensions</span><br>
                            <span style="color: #00ccff;">print</span>(<span style="color: #ffcc00;">"Analyzing mathematical elbow for optimal reduction..."</span>)<br>
                            values, finished = g_mds.explore_dimensions(x)<br>
                            optimal_dims = g_mds.find_optimal_components(values, finished, x.shape[<span style="color: #ffcc00;">1</span>])<br><br>
                            
                            <span style="color: #00ccff;">print</span>(<span style="color: #ffcc00;">f"Optimal components calculated: {optimal_dims}"</span>)<br><br>
                            
                            <span style="color: #27c93f;">>> Analyzing mathematical elbow for optimal reduction...</span><br>
                            <span style="color: #27c93f;">>> Optimal components calculated: 2</span><br>
                            <span style="color: #ffcc00; animation: blink 1s step-end infinite;">█</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    'asd-ml-research': {
        title: "ML Diagnostics for Autism (Published Research)",
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

                    <a href="https://pubs.aip.org/aip/acp/article-abstract/3220/1/050013/3315891" target="_blank" class="action-btn">
                        READ ACADEMIC PUBLICATION
                    </a>
                </div>

                <div class="split-visual" style="width: 100%;">
                    <div style="background: #111; border-radius: 8px; border: 1px solid var(--border-color); width: 100%; max-width: 850px; margin: 0 auto; font-family: monospace; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
                        <div style="background: #222; padding: 12px 16px; display: flex; align-items: center; border-bottom: 1px solid var(--border-color);">
                            <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="width: 12px; height: 12px; background: #27c93f; border-radius: 50%; margin-right: 16px;"></div>
                            <span style="color: #888; font-size: 0.75rem; letter-spacing: 1px;">train_asd_classifier.py</span>
                        </div>
                        <div style="padding: 2rem; color: #e6e6e6; line-height: 1.8; font-size: 0.95rem; text-align: left;">
                            <span style="color: #666;">$</span> python train_asd_classifier.py<br>
                            <span style="color: #00ccff;">[INFO]</span> Loading Facial_data_ASD dataset...<br><br>
                            
                            <span style="color: #666;">-- Preprocessing & Augmentation --</span><br>
                            <span style="color: #27c93f;">[AUGMENT]</span> Applying facial bounding box crops... OK<br>
                            <span style="color: #27c93f;">[AUGMENT]</span> Injecting rotation matrix (-45°, 45°)... OK<br>
                            <span style="color: #27c93f;">[AUGMENT]</span> Applying Salt & Pepper noise distribution... OK<br>
                            <span style="color: #00ccff;">[INFO]</span> Training set expanded to robust variance.<br><br>
                            
                            <span style="color: #666;">-- Model Training Loop --</span><br>
                            <span style="color: #ffcc00;">[TRAIN]</span> Fitting Support Vector Machine (RBF Kernel)...<br>
                            <span style="color: #ffcc00;">[TRAIN]</span> Fitting Random Forest Ensemble...<br>
                            <span style="color: #ffcc00;">[TRAIN]</span> Fitting Gradient Boosting Classifier...<br><br>
                            
                            <span style="color: #27c93f; font-weight: bold;">>> Evaluating cross-validation metrics:</span><br>
                            <span style="color: #27c93f;">>> Gradient Boosting AUC: 0.91 | Target Accuracy Reached</span><br>
                            <span style="color: #ffcc00; animation: blink 1s step-end infinite;">█</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
};

// ==========================================================================
// 03. SYSTEM INITIALIZATION
// ==========================================================================
let activeClone = null;
let activeOriginal = null;
let overlay = null;

// Initialize global overlay and smooth scrolling post-DOM load
document.addEventListener('DOMContentLoaded', () => {
    overlay = document.createElement('div');
    overlay.className = 'overlay-backdrop';
    document.body.appendChild(overlay);

    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        window.lenis = lenis;
    }
});

// ==========================================================================
// 04. MODAL ANIMATIONS & STATE MANAGEMENT
// ==========================================================================
window.expandProject = function(id) {
    const data = projectData[id];
    if (!data || !overlay) return;

    const cards = document.querySelectorAll('.project-card');
    let originalCard = null;
    cards.forEach(card => {
        if(card.getAttribute('onclick') && card.getAttribute('onclick').includes(id)) {
            originalCard = card;
        }
    });
    
    if(!originalCard) return;
    activeOriginal = originalCard;

    document.body.style.overflow = 'hidden';

    const rect = originalCard.getBoundingClientRect();
    const clone = originalCard.cloneNode(true);
    clone.removeAttribute('onclick'); 
    clone.classList.add('is-cloned');
    
    // Extract and apply dynamic accent color based on card styling
    let dynamicColor = 'var(--accent)'; 
    if (originalCard.querySelector('.gradient-a')) dynamicColor = '#ff00cc';
    else if (originalCard.querySelector('.gradient-b')) dynamicColor = '#00ffcc';
    else if (originalCard.querySelector('.gradient-c')) dynamicColor = '#ff6600';
    else if (originalCard.querySelector('.gradient-d')) dynamicColor = '#00ccff';
    
    clone.style.setProperty('--card-accent', dynamicColor);
    clone.setAttribute('data-lenis-prevent', 'true');
    clone.style.top = rect.top + 'px';
    clone.style.left = rect.left + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'expanded-content';
    contentDiv.innerHTML = data.body;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerText = "CLOSE";
    closeBtn.className = 'close-btn-float';
    closeBtn.onclick = closeProject;

    clone.appendChild(closeBtn);
    clone.appendChild(contentDiv);

    document.body.appendChild(clone);
    originalCard.classList.add('is-invisible');
    overlay.classList.add('active');

    requestAnimationFrame(() => {
        clone.classList.add('is-expanded');
        activeClone = clone;
    });
};

window.closeProject = function(e) {
    if(e) e.stopPropagation();
    if (!activeClone || !activeOriginal || !overlay) return;

    activeClone.classList.remove('is-expanded');
    overlay.classList.remove('active');

    const rect = activeOriginal.getBoundingClientRect();
    activeClone.style.top = rect.top + 'px';
    activeClone.style.left = rect.left + 'px';
    activeClone.style.width = rect.width + 'px';
    activeClone.style.height = rect.height + 'px';

    setTimeout(() => {
        if(activeClone) activeClone.remove();
        if(activeOriginal && activeOriginal !== document.body) {
            activeOriginal.classList.remove('is-invisible');
        }
        
        document.body.style.overflow = '';
        
        activeClone = null;
        activeOriginal = null;
    }, 500); 
};

// Global escape key listener for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProject();
});

// ==========================================================================
// 05. PROFILE MODAL TRIGGER
// ==========================================================================
window.openInteractiveResume = function() {
    if (!overlay) return;

    // Initialize audio playback with browser policy fallback
    const unlockSound = document.getElementById('car-unlock-sound');
    if (unlockSound) {
        unlockSound.currentTime = 0; 
        unlockSound.play().catch(e => console.log("Audio play blocked by browser. Interaction required."));
    }

    document.body.style.overflow = 'hidden';

    const clone = document.createElement('div');
    clone.className = 'project-card is-cloned';
    
    // Position full-screen immediately for the profile
    clone.style.position = 'fixed';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.width = '100vw';
    clone.style.height = '100vh';
    clone.style.zIndex = '9999';
    
    clone.style.setProperty('--card-accent', 'var(--accent)');
    clone.setAttribute('data-lenis-prevent', 'true');

    // Create Content Wrapper
    const contentDiv = document.createElement('div');
    contentDiv.className = 'expanded-content';
    
    // Pull the clean HTML from source div
    const sourceHTML = document.getElementById('resume-content-source').innerHTML;
    contentDiv.innerHTML = sourceHTML;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerText = "CLOSE [ESC]";
    closeBtn.className = 'close-btn-float';
    closeBtn.onclick = closeProject;

    clone.appendChild(closeBtn);
    clone.appendChild(contentDiv);

    document.body.appendChild(clone);
    overlay.classList.add('active');

    activeOriginal = document.body; 

    requestAnimationFrame(() => {
        clone.classList.add('is-expanded');
        activeClone = clone;
    });
};