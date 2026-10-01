from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


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

