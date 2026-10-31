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

#we'll have a bunch of service routes here===============================
@app.route("/standard_service")
def standard_service():
    return render_template("standard-service.html")

@app.route("/outdoor_service")
def outdoor_service():
    return render_template("outdoor-service.html")

@app.route("/masonry_fireplace_service")
def masonry_fireplace_service():
    return render_template("masonry-fireplace-services.html")

@app.route("/in_wall_concealment_service")
def in_wall_concealment_service():
    return render_template("in-wall-concealment-service.html")

@app.route("/sound_bar_service")
def sound_bar_service():
    return render_template("sound-bar-service.html")

@app.route("/alcove_service")
def alcove_service():
    return render_template("alcove-service.html")

@app.route("/moterized_fireplace_service")
def moterized_fireplace_service():
    return render_template("moterized-mantel-service.html")

#========================================================
@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/privacy-policy")
def privacy_policy():
    return render_template("privacy-policy.html")


@app.route("/terms-of-service")
def terms_of_service():
    return render_template("terms-of-service.html")


if __name__ == "__main__":
    app.run(debug=True)
