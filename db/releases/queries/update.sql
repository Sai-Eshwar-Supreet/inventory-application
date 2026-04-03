UPDATE releases
SET 
    game_id = $2,
    edition_id = $3,
    platform_id = $4,
    publisher_id = $5,
    region_id = $6,
    release_date = $7,
    price = $8,
    cover_image_path = $9
WHERE id = $1
RETURNING id;