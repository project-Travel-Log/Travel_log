from marshmallow import Schema, fields

class LoginSchema(Schema):
    userid = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)