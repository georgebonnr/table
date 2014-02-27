**an api for querying restuarant reservations plus a web portal to use it**

- format:
(NOTE: all these queries are prefixed by '/api/v1' for clarity and versioning)
`GET /[resource]` -- return all resources (silo'd by organization subdomain)
`GET /[resource]/:id` -- return a single reservation
`POST /[resource]/` -- create a reservation and return its location in html header
`PUT /[resource]/:id` -- update a reservation.
`DELETE /[resource]/:id` -- remove a resource.
