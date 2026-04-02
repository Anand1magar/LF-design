import struct, zlib, os

def create_placeholder_png(path, width=200, height=200):
    rows = []
    for y in range(height):
        row = b'\x00'
        for x in range(width):
            if abs(x - width//2) < 2 or abs(y - height//2) < 2:
                row += struct.pack('BBBB', 180, 180, 180, 255)
            else:
                row += struct.pack('BBBB', 230, 230, 230, 255)
        rows.append(row)
    raw = b''.join(rows)
    
    def make_chunk(chunk_type, data):
        chunk = chunk_type + data
        return struct.pack('>I', len(data)) + chunk + struct.pack('>I', zlib.crc32(chunk) & 0xFFFFFFFF)
    
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    png = b'\x89PNG\r\n\x1a\n'
    png += make_chunk(b'IHDR', ihdr)
    png += make_chunk(b'IDAT', zlib.compress(raw))
    png += make_chunk(b'IEND', b'')
    
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(png)
    print(f"Created: {os.path.basename(path)} ({len(png)} bytes)")

assets_dir = "/Users/leapfrog/Downloads/LF STUDIO NEXTJS/src/assets"
missing = [
    "f5abfcf62cfa578839ce3d9399ca0434645bd809.png",
    "c35598fbbab4ea777cdab89e47324267793c2d1d.png",
    "bd75474f0f364ad4386bdde374b10bb593f7f794.png",
    "30a1c9b628db6e110d5523e108e3a3e97a5cb8e4.png",
    "3c617b52865af75ead73e8c47c9b1810d86747f6.png",
    "2a26064becba9bc3f9c9e82bd2e647a2253736f4.png",
]
for f in missing:
    create_placeholder_png(os.path.join(assets_dir, f))
print("Done!")
