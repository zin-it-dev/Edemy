import abc

from rest_framework import viewsets, status
from rest_framework.response import Response

class SearchViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug'
    
    @abc.abstractmethod
    def generate_q_expression(self, query):
        """This method should be overridden
        and return a Q() expression."""
        
    def list(self, request,  *args, **kwargs):
        try:
            query = request.query_params.get("search")
            
            if query:
                q = self.generate_q_expression(query)
                search = self.document_class.search().query(q)
            else:
                search = self.document_class.search()
            
            page = self.paginate_queryset(search)
            
            if page is not None:
                serializer = self.serializer_class(page, many=True)
                return self.get_paginated_response(serializer.data)
            
            response = search.execute()
            serializer = self.serializer_class(response, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)