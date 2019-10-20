from app import app
import api.auth_handling

if __name__ == '__main__':
    app.run(port=8000, debug=True, host='127.0.0.1')
