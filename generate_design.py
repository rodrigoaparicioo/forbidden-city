import json

with open('/Users/rodri/.gemini/antigravity/brain/cd7f36b9-9125-4779-be93-a3db916b98c3/.system_generated/steps/53/output.txt', 'r') as f:
    data = json.load(f)

project = data['projects'][0]
design_theme = project['designTheme']
design_md = design_theme['designMd']

with open('/Users/rodri/Downloads/forbidden-city/DESIGN.md', 'w') as f:
    f.write(design_md)
    f.write('\n\n---\n\n## 7. Auto-Generated Tokens\n')
    
    f.write('### Fonts\n')
    f.write(f"- Headline: `{design_theme.get('headlineFont')}`\n")
    f.write(f"- Body: `{design_theme.get('bodyFont')}`\n")
    f.write(f"- Label: `{design_theme.get('labelFont')}`\n\n")

    f.write('### Core Colors\n')
    for key, value in design_theme.get('namedColors', {}).items():
        f.write(f"- **{key}**: `{value}`\n")

print("Generated DESIGN.md successfully.")
