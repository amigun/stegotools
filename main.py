from flask import Flask, render_template, url_for, request, jsonify
from transliterate import translit
from stegano import lsb
from PIL import Image

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
@app.route('/image', methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template('index.html')
    else:
        if request.form.get('type') == 'hide':
            image = request.files.get('file')
            image.save('./static/img/images/'+image.filename)
            text = translit(request.form.get('text'), language_code='ru', reversed=True)

            filename = image.filename

            if (image.filename).split('.')[-1] != 'png':
                filename = (image.filename)[:-(len((image.filename).split('.')[-1]))] + 'png'
                convert = Image.open('./static/img/images/'+image.filename)
                convert.save('./static/img/images/'+filename)

            hide = lsb.hide('./static/img/images/'+filename, text)
            hide.save('./static/img/images/'+filename)

            result = jsonify({'result': './static/img/images/'+filename})

            if result:
                return result
            else:
                return "smth"
        elif request.form.get('type') == 'show':
            image = request.files.get('file')
            image.save('./static/img/images/'+image.filename)

            filename = image.filename

            result = jsonify({'result': lsb.reveal('./static/img/images/'+filename)})

            if result:
                return result
            else:
                return "smth"
@app.route('/audio')
def about():
    return render_template('comingsoon.html')

@app.route('/hash')
def hash():
    return render_template('comingsoon.html')

if __name__ == '__main__':
    app.run()
