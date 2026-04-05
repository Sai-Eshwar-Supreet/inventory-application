SELECT 
    r.id AS id, 
    g.name AS name,
    p.name AS platform,
    e.name AS edition,
    re.name AS region,
    r.cover_image_path AS "coverImagePath"
FROM releases r
JOIN games g       ON g.id = r.game_id
JOIN editions e    ON e.id = r.edition_id
JOIN platforms p   ON p.id = r.platform_id 
JOIN publishers pub ON pub.id = r.publisher_id
JOIN regions re    ON re.id = r.region_id

WHERE 
    g.name ILIKE '%' || $1 || '%'
 OR p.name ILIKE '%' || $1 || '%'
 OR e.name ILIKE '%' || $1 || '%'
 OR pub.name ILIKE '%' || $1 || '%'
 OR re.name ILIKE '%' || $1 || '%'

 OR EXISTS (
     SELECT 1
     FROM game_genres gg
     JOIN genres gen ON gen.id = gg.genre_id
     WHERE gg.game_id = g.id
       AND gen.name ILIKE '%' || $1 || '%'
 )

 OR EXISTS (
     SELECT 1
     FROM game_developers gd
     JOIN developers dev ON dev.id = gd.developer_id
     WHERE gd.game_id = g.id
       AND dev.name ILIKE '%' || $1 || '%'
 );