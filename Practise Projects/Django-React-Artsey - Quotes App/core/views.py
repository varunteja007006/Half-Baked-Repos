from django.http import HttpResponse, JsonResponse
from urllib import response
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view

from .models import *
from .serializer import *
# Create your views here.

#class based APIView
class ReactView(APIView):
	serializer_class = ReactSerializer

	def get(self, request):
		detail = [ {"name": detail.name,"detail": detail.detail}		
		for detail in React.objects.all()]
		detail.reverse()
		return Response(detail)

	def post(self, request):

		serializer = ReactSerializer(data=request.data)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data)

#decorator based api view
@api_view(['GET', 'PUT', 'DELETE'])
def getQuote(request,pk,format=None):
	try:
		react_obj = React.objects.filter(name=pk)
	except react_obj.len() == 0:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == "GET":
		serializer = ReactSerializer(react_obj, many=True)
		return Response(serializer.data)

	elif request.method == "PUT":
		react_obj = React.objects.get(name=pk)
		serializer = ReactSerializer(react_obj, data=request.data)
		
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		
	elif request.method == "DELETE":
		react_obj.delete()
		return Response()
	return Response(status=status.HTTP_204_NO_CONTENT)
	


