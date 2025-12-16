from enum import Enum

class GenderEnum(str, Enum):
    MALE = "male"
    FEMALE = "female"
class ParkingEnum(str, Enum):
    YES = 'yes'
    NO = 'no'
class AdmissionEnum(str, Enum):
    FREE = 'free'
    PAID = 'paid'
class ReservationEnum(str, Enum):
    YES = 'yes'
    NO = 'no'
class LocalPayEnum(str, Enum):
    YES = 'yes' 
    NO = 'no'