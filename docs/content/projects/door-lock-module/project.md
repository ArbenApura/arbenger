# Door Lock Module (ITDS Smart Door Lock System)

- **Status:** Completed (capstone, Bulacan State University)
- **Year:** 2026
- **Category:** IoT / Web App
- **Role:** Proponent / full-stack + hardware developer (team project)
- **Recognition:** Registered with the Intellectual Property Office of the Philippines (IPOPHL), February 2026
- **Links:** TBD (GitHub repo / university info) · Video demo: https://drive.google.com/file/d/1nP0sxq7zsu-T9uGX4PkL9_r0YTN7GDT7/view (embed via `https://drive.google.com/file/d/1nP0sxq7zsu-T9uGX4PkL9_r0YTN7GDT7/preview` iframe)
- **Assets:** `IMRAD-Smart-Door-Lock-Face-Recognition-and-RFID-Technology-for-ITDS-Department-SC.pdf` (research paper, IMRAD format — downloadable from the project page) · video demo handled via Google Drive embed above

### Problem

Unauthorized access to the faculty room of the Information Technology and Decision Sciences (ITDS) Department at Bulacan State University (BulSU) Sarmiento Campus. Requirements gathered via online research, observation, questionnaires, and interviews with faculty and administrators.

### Solution

A "Smart Door Lock System" using RFID and face recognition, built with an Arduino-powered door device plus a management website. Access control is managed in real time through any browser: assigning, changing, or removing face-recognition profiles and RFID cards.

### Key Features

- RFID authentication via two readers (front and back of the door)
- Face recognition authentication through the web interface (Face API JS)
- Real-time access logs with monitoring of access attempts
- Role-based permissions: admins manage staff, devices, and access requests; staff update profiles, request special access, and view logs
- Special access requests workflow
- Automated notifications
- Visual + audio status feedback (LCD display, RGB/white/orange LEDs, passive buzzer)
- Uninterrupted power supply keeps the lock operational during outages

### Hardware Stack

- Arduino Mega 2560 R3 (main controller)
- ESP8266 NodeMCU CH340 (Wi-Fi / internet connection)
- 2x RFID RC522 (RFID readers, front and back)
- 12V Electric Solenoid Lock (locking mechanism)
- 5V 1-Channel Relay Module (drives the solenoid lock)
- LCD1602A LCD Display Module (system status)
- LED 4 Pin 3V RGB, White LED, Orange LED (state indicators)
- UPS V380 Pro 12V (power-outage backup)
- Powerbank + breadboard power supply (prototype power)
- Passive buzzer (audio feedback)

### Software Stack

- Arduino IDE (firmware for Arduino Mega + ESP8266)
- SvelteKit (frontend + backend of the website)
- Supabase (database management)
- Face API JS (face recognition)
- Vercel (hosting + domain management)

### Database (ERD)

Five main entities: Accounts, Staff, Special Access Requests, Arduino Devices, Access Logs. Access logs track entry activity; staff interact with Arduino devices; accounts link to employees; access requests mediate communication between staff and equipment.

### Methodology

Rapid Application Development (RAD) — requirements planning, user design, construction, cutover. Diagrams produced: concept design, schematic, use case, flowchart, ERD, context diagram, DFD Level 0, sitemap, exploded views.

---

**Images:** none available yet — will use the generated placeholder cover until real screenshots are recovered.
