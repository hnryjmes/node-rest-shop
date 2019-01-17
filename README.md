# node-rest-shop

Learning backend web development fundamentals with TypeScript, JavaScript, Node, Express, MongoDB etc.

[Tutorial: Building a RESTful API with Node.js](https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q)

### What are we building?

Asterisk (*) means a route is authenticated:

/products
- `GET /products`
- `POST /products` *

/products/{id}
- `GET /products/{id}`
- `PATCH /products/{id}` *
- `DELETE /products/{id}` *

/orders
- `GET /orders` *
- `POST /orders` *

/orders/{id}
- `GET /orders/{id}` *
- `DELETE /orders/{id}` *



### What are RESTful constraints?

Client-Server Architecture: *
- Separation of Concerns
- RESTful API should not care about the UI

Stateless: *
- No Client-Context (e.g. Session) is stored on the Server

Cacheability:
- Responses must define themselves as cacheable or non-cacheable

Layered System:
- Intermediate Servers may be used without the Client knowing about it

Uniform Interface:
- Resources are identified in Requests, transferred data is decoupled from db schema
- Self-descriptive Messages
- Links to further Resources

Code on Demand (optional):
- Executable Code could be transferred