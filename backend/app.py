from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import random
import mysql.connector
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# === MySQL Connection === #
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="xcdmp3013",
    database="walmart"
)
cursor = db.cursor()

# === Global CSV Paths === #
DATA_FOLDER = "data"
CSV_PATHS = {
    "inventory_data": os.path.join(DATA_FOLDER, "inventory_data.csv"),
    "sales_data": os.path.join(DATA_FOLDER, "sales_data.csv"),
    "delivery_data": os.path.join(DATA_FOLDER, "delivery_data.csv"),
    "smart_whispers": os.path.join(DATA_FOLDER, "smart_whispers.csv"),
    "store_locations": os.path.join(DATA_FOLDER, "store_locations.csv"),  # ✅ Fixed
    "product_catalog": os.path.join(DATA_FOLDER, "product_catalog.csv"),
    "users": os.path.join(DATA_FOLDER, "users.csv"),
    "external_events": os.path.join(DATA_FOLDER, "external_events.csv"),
}

# === Map frontend names to backend keys ===
DATASET_KEY_MAP = {
    "users": "users",
    "delivery_data": "delivery_data",
    "product_catalog": "product_catalog",
    "external_events": "external_events",
    "smart_whispers": "smart_whispers",
    "store_locations": "store_locations",
    "sales_data": "sales_data",
    "inventory_data": "inventory_data"
}

# === Helper: Insert CSV to MySQL === #
def insert_csv_to_db(df, table_name):
    if df.empty:
        return
    placeholders = ", ".join(["%s"] * len(df.columns))
    columns = ", ".join(df.columns)
    sql = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
    values = [tuple(row) for row in df.to_numpy()]
    cursor.execute(f"DELETE FROM {table_name}")  # optional: clear old data
    cursor.executemany(sql, values)
    db.commit()

# === Upload + Insert Route === #
@app.route("/api/upload/<dataset>", methods=["POST"])
def upload_dataset(dataset):
    if dataset not in CSV_PATHS:
        return jsonify({"error": f"Invalid dataset name: {dataset}"}), 400

    save_path = CSV_PATHS[dataset]
    table_name = f"{dataset}_table"  # change to actual table name if needed

    try:
        file = request.files["file"]
        file.save(save_path)
        df = pd.read_csv(save_path).fillna("")
        insert_csv_to_db(df, table_name)
        return jsonify({
            "message": f"{dataset.replace('_', ' ').title()} uploaded successfully.",
            "filename": file.filename,
            "columns": list(df.columns)
        })
    except Exception as e:
        return jsonify({"error": str(e)})
# === Routes === #

@app.route("/")
def home():
    return jsonify({"message": "✅ Backend is running successfully!"})

@app.route("/api/demand", methods=["GET"])
def get_demand_prediction():
    product_list = ["Kurta", "Rice", "Sugar", "Milk", "Raincoat"]
    city_list = ["Mumbai", "Delhi", "Surat", "Jaipur", "Bangalore"]
    predictions = []
    for product in product_list:
        for city in city_list:
            demand = random.randint(80, 200)
            predictions.append({
                "product": product,
                "city": city,
                "predicted_demand": demand,
                "date": datetime.today().strftime('%Y-%m-%d')
            })
    return jsonify(predictions)

@app.route("/api/products", methods=["GET"])
def get_products():
    try:
        df = pd.read_csv(CSV_PATHS["product_catalog"])
        df = df.fillna("")
        df["inStock"] = True
        df["ecoScore"] = [random.randint(7, 10) for _ in range(len(df))]
        df["rating"] = [round(random.uniform(4.0, 5.0), 1) for _ in range(len(df))]
        df["trending"] = [random.choice([True, False]) for _ in range(len(df))]
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/api/rewards", methods=["GET"])
def get_rewards():
    rewards = [
        {"name": "20% Off Next Order", "description": "Get 20% discount", "cost": 500, "available": True},
        {"name": "Tree Planting Certificate", "description": "Help reforest hills", "cost": 800, "available": True},
        {"name": "Free Jute Shopping Bag", "description": "Support Indian artisans", "cost": 300, "available": True},
    ]
    return jsonify(rewards)

