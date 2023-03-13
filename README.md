#book-store application

-I've build an book-store application with some apis:

-install dependencies: npm install

-start : npm run deploy

-start with pm2(cluster) : npm run deploy-cluster

-test: npm run test

1- generate token (POST /token): client should has token to have access to all routes of application. I've used JWT for generate accessToken and refreshToken. for generate tokens you should send your name in body and this api can store name and refreshToken in mongoDB and returns refreshToken and accessToken as response.I've created authentication helper file to handle jwt. it can generate tokens and verify tokens as well.

2- renew accessToken (POST /token/renew):if client's accessToken expired, he can send his refreshToken and if the token was valid, it can generate new accessToken to have access to routes.

these apis are protected with jwt so client should set token in headers and then send request to these routes.
3- create book (POST /books): client can add new book with detail. detail is "title"(string), "description"(string), "author"(string), "year"(number between 0 and now), "cover"(url as string).

4- get books (GET /books): client can get all books with details, easy.

5- get book by id (GET /books/:id): client can get specific book with id from mongoDB, search in mongoDB with id is the best way to find data because it has index option to search faster in db. however we can create indexes or compound indexes for specific keys, to search faster. but I think it's make sense for search or find byId.

6- update book by id (PUT /books/:id): client can update specific book with id. each element he want can update if he send that element in body and send valid Id in params.

7- delete book by id (DELETE /books/:id): client can delete book from db with this api if he send valid id.

about tokens:
we have refreshToken and accessToken, refreshToken expire in 14 days, and accessToken expire in 15 minutes. it's sample of real application and it's just for test. in real applications it can be 1 day.
so if accessToken expired, client can refresh his accessToken with refreshToken, if he send valid refreshToken, this app can check it and if it is valid and there is in db, it can generate and return new accessToken with new expire date.
