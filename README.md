My dog project 2.0
# Little Dog — a mobile-first interactive web experience with custom text layout

Little Dog is a mobile-first interactive web application designed as a warm, emotionally-aware space on the internet. It combines conversational UI, micro-interactions, and time-based behavior to simulate a gentle companion experience.

A key technical aspect of this project is the use of Pretext for precise text layout and rendering control.

Instead of relying on default browser text flow, the chat system uses Pretext to compute layout explicitly:

- Text is preprocessed using `prepareWithSegments` for efficient layout reuse  
- Line-breaking is computed using `layoutWithLines`, ensuring deterministic wrapping  
- Chat bubble width is dynamically calculated via a custom algorithm that finds the minimal width while preserving line count  

This results in visually balanced message bubbles with consistent rhythm and spacing.

This approach allows the UI to avoid common issues such as uneven wrapping, overly long lines, or inconsistent spacing across languages.

## Features

- Mobile-first layout simulating a native app container  
- Conversational interaction system with dynamic responses  
- Micro-interactions and hidden triggers (hover, click, idle states)  
- Time-based state transitions (day/night mode)  
- Bilingual support (English / Chinese) with consistent tone  

## Design Philosophy

The result is an experience where text layout is treated as part of the interaction design, not just content rendering.