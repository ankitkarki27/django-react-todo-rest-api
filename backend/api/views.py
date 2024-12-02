from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task

# CRUD API Views

# Overview of all API endpoints


#@api_view(['POST']) decorator in Django REST Framework (DRF) is used to specify 
# that a function-based view will only accept HTTP POST requests. 
# This decorator helps in defining which HTTP methods are allowed for a particular view.
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
    }
    return Response(api_urls)


# List all tasks
@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()  # Fetch all tasks
    serializer = TaskSerializer(tasks, many=True)  # Serialize multiple tasks
    return Response(serializer.data)


@api_view(['GET'])
def taskDetail(request ,pk):
    task = Task.objects.get(id=pk)  # Fetch task by ID
    serializer = TaskSerializer(task, many=False)  # Serialize single task
    return Response(serializer.data)
    
    # Create
@api_view(['POST'])
def taskCreate(request):
    serializer=TaskSerializer(data=request.data) # Deserialize request data
    
    if serializer.is_valid():  # Validate input data
        serializer.save()  # Save the task to the database
        
    return Response(serializer.data)

#update
@api_view(['POST'])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)  # Use get() to retrieve the task by its primary key
    serializer = TaskSerializer(instance=task, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    # return Response(serializer.errors, status=400)


#delete
@api_view(['DELETE'])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)  # Correctly retrieves the task by primary key
    task.delete()  # Deletes the task
    
    return Response({"message": "Item deleted successfully"})
