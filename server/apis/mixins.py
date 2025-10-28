import abc

from adrf.viewsets import ReadOnlyModelViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.filters import SearchFilter

class ReadOnlyViewSet(ReadOnlyModelViewSet):
    lookup_field = "slug"


class DocumentViewSet(ReadOnlyViewSet):
    filter_backends = [SearchFilter]
    
    @abc.abstractmethod
    def generate_q_expression(self, query):
        """This method should be overridden
        and return a Q() expression."""
        
    def filter_queryset(self, queryset):
        param = self.request.query_params.get("search")
        
        if param:
            q = self.generate_q_expression(param)
            search = self.document_class.search().query(q)
            response = search.execute()
            return response
        else:
            return super().filter_queryset(queryset)
        
        
    def list(self, request,  *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)
            
            if page is not None:
                serializer = self.serializer_class(page, many=True)
                return self.get_paginated_response(serializer.data)
            
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)