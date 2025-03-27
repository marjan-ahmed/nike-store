create table reviews (
  id uuid default gen_random_uuid() primary key,  -- Unique review ID
  user_id uuid references auth.users(id) not null,  -- Clerk Auth user ID
  product_slug text not null,  -- Product slug from Sanity
  rating int check (rating between 1 and 5) not null,  -- Rating (1 to 5)
  review_title text,  -- Optional review title
  review_description text not null,  -- User review description
  fit_rating text check (fit_rating in ('Runs Small', 'True to Size', 'Runs Big')) not null,  -- Fit feedback
  comfort_rating text check (comfort_rating in ('Uncomfortable', 'Average', 'Very Comfortable')) not null,  -- Comfort feedback
  recommend boolean not null,  -- User recommendation (Yes/No)
  created_at timestamp default now()  -- Timestamp of review creation
);
