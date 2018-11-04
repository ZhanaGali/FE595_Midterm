##Zhana Gali FE-595-WS Midterm: Stock - Invest or not to invest?
##I start with importing Flask and creating app. Then I route to URL and add parameters to generate Get and Post methods

from flask import Flask, render_template, request
import requests

app = Flask(__name__)

API_KEY = "O6HFPV8CLCGBU5ZX"


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == 'POST':
        stock = request.form.get("stock")
        r = requests.get(
            "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=%s&apikey=%s" % (stock, API_KEY))
        return render_template("stock.html", data=r.json())
    return render_template("index.html")


if __name__ == "__main__":
    app.run(port=8080, debug=True)

