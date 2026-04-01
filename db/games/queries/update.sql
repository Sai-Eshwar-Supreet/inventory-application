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
),

insert_genres AS (
    INSERT INTO game_genres (game_id, genre_id)
    SELECT game.id, genre.id
    FROM game
    CROSS JOIN UNNEST($4::int[]) AS genre(id)
    ON CONFLICT (game_id, genre_id) DO NOTHING
),

remove_developers AS (
    DELETE FROM game_developers AS gd
    USING game
    WHERE gd.game_id = game.id AND gd.developer_id != ALL($5::int[])
)

INSERT INTO game_developers (game_id, developer_id)
SELECT game.id, developer.id
FROM game
CROSS JOIN UNNEST($5::int[]) AS developer(id)
ON CONFLICT (game_id, developer_id) DO NOTHING;