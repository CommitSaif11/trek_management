/* TrekAI - Sample / hardcoded data (frontend prototype only) */

const TREK_DATA = {
  stats: [
    { id: "trekkers", label: "Active Trekkers", value: 428, suffix: "", delta: "+12.4%", trend: "up", icon: "users", note: "vs last month" },
    { id: "upcoming", label: "Upcoming Treks", value: 16, suffix: "", delta: "+4", trend: "up", icon: "calendar", note: "next 30 days" },
    { id: "safe", label: "Safe Completions", value: 137, suffix: "", delta: "100%", trend: "flat", icon: "shield", note: "zero incidents" },
    { id: "distance", label: "Distance Covered", value: 2940, suffix: " km", delta: "+310 km", trend: "up", icon: "route", note: "this season" }
  ],

  upcomingTreks: [
    { name: "Skandagiri Sunrise Trek", region: "Chikkaballapur, KA", date: "18 Oct 2026", spots: 24, filled: 21, level: "Easy", status: "Almost Full", img: "skandagiri" },
    { name: "Kudremukh Peak Trek", region: "Chikkamagaluru, KA", date: "26 Oct 2026", spots: 30, filled: 18, level: "Moderate", status: "Open", img: "kudremukh" },
    { name: "Kumara Parvatha Trek", region: "Kodagu, KA", date: "08 Nov 2026", spots: 25, filled: 25, level: "Difficult", status: "Full", img: "kumaraparvatha" },
    { name: "Tadiandamol Day Trek", region: "Kodagu, KA", date: "15 Nov 2026", spots: 40, filled: 27, level: "Moderate", status: "Open", img: "tadiandamol" },
    { name: "Wayanad Edakkal Trail", region: "Wayanad, Kerala", date: "29 Nov 2026", spots: 35, filled: 12, level: "Easy", status: "Open", img: "wayanad" }
  ],

  activity: [
    { type: "join", text: "28 new registrations for Skandagiri Sunrise Trek", time: "12 min ago", actor: "Booking Engine" },
    { type: "safety", text: "Pre-trek fitness verification completed for Batch K-14", time: "48 min ago", actor: "Safety Bot" },
    { type: "ai", text: "AI rescheduled Kodachadri trek due to heavy rainfall alert", time: "2 hours ago", actor: "TrekAI Engine" },
    { type: "gear", text: "Gear inventory synced - 6 tents returned after Kudremukh recce", time: "4 hours ago", actor: "Logistics" },
    { type: "member", text: "Ananya Rao completed Trek Leader Level-2 certification", time: "Yesterday", actor: "Team" },
    { type: "medical", text: "First-aid kits restocked for 3 upcoming batches", time: "Yesterday", actor: "Safety Bot" }
  ],

  participation: [
    { trek: "Skandagiri", registered: 412, confirmed: 365, waitlist: 47 },
    { trek: "Kudremukh", registered: 386, confirmed: 301, waitlist: 85 },
    { trek: "Kumara Parvatha", registered: 344, confirmed: 296, waitlist: 48 },
    { trek: "Tadiandamol", registered: 301, confirmed: 244, waitlist: 57 },
    { trek: "Kodachadri", registered: 268, confirmed: 209, waitlist: 59 },
    { trek: "Wayanad", registered: 233, confirmed: 187, waitlist: 46 },
    { trek: "Savandurga", registered: 458, confirmed: 421, waitlist: 37 },
    { trek: "Ramanagara", registered: 397, confirmed: 372, waitlist: 25 }
  ],

  safety: {
    score: 96,
    metrics: [
      { label: "Incident-Free Days", value: "412", icon: "shield", tone: "success" },
      { label: "Gear Inspections Passed", value: "98%", icon: "check", tone: "success" },
      { label: "Medical Kits Ready", value: "24/24", icon: "firstaid", tone: "success" },
      { label: "Pending Fitness Checks", value: "7", icon: "alert", tone: "warning" }
    ],
    alerts: [
      { level: "high", text: "Heavy rainfall expected in Kodagu district (02-04 Nov). Kumara Parvatha route flagged." },
      { level: "medium", text: "7 trekkers pending fitness declaration for Tadiandamol batch." },
      { level: "low", text: "Savandurga trail lighting equipment due for replacement." }
    ]
  },

  aiInsights: [
    {
      title: "Shift Kudremukh start time by 30 minutes",
      body: "Historical data from 14 batches shows a 30-minute earlier start reduces summit congestion by 42% and lowers missed-return risk.",
      confidence: 92,
      tag: "Planning",
      icon: "spark"
    },
    {
      title: "Waitlist conversion is weakest on Kodachadri",
      body: "59 waitlisted trekkers but only 78% confirm. A reminder with cost-split details is projected to recover ~11 seats.",
      confidence: 87,
      tag: "Engagement",
      icon: "trend"
    },
    {
      title: "Allocate 2 extra medics to Kumara Parvatha",
      body: "Difficulty rating is Difficult and the batch is at 100% capacity. Predicted medical-support load exceeds the standard ratio.",
      confidence: 95,
      tag: "Safety",
      icon: "firstaid"
    }
  ],

  insightPool: [
    {
      title: "Bundle Savandurga with Ramanagara",
      body: "Both routes sit within 60 km of Bengaluru. A combined weekend package is projected to raise seat fill rate by 18%.",
      confidence: 84,
      tag: "Planning",
      icon: "trend"
    },
    {
      title: "Open a waitlist slot for Tadiandamol",
      body: "13 confirmed cancellations are statistically likely in the final week based on the last 6 batches.",
      confidence: 81,
      tag: "Engagement",
      icon: "users"
    },
    {
      title: "Move beginners away from Kumara Parvatha",
      body: "First-time trekkers on Difficult routes show a 2.4x higher drop-off. Redirect them to Skandagiri or Wayanad.",
      confidence: 90,
      tag: "Safety",
      icon: "shield"
    },
    {
      title: "Pre-position a medic at Kodachadri base",
      body: "Trail elevation gain plus historic heat index in November suggests a base-camp medical point is optimal.",
      confidence: 88,
      tag: "Safety",
      icon: "firstaid"
    },
    {
      title: "Send gear checklist 5 days earlier",
      body: "Late gear checks are the top cause of batch delays in your sample history - 3 of 42 batches affected.",
      confidence: 86,
      tag: "Operations",
      icon: "backpack"
    }
  ],

  participationSummary: [
    { label: "Confirmed Seats", value: 2395, color: "primary" },
    { label: "Waitlisted", value: 404, color: "accent" },
    { label: "Batches Run", value: 42, color: "success" },
    { label: "Repeat Trekkers", value: "61%", color: "warning" }
  ]
};

