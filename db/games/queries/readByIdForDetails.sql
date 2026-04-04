WITH genres_data AS (
    SELECT gg.game_id, ARRAY_AGG(ge.name) AS genres
    FROM game_genres AS gg
    JOIN genres AS ge ON gg.genre_id = ge.id
    GROUP BY gg.game_id
),

developers_data AS(
    SELECT gd.game_id, ARRAY_AGG(d.name) AS developers
    FROM game_developers AS gd
    JOIN developers AS d ON gd.developer_id = d.id
    GROUP BY gd.game_id
)

SELECT 
    g.id AS id, 
    g.name AS name, 
    g.description AS description, 
    COALESCE(genres_data.genres, ARRAY[]::varchar[]) AS genres,
    COALESCE(developers_data.developers, ARRAY[]::varchar[]) AS developers
FROM games AS g
LEFT JOIN genres_data ON genres_data.game_id = g.id
LEFT JOIN developers_data ON developers_data.game_id = g.id
WHERE g.id = $1;