@app.route("/api/inventory", methods=["GET"])
def get_inventory():
    try:
        df = pd.read_csv(CSV_PATHS["inventory_data"])
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/api/sales", methods=["GET"])
def get_sales():
    try:
        df = pd.read_csv(CSV_PATHS["sales_data"])
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/api/eco", methods=["GET"])
def get_eco_analytics():
    try:
        df = pd.read_csv(CSV_PATHS["delivery_data"])
        total_deliveries = len(df)
        total_km = df["distance_km"].sum()
        carbon_saved = df["carbon_saved_g"].sum()
        return jsonify({
            "total_deliveries": total_deliveries,
            "total_distance_km": round(total_km, 2),
            "carbon_saved_g": round(carbon_saved, 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)})

   # Utility function to handle numpy types
def convert_np_types(obj):
    import numpy as np
    if isinstance(obj, (np.int64, np.int32)):
        return int(obj)
    if isinstance(obj, (np.float64, np.float32)):
        return float(obj)
    return obj
 

@app.route("/api/admin-dashboard", methods=["GET"])
def admin_dashboard():
    try:
        # ✅ Load eco analytics
        eco_df = pd.read_csv(CSV_PATHS["delivery_data"])
        total_km = eco_df["distance_km"].sum() if "distance_km" in eco_df.columns else 0
        carbon_saved = eco_df["carbon_saved_g"].sum() if "carbon_saved_g" in eco_df.columns else 0

        ecoData = {
            "total_distance_km": round(float(total_km), 2),
            "carbon_saved_g": round(float(carbon_saved), 2)
        }

        # ✅ Load inventory data and convert all numpy types to native
        inv_df = pd.read_csv(CSV_PATHS["inventory_data"]).fillna("")
        inventoryData = [
            {k: convert_np_types(v) for k, v in row.items()}
            for row in inv_df.to_dict(orient="records")
        ]

        return jsonify({
            "ecoData": ecoData,
            "inventoryData": inventoryData
        })

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/delivery", methods=["GET"])
def get_delivery_list():
    try:
        df = pd.read_csv(CSV_PATHS["delivery_data"]).fillna("")
        deliveries = [{
            "order_id": row.get("order_id", ""),
            "customer_name": row.get("customer_name", ""),
            "address": row.get("address", ""),
            "status": row.get("status", "pending"),
            "eta": row.get("eta", "30 mins")
        } for _, row in df.iterrows()]
        return jsonify(deliveries)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/api/whispers", methods=["GET"])
def get_whispers():
    try:
        df = pd.read_csv(CSV_PATHS["smart_whispers"])
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/api/whispers", methods=["POST"])
def add_whisper():
    data = request.json
    try:
        df = pd.read_csv(CSV_PATHS["smart_whispers"])
        new_id = f"W{len(df)+1:03d}"
        new_row = {
            "id": new_id,
            "suggestion_text": data.get("suggestion_text", "No text"),
            "triggered_on": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "status": "Pending"
        }
        df = pd.concat([df, pd.DataFrame([new_row])])
        df.to_csv(CSV_PATHS["smart_whispers"], index=False)
        return jsonify({"message": "Suggestion added successfully."})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/api/stores", methods=["GET"])
def get_stores():
    try:
        df = pd.read_csv(CSV_PATHS["store_locations"])
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/api/users", methods=["GET"])
def get_users():
    try:
        df = pd.read_csv(CSV_PATHS["users"])
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/api/events", methods=["GET"])
def get_events():
    try:
        df = pd.read_csv(CSV_PATHS["external_events"])
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "alive"})

# === Run === #
if __name__ == "__main__":
    app.run(debug=True, port=5000)