/* =========================================================
   TREK CATALOGUE (drives Explore, Planner, Safety Analyzer)
   ========================================================= */

const TREKS = [
  {
    id: "skandagiri",
    name: "Skandagiri",
    location: "Chikkaballapur, Karnataka",
    state: "Karnataka",
    region: "Bengaluru Region",
    difficulty: "Easy",
    durationLabel: "1 day",
    durationKey: "day",
    durationNote: "Night trek / 8-9 hrs",
    distance: "5.5 km",
    elevation: "1,587 m",
    elevationGain: "450 m",
    rating: 4.7,
    reviews: 312,
    price: "Rs.1,499",
    season: "Oct - Feb",
    thumb: "skandagiri",
    prefs: ["Sunrise", "Night Trek", "Beginner Friendly"],
    summary: "A legendary pre-dawn hike above the clouds - start at midnight, reach the ridge by sunrise over Nandi Hills.",
    highlights: ["Sunrise above the cloud line", "Ruined fort history", "Short, beginner-friendly climb"],
    itinerary: [
      { day: "Leg 1", time: "22:30", title: "Report and gear check", desc: "Assemble at Chikkaballapur base, ID verification, torch and layer check." },
      { day: "Leg 2", time: "23:30", title: "Begin ascent", desc: "Steady 450 m climb through scrub forest with two guided rest stops." },
      { day: "Leg 3", time: "05:00", title: "Summit ridge", desc: "Reach the fort ruins, hot drinks and sunrise at 06:05." },
      { day: "Leg 4", time: "08:30", title: "Descent and wrap-up", desc: "Down the same trail, breakfast at base camp, trek debrief." }
    ],
    equipment: ["Torch + spare batteries", "Layered clothing", "2 L water", "Trekking shoes with grip", "Rain cover", "Snacks / energy bars"],
    safetyTips: ["Never attempt without a guide - the trail is easy to lose at night", "Carry a headlamp, phone light is not enough", "Wind chill on the ridge drops sharply before sunrise"],
    analysis: {
      score: 84, risk: "Low",
      factors: [
        { label: "Weather", rating: "Favourable", tone: "success", note: "Oct-Feb mornings are clear; light wind at the ridge." },
        { label: "Terrain", rating: "Easy", tone: "success", note: "Rocky footpath with loose gravel on the final 200 m." },
        { label: "Elevation Risk", rating: "Low", tone: "success", note: "1,587 m - no altitude illness expected." },
        { label: "Trail Accessibility", rating: "Good", tone: "success", note: "Marked trail, single entry point, gate closes 02:00." },
        { label: "Emergency Accessibility", rating: "Moderate", tone: "warning", note: "Nearest trauma centre 14 km away in Chikkaballapur." },
        { label: "Water Availability", rating: "Scarce", tone: "warning", note: "No water on trail - carry full 2 L per person." }
      ],
      precautions: ["Start with a certified night-trek guide", "Fix a turnaround time at the ridge", "Keep the group in a single file above the treeline"]
    }
  },
  {
    id: "kudremukh",
    name: "Kudremukh",
    location: "Chikkamagaluru, Karnataka",
    state: "Karnataka",
    region: "Western Ghats",
    difficulty: "Moderate",
    durationLabel: "2 days",
    durationKey: "multi",
    durationNote: "Weekend / 22 km",
    distance: "22 km",
    elevation: "1,892 m",
    elevationGain: "900 m",
    rating: 4.8,
    reviews: 458,
    price: "Rs.3,499",
    season: "Sep - Feb",
    thumb: "kudremukh",
    prefs: ["Summit", "Valley Views", "Camping"],
    summary: "Rolling shola grasslands and a horse-head shaped peak - the classic Western Ghats ridge walk.",
    highlights: ["Horse-head summit ridge", "Shola grassland traverse", "Overnight camp by the stream"],
    itinerary: [
      { day: "Day 1", time: "07:00", title: "Drive to base", desc: "Bengaluru to Kudremukh village transfer, breakfast and permit check." },
      { day: "Day 1", time: "10:30", title: "Trek to forest camp", desc: "9 km through shola forest, stream crossings, pitch camp at 1,300 m." },
      { day: "Day 1", time: "17:00", title: "Camp and survival session", desc: "Evening tea, basic knot and navigation session, early dinner." },
      { day: "Day 2", time: "05:30", title: "Summit push", desc: "3.5 hr climb to the 1,892 m ridge, breakfast with panoramic views." },
      { day: "Day 2", time: "13:00", title: "Descend and depart", desc: "Return to base, lunch, drive back to Bengaluru by 21:00." }
    ],
    equipment: ["40 L backpack", "Trekking poles", "2 L water + purification tablets", "Warm layer / fleece", "Sleeping bag (camp)", "Headlamp"],
    safetyTips: ["Leeches are common Sep-Nov - carry salt and full-length pants", "Do not leave the ridge path, drops are steep on both sides", "Register at the forest check-post before entering"],
    analysis: {
      score: 76, risk: "Moderate",
      factors: [
        { label: "Weather", rating: "Variable", tone: "warning", note: "Sudden mist and showers even in the dry season." },
        { label: "Terrain", rating: "Moderate", tone: "warning", note: "900 m continuous gain with slippery grassland sections." },
        { label: "Elevation Risk", rating: "Low", tone: "success", note: "1,892 m - well below altitude-sickness threshold." },
        { label: "Trail Accessibility", rating: "Good", tone: "success", note: "Well-used trail, forest check-post at entry." },
        { label: "Emergency Accessibility", rating: "Difficult", tone: "danger", note: "No motorable road above camp; evacuation on foot only." },
        { label: "Water Availability", rating: "Plentiful", tone: "success", note: "Two stream crossings; treat all water before drinking." }
      ],
      precautions: ["Carry a satellite-enabled emergency contact", "Start summit push before 06:00 to beat afternoon mist", "Two guides minimum for groups above 15"]
    }
  },
  {
    id: "kumara-parvatha",
    name: "Kumara Parvatha",
    location: "Kodagu, Karnataka",
    state: "Karnataka",
    region: "Western Ghats",
    difficulty: "Difficult",
    durationLabel: "2 days",
    durationKey: "multi",
    durationNote: "Weekend / 29 km",
    distance: "29 km",
    elevation: "1,712 m",
    elevationGain: "1,150 m",
    rating: 4.6,
    reviews: 274,
    price: "Rs.3,999",
    season: "Oct - Mar",
    thumb: "kumaraparvatha",
    prefs: ["Summit", "Challenging", "Camping"],
    summary: "Karnataka's toughest popular peak - a long, relentless climb from Subramanya to the Pushpagiri ridge.",
    highlights: ["1,150 m sustained ascent", "Bhattara Kallu rock face", "Panoramic Pushpagiri views"],
    itinerary: [
      { day: "Day 1", time: "06:00", title: "Base at Subramanya", desc: "Permit, fitness screening and kit inspection at the forest office." },
      { day: "Day 1", time: "08:00", title: "Long climb to Bhattara Kallu", desc: "12 km relentless ascent, two water points, lunch en route." },
      { day: "Day 1", time: "16:00", title: "Camp at 1,400 m", desc: "Sheltered camp near the stream; hydration and cramp check." },
      { day: "Day 2", time: "05:00", title: "Summit attempt", desc: "Steep final 3 km to 1,712 m - boulder scrambling near the top." },
      { day: "Day 2", time: "11:00", title: "Begin descent", desc: "Return the same trail, reach Subramanya by 17:00." }
    ],
    equipment: ["50 L backpack", "Trekking poles", "3 L water capacity", "Knee supports", "High-energy food (2 days)", "Personal first-aid kit"],
    safetyTips: ["Only attempt after 2+ preparatory treks", "Turn back by 11:00 if summit not reached", "GP tracks must be downloaded - no network above base"],
    analysis: {
      score: 68, risk: "High",
      factors: [
        { label: "Weather", rating: "Unpredictable", tone: "danger", note: "Fog banks arrive fast after 14:00 on the ridge." },
        { label: "Terrain", rating: "Strenuous", tone: "danger", note: "1,150 m gain with boulder scrambling in the final kilometre." },
        { label: "Elevation Risk", rating: "Moderate", tone: "warning", note: "1,712 m - mild breathlessness possible on the ridge." },
        { label: "Trail Accessibility", rating: "Fair", tone: "warning", note: "Trail forks twice; wrong fork adds 4 km." },
        { label: "Emergency Accessibility", rating: "Poor", tone: "danger", note: "Helicopter-only evacuation above Bhattara Kallu." },
        { label: "Water Availability", rating: "Limited", tone: "warning", note: "One reliable stream on Day 1; none on the summit day." }
      ],
      precautions: ["Mandatory guide and fitness declaration", "Carry emergency bivvy and whistle", "Insurance covering helicopter evacuation recommended"]
    }
  },
  {
    id: "tadiandamol",
    name: "Tadiandamol",
    location: "Kodagu, Karnataka",
    state: "Karnataka",
    region: "Western Ghats",
    difficulty: "Moderate",
    durationLabel: "1 day",
    durationKey: "day",
    durationNote: "Day trek / 6-7 hrs",
    distance: "16 km",
    elevation: "1,748 m",
    elevationGain: "740 m",
    rating: 4.5,
    reviews: 198,
    price: "Rs.2,299",
    season: "Oct - Feb",
    thumb: "tadiandamol",
    prefs: ["Summit", "Valley Views", "Day Trek"],
    summary: "Coorg's highest peak with a gradual grassland climb and a striking monsoon-fed waterfall at the base.",
    highlights: ["Highest point in Coorg", "Shola + grassland mix", "Nalknad Palace stop"],
    itinerary: [
      { day: "Leg 1", time: "07:00", title: "Base briefing", desc: "Meet at Nalknad Palace, permit and pace groups formed." },
      { day: "Leg 2", time: "08:15", title: "Forest climb", desc: "4 km through shola forest to the grassline, first viewpoint." },
      { day: "Leg 3", time: "11:30", title: "Summit ridge", desc: "Open grassland push to 1,748 m, packed lunch at the marker stone." },
      { day: "Leg 4", time: "15:00", title: "Descend", desc: "Same route down, tea at the palace, transfer by 17:30." }
    ],
    equipment: ["Trekking shoes", "1.5 L water", "Packed lunch", "Windcheater", "Trekking poles (optional)", "Cap / sunscreen"],
    safetyTips: ["Grassland is fully exposed - carry sun protection", "Descend before 16:30, mist closes in early", "Do not shortcut through the shola, leeches and thorns"],
    analysis: {
      score: 80, risk: "Low",
      factors: [
        { label: "Weather", rating: "Favourable", tone: "success", note: "Dry window Oct-Feb with fast-clearing morning mist." },
        { label: "Terrain", rating: "Moderate", tone: "warning", note: "740 m gain, loose rock below the grassline." },
        { label: "Elevation Risk", rating: "Low", tone: "success", note: "1,748 m - no acclimatisation needed." },
        { label: "Trail Accessibility", rating: "Very Good", tone: "success", note: "Wide, heavily used trail from the palace." },
        { label: "Emergency Accessibility", rating: "Good", tone: "success", note: "Vehicle track reaches the base; hospital 38 km." },
        { label: "Water Availability", rating: "Moderate", tone: "warning", note: "One spring at 1,200 m; carry 1.5 L minimum." }
      ],
      precautions: ["Apply sunscreen and wear full sleeves", "Keep the group together on the open grassland", "Fixed turnaround time of 14:00 at the summit"]
    }
  },
  {
    id: "kodachadri",
    name: "Kodachadri",
    location: "Shivamogga, Karnataka",
    state: "Karnataka",
    region: "Western Ghats",
    difficulty: "Moderate",
    durationLabel: "2 days",
    durationKey: "multi",
    durationNote: "Weekend / 15 km",
    distance: "15 km",
    elevation: "1,343 m",
    elevationGain: "600 m",
    rating: 4.7,
    reviews: 226,
    price: "Rs.3,199",
    season: "Sep - Mar",
    thumb: "kodachadri",
    prefs: ["Waterfalls", "Forest", "Heritage"],
    summary: "A heritage peak in the Mookambika biosphere - waterfalls, dense forest steps and a stone-chariot summit.",
    highlights: ["Arrow rock viewpoint", "Mookambika temple heritage", "Waterfall detour at the base"],
    itinerary: [
      { day: "Day 1", time: "08:00", title: "Arrive Nagodi base", desc: "Registration, forest permit and waterfall detour." },
      { day: "Day 1", time: "14:00", title: "Forest ascent", desc: "6 km through dense forest to the Plateau, camp setup." },
      { day: "Day 1", time: "18:30", title: "Sunset at Arrow Rock", desc: "Guided walk to the viewpoint, dinner at camp." },
      { day: "Day 2", time: "06:00", title: "Summit and temple", desc: "Climb to the stone chariot and Gopura, breakfast at the top." },
      { day: "Day 2", time: "11:00", title: "Descend", desc: "Reverse route, forest exit by 14:00, drive back." }
    ],
    equipment: ["Waterproof jacket", "Leech socks", "1.5 L water", "Grippy shoes", "Dry bags for electronics", "Snacks for 2 days"],
    safetyTips: ["Leeches are guaranteed in the forest stretch - full-length pants required", "Arrow rock has no railing, keep 3 m back", "Trek is banned during heavy rain days; follow forest office advisory"],
    analysis: {
      score: 72, risk: "Moderate",
      factors: [
        { label: "Weather", rating: "Rain-prone", tone: "danger", note: "Highest rainfall in the set; trail closes on red-alert days." },
        { label: "Terrain", rating: "Moderate", tone: "warning", note: "Stone steps and slick forest floor, 600 m gain." },
        { label: "Elevation Risk", rating: "Low", tone: "success", note: "1,343 m - no altitude concerns." },
        { label: "Trail Accessibility", rating: "Good", tone: "success", note: "Well-marked forest department trail with steps." },
        { label: "Emergency Accessibility", rating: "Fair", tone: "warning", note: "Road access only to base; forest track above." },
        { label: "Water Availability", rating: "Plentiful", tone: "success", note: "Multiple streams, but treat before drinking." }
      ],
      precautions: ["Carry leech socks and a change of socks", "Check forest office status the evening before", "Avoid the viewpoint during rain or high wind"]
    }
  },
  {
    id: "savandurga",
    name: "Savandurga",
    location: "Ramanagara, Karnataka",
    state: "Karnataka",
    region: "Bengaluru Region",
    difficulty: "Easy",
    durationLabel: "Half day",
    durationKey: "half",
    durationNote: "4-5 hrs / near Bengaluru",
    distance: "5 km",
    elevation: "1,226 m",
    elevationGain: "350 m",
    rating: 4.3,
    reviews: 502,
    price: "Rs.999",
    season: "Year-round",
    thumb: "savandurga",
    prefs: ["Beginner Friendly", "Day Trek", "Sunrise"],
    summary: "Asia's largest monolith, 60 km from Bengaluru - a short granite scramble with lake views all the way up.",
    highlights: ["One of Asia's largest monoliths", "Arkavathi lake panorama", "Perfect first-ever trek"],
    itinerary: [
      { day: "Leg 1", time: "06:00", title: "Base assembly", desc: "Meet at the foothill, warm-up and grip check on the boulders." },
      { day: "Leg 2", time: "06:45", title: "Rock scramble", desc: "Guided 350 m scramble using fixed ropes on the steeper slabs." },
      { day: "Leg 3", time: "08:30", title: "Summit", desc: "Flat summit plateau, 360 view of the lake and paddy fields." },
      { day: "Leg 4", time: "10:30", title: "Descend and finish", desc: "Down via the alternate face, breakfast at base, return by noon." }
    ],
    equipment: ["Grippy sneakers or shoes", "1 L water", "Cap and sunscreen", "Gloves (optional)", "Energy snack", "ID proof"],
    safetyTips: ["Granite becomes extremely slippery when wet - never climb after rain", "Rope sections should be single-file", "Keep away from the cliff edge, there is no railing"],
    analysis: {
      score: 86, risk: "Low",
      factors: [
        { label: "Weather", rating: "Stable", tone: "success", note: "Dry most of the year; avoid monsoon weekends." },
        { label: "Terrain", rating: "Easy-Moderate", tone: "success", note: "Bare granite with rope-assisted steeper slabs." },
        { label: "Elevation Risk", rating: "None", tone: "success", note: "1,226 m - negligible." },
        { label: "Trail Accessibility", rating: "Good", tone: "success", note: "Road to the base, clear trailhead entry." },
        { label: "Emergency Accessibility", rating: "Excellent", tone: "success", note: "Ramanagara town 12 km; ambulance access to base." },
        { label: "Water Availability", rating: "Scarce", tone: "warning", note: "No water on the rock - carry full bottle." }
      ],
      precautions: ["Do not attempt in rain or on wet mornings", "Use the fixed rope only one person at a time", "Helmet recommended for the descent"]
    }
  },
  {
    id: "ramanagara",
    name: "Ramanagara",
    location: "Ramanagara, Karnataka",
    state: "Karnataka",
    region: "Bengaluru Region",
    difficulty: "Easy",
    durationLabel: "Half day",
    durationKey: "half",
    durationNote: "4 hrs / near Bengaluru",
    distance: "4 km",
    elevation: "1,006 m",
    elevationGain: "280 m",
    rating: 4.2,
    reviews: 341,
    price: "Rs.899",
    season: "Year-round",
    thumb: "ramanagara",
    prefs: ["Beginner Friendly", "Forest", "Day Trek"],
    summary: "The Sholay hills - boulder-strewn forest trails and silkworm farms a short drive from the city.",
    highlights: ["Classic Bollywood filming hills", "Boulder hopping through forest", "Great for team outings"],
    itinerary: [
      { day: "Leg 1", time: "06:30", title: "Trailhead briefing", desc: "Meet at Ramadevarabetta gate, group split by pace." },
      { day: "Leg 2", time: "07:00", title: "Forest and boulder stretch", desc: "Easy 2 km walk through bamboo and silkworm sheds." },
      { day: "Leg 3", time: "08:45", title: "Viewpoint", desc: "Short climb to the boulder viewpoint over the lake." },
      { day: "Leg 4", time: "10:00", title: "Return", desc: "Back to gate, breakfast at the local darshini." }
    ],
    equipment: ["Comfortable sports shoes", "1 L water", "Cap", "Insect repellent", "Snack", "ID proof"],
    safetyTips: ["Stay on marked paths - the boulder field is easy to scramble into", "Morning heat builds quickly after 10:00", "Vulture nesting area: do not use drones"],
    analysis: {
      score: 88, risk: "Low",
      factors: [
        { label: "Weather", rating: "Stable", tone: "success", note: "Shaded forest stretch keeps it cool until 10:00." },
        { label: "Terrain", rating: "Easy", tone: "success", note: "Gentle 280 m gain with a few boulder steps." },
        { label: "Elevation Risk", rating: "None", tone: "success", note: "1,006 m - nothing to acclimatise to." },
        { label: "Trail Accessibility", rating: "Excellent", tone: "success", note: "Road access and a formal gate entry." },
        { label: "Emergency Accessibility", rating: "Excellent", tone: "success", note: "City hospital within 25 minutes." },
        { label: "Water Availability", rating: "Moderate", tone: "warning", note: "Village taps at base only; carry 1 L up." }
      ],
      precautions: ["Start before 07:00 to beat the heat", "Boulder-hopping is not allowed off-trail", "Keep noise low near the nesting cliffs"]
    }
  },
  {
    id: "wayanad",
    name: "Wayanad - Chembra Peak",
    location: "Wayanad, Kerala",
    state: "Kerala",
    region: "Kerala Highlands",
    difficulty: "Moderate",
    durationLabel: "1 day",
    durationKey: "day",
    durationNote: "Day trek / 6-7 hrs",
    distance: "10 km",
    elevation: "2,100 m",
    elevationGain: "700 m",
    rating: 4.6,
    reviews: 389,
    price: "Rs.2,799",
    season: "Oct - Mar",
    thumb: "wayanad",
    prefs: ["Summit", "Waterfalls", "Valley Views"],
    summary: "Kerala's highest accessible peak, famous for the heart-shaped cloud lake halfway to the summit.",
    highlights: ["Heart-shaped cloud lake", "Highest trekking peak in Kerala", "Tea and spice estate views"],
    itinerary: [
      { day: "Leg 1", time: "06:30", title: "Estate entry", desc: "Permit at Chembra entry check-post, guide allotment." },
      { day: "Leg 2", time: "07:30", title: "Estate and forest climb", desc: "Walk through tea estate into shola forest, first water break." },
      { day: "Leg 3", time: "09:45", title: "Heart Lake", desc: "Rest at the heart-shaped lake, quick photo and snack stop." },
      { day: "Leg 4", time: "12:00", title: "Summit 2,100 m", desc: "Steep final push, packed lunch at the viewpoint." },
      { day: "Leg 5", time: "15:30", title: "Descend", desc: "Return via the same trail, exit the estate by 16:30." }
    ],
    equipment: ["Trekking shoes", "2 L water", "Packed lunch", "Rain jacket", "Trekking poles", "Electrolyte sachets"],
    safetyTips: ["Entry permits are limited and must be pre-booked", "No camping or littering near Heart Lake", "Steep descent after the lake - poles help knees"],
    analysis: {
      score: 78, risk: "Moderate",
      factors: [
        { label: "Weather", rating: "Variable", tone: "warning", note: "Afternoon showers common even in the dry season." },
        { label: "Terrain", rating: "Moderate", tone: "warning", note: "700 m gain, slippery grass on the upper slope." },
        { label: "Elevation Risk", rating: "Moderate", tone: "warning", note: "2,100 m - mild breathlessness for unfit trekkers." },
        { label: "Trail Accessibility", rating: "Good", tone: "success", note: "Official forest department trail with check-post." },
        { label: "Emergency Accessibility", rating: "Fair", tone: "warning", note: "Nearest hospital 18 km via winding estate road." },
        { label: "Water Availability", rating: "Moderate", tone: "warning", note: "One spring below the lake; carry 2 L for the day." }
      ],
      precautions: ["Pre-book permit - walk-ins are refused", "Turn around at 12:30 if summit not reached", "Full-length clothing for the shola stretch"]
    }
  }
];

