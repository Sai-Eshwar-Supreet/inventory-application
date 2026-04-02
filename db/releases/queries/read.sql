SELECT 
    r.id AS id, 
    g.name AS name,
    p.name AS platform,
    e.name AS edition,
    re.name AS region
FROM releases AS r
JOIN games AS g ON g.id = r.game_id;
JOIN platforms AS p ON p.id = r.platform_id 
JOIN editions AS e ON e.id  = r.edition_id
JOIN regions AS re ON re.id = r.region_id;