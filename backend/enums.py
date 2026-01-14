from enum import Enum

class GenderEnum(str, Enum):
    MALE = "male"
    FEMALE = "female"
class ParkingEnum(str, Enum): # 주차장 유무
    YES = 'yes'
    NO = 'no'
class AdmissionEnum(str, Enum): # 입장료 유료 무료
    FREE = 'free'
    PAID = 'paid'
class ReservationEnum(str, Enum): # 예약 여부
    YES = 'yes'
    NO = 'no'
class LocalPayEnum(str, Enum):  # 지역화페
    YES = 'yes' 
    NO = 'no'