/* =========================================================
   TREK MANAGEMENT (organiser view)
   ========================================================= */

const BATCHES = [
  {
    id: "TB-1024", trek: "Skandagiri Sunrise Trek", img: "skandagiri", date: "18 Oct 2026",
    guide: "Rahul Menon", difficulty: "Easy", status: "Almost Full", max: 24, joined: 21,
    participants: [
      { name: "Ananya Rao", checked: true, contact: "+91 98450 11223", trekStatus: "Confirmed" },
      { name: "Karthik Iyer", checked: true, contact: "+91 99012 44556", trekStatus: "Confirmed" },
      { name: "Sneha Pillai", checked: false, contact: "+91 97400 77889", trekStatus: "Confirmed" },
      { name: "Mohammed Faiz", checked: false, contact: "+91 96633 22114", trekStatus: "Pending medical" },
      { name: "Divya Shetty", checked: true, contact: "+91 90350 66771", trekStatus: "Confirmed" },
      { name: "Nikhil Bose", checked: false, contact: "+91 91080 33445", trekStatus: "Waitlist" }
    ]
  },
  {
    id: "TB-1025", trek: "Kudremukh Peak Trek", img: "kudremukh", date: "26 Oct 2026",
    guide: "Prisha Nair", difficulty: "Moderate", status: "Open", max: 30, joined: 18,
    participants: [
      { name: "Rohan Desai", checked: false, contact: "+91 98860 55112", trekStatus: "Confirmed" },
      { name: "Meera Krishnan", checked: true, contact: "+91 99860 44223", trekStatus: "Confirmed" },
      { name: "Aditya Shinde", checked: false, contact: "+91 97411 66334", trekStatus: "Confirmed" },
      { name: "Pooja Hegde", checked: false, contact: "+91 94480 77556", trekStatus: "Pending medical" },
      { name: "Sameer Khan", checked: false, contact: "+91 90080 11992", trekStatus: "Confirmed" }
    ]
  },
  {
    id: "TB-1026", trek: "Kumara Parvatha Trek", img: "kumaraparvatha", date: "08 Nov 2026",
    guide: "Vikram Singh", difficulty: "Difficult", status: "Full", max: 25, joined: 25,
    participants: [
      { name: "Arjun Menon", checked: false, contact: "+91 98450 90807", trekStatus: "Confirmed" },
      { name: "Lakshmi Narayan", checked: false, contact: "+91 99000 61615", trekStatus: "Confirmed" },
      { name: "Joseph Mathew", checked: false, contact: "+91 97390 27273", trekStatus: "Confirmed" },
      { name: "Tanya Kapoor", checked: false, contact: "+91 96630 48485", trekStatus: "Waitlist" },
      { name: "Harish Gowda", checked: false, contact: "+91 90190 69697", trekStatus: "Confirmed" }
    ]
  },
  {
    id: "TB-1027", trek: "Wayanad - Chembra Peak", img: "wayanad", date: "29 Nov 2026",
    guide: "Ananya Rao", difficulty: "Moderate", status: "Open", max: 35, joined: 12,
    participants: [
      { name: "Sara Thomas", checked: false, contact: "+91 98950 12123", trekStatus: "Confirmed" },
      { name: "Gaurav Malhotra", checked: false, contact: "+91 99620 34345", trekStatus: "Confirmed" },
      { name: "Ishita Banerjee", checked: false, contact: "+91 97470 56567", trekStatus: "Confirmed" },
      { name: "Deepak Chandra", checked: false, contact: "+91 90360 78789", trekStatus: "Pending medical" },
      { name: "Neha Kulkarni", checked: false, contact: "+91 91410 90901", trekStatus: "Confirmed" }
    ]
  }
];

