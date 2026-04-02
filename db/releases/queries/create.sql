INSERT INTO releases (
    game_id, 
    edition_id, 
    platform_id,
    publisher_id, 
    region_id, 
    release_date,
    price,
    cover_image_path
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id