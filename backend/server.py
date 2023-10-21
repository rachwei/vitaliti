from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import defaultdict
  
# Initializing flask app
app = Flask(__name__)

medication_history = defaultdict(dict)

@app.route('/api/record-medication', methods=['POST'])
def record_medication_status():
    data = request.get_json()

    # Extract the medication index and status from the request data
    medication_index = data.get('medicationIndex')
    status = data.get('status')
    medication_name = data.get('medicationName')
    date = data.get('date')

    # update medication history dictionary
    medication_history[date][medication_name] = status
    print(medication_history)

    return jsonify({'message': 'Medication status recorded successfully'}), 200

@app.route('/api/medications/<date>', methods=['GET'])
def get_medications_by_date(date):
    if date in medication_history:
        medications = medication_history[date]
        taken_medications = [m for m in medications.keys() if medications[m] == "Taken"]
        return jsonify({'date': date, 'medications': taken_medications})
    else:
        # fine, just no data
        return jsonify({'error': 'Date not found'}), 200
    
# Running app
if __name__ == '__main__':
    app.run(debug=True)