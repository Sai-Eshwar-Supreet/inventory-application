WITH game AS(
    INSERT INTO games (name, description) 
    VALUES ($1, $2) 
    RETURNING id
),
insert_developers AS (
    INSERT INTO game_developers (game_id, developer_id) 
    SELECT game.id, developer.id
    FROM game
    CROSS JOIN UNNEST($4::int[]) AS developer(id)
),
insert_genres AS(
    INSERT INTO game_genres (game_id, genre_id) 
    SELECT game.id, genre.id
    FROM game
    CROSS JOIN UNNEST($3::int[]) AS genre(id)
)
SELECT id FROM game;