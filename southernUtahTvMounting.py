from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


#---------------------------------------
#tokens to send to jobber  comenting out rn because we probably don't have to make a whole backend
"""
JOBBER_ACCESS_TOKEN = "YOUR_JOBBER_OAUTH_ACCESS_TOKEN"
JOBBER_GRAPHQL_URL = "https://api.getjobber.com/api/graphql"

@app.route('/submit-request', methods=['POST'])
def submit_request():
    # Extract form data submitted by user
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    email = request.form.get('email')
    details = request.form.get('details')

    # Construct the Jobber API GraphQL Mutation
    graphql_query = 
    mutation CreateClientAndRequest($firstName: String!, $lastName: String!, $email: String!) {
      clientCreate(input: {
        firstName: $firstName,
        lastName: $lastName,
        emails: [{ address: $email, primary: true }]
      }) {
        client {
          id
        }
        userErrors {
          message
        }
      }
    }
    
    headers = {
        "Authorization": f"Bearer {JOBBER_ACCESS_TOKEN}",
        "X-JOBBER-GRAPHQL-VERSION": "2025-04-16",
        "Content-Type": "application/json"
    }

    payload = {
        "query": graphql_query,
        "variables": {
            "firstName": first_name,
            "lastName": last_name,
            "email": email
        }
    }

    response = requests.post(JOBBER_GRAPHQL_URL, json=payload, headers=headers)
    
    if response.status_code == 200:
        return "Request submitted successfully to Jobber!"
    else:
        return f"Failed to submit to Jobber: {response.text}", 400


    """
#-------------------------------------------------------------------------------
#base server site host app
@app.route("/")
def home():
    return render_template("index.html")

@app.route('/quote', methods=['GET', 'POST'])
def quote():
    if request.method == 'POST':
        name = request.form.get('name')
        phone = request.form.get('phone')
        email = request.form.get('email')
        city = request.form.get('city')
        tv_size = request.form.get('tv_size')
        wall_type = request.form.get('wall_type')
        services = request.form.getlist('services')
        details = request.form.getlist('details')

        #TODO: Process the quote (e.g. send an email notification to yourself or save to database)
        
        return render_template('quote_success.html', name=name)

    return render_template('quote.html')

@app.route("/#services")
def services():
    if request.path == "/":
        return None
    return render_template("index.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True)

