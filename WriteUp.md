# Write-up

## 1. What did you build for Part B, and why that?

I think that the most important part of an application is the UI because it is the first aspect the user notices. I think the UI definitely changes whether or not the user would even use the application. There are so many times in life where we choose one thing over another because of how it looks or fits our vibes, like a poster or an outfit. I wanted the UI for this app to match the resturant aesthetic that the user was signing up for, making the colors traditional and the background simple but on theme. I also implemented a tracker (money, times gone to the resturaunt) because that was what the app was originally made for.

## 2. What did you decide, and what did you rule out?

With the time given, I did not pay as much attention to the layout of the application because I thought it was sufficient for the task. 

## 3. Where did you cut corners?

On another day, I would add the ablity to record a new restaurant visit because the dashboard displays the data now but users cannot add spending on the website. I would also add a monthly budget because that would be incredibly helpful with keeping the user on task, which I would appreciate if I were the user because I care a lot about spending money wisely. 

---

## Part B: routes
Method and path	What it does	Success	Errors
GET /api/spending-summary	Calculates total spending, total visits, and average spending per visit	200 + spending summary	500 if the database query unexpectedly fails

GET /api/spending-summary

This endpoint does not require a request body.

// 200 response
{
  "totalSpent": 125.5,
  "visitCount": 6,
  "averageSpent": 20.916666666666668
}

The exact values depend on the visits stored in the database. When there are no visits, the endpoint returns zero values rather than null.

{
  "totalSpent": 0,
  "visitCount": 0,
  "averageSpent": 0
}

Unexpected failures use the shared API error handler and do not expose database details:

// 500 response
{
  "error": "Internal Server Error"
}
Schema changes

None. 

How I verified this

Part A — I tested each endpoint’s successful behavior as well as invalid input and missing records.

# Return all restaurants: 200 + JSON array
curl -i http://localhost:3000/api/restaurants

# Return one restaurant: 200 + restaurant
curl -i http://localhost:3000/api/restaurants/1

# Missing restaurant: 404
curl -i http://localhost:3000/api/restaurants/99999

# Invalid ID: 404
curl -i http://localhost:3000/api/restaurants/abc

# Create a valid restaurant: 201
curl -i -X POST http://localhost:3000/api/restaurants \
  -H 'Content-Type: application/json' \
  -d '{"name":"Valid Spot","cuisine":"Test","address":"2 Test St","rating":4.5}'

# Reject an out-of-range rating: 400
curl -i -X POST http://localhost:3000/api/restaurants \
  -H 'Content-Type: application/json' \
  -d '{"name":"Out Of Range","rating":6}'

# Reject a missing name: 400
curl -i -X POST http://localhost:3000/api/restaurants \
  -H 'Content-Type: application/json' \
  -d '{"cuisine":"Italian","rating":4}'

# Reject malformed JSON: 400
curl -i -X POST http://localhost:3000/api/restaurants \
  -H 'Content-Type: application/json' \
  -d '{"name":"Broken",}'

# Update an existing restaurant: 200
curl -i -X PUT http://localhost:3000/api/restaurants/1 \
  -H 'Content-Type: application/json' \
  -d '{"name":"Updated Restaurant","cuisine":"Mexican","address":"20 Main St","rating":4.8}'

# Reject an invalid update: 400
curl -i -X PUT http://localhost:3000/api/restaurants/1 \
  -H 'Content-Type: application/json' \
  -d '{"name":"Invalid Update","rating":10}'

# Invalid update ID: 404
curl -i -X PUT http://localhost:3000/api/restaurants/abc \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","rating":4}'

# Delete an existing restaurant: 204 with no body
curl -i -X DELETE http://localhost:3000/api/restaurants/8

# Delete a missing restaurant: 404
curl -i -X DELETE http://localhost:3000/api/restaurants/99999

# Delete with an invalid ID: 404
curl -i -X DELETE http://localhost:3000/api/restaurants/abc

Part B — I called the new endpoint directly and confirmed that it returned the expected fields and numeric values.

curl -i http://localhost:3000/api/spending-summary

I also opened http://localhost:3000 and confirmed that the total spending, visit count, and average spending cards matched the API response. I checked that the restaurant cards, empty-state handling, custom font, responsive layout, and food-themed background displayed correctly. Finally, I ran:

npm run lint
npm run build

## Known issues / what I'd do next

There is nothing broken or unfinished from what I know. Yet, the interface does not let the user record a new visit, which is what I would change later. I also would make the dashboard fully usable without requiring direct API requests. I would also add a lot of automated test, such as spending calculations. I would also add filters so the user could compare their spending by the week, month, or year.
