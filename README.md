# CVWO_Winter_Assignment

To run the backend:
1. Have Go, Postgresql, and Goose https://github.com/pressly/goose installed. We use goose for database migration. In postgresql, create a DB.
2. Create an .env file in /backend and add the localhost port you would like to use with the following syntax: PORT=XXXX e.g. PORT=8000.
3. In the same .env file, add the following: DB_URL=host=your_ip_address_like_127.0.0.1 port=5432 dbname=yourdbname user=yourusername password=yourpassword sslmode=require connect_timeout=10
4. run the following: go mod vendor
5. run the following: go mod tidy
6. cd to /backend/database/schema and run goose postgres host=your_ip_address_like_127.0.0.1 port=5432 dbname=yourdbname user=yourusername password=yourpassword sslmode=require connect_timeout=10 up. This is to upmigrate the database
7. cd back to /backend and do the following: go build && ./backend
8. that should start the backend server on port 8000

To run the frontend (was built using create-react-app and CHAKRA UI):
1. npm install
2. npm start
3. this should start the frontend on port 3000

