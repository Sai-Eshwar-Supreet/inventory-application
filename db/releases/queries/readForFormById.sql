SELECT
game_id AS gameId, 
edition_id AS editionId, 
platform_id AS platformId,
publisher_id AS publisherId, 
region_id AS regionId, 
release_date AS releaseDate,
price,
cover_image_path AS coverImagePath
FROM releases
WHERE id = $1;