CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    number INT NOT NULL,
    originalTitle VARCHAR(255) NOT NULL,
    releaseDate VARCHAR(50),
    pages INT,
    description TEXT,
    cover TEXT
);