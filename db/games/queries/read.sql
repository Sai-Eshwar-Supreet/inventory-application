SELECT 
g.id AS id, 
g.name AS name, 
g.description AS description, 
(
    SELECT JSON_AGG(JSON_BUILD_OBJECT('id', ge.id, 'name', ge.name))
    FROM game_genres AS gg
    JOIN genres AS ge ON gg.genre_id = ge.id
    WHERE gg.game_id = g.id

) AS genres,
(
    SELECT JSON_AGG(JSON_BUILD_OBJECT('id', d.id, 'name', d.name))
    FROM game_developers AS gd
    JOIN developers AS d ON gd.developer_id = d.id
    WHERE gd.game_id = g.id
) AS developers

FROM games AS g;