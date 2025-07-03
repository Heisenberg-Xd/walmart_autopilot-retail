from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

# === Global CSV Paths === #
INVENTORY_CSV = "data/inventory_data.csv"
SALES_CSV = "data/sales_data.csv"
DELIVERY_CSV = "data/delivery_data.csv"
SUGGESTIONS_CSV = "data/smart_whispers.csv"
STORE_CSV = "data/store_locations.csv"
PRODUCT_CSV = "data/product_catalog.csv"
USER_CSV = "data/users.csv"
EVENTS_CSV = "data/external_events.csv"

# === ROUTES === #

@app.route("/")
def home():
    return jsonify({"message": "✅ Backend is running successfully!"})

# --- Demand Prediction (Mock) ---
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

# --- Products from product_catalog.csv with enhancements ---
@app.route("/api/products", methods=["GET"])
def get_products():
    try:
        df = pd.read_csv(PRODUCT_CSV)
        df = df.fillna("")
        df["inStock"] = True
        df["ecoScore"] = [random.randint(7, 10) for _ in range(len(df))]
        df["rating"] = [round(random.uniform(4.0, 5.0), 1) for _ in range(len(df))]
        df["trending"] = [random.choice([True, False]) for _ in range(len(df))]
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

# --- Green Rewards (Static) ---
@app.route("/api/rewards", methods=["GET"])
def get_rewards():
    rewards = [
        {"name": "20% Off Next Order", "description": "Get 20% discount", "cost": 500, "available": True},
        {"name": "Tree Planting Certificate", "description": "Help reforest hills", "cost": 800, "available": True},
        {"name": "Free Jute Shopping Bag", "description": "Support Indian artisans", "cost": 300, "available": True},
    ]
    return jsonify(rewards)

# --- Inventory Data ---
@app.route("/api/inventory", methods=["GET"])
def get_inventory():
    try:
        df = pd.read_csv(INVENTORY_CSV)
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

# --- Sales Data ---
@app.route("/api/sales", methods=["GET"])
def get_sales():
    try:
        df = pd.read_csv(SALES_CSV)
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

# --- Eco Analytics ---
@app.route("/api/eco", methods=["GET"])
def get_eco_analytics():
    try:
        df = pd.read_csv(DELIVERY_CSV)
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

# --- Delivery List ---
@app.route("/api/delivery", methods=["GET"])
def get_delivery_list():
    try:
        df = pd.read_csv(DELIVERY_CSV)
        df = df.fillna("")

        deliveries = []
        for _, row in df.iterrows():
            deliveries.append({
                "order_id": row.get("order_id", ""),
                "customer_name": row.get("customer_name", ""),
                "address": row.get("address", ""),
                "status": row.get("status", "pending"),
                "eta": row.get("eta", "30 mins")
            })

        return jsonify(deliveries)
    except Exception as e:
        return jsonify({"error": str(e)})

# --- Smart Whispers (GET) ---
@app.route("/api/whispers", methods=["GET"])
def get_whispers():
    try:
        df = pd.read_csv(SUGGESTIONS_CSV)
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

# --- Smart Whispers (POST) ---
@app.route("/api/whispers", methods=["POST"])
def add_whisper():
    data = request.json
    try:
        df = pd.read_csv(SUGGESTIONS_CSV)
        new_id = f"W{len(df)+1:03d}"
        new_row = {
            "id": new_id,
            "suggestion_text": data.get("suggestion_text", "No text"),
            "triggered_on": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "status": "Pending"
        }
        df = pd.concat([df, pd.DataFrame([new_row])])
        df.to_csv(SUGGESTIONS_CSV, index=False)
        return jsonify({"message": "Suggestion added successfully."})
    except Exception as e:
        return jsonify({"error": str(e)})

# --- Upload CSVs ---
@app.route("/api/upload-sales", methods=["POST"])
def upload_sales():
    file = request.files["file"]
    try:
        file.save(SALES_CSV)
        return jsonify({"message": "Sales data updated successfully."})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/api/upload-inventory", methods=["POST"])
def upload_inventory():
    file = request.files["file"]
    try:
        file.save(INVENTORY_CSV)
        return jsonify({"message": "Inventory data updated successfully."})
    except Exception as e:
        return jsonify({"error": str(e)})

# --- Store Locations ---
@app.route("/api/stores", methods=["GET"])
def get_stores():
    try:
        df = pd.read_csv(STORE_CSV)
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

# --- Users ---
@app.route("/api/users", methods=["GET"])
def get_users():
    try:
        df = pd.read_csv(USER_CSV)
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

# --- External Events ---
@app.route("/api/events", methods=["GET"])
def get_events():
    try:
        df = pd.read_csv(EVENTS_CSV)
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)})

# --- Health Check ---
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "alive"})

# === Run Server === #
if __name__ == "__main__":
    app.run(debug=True, port=5000)
