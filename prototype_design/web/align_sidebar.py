import os
import re

# Read dashboard.html
with open('dashboard.html', 'r', encoding='utf-8') as f:
    dashboard_html = f.read()

# Make sure dashboard's sidebar has href="ai-chat.html" instead of "ai-assistant.html"
dashboard_html = dashboard_html.replace('href="ai-assistant.html"', 'href="ai-chat.html"')

sidebar_match = re.search(r'(<aside class="sidebar">.*?</aside>)', dashboard_html, re.DOTALL)
if not sidebar_match:
    print("Could not find sidebar in dashboard.html")
    exit(1)

dashboard_sidebar_html = sidebar_match.group(1)

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<aside class="sidebar"' not in content:
        print(f"Skipping {filename} - no sidebar found.")
        continue

    # Remove active class everywhere inside the copied sidebar and href fixes
    custom_sidebar = dashboard_sidebar_html
    custom_sidebar = re.sub(r'(<a\s+href="[^"]+"\s+class="nav-item)\s+active(")', r'\1\2', custom_sidebar)
    
    # Add active class for the specific filename
    # Special cases:
    match_filename = filename
    if filename == 'profile.html': # profile has no sidebar link, it has user profile link
        pass
    else:
        # We look for <a href="filename"... and add active
        pattern = r'(<a\s+href=")' + re.escape(filename) + r'("\s+class="nav-item)(")'
        custom_sidebar = re.sub(pattern, r'\1' + filename + r'\2 active\3', custom_sidebar)
        
    # Now replace the existing sidebar in the file
    new_content = re.sub(r'<aside class="sidebar">.*?</aside>', custom_sidebar.replace('\\', '\\\\'), content, flags=re.DOTALL)
    
    # Also standardize font-weight for .sidebar-logo h1 in CSS
    if '.sidebar-logo h1 {' in new_content and 'font-weight: 700;' not in new_content:
        new_content = re.sub(r'(\.sidebar-logo h1\s*\{[^\}]+?)(?=\})', r'\1\n            font-weight: 700;', new_content)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {filename}")

print("Done.")
