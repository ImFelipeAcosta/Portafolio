import re

file_path = r'c:\Users\Usuario\Downloads\Portafolio-main\Portafolio-main\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update fonts
html = re.sub(
    r'<link href="https://fonts\.googleapis\.com/css2\?family=Bebas\+Neue&family=Montserrat[^"]*" rel="stylesheet">',
    r'<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet">',
    html
)

# A manual replacement approach to ensure zero text loss and exact bento spans
# Proyecto 1: Meta human (2x2)
html = html.replace(
    '<div class="proyecto-horizontal-card full-width-grid-item fade-in">\\n                        <div class="browser-mockup">\\n                            <div class="browser-header">\\n                                <div class="dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>\\n                            </div>\\n                            <div class="browser-screen">\\n                                <video src="Multimedia/Videos/Muestra meta human.mp4" poster="Multimedia/Videos/Portadas/Metta.png" playsinline loop muted controls></video>\\n                            </div>\\n                        </div>\\n                        <div class="horizontal-card-content">',
    '<div class="bento-item bento-2x2 glass-panel fade-in">\\n                        <div class="bento-media">\\n                                <video src="Multimedia/Videos/Muestra meta human.mp4" poster="Multimedia/Videos/Portadas/Metta.png" playsinline loop muted controls></video>\\n                        </div>\\n                        <div class="bento-content">'
)

# Proyecto 2: Comic Interactivo (2x2)
html = html.replace(
    '<div class="proyecto-galeria-card full-width-grid-item fade-in">\\n                        <div class="gallery-frame-mockup">\\n                            <div class="gallery-inner-container">\\n                                <div class="gallery-carousel-column">\\n                                    <div id="comic-splide" class="splide">\\n                                        <div class="splide__track">\\n                                            <ul class="splide__list">\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/001.png" alt="Portada"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/002.png" alt="Página 1"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/003.png" alt="Página 2"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/004.png" alt="Página 3"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/005.png" alt="Página 4"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/006.png" alt="Página 5"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/007.png" alt="Página 6"></li>\\n                                            </ul>\\n                                        </div>\\n                                    </div>\\n                                </div>\\n                                <div class="gallery-description-column">',
    '<div class="bento-item bento-2x2 glass-panel fade-in">\\n                        <div class="bento-media">\\n                                    <div id="comic-splide" class="splide">\\n                                        <div class="splide__track">\\n                                            <ul class="splide__list">\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/001.png" alt="Portada"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/002.png" alt="Página 1"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/003.png" alt="Página 2"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/004.png" alt="Página 3"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/005.png" alt="Página 4"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/006.png" alt="Página 5"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Comic/007.png" alt="Página 6"></li>\\n                                            </ul>\\n                                        </div>\\n                                    </div>\\n                        </div>\\n                        <div class="bento-content">'
)
# Close end tags that were changed
html = html.replace('</div>\\n                            </div>\\n                        </div>\\n                    </div>', '</div>\\n                    </div>') # Gallery end cleanup generic

# Proyecto 3: Galería Renders (2x2)
# Here the description is FIRST, then carousel. For our Bento, we want bento-media first usually, or just keep order. Let's force media first for consistency.
p3_old = '''<div class="proyecto-galeria-card full-width-grid-item fade-in">\\n                        <div class="gallery-frame-mockup">\\n                            <div class="gallery-inner-container">\\n                                <div class="gallery-description-column">'''
p3_mid = '''</div>\\n                                <div class="gallery-carousel-column">\\n                                    <div id="renders-carrusel" class="splide">\\n                                        <div class="splide__track">\\n                                            <ul class="splide__list">\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Diseno.png" alt="Diseño intimidación por identidad de genero"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/MonstruoSISI.png" alt="Render de perfil de criatura"></li>\\n                                                <li class="splide__slide"><img src="Multimedia/Render 3d/Monstruo lateral.png" alt="Render lateral de criatura"></li>\\n                                            </ul>\\n                                        </div>\\n                                    </div>\\n                                </div>\\n                            </div>\\n                        </div>\\n                    </div>'''

