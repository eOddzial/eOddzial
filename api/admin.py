from django.contrib import admin
from api.models import Patient, Medic, Operation, Operation_type, Room
from api.models import Patient, Medic

# Register your models here.
admin.site.register(Patient)
admin.site.register(Medic)
admin.site.register(Room)
admin.site.register(Operation)
admin.site.register(Operation_type)