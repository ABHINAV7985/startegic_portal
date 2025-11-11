import subprocess
import sys
import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Function to run code based on selected language
def run_code(code, language='python'):
    print(f"Running code for {language}")
    if language == 'python':
        with open("temp_code.py", "w") as f:
            f.write(code)
        try:
            result = subprocess.run([sys.executable, 'temp_code.py'], capture_output=True, text=True, timeout=5)
            print(f"Result: {result.stdout}")
            return result.stdout + "\n" + result.stderr
        except subprocess.TimeoutExpired:
            print("Timeout expired")
            return "Error: Code execution exceeded time limit"
        except Exception as e:
            print(f"Exception: {e}")
            return str(e)

    elif language == 'java':
        # Run Java code
        with open("TempCode.java", "w") as f:
            f.write(code)
        
        try:
            # Compile Java code
            compile_result = subprocess.run(["javac", "TempCode.java"], capture_output=True, text=True)
            if compile_result.returncode != 0:
                os.remove("TempCode.java")
                return compile_result.stdout + "\n" + compile_result.stderr
            
            # Run the compiled Java code
            run_result = subprocess.run(["java", "TempCode"], capture_output=True, text=True)
            os.remove("TempCode.java")
            os.remove("TempCode.class")  # Cleanup after execution
            return run_result.stdout + "\n" + run_result.stderr
        except subprocess.TimeoutExpired:
            return "Error: Code execution exceeded time limit"
        except Exception as e:
            return str(e)

    elif language == 'cpp':
        # Run C++ code
        with open("TempCode.cpp", "w") as f:
            f.write(code)
        
        try:
            # Compile C++ code
            compile_result = subprocess.run(["g++", "-o", "TempCode", "TempCode.cpp"], capture_output=True, text=True)
            if compile_result.returncode != 0:
                os.remove("TempCode.cpp")
                return compile_result.stdout + "\n" + compile_result.stderr
            
            # Run the compiled C++ code
            run_result = subprocess.run(["./TempCode"], capture_output=True, text=True)
            os.remove("TempCode.cpp")
            os.remove("TempCode")  # Cleanup after execution
            return run_result.stdout + "\n" + run_result.stderr
        except subprocess.TimeoutExpired:
            return "Error: Code execution exceeded time limit"
        except Exception as e:
            return str(e)

    elif language == 'c':
        # Run C code
        with open("TempCode.c", "w") as f:
            f.write(code)

        try:
            # Compile C code
            compile_result = subprocess.run(["gcc", "-o", "TempCode", "TempCode.c"], capture_output=True, text=True)
            if compile_result.returncode != 0:
                os.remove("TempCode.c")
                return compile_result.stdout + "\n" + compile_result.stderr
            
            # Run the compiled C code
            run_result = subprocess.run(["./TempCode"], capture_output=True, text=True)
            os.remove("TempCode.c")
            os.remove("TempCode")  # Cleanup after execution
            return run_result.stdout + "\n" + run_result.stderr
        except subprocess.TimeoutExpired:
            return "Error: Code execution exceeded time limit"
        except Exception as e:
            return str(e)

    elif language == 'javascript':
        # Run JavaScript code
        try:
            result = subprocess.run(["node", "-e", code], capture_output=True, text=True, timeout=5)
            return result.stdout + "\n" + result.stderr
        except subprocess.TimeoutExpired:
            return "Error: Code execution exceeded time limit"
        except Exception as e:
            return str(e)

    return "Unsupported language"

@app.route("/")
def home():
    return render_template("index.html")
@app.route('/contact')
def contact():
    return render_template('contact.html')
@app.route('/Index1')
def index():
    return render_template('Index1.html')

@app.route('/schedule')
def schedule():
    # Render scheduling functionality or redirect to a scheduling tool
    return "Schedule an Interview Page"


@app.route("/run_code", methods=["POST"])
def execute_code():
    code = request.json.get("code")
    language = request.json.get("language", "python")
    
    output = run_code(code, language)
    return jsonify({"output": output})

if __name__ == "__main__":
    app.run(debug=True)