# Let's extract the description part to reorder
desc_match = re.search(r'(<span class="category".*?</p>)', html, re.DOTALL)
# It is better to use careful replace for P3
m3 = re.search(r'<div class="proyecto-galeria-card full-width-grid-item fade-in">.*?<div class="gallery-description-column">(.*?)</div>.*?<div id="renders-carrusel" class="splide">(.*?)</div>\s*</div>\s*</div>\s*</div>\s*</div>', html, re.DOTALL)
if m3:
    p3_content = m3.group(1).strip()
    p3_media = '<div id="renders-carrusel" class="splide">' + m3.group(2) + '</div>'
    new_p3 = f\'\'\'<div class="bento-item bento-2x2 glass-panel fade-in">
                        <div class="bento-media">
                            {p3_media}
                        </div>
                        <div class="bento-content">
                            {p3_content}
                        </div>
                    </div>\'\'\'
    html = html[:m3.start()] + new_p3 + html[m3.end():]

# Proyecto 4 & 5: Video Vertical (1x2)
def replace_video_card(match):
    video_tag = match.group(1).strip()
    content = match.group(2).strip()
    return f\'\'\'<div class="bento-item bento-1x2 glass-panel fade-in">
                        <div class="bento-media">
                            {video_tag}
                        </div>
                        <div class="bento-content">
                            {content}
                        </div>
                    </div>\'\'\'

html = re.sub(r'<div class="proyecto-video-card fade-in">\s*<div class="phone-mockup">\s*<div class="phone-screen">\s*(<video.*?>.*?</video>)\s*</div>\s*</div>\s*<div class="video-card-content">\s*(.*?)\s*</div>\s*</div>', replace_video_card, html, flags=re.DOTALL)

# Proyecto 6, 7, 8: Video Horizontal (2x1)
def replace_horizontal_card(match):
    video_tag = match.group(1).strip()
    content = match.group(2).strip()
    return f\'\'\'<div class="bento-item bento-2x1 glass-panel fade-in">
                        <div class="bento-media">
                            {video_tag}
                        </div>
                        <div class="bento-content">
                            {content}
                        </div>
                    </div>\'\'\'

html = re.sub(r'<div class="proyecto-horizontal-card full-width-grid-item fade-in">\s*<div class="browser-mockup">.*?<div class="browser-screen">\s*(<video.*?>.*?</video>)\s*</div>\s*</div>\s*<div class="horizontal-card-content">\s*(.*?)\s*</div>\s*</div>', replace_horizontal_card, html, flags=re.DOTALL)

# Proyecto 9 & 10: Galleries
def replace_gallery_card(match):
    col1 = match.group(1)
    col2 = match.group(2)
    # The gallery cards either have carousel first and description second, or vice versa
    # Let's find out which is which by checking contents
    if 'class="splide"' in col1:
        media = col1
        content = col2
    else:
        media = col2
        content = col1
        
    return f\'\'\'<div class="bento-item bento-2x2 glass-panel fade-in">
                        <div class="bento-media">
{media.strip()}
                        </div>
                        <div class="bento-content">
{content.strip()}
                        </div>
                    </div>\'\'\'

html = re.sub(r'<div class="proyecto-galeria-card full-width-grid-item fade-in">\s*<div class="gallery-frame-mockup">\s*<div class="gallery-inner-container">\s*<div class="[^"]+">\s*(.*?)\s*</div>\s*<div class="[^"]+">\s*(.*?)\s*</div>\s*</div>\s*</div>\s*</div>', replace_gallery_card, html, flags=re.DOTALL)


# SOBRE MI Section Redesign
# Change bio container
html = html.replace('<div class="bio-container fade-in">', '<div class="sobre-mi-container fade-in">\\n                            <div class="bio-card glass-panel bento-2x2">')
html = html.replace('<div class="bio-photo-wrapper">', '<div class="bio-header">')
html = html.replace('</div>\\n                            <div class="bio-text-wrapper">', '')

html = html.replace('<div class="tools-subsection fade-in">', '</div>\\n                            <div class="tools-card glass-panel bento-2x2">')
html = html.replace('<div class="sobre-mi-tools-grid">', '<div class="tools-grid-bento">')
html = html.replace('<div class="tool-card">', '<div class="tool-bento">')


# Contacto Section Redesign
html = html.replace('<form id="contact-form" class="contact-form fade-in" action', '<div class="contact-container glass-panel fade-in bento-2x2">\\n                    <form id="contact-form" class="contact-form" action')
html = html.replace('</form>\\n                </div>\\n                </section>', '</form>\\n                    </div>\\n                </div>\\n                </section>')

# Write text
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML transformations saved.")
