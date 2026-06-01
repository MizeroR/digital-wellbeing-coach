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
            "title": "Kigali Public Library Study Sessions",
            "description": "Join structured study groups at the Kigali Public Library — focused, offline, and social.",
            "location": "Kiyovu, Kigali",
        },
        {
            "title": "KLab Community Meetups",
            "description": "Attend in-person tech and innovation events at Rwanda's leading startup hub.",
            "location": "Kacyiru, Kigali",
        },
        {
            "title": "Nyamirambo Walking Tour",
            "description": "Explore Kigali's oldest and most vibrant neighbourhood on foot — no screen needed.",
            "location": "Nyamirambo, Kigali",
        },
        {
            "title": "Inema Arts Center Workshops",
            "description": "Join creative workshops in painting, dance, or drumming at Kigali's top arts venue.",
            "location": "Kacyiru, Kigali",
        },
        {
            "title": "Kigali Toastmasters Club",
            "description": "Practice public speaking and leadership in a weekly in-person group setting.",
            "location": "Central Kigali",
        },
        {
            "title": "Stade Amahoro Recreational Sports",
            "description": "Play football or volleyball at the public grounds around Amahoro Stadium — free and social.",
            "location": "Remera, Kigali",
        },
        {
            "title": "Kigali Genocide Memorial Reflection Walk",
            "description": "A guided walk grounded in community history — deeply restorative and phone-free.",
            "location": "Gisozi, Kigali",
        },
    ],
    "Gaming": [
        {
            "title": "Chess Club at Kigali Public Library",
            "description": "Redirect strategic thinking into offline chess — weekly sessions, all levels welcome.",
            "location": "Kiyovu, Kigali",
        },
        {
            "title": "Kigali Cycling Club Sunday Rides",
            "description": "Free Sunday morning group rides through Kigali's hills — no experience required.",
            "location": "Departures from Kimihurura",
        },
        {
            "title": "Outdoor Basketball at Kimihurura Court",
            "description": "Free public court — drop-in games run most evenings and weekends.",
            "location": "Kimihurura, Kigali",
        },
        {
            "title": "RwandaCode Coding Project",
            "description": "Channel your problem-solving energy into a structured coding project with peers at RwandaCode.",
            "location": "Kigali Innovation City",
        },
        {
            "title": "Rebero Hill Hike",
            "description": "Hike Rebero Hill for panoramic city views — a physically rewarding offline challenge.",
            "location": "Rebero, Kigali",
        },
        {
            "title": "Kigali Innovation City Sports Courts",
            "description": "Multi-sport recreational facilities open to university students on weekends.",
            "location": "Kigali Innovation City",
        },
        {
            "title": "Community Volleyball",
            "description": "Open community volleyball games most afternoons — great way to meet people and move.",
            "location": "Community centres, Kigali",
        },
    ],
    "Streaming": [
        {
            "title": "Goethe Institut Kigali Film Screenings",
            "description": "Quality international cinema in a social setting — a curated offline watching experience.",
            "location": "Kiyovu, Kigali",
        },
        {
            "title": "TPAF Live Performances",
            "description": "Attend live theatre, dance, or music at the Théâtre de la Paix in central Kigali.",
            "location": "Central Kigali",
        },
        {
            "title": "Rwanda Cultural Village",
            "description": "Experience traditional Rwandan dance, storytelling, and music performed live.",
            "location": "Kacyiru, Kigali",
        },
        {
            "title": "Kigali Jazz Junction Events",
            "description": "Live jazz and acoustic music events held regularly at Kigali venues.",
            "location": "Various, Kigali",
        },
        {
            "title": "Photography Walk in Kimironko Market",
            "description": "Kimironko market is one of Kigali's most visually rich environments — bring a camera.",
            "location": "Kimironko, Kigali",
        },
        {
            "title": "Inema Arts Center Open Studio",
            "description": "Drop into an open studio session — paint, draw, or observe local artists at work.",
            "location": "Kacyiru, Kigali",
        },
        {
            "title": "Sundowner Concerts at Kigali Heights",
            "description": "Live music sundowner events at Kigali Heights rooftop — a social, screen-free evening.",
            "location": "Kimihurura, Kigali",
        },
    ],
    "General": [
        {
            "title": "Volunteer with a Kigali NGO",
            "description": "Give 2 hours a week to a local cause — check the Kigali City volunteer noticeboard for listings.",
            "location": "Various, Kigali",
        },
        {
            "title": "Kigali Cycling Club Sunday Rides",
            "description": "Free Sunday morning group rides through Kigali's hills — no experience required.",
            "location": "Departures from Kimihurura",
        },
        {
            "title": "Language Exchange Group",
            "description": "Join a French–Kinyarwanda–English language exchange group — social, structured, phone-free.",
            "location": "Central Kigali",
        },
        {
            "title": "Sunday Farmer's Market, Kimironko",
            "description": "A lively weekend market — great for offline socialising, local produce, and artisan crafts.",
            "location": "Kimironko, Kigali",
        },
        {
            "title": "Kigali Genocide Memorial",
            "description": "An important site for reflection and community connection — spend a quiet morning here.",
            "location": "Gisozi, Kigali",
        },
        {
            "title": "Nyamirambo Women's Centre Tour",
            "description": "Book a cultural tour run by local women — a meaningful, offline community experience.",
            "location": "Nyamirambo, Kigali",
        },
        {
            "title": "MTN Community Sports Days",
            "description": "Free public fitness and sports events hosted at various Kigali venues throughout the year.",
            "location": "Various, Kigali",
        },
    ],
}