/* =========================================================
   SAFETY CENTRE (live monitoring simulation)
   ========================================================= */

const CHECKPOINTS = [
  { id: 0, name: "Base Camp", x: 70, y: 205, note: "Entry gate & kit check" },
  { id: 1, name: "Checkpoint 1", x: 235, y: 150, note: "Forest edge / 45 min" },
  { id: 2, name: "Water Point", x: 400, y: 195, note: "Stream refill / 90 min" },
  { id: 3, name: "Summit", x: 575, y: 70, note: "Peak marker / 150 min" },
  { id: 4, name: "Return Point", x: 735, y: 160, note: "Descent exit / 210 min" }
];

const SAFETY_CENTER = {
  activeTrekkers: 46,
  checkedIn: 38,
  groups: [
    { id: "GRP-A", name: "Skandagiri Night Batch", members: 14, checkpoint: 1, status: "ontrack", guide: "Rahul Menon" },
    { id: "GRP-B", name: "Kudremukh Peak Group", members: 12, checkpoint: 2, status: "ontrack", guide: "Prisha Nair" },
    { id: "GRP-C", name: "Wayanad Chembra Group", members: 10, checkpoint: 3, status: "ontrack", guide: "Ananya Rao" },
    { id: "GRP-D", name: "Savandurga Sunrise Batch", members: 10, checkpoint: 0, status: "ontrack", guide: "Vikram Singh" }
  ],
  response: [
    { action: "Alert sent to group guide via SMS", status: "Done" },
    { action: "Nearest response team dispatched to checkpoint", status: "In progress" },
    { action: "Medical kit + stretcher team standing by", status: "Queued" },
    { action: "Emergency contact of affected trekkers notified", status: "Done" },
    { action: "Control room tracking live location ping", status: "Active" }
  ]
};

/* Trek preference options used by the AI planner */
const PLANNER_OPTIONS = {
  location: ["Anywhere", "Near Bengaluru", "Western Ghats", "Kerala"],
  difficulty: ["Any", "Easy", "Moderate", "Difficult"],
  duration: ["Any", "Half day", "1 day", "2 days"],
  fitness: ["Beginner", "Intermediate", "Advanced"],
  group: ["1-5", "6-15", "16-30", "30+"],
  preference: ["Any", "Sunrise", "Summit", "Waterfalls", "Forest", "Camping", "Beginner Friendly"]
};
