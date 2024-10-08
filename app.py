from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/load_playlist', methods=['POST'])
def load_playlist():
    playlist_url = request.form.get('playlist_url')
    try:
        response = requests.get(playlist_url)
        channels = parse_m3u(response.text)
        return render_template('player.html', channels=channels)
    except Exception as e:
        return render_template('index.html', error=str(e))

def parse_m3u(m3u_data):
    channels = []
    lines = m3u_data.splitlines()
    for i in range(len(lines)):
        if lines[i].startswith('#EXTINF'):
            info = lines[i].split(',')
            name = info[1]
            stream_url = lines[i + 1]
            channels.append({
                'name': name,
                'url': stream_url
            })
    return channels

if __name__ == '__main__':
    app.run(debug=True)
