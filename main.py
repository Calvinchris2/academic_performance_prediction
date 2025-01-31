from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf  

# Initialize the FastAPI app
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model('my_model2.keras') 

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

     
        input_data = input_data.astype(np.float32)

        # Use the model to make a prediction
        prediction = model.predict(input_data)  

       
        predicted_G3 = float(prediction[0]) 
        
        predicted_G3_int = int(round(predicted_G3))  

        return {"predicted_G3": predicted_G3_int}  
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@app.get("/")
def read_root():
    return {"message": "FastAPI server is running!"}
