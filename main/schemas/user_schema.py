from marshmallow import Schema, fields, validate
from ..enums import GenderEnum
class UserCreateSchema(Schema):
    email = fields.Email(required=True, error_messages={'required':'이메일은 필수입니다.'})
    userid = fields.Str(required=True,  error_messages={'required': '아이디는 필수입니다.'})
    password = fields.Str(required=True, validate=validate.Length(min=6), load_only=True, error_messages={'required': '비밀번호는 필수입니다.'})
    username = fields.Str(required=True, error_messages={'required': '닉네임은 필수입니다.'})
    gender = fields.Str(required=True, validate=validate.OneOf([e.value for e in GenderEnum]), error_messages={'required': '성별은 필수입니다.'})
    phone = fields.Str(required=True, validate=validate.Regexp(r"01[0-9]-?\d{3,4}-?\d{4}$", error="전화번호 형식이 다릅니다."))
