from flask import Blueprint

bp = Blueprint('main', __name__)

@bp.route("/Auth", methods=["GET", "POST"])
def signUp():
    return {
        
    }
