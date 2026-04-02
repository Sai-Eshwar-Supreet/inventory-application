SELECT 
    games.name AS name,
    games.description AS description,
    editions.name AS edition,
    platforms.name AS platform,
    ARRAY_AGG(DISTINCT genres.name) AS genres,
    ARRAY_AGG(DISTINCT developers.name) AS developers,
    publishers.name AS publisher,
    regions.name AS region,
    releases.release_date AS releaseDate,
    releases.price AS price,
    releases.cover_image_path AS coverImagePath
FROM releases 
JOIN games ON games.id = releases.game_id
JOIN editions ON editions.id = releases.edition_id
JOIN platforms ON platforms.id = releases.platform_id
JOIN publishers ON publishers.id = releases.publisher_id
JOIN regions ON regions.id = releases.region_id

LEFT JOIN game_genres ON game_genres.game_id = games.id
LEFT JOIN genres ON genres.id = game_genres.genre_id

LEFT JOIN game_developers ON game_developers.game_id = games.id
LEFT JOIN developers ON developers.id = game_developers.developer_id

WHERE releases.id = $1;
GROUP BY games.id,  editions.id, platforms.id, publishers.id, regions.id, releases.id;