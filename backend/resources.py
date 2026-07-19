"""
Digital Wellbeing Coach — Resource library and SHAP template sentences.

All 21 resource entries are verified real resources accessible to university
students in Kigali, Rwanda. Last verified: June 2026.

SHAP_TEMPLATES: maps feature names to plain-language coaching sentences
                shown to users on the results dashboard.

RECOMMENDATIONS: maps addiction category to a list of resource dicts.
                 Categories: Social Media, Gaming, Streaming, General
"""

SHAP_TEMPLATES = {
    'Q1':                 "Missing planned work due to smartphone use is a key driver of your risk score.",
    'Q2':                 "Difficulty concentrating on academic work because of your phone is significantly increasing your risk.",
    'Q3':                 "Physical discomfort (wrist or neck pain) from phone use is contributing to your score.",
    'Q4':                 "Feeling unable to go without your smartphone is a strong indicator of dependency.",
    'Q5':                 "Feeling impatient or anxious when not holding your phone is a key risk factor.",
    'Q6':                 "Having your phone on your mind even when not using it is contributing to your risk.",
    'Q7':                 "Your sense that you would never give up your phone despite its impact is a significant risk indicator.",
    'Q8':                 "Constantly checking social media so as not to miss conversations is elevating your risk score.",
    'Q9':                 "Using your phone longer than you planned is one of the strongest contributors to your score.",
    'Q10':                "Others noticing and commenting on your phone use is a meaningful risk signal.",
    'sas_total':          "Your overall SAS-SV score is the primary driver of your addiction risk level.",
    'usage_duration':     "The total number of hours you spend on your phone each day is a key risk factor.",
    'social_media_usage': "Your social media usage patterns are contributing to your risk score.",
    'frequent_access':    "The type of content you access most frequently is influencing your risk level.",
    'age':                "Your age group is a contextual factor in your overall risk profile.",
    'gender_encoded':     "Your gender is a contextual factor considered in your risk assessment.",
}

RECOMMENDATIONS: dict[str, list[dict]] = {

    "Social Media": [
        {
            "title": "Between The Covers Book Club",
            "description": "Community book club primarily attended by university students in Kigali. Social, offline, and screen-free — a direct substitute for social scrolling.",
            "type": "Community book club",
            "cost": "Free",
            "how_to_access": "Instagram: @betweenthecovers5",
        },
        {
            "title": "Kira Art Therapy Hub",
            "description": "Combines mental health support with art-based creative expression. Particularly relevant for high social media users experiencing stress or anxiety.",
            "type": "Mental health and creative expression",
            "cost": "Varies",
            "how_to_access": "kiraapp.org — +250 785 774 717 — Kiraarttherapyhub@gmail.com",
        },
        {
            "title": "Letterboxd",
            "description": "Turn passive social media scrolling into intentional film engagement. Log films, write reviews, and connect with a community around cinema.",
            "type": "Online community",
            "cost": "Free",
            "how_to_access": "letterboxd.com",
        },
        {
            "title": "OceanPDF",
            "description": "Replace mindless scrolling with reading. Free books downloadable in PDF and ePUB — works offline with no account needed.",
            "type": "Free book library",
            "cost": "Free",
            "how_to_access": "oceanofpdf.com",
        },
        {
            "title": "Weaving or artisanal soap making workshop",
            "description": "Hands-on craft workshop in Kigali — social, tactile, offline, and screen-free. A direct replacement for time spent scrolling.",
            "type": "Hands-on workshop",
            "cost": "Low cost",
            "how_to_access": "Search 'classes and workshops' on tripadvisor.com/Attractions-g293829-Activities-c56-Kigali",
        },
    ],

    "Gaming": [
        {
            "title": "Scrimba",
            "description": "Interactive coding courses that redirect gaming energy into building real technical skills. Used by developers worldwide.",
            "type": "Online learning",
            "cost": "Free / paid tiers",
            "how_to_access": "scrimba.com",
        },
        {
            "title": "Udemy",
            "description": "Hundreds of skill-based online courses across technology, design, business, and more.",
            "type": "Online learning",
            "cost": "Free / paid courses",
            "how_to_access": "udemy.com",
        },
        {
            "title": "Pottery or painting workshop in Kigali",
            "description": "Tactile, hands-on craft workshop. Social, screen-free, and affordable for students.",
            "type": "Hands-on workshop",
            "cost": "Low cost",
            "how_to_access": "Search 'classes and workshops' on tripadvisor.com/Attractions-g293829-Activities-c56-Kigali",
        },
        {
            "title": "OceanPDF",
            "description": "Free downloadable books in PDF and ePUB format. Works offline — a productive screen-free alternative.",
            "type": "Free book library",
            "cost": "Free",
            "how_to_access": "oceanofpdf.com",
        },
        {
            "title": "Kira Art Therapy Hub",
            "description": "Creative expression as a healthy redirect for compulsive gaming patterns. Art-based therapy with trained professionals.",
            "type": "Mental health and creative expression",
            "cost": "Varies",
            "how_to_access": "kiraapp.org — +250 785 774 717",
        },
    ],

    "Streaming": [
        {
            "title": "Letterboxd",
            "description": "Redirect passive streaming into intentional, curated film engagement. Rate films, write reviews, follow friends.",
            "type": "Online film community",
            "cost": "Free",
            "how_to_access": "letterboxd.com",
        },
        {
            "title": "OceanPDF",
            "description": "Replace passive background streaming with active reading. Free books downloadable offline.",
            "type": "Free book library",
            "cost": "Free",
            "how_to_access": "oceanofpdf.com",
        },
        {
            "title": "Udemy",
            "description": "Replace background streaming with structured, goal-oriented learning courses.",
            "type": "Online learning",
            "cost": "Free / paid courses",
            "how_to_access": "udemy.com",
        },
        {
            "title": "Pottery or painting workshop in Kigali",
            "description": "Active creative engagement as a hands-on alternative to passive video consumption.",
            "type": "Hands-on workshop",
            "cost": "Low cost",
            "how_to_access": "Search 'classes and workshops' on tripadvisor.com/Attractions-g293829-Activities-c56-Kigali",
        },
        {
            "title": "Kira Art Therapy Hub",
            "description": "Art-based therapy as a structured, meaningful alternative to passive streaming patterns.",
            "type": "Mental health and creative expression",
            "cost": "Varies",
            "how_to_access": "kiraapp.org — +250 785 774 717",
        },
    ],

    "General": [
        {
            "title": "Kira Art Therapy Hub",
            "description": "Primary mental health resource — art-based therapy combining professional support with creative expression. Recommended for high and severe risk users.",
            "type": "Mental health — primary resource",
            "cost": "Varies",
            "how_to_access": "kiraapp.org — +250 785 774 717 — Kiraarttherapyhub@gmail.com",
        },
        {
            "title": "Scrimba",
            "description": "Redirect compulsive phone use into building real technical skills through interactive coding courses.",
            "type": "Online learning",
            "cost": "Free / paid tiers",
            "how_to_access": "scrimba.com",
        },
        {
            "title": "Weaving or artisanal soap making workshop",
            "description": "Hands-on craft workshop — social, tactile, offline, and screen-free. Affordable for students.",
            "type": "Hands-on workshop",
            "cost": "Low cost",
            "how_to_access": "Search 'classes and workshops' on tripadvisor.com/Attractions-g293829-Activities-c56-Kigali",
        },
        {
            "title": "OceanPDF",
            "description": "Reduce overall screen time through offline reading. Free books downloadable in PDF and ePUB.",
            "type": "Free book library",
            "cost": "Free",
            "how_to_access": "oceanofpdf.com",
        },
    ],
}