# FullStack App 🚀  
A complete **FullStack application** with **iOS (SwiftUI), Next.js (React), and Express.js (Node.js)**. This project features **JWT authentication, API integration, and Dockerized deployment**.

## 🛠 Tech Stack  
- **Frontend:** Next.js (React, TypeScript)  
- **Mobile:** SwiftUI (iOS)  
- **Backend:** Express.js (Node.js, MongoDB)  
- **Authentication:** JWT  
- **Deployment:** Docker  

## # 📱 MyJournal - iOS App (SwiftUI)
...

## 📂 Features  
✅ User authentication (Sign up, Login, Logout)  
✅ Secure API with JWT tokens  
✅ Create, Read, Update, and Delete (CRUD) posts  
✅ iOS app with SwiftUI, fetching data via API  
✅ Fully containerized with Docker  

## 📸 Design  
https://www.figma.com/design/ama1L7EtojKaM3kUyCUUTc/Fullstack-Node-IOS?node-id=0-1&t=oX3l3Wawarmp1TtF-1

# 🚀 Installation Guide

This guide provides step-by-step instructions to install and run the **Express.js + MongoDB + Next.js** project using Docker.

---

## **1️⃣ Prerequisites**

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- A Docker Hub account ([Sign up here](https://hub.docker.com/))

---

## **2️⃣ Clone the Repository**

```sh
git clone https://github.com/tranhieuphuc12/FullstackNodejsIOS.git
cd FullstackNodejsIOS
```

---

## **3️⃣ Login to Docker Hub**

```sh
docker login
```

Enter your **Docker Hub username** and **password** when prompted.

---

## **4️⃣ Pull Prebuilt Docker Images**

```sh
docker pull tranhieuphuc12/my-journal-fe:latest
docker pull tranhieuphuc12/my-journal-be:latest
```

---

## **5️⃣ Run MongoDB Container**

```sh
docker run -d \
  --name mongo_container \
  -p 27017:27017 \
  mongo:6
```

---

## **6️⃣ Run Backend Container**

```sh
docker run -d \
  --name backend_container \
  -p 3000:3000 \
  tranhieuphuc12/my-journal-be:latest
```

---

## **7️⃣ Run Frontend Container**

```sh
docker run -d \
  --name frontend_container \
  -p 8080:8080 \
  tranhieuphuc12/my-journal-fe:latest
```

---

## **8️⃣ Alternative: Run Everything with Docker Compose**

Instead of running individual containers, use `docker-compose.yml`:

### **Modify **``** to Use Docker Hub Images**

Replace the `build` sections with:

```yaml
backend:
  image: tranhieuphuc12/my-journal-be:latest
frontend:
  image: tranhieuphuc12/my-journal-fe:latest
```

Then, run:

```sh
docker-compose up -d
```

---

## **9️⃣ Verify the Setup**

- **MongoDB:** `mongodb://localhost:27017/`
- **Backend API:** `http://localhost:3000`
- **Frontend App:** `http://localhost:8080`

Use `docker ps` to check running containers.

To stop all containers:

```sh
docker-compose down
```

---

## 🎉 **Done!**

Your project is now running in Docker! 🚀

