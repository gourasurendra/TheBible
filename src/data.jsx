export const teluguBookNames = {"Genesis": "ఆదికాండము", "Exodus": "నిర్గమకాండము", "Leviticus": "లేవీయకాండము", "Numbers": "సంఖ్యాకాండము", "Deuteronomy": "ద్వితీయోపదేశకాండము", "Joshua": "యెహోషువ", "Judges": "న్యాయాధిపతులు", "Ruth": "రూతు", "1 Samuel": "1 సమూయేలు", "2 Samuel": "2 సమూయేలు", "1 Kings": "1 రాజులు", "2 Kings": "2 రాజులు", "1 Chronicles": "1 దినవృత్తాంతములు", "2 Chronicles": "2 దినవృత్తాంతములు", "Ezra": "ఎజ్రా", "Nehemiah": "నెహెమ్యా", "Esther": "ఎస్తేరు", "Job": "యోబు", "Psalms": "కీర్తనలు", "Proverbs": "సామెతలు", "Ecclesiastes": "ప్రసంగి", "Song of Solomon": "పరమగీతము", "Isaiah": "యెషయా", "Jeremiah": "యిర్మీయా", "Lamentations": "విలాపవాక్యములు", "Ezekiel": "యెహెజ్కేలు", "Daniel": "దానియేలు", "Hosea": "హోషేయ", "Joel": "యోవేలు", "Amos": "ఆమోసు", "Obadiah": "ఓబద్యా", "Jonah": "యోనా", "Micah": "మీకా", "Nahum": "నహూము", "Habakkuk": "హబక్కూకు", "Zephaniah": "జెఫన్యా", "Haggai": "హగ్గయి", "Zechariah": "జెకర్యా", "Malachi": "మలాకీ", "Matthew": "మత్తయి", "Mark": "మార్కు", "Luke": "లూకా", "John": "యోహాను", "Acts": "అపొస్తలుల కార్యములు", "Romans": "రోమీయులకు", "1 Corinthians": "1 కొరింథీయులకు", "2 Corinthians": "2 కొరింథీయులకు", "Galatians": "గలతీయులకు", "Ephesians": "ఎఫెసీయులకు", "Philippians": "ఫిలిప్పీయులకు", "Colossians": "కొలొస్సయులకు", "1 Thessalonians": "1 థెస్సలొనీకయులకు", "2 Thessalonians": "2 థెస్సలొనీకయులకు", "1 Timothy": "1 తిమోతికి", "2 Timothy": "2 తిమోతికి", "Titus": "తీతుకు", "Philemon": "ఫిలేమోనుకు", "Hebrews": "హెబ్రీయులకు", "James": "యాకోబు", "1 Peter": "1 పేతురు", "2 Peter": "2 పేతురు", "1 John": "1 యోహాను", "2 John": "2 యోహాను", "3 John": "3 యోహాను", "Jude": "యూదా", "Revelation": "ప్రకటన గ్రంథము"};

export const books = [
["Genesis",50],["Exodus",40],["Leviticus",27],["Numbers",36],["Deuteronomy",34],["Joshua",24],["Judges",21],["Ruth",4],["1 Samuel",31],["2 Samuel",24],["1 Kings",22],["2 Kings",25],["1 Chronicles",29],["2 Chronicles",36],["Ezra",10],["Nehemiah",13],["Esther",10],["Job",42],["Psalms",150],["Proverbs",31],["Ecclesiastes",12],["Song of Solomon",8],["Isaiah",66],["Jeremiah",52],["Lamentations",5],["Ezekiel",48],["Daniel",12],["Hosea",14],["Joel",3],["Amos",9],["Obadiah",1],["Jonah",4],["Micah",7],["Nahum",3],["Habakkuk",3],["Zephaniah",3],["Haggai",2],["Zechariah",14],["Malachi",4],
["Matthew",28],["Mark",16],["Luke",24],["John",21],["Acts",28],["Romans",16],["1 Corinthians",16],["2 Corinthians",13],["Galatians",6],["Ephesians",6],["Philippians",4],["Colossians",4],["1 Thessalonians",5],["2 Thessalonians",3],["1 Timothy",6],["2 Timothy",4],["Titus",3],["Philemon",1],["Hebrews",13],["James",5],["1 Peter",5],["2 Peter",3],["1 John",5],["2 John",1],["3 John",1],["Jude",1],["Revelation",22]
].map(([name, chapters], index) => ({ name, chapters, testament: index < 39 ? "Old Testament" : "New Testament" }));

