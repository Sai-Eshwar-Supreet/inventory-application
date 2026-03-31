SELECT g.id AS id, g.name AS name, g.description AS description, JSON_AGG(JSON_BUILD_OBJECT('id', ge.id, 'name', ge.name)) AS genres
FROM games AS g
LEFT JOIN game_genres AS gg ON g.id = gg.game_id
LEFT JOIN genres AS ge ON gg.genre_id = ge.id
WHERE g.id = $1
GROUP BY g.id;