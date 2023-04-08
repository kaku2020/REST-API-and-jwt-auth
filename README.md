# REST-API-and-jwt-auth
created backend with JWT Auth and REST API
REQUIREMENTS:
1. Auth (register and login using JWT)
2. Profile (update profile)

FUNCTIONALITY:
Step 1: we will register the user using name, email, phone, and image (image will be uploaded)
Step 2: we will login the user using JWT token so once we hit login we should get back a jwt token with 1d
validity.
Step 3: There should be a route to edit profile details (update all the information like name, email, phone,
and image)


HOW TO START :

1.Download Mongodb locally along with Mongodb Compass.
2.Create a folder to store the Mongodb data in C drive with name "MONGODB_DATA".
3.Open the cmd terminal navigate to  C:\Program Files\MongoDB\Server\6.0\bin then run the command "mongod --dbpath C:\MONGODB_DATA --port 27019" ,This will start mongodb at port 27019.
4.now open vs code in the "backend" folder .
5.In the terminal type the command "npm install".
6.In the terminal type the command "npm start".
