import redis
r = redis.Redis(host='redis-14875.c251.east-us-mz.azure.cloud.redislabs.com', port=14875, db=0, password="whenyeareintheserviceofyourfellowbeings")
r.set('foo', 'qwerty')
print(r.get('foo'))
