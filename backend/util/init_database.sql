-- we use sqlite as the primary database

-- create user table
CREATE TABLE IF NOT EXISTS User (
    username TEXT PRIMARY KEY ,
    password TEXT NOT NULL ,
    user_type TEXT,
    token TEXT
);

CREATE TABLE IF NOT EXISTS Hotel (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL,
    email TEXT,
    price REAL NOT NULL ,
    web TEXT,
    description TEXT,
    host TEXT NOT NULL ,
    room_type TEXT NOT NULL ,
    bathrooms REAL NOT NULL ,
    bedrooms INTEGER NOT NULL ,
    FOREIGN KEY (host) REFERENCES User(username)
);

CREATE TABLE IF NOT EXISTS Hotel_img(
    hotel_id INTEGER NOT NULL ,
    url TEXT NOT NULL ,
    FOREIGN KEY (hotel_id) REFERENCES Hotel (id)
);

CREATE TABLE IF NOT EXISTS Booking (
    booking_id TEXT PRIMARY KEY ,
    booking_date TEXT NOT NULL ,
    check_in_date TEXT NOT NULL ,
    days INTEGER NOT NULL ,
    price REAL NOT NULL ,
    room_type TEXT NOT NULL ,
    comment TEXT
);


CREATE TABLE IF NOT EXISTS Booking_hotel (
    booking_id TEXT NOT NULL ,
    hotel_id INTEGER NOT NULL ,
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id),
    FOREIGN KEY (hotel_id) REFERENCES Hotel (id)
);

CREATE TABLE IF NOT EXISTS User_booking (
    booking_id TEXT NOT NULL ,
    username TEXT NOT NULL ,
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id),
    FOREIGN KEY (username) REFERENCES User(username)
);


CREATE TABLE IF NOT EXISTS Comments(
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
    rating REAL ,
    comment TEXT,
    user_id TEXT,
    hotel_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES User(username),
    FOREIGN KEY (hotel_id) REFERENCES Hotel(id)
);