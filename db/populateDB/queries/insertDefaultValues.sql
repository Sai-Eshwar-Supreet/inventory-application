INSERT INTO editions (name)
VALUES
  ('Standard'),
  ('Deluxe'),
  ('Game of the Year')
ON CONFLICT (name) DO NOTHING;

INSERT INTO platforms (name)
VALUES
  ('PC'),
  ('PlayStation 5'),
  ('Xbox Series X')
ON CONFLICT (name) DO NOTHING;

INSERT INTO publishers (name)
VALUES
  ('Rockstar Games'),
  ('Bandai Namco Entertainment'),
  ('ConcernedApe')
ON CONFLICT (name) DO NOTHING;

INSERT INTO regions (name)
VALUES
  ('Global'),
  ('North America'),
  ('Japan'),
  ('India')
ON CONFLICT (name) DO NOTHING;

INSERT INTO genres (name)
VALUES
  ('Action'),
  ('RPG'),
  ('Open World'),
  ('Simulation'),
  ('Adventure')
ON CONFLICT (name) DO NOTHING;

INSERT INTO games (name, description)
VALUES
(
  'Grand Theft Auto V',
  $$Grand Theft Auto V is an expansive open-world experience set in the sprawling city of Los Santos and the surrounding countryside. The game follows the intertwined lives of three very different criminals—Michael, a retired bank robber; Franklin, a street hustler searching for real opportunity; and Trevor, a volatile and unpredictable outlaw.

  Players can seamlessly switch between these characters as they navigate a world filled with high-stakes heists, underground crime networks, and a satirical take on modern society. The narrative blends action, dark humor, and social commentary in a way that keeps the experience engaging from start to finish.

  Beyond the main storyline, the game offers a massive sandbox of activities including side missions, businesses, racing, and exploration. Its dynamic world reacts to player choices, making each playthrough feel personal and unpredictable.$$
),

(
  'Elden Ring',
  $$Elden Ring is a dark fantasy action RPG set in the vast and mysterious Lands Between, a world shaped by the shattered remains of the Elden Ring. Players take on the role of a Tarnished, drawn to this broken realm in search of power and purpose.

  The game emphasizes exploration and discovery, allowing players to traverse open landscapes filled with hidden dungeons, powerful enemies, and environmental storytelling. Combat is deliberate and challenging, requiring careful timing, strategy, and adaptability across a wide range of playstyles.

  With its deep lore, atmospheric world design, and freedom-driven progression, Elden Ring delivers a demanding yet rewarding experience where persistence and curiosity are constantly tested.$$
),

(
  'Stardew Valley',
  $$Stardew Valley is a farming simulation and life RPG centered around restoring a neglected farm and building a new life in a quiet rural town. Players begin with limited resources and gradually expand their land through planting crops, raising animals, and crafting tools.

  Beyond farming, the game offers a rich social system where players can interact with townspeople, build relationships, and participate in seasonal festivals. Activities like fishing, mining, and exploration add variety and depth to the gameplay loop.

  With its relaxing pace and open-ended structure, Stardew Valley allows players to define their own goals, whether that means optimizing their farm, forming connections, or simply enjoying a slower and more intentional way of life.$$
)

ON CONFLICT (name) DO NOTHING;

INSERT INTO developers (name)
VALUES
  ('Rockstar North'),
  ('FromSoftware'),
  ('ConcernedApe')
ON CONFLICT (name) DO NOTHING;

-- game_developers
INSERT INTO game_developers (game_id, developer_id)
SELECT g.id, d.id
FROM games AS g
JOIN developers AS d ON d.name = 'Rockstar North'
WHERE g.name = 'Grand Theft Auto V'
ON CONFLICT DO NOTHING;

INSERT INTO game_developers (game_id, developer_id)
SELECT g.id, d.id
FROM games AS g
JOIN developers AS d ON d.name = 'FromSoftware'
WHERE g.name = 'Elden Ring'
ON CONFLICT DO NOTHING;

INSERT INTO game_developers (game_id, developer_id)
SELECT g.id, d.id
FROM games AS g
JOIN developers AS d ON d.name = 'ConcernedApe'
WHERE g.name = 'Stardew Valley'
ON CONFLICT DO NOTHING;