export const topics = [
  ["Love","John 3:16"],["Faith","Hebrews 11:1"],["Hope","Romans 15:13"],["Peace","John 14:27"],
  ["Prayer","Philippians 4:6"],["Wisdom","James 1:5"],["Strength","Isaiah 41:10"],["Forgiveness","1 John 1:9"],
  ["Grace","Ephesians 2:8"],["Courage","Joshua 1:9"],["Patience","Romans 12:12"],["Joy","Philippians 4:4"]
];

export const plans = [
  {id:"one-year", title:"Bible in 1 Year", duration:"365 days", description:"Build a steady habit with an overview of Scripture, from creation to the early church.", benefit:"Best for readers who want a long-term, whole-Bible rhythm. The first seven readings are a guided starter sequence.", schedule:[
    {title:"Creation and new beginnings",ref:"Genesis 1",book:"Genesis",chapter:1,prompt:"Notice what the creation story says about God, life, and the world."},
    {title:"Humanity and the garden",ref:"Genesis 2",book:"Genesis",chapter:2,prompt:"Reflect on purpose, relationship, and care for creation."},
    {title:"A broken relationship",ref:"Genesis 3",book:"Genesis",chapter:3,prompt:"Notice the choices and consequences in this story."},
    {title:"A promise to Abraham",ref:"Genesis 12",book:"Genesis",chapter:12,prompt:"Look for the promise and the next step of faith."},
    {title:"The Ten Commandments",ref:"Exodus 20",book:"Exodus",chapter:20,prompt:"Consider how these commands shape life with God and others."},
    {title:"A prayer for guidance",ref:"Psalm 23",book:"Psalms",chapter:23,prompt:"Read slowly and notice the images of care and guidance."},
    {title:"The beginning of Jesus' ministry",ref:"Matthew 5",book:"Matthew",chapter:5,prompt:"Choose one teaching of Jesus to carry into your day."}
  ]},
  {id:"nt-90", title:"New Testament in 90 Days", duration:"90 days", description:"Meet Jesus, follow the early church, and explore the letters that shaped Christian faith.", benefit:"Best for a focused introduction to the life of Jesus and the early church.", schedule:[
    {title:"The birth of Jesus",ref:"Luke 2",book:"Luke",chapter:2,prompt:"Notice who receives the good news and how they respond."},
    {title:"Jesus calls his first disciples",ref:"Mark 1",book:"Mark",chapter:1,prompt:"Reflect on what it means to respond to a call."},
    {title:"The Beatitudes",ref:"Matthew 5",book:"Matthew",chapter:5,prompt:"Which blessing feels especially meaningful today?"},
    {title:"Love one another",ref:"John 13",book:"John",chapter:13,prompt:"Notice how Jesus connects love with action and service."},
    {title:"The resurrection",ref:"Luke 24",book:"Luke",chapter:24,prompt:"Follow the movement from grief to hope."},
    {title:"The early church",ref:"Acts 2",book:"Acts",chapter:2,prompt:"Look at the practices that shaped the first community."},
    {title:"Life in Christ",ref:"Romans 8",book:"Romans",chapter:8,prompt:"Underline a line that gives you hope."}
  ]},
  {id:"psalms-30", title:"Psalms in 30 Days", duration:"30 days", description:"Use poetry and prayer to bring gratitude, fear, sorrow, and hope honestly before God.", benefit:"Best for reflection, prayer, and finding words for what you are feeling.", schedule:[
    {title:"The way of the righteous",ref:"Psalm 1",book:"Psalms",chapter:1,prompt:"What helps a person grow deep roots?"},
    {title:"The Lord is my shepherd",ref:"Psalm 23",book:"Psalms",chapter:23,prompt:"Pause at the image that brings you the most comfort."},
    {title:"A prayer for help",ref:"Psalm 27",book:"Psalms",chapter:27,prompt:"Notice how courage and fear appear together."},
    {title:"A clean heart",ref:"Psalm 51",book:"Psalms",chapter:51,prompt:"Reflect on honesty, mercy, and renewal."},
    {title:"Give thanks",ref:"Psalm 100",book:"Psalms",chapter:100,prompt:"Name one thing you are thankful for today."},
    {title:"Rest for the soul",ref:"Psalm 121",book:"Psalms",chapter:121,prompt:"Notice the repeated promise of help and keeping."},
    {title:"A song of praise",ref:"Psalm 150",book:"Psalms",chapter:150,prompt:"What could praise look like in your ordinary routine?"}
  ]},
  {id:"proverbs-31", title:"Proverbs in 31 Days", duration:"31 days", description:"Build practical wisdom for speech, work, relationships, choices, and character.", benefit:"Best for short daily readings with a practical takeaway.", schedule:[
    {title:"The beginning of wisdom",ref:"Proverbs 1",book:"Proverbs",chapter:1,prompt:"What does this chapter say about listening to wisdom?"},
    {title:"Choose the wise path",ref:"Proverbs 3",book:"Proverbs",chapter:3,prompt:"Identify one decision where you need guidance."},
    {title:"Guard your heart",ref:"Proverbs 4",book:"Proverbs",chapter:4,prompt:"What habit or influence deserves more attention?"},
    {title:"Words that build up",ref:"Proverbs 15",book:"Proverbs",chapter:15,prompt:"Choose one way to speak more gently today."},
    {title:"Diligence and work",ref:"Proverbs 6",book:"Proverbs",chapter:6,prompt:"What small task can you complete faithfully?"},
    {title:"Honesty matters",ref:"Proverbs 12",book:"Proverbs",chapter:12,prompt:"Reflect on how truth builds trust."},
    {title:"A life of character",ref:"Proverbs 31",book:"Proverbs",chapter:31,prompt:"Look beyond appearances to the character described."}
  ]},
  {id:"gospels", title:"Gospel Reading Plan", duration:"30 days", description:"Follow key moments in Jesus' life, teaching, compassion, death, and resurrection.", benefit:"Best for readers who want to focus on Jesus and his teachings.", schedule:[
    {title:"The Word became flesh",ref:"John 1",book:"John",chapter:1,prompt:"What does this chapter tell you about Jesus?"},
    {title:"A new beginning",ref:"Mark 1",book:"Mark",chapter:1,prompt:"Notice the different people Jesus meets."},
    {title:"The Good Samaritan",ref:"Luke 10",book:"Luke",chapter:10,prompt:"Who is your neighbour, and what does compassion do?"},
    {title:"The Prodigal Son",ref:"Luke 15",book:"Luke",chapter:15,prompt:"Reflect on the father's response to the returning son."},
    {title:"Jesus serves his friends",ref:"John 13",book:"John",chapter:13,prompt:"What does humble service look like in your life?"},
    {title:"The crucifixion",ref:"Luke 23",book:"Luke",chapter:23,prompt:"Read this difficult passage thoughtfully and slowly."},
    {title:"He is risen",ref:"John 20",book:"John",chapter:20,prompt:"Notice how the disciples respond to the resurrection."}
  ]},
  {id:"beginner", title:"Beginner Bible Plan", duration:"21 days", description:"Start with approachable passages about who God is, who Jesus is, and how faith can shape everyday life.", benefit:"Best for new readers who want clear starting points without feeling overwhelmed.", schedule:[
    {title:"God creates",ref:"Genesis 1",book:"Genesis",chapter:1,prompt:"Begin with the opening story of the Bible."},
    {title:"A promise of presence",ref:"Psalm 23",book:"Psalms",chapter:23,prompt:"Read the psalm as a personal prayer."},
    {title:"Love and hope",ref:"John 3",book:"John",chapter:3,prompt:"Notice what this chapter says about God's love."},
    {title:"Jesus welcomes people",ref:"Mark 2",book:"Mark",chapter:2,prompt:"Who is welcomed, and why does it matter?"},
    {title:"A simple prayer",ref:"Matthew 6",book:"Matthew",chapter:6,prompt:"Read the Lord's Prayer slowly, phrase by phrase."},
    {title:"Peace in worry",ref:"Philippians 4",book:"Philippians",chapter:4,prompt:"What practical invitation do you find here?"},
    {title:"Love in action",ref:"1 Corinthians 13",book:"1 Corinthians",chapter:13,prompt:"Choose one description of love to practice today."}
  ]}
];

export const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "");
export const bookFromSlug = (value) => books.find(b => slug(b.name) === value);
export const totalChapters = books.reduce((sum,b) => sum + b.chapters, 0);