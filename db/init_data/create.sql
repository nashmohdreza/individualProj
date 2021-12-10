CREATE TABLE IF NOT EXISTS tvShow_reviews(
  id SERIAL PRIMARY KEY, 
  tv_show VARCHAR(50) NOT NULL, 
  review TEXT NOT NULL, 
  review_date DATE NOT NULL
  );
