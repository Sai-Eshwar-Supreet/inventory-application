WITH game AS(
    INSERT INTO games (name, description) VALUES ($1, $2) RETURNING id
)
INSERT INTO game_genres (game_id, genre_id) 
SELECT game.id, genre.id
FROM game
CROSS JOIN UNNEST($3::int[]) AS genre(id);