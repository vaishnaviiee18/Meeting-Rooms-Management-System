📌 Meeting Rooms Management System
A full-stack web application for managing meeting room booking requests across a campus. Built with Spring Boot, React.js, Tailwind CSS, and MySQL, this system allows clubs and users to send room requests, and admins to view, approve, or reject them.

🚀 Features
🔒 Role-based system for request creation and management

🗓️ Room booking form with club name, room, and date

✅ Admin panel to approve/reject pending requests

📊 Real-time updates using REST APIs

🎯 User-friendly UI powered by TailwindCSS

🛠️ Tech Stack
Backend	Frontend	Database	Tools
Spring Boot (Java)	React.js (Vite)	MySQL	Maven, Git
Spring Data JPA	Tailwind CSS	H2 (optional for dev)	Postman
🔧 Project Structure
graphql
Copy
Edit
📁 campus-space-backend
├── model         # Request model
├── repository    # JPA repositories
├── service       # Business logic
├── controller    # REST APIs
└── CampusSpaceBackendApplication.java

📁 campus-space-frontend
├── components    # UI components (forms, cards)
├── pages         # Routes/views
├── services      # API calls using fetch/axios
└── App.jsx       # Main React component


⚙️ How to Run Locally
1. Clone the Repository

git clone https://github.com/vaishnaviiee18/Meeting-Rooms-Management-System.git
cd Meeting-Rooms-Management-System
2. Start Backend (Spring Boot)
Make sure MySQL is running.


cd campus-space-backend
mvn spring-boot:run
📍 Runs at: http://localhost:8080

3. Start Frontend (React + Vite)

cd campus-space-frontend
npm install
npm run dev
📍 Runs at: http://localhost:5173

📡 API Endpoints
Method	Endpoint	Description
GET	/api/requests	Get all requests
GET	/api/requests/{id}	Get request by ID
POST	/api/requests	Create new request
PUT	/api/requests/{id}	Update request
DELETE	/api/requests/{id}	Delete request

💡 Future Enhancements
✅ User authentication (JWT)

📅 Room availability calendar

📬 Email notifications on approval/rejection

📱 Mobile-friendly UI



Screenshots:
![Screenshot (40)](https://github.com/user-attachments/assets/b9a2a04b-dd66-4d71-84e6-704621a7a8ae)
![image](https://github.com/user-attachments/assets/6dc4697c-d847-42ff-9eb9-443ac238b205)
![image](https://github.com/user-attachments/assets/0b58c2c4-78e5-4271-bda2-1a08edd5a061)


