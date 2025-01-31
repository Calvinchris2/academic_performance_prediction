from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf  # Assuming you're using TensorFlow/Keras for the model

# Initialize the FastAPI app
app = FastAPI()

# Add CORS middleware to allow your React app to make requests to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (you can replace "*" with ["http://localhost:5173"] for better security)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model (make sure the path is correct)
model = tf.keras.models.load_model('my_model2.keras')  # Replace with your model path

# Define the Pydantic model for validation
class StudentData(BaseModel):
    studytime: int
    failures: int
    act_encoded: int
    absences: int
    G1: float
    G2: float

# Define the prediction endpoint
@app.post("/predict/")
def predict(student_data: StudentData):
    try:
        # Prepare input data for prediction
        input_data = np.array([[student_data.studytime, student_data.failures, student_data.act_encoded,
                                 student_data.absences, student_data.G1, student_data.G2]])

        # Ensure input data is in the correct shape and type
        input_data = input_data.astype(np.float32)

        # Use the model to make a prediction
        prediction = model.predict(input_data)  # Make sure the model is expecting this input shape

        # Convert prediction to a native Python type
        predicted_G3 = float(prediction[0])  # Convert numpy.float32 to native float
        
        # Optionally, convert to an integer if you want to return it as an integer
        predicted_G3_int = int(round(predicted_G3))  # Convert to integer (rounded)

        return {"predicted_G3": predicted_G3_int}  # Return the prediction as an integer
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# Optionally, you can add a root endpoint to verify the server is running
@app.get("/")
def read_root():
    return {"message": "FastAPI server is running!"}
