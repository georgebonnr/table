###an api for querying restuarant reservations plus a web portal to use it**

###
-`npm install`

-install mongodb locally

-seed the database by running `mongo localhost:27017/table seed.js`

-run the server `node app`

#### Web Client access:
- Access at 127.0.0.1:3000 – NOTE: api is designed for use with subdomains for supporting different organizations – the authorized organization name for this route will be the string '0' -- localhost will not work.

Username (email): 'f@f.com'

Password: '123'

-note: Currently a bug with getting ranges on reservations that I am working out – probably ISOString issues. 


### API:
- NOTE: All API requests are handled separately from the web app and can be used with curl via basic authentication.


-Usage:

GET `'/reservations`
`curl -u f@f.com:123 127.0.0.1:3000/api/v1/reservations/`


GET `'/reservations/:id'`
`curl -u f@f.com:123 127.0.0.1:3000/api/v1/reservations/530e8806166ce4124fb8d6ba`


POST `'/reservations'`

as json:
`curl -u f@f.com:123 -X POST -H "Content-Type: application/json" -d '{"size":"2", "phone":"12314567823", "email":"carol@gmail.com", "organization":"0", "time":"2014-02-27T07:01:42.900Z", "table":"a1"}' http://127.0.0.1:3000/api/v1/reservations`

as querystring:
`curl -u f@f.com:123 -X POST -d 'size=4&phone=12312547823&email=f@f.com&organization=0&time=2014-02-27T07:13:05.928Z&table=b1' http://127.0.0.1:3000/api/v1/reservations`


PUT `'/reservations/:id'`
`curl -u f@f.com:123 -X PUT -d 'size=5' http://127.0.0.1:3000/api/v1/reservations/530e8806166ce4124fb8d6ba`


DELETE `'/reservations/:id'`
`curl -u f@f.com:123 -X DELETE http://127.0.0.1:3000/api/v1/reservations/530e8806166ce4124fb8d6ba`


GET `'/users'`
`curl -u f@f.com:123 127.0.0.1:3000/api/v1/users/`


GET `'/users/:id'`
`curl -u f@f.com:123 127.0.0.1:3000/api/v1/users/30f0f8bb164cac25f47048e`


POST `'/users'`

as querystring:
`curl -u f@f.com:123 -X POST -d 'firstName=John&lastName=Smith&phone=1231455555&email=john@gmail.com&password=123' http://127.0.0.1:3000/api/v1/users`


PUT `'/reservations/:id'`
`curl -u f@f.com:123 -X PUT -d 'lastName=Updated' http://127.0.0.1:3000/api/v1/users/530f22c9041c07115ae68992`


DELETE `'/reservations/:id'`
`curl -u f@f.com:123 -X DELETE http://127.0.0.1:3000/api/v1/users/530f22c9041c07115ae68992`


TABLES:


GET `'/tables'`
`curl -u f@f.com:123 127.0.0.1:3000/api/v1/tables/`


Also supports filtering:
`curl -u f@f.com:123 127.0.0.1:3000/api/v1/tables/?max=4`


PREFERENCES:


GET `'/preferences'`
`curl -u f@f.com:123 127.0.0.1:3000/api/v1/preferences/`


PUT `'/preferences/'`

note: this will always put to the authorized organization.
`curl -u f@f.com:123 -X PUT -d 'walkInPercentageRegular=50' http://127.0.0.1:3000/api/v1/preferences`


QUERYING:
-The main GET routes support query string filtering / searching of any fields in the database.

Example:
`curl -u f@f.com:123 127.0.0.1:3000/api/v1/users/?lastName=Barr`
NOTE: Queries for 'password' field are automatically stripped out.


-You can even use this to query nested data:
`curl -u f@f.com:123 127.0.0.1:3000/api/v1/users/?organization.admin=true`


-CUSTOM QUERIES:
-Reservations support date range, via 'start' and 'end' parameters.

Example:
`curl -u f@f.com:123 127.0.0.1:3000/api/v1/reservations/?start=[ISO_string]&end=[ISO_string]`

-Users also support custom 'createdAfter' and 'createdBefore' queries.


-Notes:
  * Namespacing
      * painful issue compared to other b2b services due to large number of restaurants and also some chain restaurants
      * chensgardenberkeley.table.com starts to get ugly.
      * www.table.com/chensgardenberkeley/etc. starts to make paths longer and uglier, though, probably even worse.
      * Unique username for each business.
      * Feature: the API does not require users to remember their organization's unique username to log into the service. They can simply log in from www.table.com and the API will query Mongo for the appropriate organization_id, after which the appropriate username will be applied in the url for the web client.
   * Single-Tenant API, but Multi-Tenant DB Schema
      * API tasks are only relevant to an individual restaurant location.
      * But a 'dedicated db' model (one db per customer) might not be feasible for a relatively low-cost cloud service
      * So the DB supporting the API needs to be organization-agnostic, while the API itself needs to only be available internally to an organization. Created some interesting design challenges in Mongo.
      * Biggest challenge in Mongo was designing so that documents could take advantage of nested data structures but not grow in size.

   * MongoDB
      * Tried to de-normalize where feasible (example: Employees subdocument in Organization).
      * Nested structure is a good fit for getting data related to organizations quickly.
      * If a client-facing app became more important in the future with any social elements, then a relational db would probably be  better fit.

   * REST
      * As much as is possible / practical, let all state be represented in the url.
   * Authentication
      * Session-based authentication for browser app
      * Additional basicAuth layer for api access – not secure for a real-world scenario, but just wanted something to use easily with curl.
      * Only authorized users (at this point, either registered staff or admin of an organization) have access to that organization's data.
      * Second level of admin authorization is required for some paths (still needs to be implemented).
   * Users
      * Employees could also be users. For instance employees can be booked as a guest on a reservation.  DB allows for multiple roles per user to handle future client-facing app, other roles involving sales, etc.
   * Client-side: Right now the client app is not caching anything for clarity, but it would easy to implement caching on the client side to cut down on network requests in a real-world scenario
