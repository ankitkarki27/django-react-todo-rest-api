from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),  # API overview
    # task.List is the funcn here
    path('task-list/', views.taskList, name="task-list"),  # List all tasks
    path('task-detail/<str:pk>/', views.taskDetail, name="task-detail"),  # Task detail by ID
    path('task-create/', views.taskCreate, name="task-create"),
    path('task-update/<str:pk>/', views.taskUpdate, name="task-update"),
    path('task-delete/<str:pk>/', views.taskDelete, name="task-delete"), #delete by ID
]
