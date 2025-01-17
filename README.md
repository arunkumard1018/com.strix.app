# StrixInvoice

**StrixInvoice** is a powerful and user-friendly invoicing software built with the MERN stack. This monorepo organizes both the frontend (Next.js) and backend (Node.js with Express) applications for seamless development and deployment.
* Visit our website:  [www.strixinvoice.in](https://www.strixinvoice.in)
---

## Monorepo Structure

```plaintext
strixinvoice/
├── ui/          # Next.js application for the user interface
├── server/      # Node.js REST API for backend services
├── package.json # Root dependencies and workspace scripts
├── README.md    # Project documentation
├── .env.example # Example environment variables
```
### Prerequisites
* Node.js: Ensure you have Node.js (v16 or later) installed.
* MongoDB: A running MongoDB instance.
* npm: Comes with Node.js, required for package management.

## Setup Instructions

#### 1. Clone the Repository
```git clone https://github.com/arunkumard1018/com.strix.app```

#### 2. Configure Environment Variables
* For /server:
```
PORT=8001
MONGO_URI=<MONG_DB_URI>
JWT_SECRET=your_jwt_secret
```
* For /ui:
```
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```


#### 3. Install Dependencies
Install For Both Front End Backend
```
>> git clone https://github.com/arunkumard1018/com.strix.app

>> cd com.strix.app

>> npm install # to install dependencies

```
To Install Saperately
```
>> cd com.strix.app

>> cd ui && npm install #to install next.JS Dependencies

>> cd server && npm install #to install Node.JS Dependencies
```
#### 4. Start the Applications
To run both the frontend and backend in 
* development mode: 
```
>> cd com.strix.app

# to start both apps in Development mode
>> npm run dev 
```
* To build and run
```
# to build and start 
>> npm run build
>> npm run start
```

> NOTE : You can start both Apps saperatly by cding into both dirs saperately

#### 5. Contributing
We welcome contributions! Here's how you can help:

* Fork the repository.
* Create a new branch for your feature/bugfix.
* Commit your changes.
* Submit a pull request.

> Contact : support@strixinvoice.in