import datetime
import uuid

from influxdb import InfluxDBClient

class RequestTimeMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response


    def __call__(self, request):
        self.log_message(request, 'request ')
        response = self.get_response(request)
        status = getattr(response, 'status_code', 0)
        if response.content:
            size = len(response.content)
        self.log_message(request, 'response', size=str(size), status=str(status))
        return response

    @staticmethod
    def log_message(request, tag, size='', status='', influx=True):
        dt = datetime.datetime.now()
        if not hasattr(request, '_logging_uuid'):
            request._logging_uuid = uuid.uuid1()
            request._logging_start_dt = dt
            request._logging_pass = 0

        request._logging_pass += 1
        req_duration = (dt - request._logging_start_dt).total_seconds()
        message = f'status={status}, size={size}b'
        print(dt.isoformat(),
            tag,
            request._logging_uuid,
            request._logging_pass,
            request.path,
            req_duration,
            message,
        )
        if influx and tag == 'response':
            client = InfluxDBClient(database='otus')
            json_data = [{
                'measurement': 'request_duration',
                'tags': {
                    'server': 'localhost',
                    'path': request.path,
                    'size': size,
                    'status': status,
                },
                'fields': {
                    'uuid': str(request._logging_uuid),
                    'duration': req_duration,
                }
            }]
            client.write_points(json_data)
