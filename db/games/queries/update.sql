WITH game AS (
    UPDATE games 
    SET name = $2, description = $3
    WHERE id = $1
    RETURNING id
),

remove_genres AS (
    DELETE FROM game_genres AS gg
    USING game
    WHERE gg.game_id = game.id AND gg.genre_id != ALL($4::int[])
)

INSERT INTO game_genres (game_id, genre_id)
SELECT game.id, genre.id
FROM game
CROSS JOIN UNNEST($4::int[]) AS genre(id)
ON CONFLICT (game_id, genre_id) DO NOTHING;