-- game_genres
INSERT INTO game_genres (game_id, genre_id)
SELECT g.id, gen.id
FROM games AS g
JOIN genres AS gen ON gen.name IN ('Action', 'Open World', 'Adventure')
WHERE g.name = 'Grand Theft Auto V'
ON CONFLICT DO NOTHING;

INSERT INTO game_genres (game_id, genre_id)
SELECT g.id, gen.id
FROM games AS g
JOIN genres AS gen ON gen.name IN ('Action', 'RPG', 'Adventure')
WHERE g.name = 'Elden Ring'
ON CONFLICT DO NOTHING;

INSERT INTO game_genres (game_id, genre_id)
SELECT g.id, gen.id
FROM games AS g
JOIN genres AS gen ON gen.name IN ('RPG', 'Simulation')
WHERE g.name = 'Stardew Valley'
ON CONFLICT DO NOTHING;

-- releases

-- GTA V (PS5)
INSERT INTO releases (
  game_id, edition_id, platform_id, publisher_id, region_id,
  release_date, price, cover_image_path
)
SELECT 
  g.id, e.id, p.id, pub.id, r.id,
  '2014-11-18', 3999, 'https://wallpapercave.com/wp/wp1809630.jpg'
FROM games AS g
JOIN editions AS e ON e.name = 'Standard'
JOIN platforms AS p ON p.name = 'PlayStation 5'
JOIN publishers AS pub ON pub.name = 'Rockstar Games'
JOIN regions AS r ON r.name = 'Global'
WHERE g.name = 'Grand Theft Auto V'
ON CONFLICT DO NOTHING;

-- GTA V (PC)
INSERT INTO releases (
  game_id, edition_id, platform_id, publisher_id, region_id,
  release_date, price, cover_image_path
)
SELECT 
  g.id, e.id, p.id, pub.id, r.id,
  '2015-04-14', 2999, 'https://wallpapercave.com/wp/wp1809636.jpg'
FROM games AS g
JOIN editions AS e ON e.name = 'Standard'
JOIN platforms AS p ON p.name = 'PC'
JOIN publishers AS pub ON pub.name = 'Rockstar Games'
JOIN regions AS r ON r.name = 'Global'
WHERE g.name = 'Grand Theft Auto V'
ON CONFLICT DO NOTHING;

-- Elden Ring (PS5)
INSERT INTO releases (
  game_id, edition_id, platform_id, publisher_id, region_id,
  release_date, price, cover_image_path
)
SELECT 
  g.id, e.id, p.id, pub.id, r.id,
  '2022-02-25', 4999, 'https://wallpapercave.com/wp/wp4674114.jpg'
FROM games AS g
JOIN editions AS e ON e.name = 'Standard'
JOIN platforms AS p ON p.name = 'PlayStation 5'
JOIN publishers AS pub ON pub.name = 'Bandai Namco Entertainment'
JOIN regions AS r ON r.name = 'Global'
WHERE g.name = 'Elden Ring'
ON CONFLICT DO NOTHING;

-- Elden Ring (PC Deluxe)
INSERT INTO releases (
  game_id, edition_id, platform_id, publisher_id, region_id,
  release_date, price, cover_image_path
)
SELECT 
  g.id, e.id, p.id, pub.id, r.id,
  '2022-02-25', 5499, 'https://wallpapercave.com/wp/wp4674107.jpg'
FROM games AS g
JOIN editions AS e ON e.name = 'Deluxe'
JOIN platforms AS p ON p.name = 'PC'
JOIN publishers AS pub ON pub.name = 'Bandai Namco Entertainment'
JOIN regions AS r ON r.name = 'Global'
WHERE g.name = 'Elden Ring'
ON CONFLICT DO NOTHING;

-- Stardew Valley (PC)
INSERT INTO releases (
  game_id, edition_id, platform_id, publisher_id, region_id,
  release_date, price, cover_image_path
)
SELECT 
  g.id, e.id, p.id, pub.id, r.id,
  '2016-02-26', 499, 'https://wallpapercave.com/wp/wp2234182.png'
FROM games AS g
JOIN editions AS e ON e.name = 'Standard'
JOIN platforms AS p ON p.name = 'PC'
JOIN publishers AS pub ON pub.name = 'ConcernedApe'
JOIN regions AS r ON r.name = 'Global'
WHERE g.name = 'Stardew Valley'
ON CONFLICT DO NOTHING;