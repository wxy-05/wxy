-- Create the products table
create table products (
    id uuid default uuid_generate_v4() primary key,
    sku text not null,
    name text not null,
    image text,
    sizes jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for faster searching
create index products_sku_idx on products using gin (sku gin_trgm_ops);
create index products_name_idx on products using gin (name gin_trgm_ops);

-- Example product data
insert into products (sku, name, image, sizes) values
(
    'DV2918-001',
    'Nike Air Zoom G.T. Cut 3 EP 低帮 篮球鞋 男女',
    'https://example.com/images/DV2918-001.jpg',
    '{
        "38.5": {"us": "6", "uk": "5.5", "stock": 0},
        "39": {"us": "6.5", "uk": "6", "stock": 0},
        "40": {"us": "7", "uk": "6.5", "stock": 3},
        "40.5": {"us": "7.5", "uk": "7", "stock": 0},
        "41": {"us": "8", "uk": "7.5", "stock": 0},
        "42": {"us": "8.5", "uk": "8", "stock": 0},
        "42.5": {"us": "9", "uk": "8.5", "stock": 3},
        "43": {"us": "9.5", "uk": "9", "stock": 0}
    }'::jsonb
); 