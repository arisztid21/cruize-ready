select * from posts where(category = $1 and item = %$2% and beginning_year <= $3 and ending_year >= $3); 