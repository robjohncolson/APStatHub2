// allUnitsData.js

const ALL_UNITS_DATA = [
  {
    unitId: 'unit1',
    displayName: "Unit 1: Exploring One-Variable Data", // Added/Updated
        examWeight: "15-23%",     // Unique identifier for the unit
    // This 'topics' array IS the 'pdfFiles' array definition from Unit 1's index.html
    // Ensure it reflects the granular structure with nested 'videos' and 'quizzes' arrays.
    topics: [
      // --- PASTE Unit 1's pdfFiles ARRAY CONTENT HERE ---
      {
        id: "1-1",
        name: "Topic 1.1",
        description: "Introducing Statistics: What Can We Learn from Data?",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/708w9bpk60?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1wEbNmDM4KBUWvvoRoQIgIYKYWxG3x6Cv/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "https://dashboard.blooket.com/set/6847bb74fe947147cb3c05de",
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Paper Airplane (Classic Dart)",
            description: "Perfect starter - turn your notes into flight!",
            videoUrl: "https://www.youtube.com/watch?v=veyZNyurlwU",
            reflection: "As your paper airplane soars, think about how data can help us explore and understand our world, just like this lesson introduced you to statistics."
        },
        quizzes: [],
        current: false
    },
    {
        id: "1-2",
        name: "Topic 1.2",
        description: "The Language of Variation: Variables",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/o7atnjt521?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1cJ3a5DSlZ0w3vta901HVyADfQ-qKVQcD/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "https://dashboard.blooket.com/set/6847beef46fe0cb8b31e937f",
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Simple Boat",
            description: "Navigate the waters of variables with your paper boat",
            videoUrl: "https://www.youtube.com/watch?v=vNba3jbBSOw",
            reflection: "Like variables that take different values, your boat can sail different paths. Reflect on how data varies and what that tells us."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit1/unit1_section1.2_quiz.pdf",
                answersPdf: "pdfs/unit1/unit1_section1.2_answers.pdf",
                quizId: "1-2_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
    },
    {
        id: "1-3",
        name: "Topic 1.3",
        description: "Representing a Categorical Variable with Tables",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/5umo3jmlhy?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1F9_jLryrjHyXUN21eZmNHrTIGATBhhDw/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "https://dashboard.blooket.com/set/6847c1aa46fe0cb8b31e93b4",
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Paper Hat",
            description: "Crown yourself with categorical thinking",
            videoUrl: "https://www.youtube.com/watch?v=2FHjUT8At0Y",
            reflection: "Just as your hat sits in the category 'headwear,' think about how we organize data into meaningful categories and tables."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit1/unit1_section1.3_quiz.pdf",
                answersPdf: "pdfs/unit1/unit1_section1.3_answers.pdf",
                quizId: "1-3_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
    },
    {
        id: "1-4",
        name: "Topic 1.4",
        description: "Representing a Categorical Variable with Graphs",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/nnomwwtzqc?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1vo3zsZu4wZAAkf-fPTuCmKXudgs0Gnl4/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/yd2t974opr?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1Hp7GWdTzjPQNvcAnnrrt_QYXV27gCEHh/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "https://dashboard.blooket.com/set/6847c3b146fe0cb8b31e93d9",
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Fortune Teller (Cootie Catcher)",
            description: "Interactive origami for graphical exploration",
            videoUrl: "https://www.youtube.com/watch?v=FlX35Tg-lDk",
            reflection: "As you play with your fortune teller, think about how graphs help us visualize and interact with categorical data patterns."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit1/unit1_section1.4_quiz.pdf",
                answersPdf: "pdfs/unit1/unit1_section1.4_answers.pdf",
                quizId: "1-4_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
    },
    {
        id: "1-5",
        name: "Topic 1.5",
        description: "Representing a Quantitative Variable with Graphs",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/o142s0yu7e?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1jlopxNducZRaqXtU9c2NvXxq_tGK90ue/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "https://dashboard.blooket.com/set/6847c89646fe0cb8b31e9430",
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Paper Cup",
            description: "A practical fold for holding quantitative insights",
            videoUrl: "https://www.youtube.com/watch?v=2FHjUT8At0Y",
            reflection: "Your paper cup can hold water just as graphs hold data points. Consider how different graph types can contain and display quantitative information in meaningful ways."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit1/unit1_section1.5_quiz.pdf",
                answersPdf: "pdfs/unit1/unit1_section1.5_answers.pdf",
                quizId: "1-5_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
    },
    {
        id: "1-6",
        name: "Topic 1.6",
        description: "Describing the Distribution of a Quantitative Variable",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/q0wwgrkzqb?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1oWGqzk4meQ6HuXE-mTDHMStp-qOGDUZJ/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "https://dashboard.blooket.com/set/6847c9c646fe0cb8b31e9442",
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Simple Flower (Tulip)",
            description: "Beauty blooms in data distributions",
            videoUrl: "https://www.youtube.com/watch?v=QPKBF-D1wNk",
            reflection: "Like petals around a flower's center, data points distribute around a central tendency. As you fold, think about the shape, center, and spread of distributions."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit1/unit1_section1.6_quiz.pdf",
                answersPdf: "pdfs/unit1/unit1_section1.6_answers.pdf",
                quizId: "1-6_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
    },
    {
        id: "1-7",
        name: "Topic 1.7",
        description: "Summary Statistics for a Quantitative Variable",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/99bxa5glos?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1JpzXso3aZ8P8MXQ8b8f1kpjlq_ciaQCK/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/99h7sgooy8?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1_LYoOie55jPT2tM-o3spuiqbVxga9VPv/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "https://dashboard.blooket.com/set/6847cab346fe0cb8b31e9462",
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Jumping Frog",
            description: "Action origami for dynamic statistics",
            videoUrl: "https://www.youtube.com/watch?v=Oy8KG_aZvGk",
            reflection: "Watch your frog jump different distances - just like data, each jump varies! Think about mean, median, and how we summarize the 'typical' jump distance."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit1/unit1_section1.7_quiz.pdf",
                answersPdf: "pdfs/unit1/unit1_section1.7_answers.pdf",
                quizId: "1-7_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
    },
    {
        id: "1-8",
        name: "Topic 1.8",
        description: "Graphical Representations of Summary Statistics",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/rm76rrgb3t?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1sKc6XpjX5RUjGv5wbjUl7R1QEYLXG6W8/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "https://dashboard.blooket.com/set/6847ccbf60ba227d20bc8435",
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Paper Crane (Simplified)",
            description: "Graceful visualization of statistical summaries",
            videoUrl: "https://www.youtube.com/watch?v=LloxymwKWLE",
            reflection: "The crane's elegant form represents how box plots and summary statistics create beautiful, meaningful representations of complex data. Each fold builds toward the complete picture."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit1/unit1_section1.8_quiz.pdf",
                answersPdf: "pdfs/unit1/unit1_section1.8_answers.pdf",
                quizId: "1-8_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
    },
    {
        id: "1-9",
        name: "Topic 1.9",
        description: "Comparing Distributions of a Quantitative Variable",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/27s7exmq1d?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1zUev1tHzgJLMi337FjuxY49siAJJf_w8/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "https://dashboard.blooket.com/set/6847cd3f7d07d828b1a0384b",
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Butterfly",
            description: "Symmetrical beauty in comparative distributions",
            videoUrl: "https://www.youtube.com/watch?v=ncP9Xm2jRfU",
            reflection: "Your butterfly's symmetrical wings mirror how we compare distributions - looking at similarities and differences. Consider how two datasets can be as different yet beautiful as butterfly wing patterns."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit1/unit1_section1.9_quiz.pdf",
                answersPdf: "pdfs/unit1/unit1_section1.9_answers.pdf",
                quizId: "1-9_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
    },
    {
        id: "1-10",
        name: "Topic 1.10",
        description: "The Normal Distribution",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/0ps3pcvbfn?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1vTOitP631CGaZJMJjE6VVw53kiOa0zGv/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/wualxc69hl?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1UF7VafU4agY3JcxHnp61EEjpOv959wZ8/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/3fev7ihoms?sui=33,1",
                altUrl: "https://drive.google.com/file/d/1aYbhplXukoDHOpWYCNG5OOTGVYZOcyCV/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "https://dashboard.blooket.com/set/6847cdf560ba227d20bc8456",
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Simple Box",
            description: "Container for normal distribution insights",
            videoUrl: "https://www.youtube.com/watch?v=miKVWRH6Jzc",
            reflection: "Your box has defined boundaries, just like the normal distribution has predictable ranges. As you fold, think about how 68%, 95%, and 99.7% of data fits within standard deviations - like items fitting perfectly in your box."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit1/unit1_section1.10_quiz.pdf",
                answersPdf: "pdfs/unit1/unit1_section1.10_answers.pdf",
                quizId: "1-10_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
    },
    {
        id: "1-capstone",
        name: "Unit 1 Progress Check",
        description: "Capstone Assessment",
        videos: [],
        blooket: {
            url: "https://dashboard.blooket.com/set/66ddb0550ddd499572b5e429", // Unit 1 capstone as provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Star Box",
            description: "🌟 Unit 1 Capstone Challenge - A stellar achievement!",
            videoUrl: "https://www.youtube.com/watch?v=S3-2SiWG7N0",
            reflection: "Congratulations! Like this beautiful star box that brings together all your folding skills, you've now mastered exploring one-variable data. Each point of your star represents a key concept: distributions, summaries, graphs, comparisons, and the normal model. You're ready to shine in Unit 2!"
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit1/unit1_pc_frq_quiz.pdf",
                answersPdf: "pdfs/unit1/unit1_pc_frq_answers.pdf",
                quizId: "1-capstone_q1",
                completed: false,
                completionDate: null
            },
            {
                questionPdf: "pdfs/unit1/unit1_pc_mcq_parta_answers.pdf",
                answersPdf: null,
                quizId: "1-capstone_q2",
                completed: false,
                completionDate: null
            },
            {
                questionPdf: "pdfs/unit1/unit1_pc_mcq_partb_answers.pdf",
                answersPdf: null,
                quizId: "1-capstone_q3",
                completed: false,
                completionDate: null
            }
        ],
        isCapstone: true,
        current: false
      }
      // --- END OF PASTED Unit 1 DATA ---
    ]
  },
  {
    unitId: 'unit2',
    displayName: "Unit 2: Exploring Two-Variable Data",
    examWeight: "5-7%", // Unique identifier for Unit 2
    // This 'topics' array IS the 'pdfFiles' array definition from Unit 2's index.html
    topics: [
       // --- PASTE Unit 2's pdfFiles ARRAY CONTENT HERE ---
      {
        id: "2-1",
        name: "Topic 2.1",
        description: "Introducing Statistics: Are Variables Related?",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/n766cdx9w9?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1epQNhpTqA0qMv8ceTpH5IagjDDUlOPC0/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Paper Airplane (Glider)",
            description: "Advanced flight for exploring relationships",
            videoUrl: "https://www.youtube.com/watch?v=Qo4vT8ZIq0Y",
            reflection: "Like your glider that needs balanced wings to fly straight, variables often work together in relationships. Think about how changing one thing (like wing angle) affects another (like flight distance)."
        },
        quizzes: [],
        current: false
      },
      {
        id: "2-2",
        name: "Topic 2.2",
        description: "Representing Two Categorical Variables",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/6piak9dz9w?sui=33,2",
                altUrl: "https://drive.google.com/file/d/170yFl1LoVYwYZ8a6coNhfQkfkFiHD1gg/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Sailboat",
            description: "Navigate the winds of two-way tables",
            videoUrl: "https://www.youtube.com/watch?v=JJNMf40MzGE",
            reflection: "Your sailboat has two parts working together - the hull and sail - just like two categorical variables interact in tables. As you fold, consider how we organize data when we have two categories working together."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit2/unit2_section2.2_quiz.pdf",
                answersPdf: "pdfs/unit2/unit2_section2.2_answers.pdf",
                quizId: "2-2_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "2-3",
        name: "Topic 2.3",
        description: "Statistics for Two Categorical Variables",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/5xlg4390iu?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1IZIAXWtHsQfr1o7GZIJ2nnYXaQZt6Xyh/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Envelope",
            description: "Contains the secrets of conditional probability",
            videoUrl: "https://www.youtube.com/watch?v=WGU_4-5TaxY",
            reflection: "Your envelope holds something inside, just like conditional probabilities hold relationships within categories. Think about how the probability of one outcome changes when we know information about another category."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit2/unit2_section2.3_quiz.pdf",
                answersPdf: "pdfs/unit2/unit2_section2.3_answers.pdf",
                quizId: "2-3_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "2-4",
        name: "Topic 2.4",
        description: "Representing the Relationship Between Two Quantitative Variables",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/mistxmwcx2?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1RCEtVGX87UjgbneQqQKc5rNYhAQb4jPS/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/gf7ybqjkpt?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1ZpPac1ofe4Bot2yrLgwLPvSHdMUHvK4J/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Simple Rose",
            description: "Elegant curves of scatterplot relationships",
            videoUrl: "https://www.youtube.com/watch?v=VcgCH3xFKS4",
            reflection: "Your rose's petals spiral gracefully, much like data points can show curved relationships on scatterplots. As you create the curves, think about how two numerical variables can dance together in patterns."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit2/unit2_section2.4_quiz.pdf",
                answersPdf: "pdfs/unit2/unit2_section2.4_answers.pdf",
                quizId: "2-4_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "2-5",
        name: "Topic 2.5",
        description: "Correlation",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/15jvfeyacb?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1UnF2HFBgzzgj7M7_SIxhzJxrWiQQ7Itm/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/xz46lkcplm?sui=33,2",
                altUrl: "https://youtu.be/bPrP6wb497M",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Penguin",
            description: "Waddle through the strength of relationships",
            videoUrl: "https://www.youtube.com/watch?v=fJPb0LLzGcU",
            reflection: "Your penguin stands firmly when well-balanced, just like strong correlations show clear, stable relationships between variables. Consider how correlation values near +1 or -1 create 'stable penguins' while values near 0 make wobbly ones."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit2/unit2_section2.5_quiz.pdf",
                answersPdf: "pdfs/unit2/unit2_section2.5_answers.pdf",
                quizId: "2-5_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "2-6",
        name: "Topic 2.6",
        description: "Linear Regression Models",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/8dyu2x687t?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1O_VPIl1W7TNAOi2wWNs0Uphbw11Mlagj/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/5hphawrnfm?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1_NOitEc1RuIwOgfx9lWcjOkq5yDdXToa/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Heart",
            description: "Love the beauty of linear relationships",
            videoUrl: "https://www.youtube.com/watch?v=J6SLBF_D6VQ",
            reflection: "Your heart has a beautiful, predictable shape - just like linear regression creates predictable lines through data. As you fold, think about how regression models help us understand and predict relationships with mathematical love!"
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit2/unit2_section2.6_quiz.pdf",
                answersPdf: "pdfs/unit2/unit2_section2.6_answers.pdf",
                quizId: "2-6_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "2-7",
        name: "Topic 2.7",
        description: "Residuals",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/1nld3zauyo?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1bk2KcUGXtM_uqBiv4IHwiXImazzX8S0k/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/gqn51yxt67?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1UjY1FF2ztFtcT5tk6brklCxRanMhFmOf/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Candy Box",
            description: "Sweet container for leftover differences",
            videoUrl: "https://www.youtube.com/watch?v=VpnLvb2t9sg",
            reflection: "Your candy box holds treats, just like residuals 'hold' the differences between actual data and predicted values. Think about how residuals show us what our model misses - the sweet surprises left behind!"
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit2/unit2_section2.7_quiz.pdf",
                answersPdf: "pdfs/unit2/unit2_section2.7_answers.pdf",
                quizId: "2-7_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "2-8",
        name: "Topic 2.8",
        description: "Least Squares Regression",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/tcc9dyd84p?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1_rLSLHvicUEZYr0YJ49e4rn5ezLP6cGX/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/3oo2fwicoe?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1XuzJlAW6HfR6E4L2DSSYxf66yqbG15dg/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/ikvel44wq7?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1Ghvv9jo8PH9KmX25-23oSRLVlLlUZX7N/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Lotus Flower", 
            description: "Unfold the beauty of optimization",
            videoUrl: "https://www.youtube.com/watch?v=eGPK1vvdyLE",
            reflection: "The lotus opens perfectly to reveal its center, just like least squares finds the perfect line by minimizing squared errors. Each petal unfolds with purpose, like each calculation brings us closer to the optimal solution."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit2/unit2_section2.8_quiz.pdf",
                answersPdf: "pdfs/unit2/unit2_section2.8_answers.pdf",
                quizId: "2-8_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "2-9",
        name: "Topic 2.9",
        description: "Analyzing Departures from Linearity",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/mnkem3n2pk?sui=33,2",
                altUrl: "https://drive.google.com/file/d/19OKlAS6U2MyiT0E3LMsR8Hxu9LHWt78Q/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/h1a9n9iqpk?sui=33,2",
                altUrl: "https://drive.google.com/file/d/1Y0qapTVLcbLj02JjkzA11uEEWFYPe7Cr/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Peace Crane",
            description: "Traditional grace for non-linear patterns",
            videoUrl: "https://www.youtube.com/watch?v=F1LVhm4dx1Q",
            reflection: "The classic crane has elegant curves that don't follow straight lines - just like real data often departs from perfect linearity. As you fold this time-honored model, appreciate how statistics embraces both linear and non-linear beauty."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit2/unit2_section2.9_quiz.pdf",
                answersPdf: "pdfs/unit2/unit2_section2.9_answers.pdf",
                quizId: "2-9_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "2-capstone",
        name: "Unit 2 Progress Check",
        description: "Capstone Assessment",
        videos: [],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Modular Cube (6 pieces)",
            description: "🌟 Unit 2 Capstone Challenge - Teamwork makes the dream work!",
            videoUrl: "https://www.youtube.com/watch?v=CfJdQqy3waE",
            reflection: "Congratulations! Like this cube that requires 6 separate pieces working together, you've mastered how two variables interact and support each other. Each module represents a key concept: scatterplots, correlation, regression, residuals, and model checking. Together they form something beautiful and complete!"
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit2/unit2_pc_frq_quiz.pdf",
                answersPdf: "pdfs/unit2/unit2_pc_frq_answers.pdf",
                quizId: "2-capstone_q1",
                completed: false,
                completionDate: null
            },
            {
                questionPdf: "pdfs/unit2/unit2_pc_mcq_parta_answers.pdf",
                answersPdf: null,
                quizId: "2-capstone_q2",
                completed: false,
                completionDate: null
            },
            {
                questionPdf: "pdfs/unit2/unit2_pc_mcq_partb_answers.pdf",
                answersPdf: null,
                quizId: "2-capstone_q3",
                completed: false,
                completionDate: null
            }
        ],
        isCapstone: true,
        current: false  
      }
       // --- END OF PASTED Unit 2 DATA ---
    ]
  },
  {
    unitId: 'unit3',
    displayName: "Unit 3: Collecting Data",
    examWeight: "12-15%",
    topics: [
      // --- PASTE Unit 3's pdfFiles ARRAY CONTENT HERE ---
      {
        id: "3-1",
        name: "Topic 3.1",
        description: "Introducing Statistics: Do the Data We Collected Tell the Truth?",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/bszm5v38o5?sui=33,3",
                altUrl: "https://drive.google.com/file/d/1TvZluuFXhx8theWMpU0hSs19vvP39Vua/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Detective Hat",
            description: "Investigate the truth behind our data",
            videoUrl: "https://www.youtube.com/watch?v=yOQa_n5qk5k",
            reflection: "Like a detective searching for clues, statisticians must question whether their data tells the true story. As you fold your detective hat, consider what biases and errors might hide the truth in data collection."
        },
        quizzes: [],
        current: false
      },
      {
        id: "3-2",
        name: "Topic 3.2",
        description: "Introduction to Planning a Study",
        videos: [
          {
            url: "https://apclassroom.collegeboard.org/d/zntfxmmdts?sui=33,3",
            altUrl: "https://drive.google.com/file/d/121AAheYGEysRFC58l3KVJVkBVJmPo--U/view?usp=drive_link",
            completed: false,
            completionDate: null
          }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Blueprint Box",
            description: "Architect of statistical studies",
            videoUrl: "https://www.youtube.com/watch?v=K1Z6dPfK79E",
            reflection: "Your blueprint box holds the plans, just like careful study design holds the key to valid conclusions. As you create precise folds, think about how proper planning prevents poor performance in statistical studies."
        },
        quizzes: [
          {
            questionPdf: "pdfs/unit3/unit3_section3.2_quiz.pdf",
            answersPdf: "pdfs/unit3/unit3_section3.2_answers.pdf",
            quizId: "3-2_q1",
            completed: false,
            completionDate: null
          }
        ],
        current: false
      },
      {
        id: "3-3",
        name: "Topic 3.3",
        description: "Random Sampling and Data Collection",
        videos: [
          {
            url: "https://apclassroom.collegeboard.org/d/0we2mcfcam?sui=33,3",
            altUrl: "https://drive.google.com/file/d/1ogJAzU5hvGomK2eZGCkMza7EOpU67BaT/view?usp=drive_link",
            completed: false,
            completionDate: null
          },
          {
            url: "https://apclassroom.collegeboard.org/d/ljd0cb2e7u?sui=33,3",
            altUrl: "https://drive.google.com/file/d/1jiVMlN3Y_xdARYHGB1ASbOSwroRfuFCB/view?usp=drive_link",
            completed: false,
            completionDate: null
          }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Spinning Top",
            description: "Random motion captures unpredictable sampling",
            videoUrl: "https://www.youtube.com/watch?v=uQj5o-wWzYw",
            reflection: "Your spinning top moves unpredictably, just like random sampling ensures every member of a population has an equal chance of selection. The beauty of randomness is that it eliminates bias and creates fair representation."
        },
        quizzes: [
          {
            questionPdf: "pdfs/unit3/unit3_section3.3_quiz.pdf",
            answersPdf: "pdfs/unit3/unit3_section3.3_answers.pdf",
            quizId: "3-3_q1",
            completed: false,
            completionDate: null
          }
        ],
        current: false
      },
      {
        id: "3-4",
        name: "Topic 3.4",
        description: "Potential Problems with Sampling",
        videos: [
          {
            url: "https://apclassroom.collegeboard.org/d/tndkb7he2i?sui=33,3",
            altUrl: "https://drive.google.com/file/d/1o3YuZt7Kai5qovHysWo4vaXlHp3WXtc9/view?usp=drive_link",
            completed: false,
            completionDate: null
          }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Broken Chain",
            description: "Links that fail reveal sampling weakness",
            videoUrl: "https://www.youtube.com/watch?v=kMJRjkgM-60",
            reflection: "A chain is only as strong as its weakest link, just like a study is only as good as its sampling method. As you create each link, think about how bias, non-response, and undercoverage can break the chain of statistical validity."
        },
        quizzes: [
          {
            questionPdf: "pdfs/unit3/unit3_section3.4_quiz.pdf",
            answersPdf: "pdfs/unit3/unit3_section3.4_answers.pdf",
            quizId: "3-4_q1",
            completed: false,
            completionDate: null
          }
        ],
        current: false
      },
      {
        id: "3-5",
        name: "Topic 3.5",
        description: "Introduction to Experimental Design",
        videos: [
          {
            url: "https://apclassroom.collegeboard.org/d/k19v0dbk86?sui=33,3",
            altUrl: "https://drive.google.com/file/d/1PVA-SIVNccjFYexZsUrHbdCps1wlKeBl/view?usp=drive_link",
            completed: false,
            completionDate: null
          },
          {
            url: "https://apclassroom.collegeboard.org/d/z5lwfxjjdv?sui=33,3",
            altUrl: "https://drive.google.com/file/d/1x43Gy-QtIflBQXHe39LqIkABco0qrkMi/view?usp=drive_link",
            completed: false,
            completionDate: null
          },
          {
            url: "https://apclassroom.collegeboard.org/d/0xfkk5691j?sui=33,3",
            altUrl: "https://drive.google.com/file/d/1pp-KwUGnBS-6RWvB4U5eKxopkCOYQ9KD/view?usp=drive_link",
            completed: false,
            completionDate: null
          }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Lab Coat",
            description: "Scientist's uniform for controlled experiments",
            videoUrl: "https://www.youtube.com/watch?v=RKOOy7BmKGM",
            reflection: "Like putting on a lab coat transforms you into a scientist, good experimental design transforms a simple question into rigorous research. Consider how randomization, control groups, and replication create the foundation of scientific discovery."
        },
        quizzes: [
          {
            questionPdf: "pdfs/unit3/unit3_section3.5_quiz.pdf",
            answersPdf: "pdfs/unit3/unit3_section3.5_answers.pdf",
            quizId: "3-5_q1",
            completed: false,
            completionDate: null
          }
        ],
        current: false
      },
      {
        id: "3-6",
        name: "Topic 3.6",
        description: "Selecting an Experimental Design",
        videos: [
          {
            url: "https://apclassroom.collegeboard.org/d/2ausyc2u4j?sui=33,3",
            altUrl: "https://drive.google.com/file/d/14I05d33AzFvCrjTAFSxtAlPiFLEuspZK/view?usp=drive_link",
            completed: false,
            completionDate: null
          },
          {
            url: "https://apclassroom.collegeboard.org/d/01da23635a?sui=33,3",
            altUrl: "https://drive.google.com/file/d/1DQZQMZVzesDILUqzVetIysD7DB94UYVT/view?usp=drive_link",
            completed: false,
            completionDate: null
          }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Multi-Compartment Box",
            description: "Organized sections for different treatments",
            videoUrl: "https://www.youtube.com/watch?v=J9wR-UuV1GU",
            reflection: "Your box has separate compartments, just like experimental designs organize subjects into different treatment groups. Each section serves a purpose - blocking, randomization, and control. Consider how proper organization leads to clear conclusions."
        },
        quizzes: [
          {
            questionPdf: "pdfs/unit3/unit3_section3.6_quiz.pdf",
            answersPdf: "pdfs/unit3/unit3_section3.6_answers.pdf",
            quizId: "3-6_q1",
            completed: false,
            completionDate: null
          }
        ],
        current: false
      },
      {
        id: "3-7",
        name: "Topic 3.7",
        description: "Inference and Experiments",
        videos: [
          {
            url: "https://apclassroom.collegeboard.org/d/cgkp7vw65d?sui=33,3",
            altUrl: "https://drive.google.com/file/d/10TnxIb09QzsRvYQm-G3eiWQ5CSrELuJz/view?usp=drive_link",
            completed: false,
            completionDate: null
          }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Crystal Ball",
            description: "Peer into the future with statistical inference",
            videoUrl: "https://www.youtube.com/watch?v=NDujHIGrw9M",
            reflection: "Your crystal ball seems to predict the future, just like statistical inference lets us make conclusions beyond our sample data. Through careful experimentation, we can see patterns that extend to larger populations - it's like statistical magic!"
        },
        quizzes: [
          {
            questionPdf: "pdfs/unit3/unit3_section3.7_quiz.pdf",
            answersPdf: "pdfs/unit3/unit3_section3.7_answers.pdf",
            quizId: "3-7_q1",
            completed: false,
            completionDate: null
          }
        ],
        current: false
      },
      {
        id: "3-capstone",
        name: "Unit 3 Progress Check",
        description: "Capstone Assessment",
        videos: [],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Tessellation Pattern",
            description: "🌟 Unit 3 Capstone Challenge - Perfect fit for data collection mastery!",
            videoUrl: "https://www.youtube.com/watch?v=Yr9_JQGpzqY",
            reflection: "Congratulations! Like tessellation pieces that fit together perfectly with no gaps or overlaps, you've mastered how to collect data that fits together to reveal truth. Each piece represents a key concept: sampling, bias, experiments, and inference. Together they create a beautiful pattern of statistical understanding!"
        },
        quizzes: [
          {
            questionPdf: "pdfs/unit3/unit3_pc_frq_quiz.pdf",
            answersPdf: "pdfs/unit3/unit3_pc_frq_answers.pdf",
            quizId: "3-capstone_q1",
            completed: false,
            completionDate: null
          },
          {
            questionPdf: "pdfs/unit3/unit3_pc_mcq_parta_answers.pdf",
            answersPdf: null,
            quizId: "3-capstone_q2",
            completed: false,
            completionDate: null
          },
          {
            questionPdf: "pdfs/unit3/unit3_pc_mcq_partb_answers.pdf",
            answersPdf: null,
            quizId: "3-capstone_q3",
            completed: false,
            completionDate: null
          }
        ],
        isCapstone: true,
        current: false
      }
      // --- END OF PASTED Unit 3 DATA ---
    ]
  },
  {
    unitId: 'unit4',
    displayName: "Unit 4: Probability, Random Variables, and Probability Distributions",
        examWeight: "10-20%",
    topics: [
      {
        id: "4-1",
        name: "Topic 4.1",
        description: "Introducing Statistics: Random and Non-Random Patterns?",
        videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/7vn9faj6p9?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1lNfQZIrnUbG6JkCzw4wB-kcYNHpckwc-/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Magic 8-Ball",
        description: "Shake up your understanding of randomness",
        videoUrl: "https://www.youtube.com/watch?v=ZnDo5xqR7f8",
        reflection: "Your magic 8-ball reveals answers unpredictably, just like truly random patterns have no discernible order. As you fold this spherical puzzle, consider how our brains seek patterns even in pure randomness - but statistics helps us distinguish real patterns from illusion."
    },
    quizzes: [],
    current: false
  },
  {
    id: "4-2",
    name: "Topic 4.2",
    description: "Estimating Probabilities Using Simulation",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/lbulj7eskd?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1qdvG72sMnfrQAavaoLV7x4wa1o_uE5Eh/view?usp=drive_link",
            completed: false,
            completionDate: null
        },
        {
            url: "https://apclassroom.collegeboard.org/d/v5phdup7pz?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1ksMiLGYx5cFCg1-Zosq4m_D_mlt2M7qo/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Computer Terminal",
        description: "Digital precision for probability simulation",
        videoUrl: "https://www.youtube.com/watch?v=TZhupDR1vLk",
        reflection: "Your computer terminal processes thousands of calculations, just like simulations run thousands of trials to estimate probabilities. Each fold represents a computational step that brings us closer to theoretical truth through empirical approximation."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.2_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.2_answers.pdf",
            quizId: "4-2_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
  },
  {
    id: "4-3",
    name: "Topic 4.3",
    description: "Introduction to Probability",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/3naih8n3ar?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1eAYcRNceHy01t7bmARB3vtTDZnNNqmOV/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Probability Wheel",
        description: "Spin through the foundations of chance",
        videoUrl: "https://www.youtube.com/watch?v=VzCW0Q2QJ7s",
        reflection: "Your wheel spins with perfect balance, demonstrating how probability assigns numerical values to chance events. Each section represents a different outcome, and the smooth rotation shows how probability theory provides the mathematical foundation for understanding uncertainty."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.3_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.3_answers.pdf",
            quizId: "4-3_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
},

// Unit 4 Topic 4.4
{
    id: "4-4",
    name: "Topic 4.4",
    description: "Mutually Exclusive Events",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/owppp11zpq?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1TRJBAVaIbAWWLREvsDgRCxf0sNcFkpxf/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Locked Treasure Chest",
        description: "Events that cannot happen together",
        videoUrl: "https://www.youtube.com/watch?v=YPdYj7X5z2o",
        reflection: "Your treasure chest can only be either locked OR unlocked - never both simultaneously. This perfectly represents mutually exclusive events: when one happens, the other cannot. The rigid lock mechanism shows how some events have an absolute either/or relationship."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.4_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.4_answers.pdf",
            quizId: "4-4_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
},

// Unit 4 Topic 4.5
{
    id: "4-5",
    name: "Topic 4.5",
    description: "Conditional Probability",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/d4g6056pk8?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1fpXLiPwBKO3kqppTWm4FpqjCcHX3Qf84/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Branching Tree",
        description: "Decisions that depend on previous outcomes",
        videoUrl: "https://www.youtube.com/watch?v=H0kT-mLhvF8",
        reflection: "Your tree branches in different directions based on earlier choices, just like conditional probability changes based on given information. Each branch point represents new knowledge that updates our understanding of what's likely to happen next."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.5_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.5_answers.pdf",
            quizId: "4-5_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
},

// Unit 4 Topic 4.6
{
    id: "4-6",
    name: "Topic 4.6",
    description: "Independent Events and Unions of Events",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/nsd56rqpjj?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1TwLZF8dM35fcduBwRzmQUWgSTCynk5tV/view?usp=drive_link",
            completed: false,
            completionDate: null
        },
        {
            url: "https://apclassroom.collegeboard.org/d/5dfvjr08nh?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1qOQsPzsOeNQJHu18PJwUbfsQyjrdP2pV/view?usp=drive_link",
            completed: false,
            completionDate: null
        },
        {
            url: "https://apclassroom.collegeboard.org/d/j9zx3pjmpi?sui=33,4",
            altUrl: null,
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Double Bridge",
        description: "Two paths that cross but don't interfere",
        videoUrl: "https://www.youtube.com/watch?v=UlOANi9k4fY",
        reflection: "Your double bridge has two independent pathways that can operate simultaneously without affecting each other, perfectly representing independent events. The union of both bridges creates new possibilities while maintaining their separate identities."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.6_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.6_answers.pdf",
            quizId: "4-6_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
},

// Unit 4 Topic 4.7
{
    id: "4-7",
    name: "Topic 4.7",
    description: "Introduction to Random Variables and Probability Distributions",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/qgm2j1noql?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1UgJNPPVuG8ZGUobUD-KfM_EQz9AKfgAX/view?usp=drive_link",
            completed: false,
            completionDate: null
        },
        {
            url: "https://apclassroom.collegeboard.org/d/a7hqt3u3mr?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1cpK16Dp_3xVifQQahdMiahq44Jha-FKc/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Variable Box",
        description: "Transform outcomes into numerical values",
        videoUrl: "https://www.youtube.com/watch?v=zfGf8d8ujfQ",
        reflection: "Your variable box takes in random outcomes and outputs numerical values, just like random variables assign numbers to chance events. The probability distribution shows how likely each possible value is - it's the mathematical portrait of uncertainty."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.7_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.7_answers.pdf",
            quizId: "4-7_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
},

// Unit 4 Topic 4.8
{
    id: "4-8",
    name: "Topic 4.8",
    description: "Mean and Standard Deviation of Random Variables",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/qcoxl3r54z?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1KgvrdwR0U9ScngjSq4AS7WJ2ecuQzswu/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Balance Scale",
        description: "Weighing expected values and spread",
        videoUrl: "https://www.youtube.com/watch?v=bJ3u7C2NGAU",
        reflection: "Your balance scale finds the perfect equilibrium point - the mean - while the range of motion shows variability. Just like expected value represents the 'balance point' of a probability distribution, and standard deviation measures how much the values spread around that center."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.8_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.8_answers.pdf",
            quizId: "4-8_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
},

// Unit 4 Topic 4.9
{
    id: "4-9",
    name: "Topic 4.9",
    description: "Combining Random Variables",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/fr03ec4ajm?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1welWQ8TTKlI1gBl4MrWzsd_NGeXZNanh/view?usp=drive_link",
            completed: false,
            completionDate: null
        },
        {
            url: "https://apclassroom.collegeboard.org/d/eekak8j8le?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1Jqewt6n4TxqMtoQ_AAOXYfzyq9gh-x6M/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Modular Flower",
        description: "Multiple petals unite in mathematical harmony",
        videoUrl: "https://www.youtube.com/watch?v=d7hgkYDqA9Y",
        reflection: "Your modular flower combines separate petals into one beautiful creation, just like combining random variables creates new distributions with predictable properties. Each petal maintains its identity while contributing to the whole - much like how variances add and means combine."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.9_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.9_answers.pdf",
            quizId: "4-9_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
},

// Unit 4 Topic 4.10
{
    id: "4-10",
    name: "Topic 4.10",
    description: "Introduction to the Binomial Distribution",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/wut3wgzwsd?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1JC95sdBTR6XF2W9STnF9ENg8ki85B2oM/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Binary Star System",
        description: "Two outcomes orbiting in perfect mathematical dance",
        videoUrl: "https://www.youtube.com/watch?v=YnfCMrCyzPQ",
        reflection: "Your binary star system has exactly two stars - success and failure - just like binomial distributions count successes in fixed trials. The orbital pattern represents how probability of success (p) and number of trials (n) determine the entire distribution's behavior."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.10_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.10_answers.pdf",
            quizId: "4-10_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
},

// Unit 4 Topic 4.11
{
    id: "4-11",
    name: "Topic 4.11",
    description: "Parameters for a Binomial Distribution",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/5b5h0x75vo?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1Yb5FnTa4R-JbWUaAqNsWJtYtbMaWw2gd/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Parametric Equation Spiral",
        description: "Mathematical curves defined by n and p",
        videoUrl: "https://www.youtube.com/watch?v=wESmjQhJfKQ",
        reflection: "Your spiral unfolds according to precise mathematical parameters, just like binomial distributions are completely determined by n (trials) and p (probability). Change either parameter and the entire shape transforms - the beauty of mathematical precision made tangible."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.11_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.11_answers.pdf",
            quizId: "4-11_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
},

// Unit 4 Topic 4.12
{
    id: "4-12",
    name: "Topic 4.12",
    description: "The Geometric Distribution",
    videos: [
        {
            url: "https://apclassroom.collegeboard.org/d/bqu99yuglu?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1PVmey_huN37gyeaxXfKMOJRKhdWpPY_N/view?usp=drive_link",
            completed: false,
            completionDate: null
        },
        {
            url: "https://apclassroom.collegeboard.org/d/pjrxy0uy47?sui=33,4",
            altUrl: "https://drive.google.com/file/d/1ZsUp6flFbcAnpDP6U2Jj_3iBbi3rfkjz/view?usp=drive_link",
            completed: false,
            completionDate: null
        }
    ],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Geometric Pattern Tile",
        description: "Waiting for the first success in beautiful repetition",
        videoUrl: "https://www.youtube.com/watch?v=Q0cWHaMVsH8",
        reflection: "Your geometric tile creates patterns through repetition until a specific condition is met, perfectly representing geometric distributions that count trials until the first success. The beautiful repeating pattern shows how each trial is independent but building toward an inevitable outcome."
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_section4.12_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_section4.12_answers.pdf",
            quizId: "4-12_q1",
            completed: false,
            completionDate: null
        }
    ],
    current: false
},

// Unit 4 Capstone
{
    id: "4-capstone",
    name: "Unit 4 Progress Check",
    description: "Capstone Assessment",
    videos: [],
    blooket: {
        url: "", // To be provided
        completed: false,
        completionDate: null
    },
    origami: {
        name: "Probability Rose (Advanced)",
        description: "🌟 Unit 4 Capstone Challenge - Mathematical beauty in full bloom!",
        videoUrl: "https://www.youtube.com/watch?v=6Ow_l8C1O3I",
        reflection: "Congratulations! Like this intricate rose that blooms with mathematical precision, you've mastered the elegant beauty of probability theory. Each petal represents a key concept: random variables, distributions, independence, and parameters. Together they form the most beautiful mathematical flower - where chance meets certainty in perfect harmony!"
    },
    quizzes: [
        {
            questionPdf: "pdfs/unit4/unit4_pc_frq_quiz.pdf",
            answersPdf: "pdfs/unit4/unit4_pc_frq_answers.pdf",
            quizId: "4-capstone_q1",
            completed: false,
            completionDate: null
        },
        {
            questionPdf: "pdfs/unit4/unit4_pc_mcq_parta_answers.pdf",
            answersPdf: null,
            quizId: "4-capstone_q2",
            completed: false,
            completionDate: null
        },
        {
            questionPdf: "pdfs/unit4/unit4_pc_mcq_partb_answers.pdf",
            answersPdf: null,
            quizId: "4-capstone_q3",
            completed: false,
            completionDate: null
        },
        {
            questionPdf: "pdfs/unit4/unit4_pc_mcq_partc_answers.pdf",
            answersPdf: null,
            quizId: "4-capstone_q4",
            completed: false,
            completionDate: null
        }
    ],
    isCapstone: true,
    current: false
  }
]
  },
  {
    unitId: 'unit5',
    displayName: "Unit 5: Sampling Distributions",
    examWeight: "7-12%",
  topics: [
    {
      id: "5-1",
      name: "Topic 5.1",
      description: "Introducing Statistics: Why Is My Sample Not Like Yours?",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/951j439qxl?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1QtdgRvz6FDzTKK4UgACKVxdqJMyZDGR8/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Kaleidoscope Mandala",
          description: "Infinite variations from sampling diversity",
          videoUrl: "https://www.youtube.com/watch?v=EHQuOC_LckA",
          reflection: "Your kaleidoscope creates endless unique patterns, just like every sample produces slightly different results from the same population. Each turn reveals new beauty while maintaining underlying mathematical structure - the essence of sampling variation captured in artistic form."
      },
      quizzes: [],
      current: false
    },
    {
      id: "5-2",
      name: "Topic 5.2",
      description: "The Normal Distribution, Revisited",
      videos: [
        {
              url: "https://apclassroom.collegeboard.org/d/3ahfseusno?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1JFYjH0zXcPRk4Z18dTnbqWQLhu6IM_y3/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/xas8ymbml4?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1pRBVyjLPY1aEPGbkTdYzt5aPlQIy9FDW/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/5cjfnynb4w?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1HVGa0OuHML6pHhGdp4UOln6oncX3n53_/view?usp=drive_link",
          completed: false,
          completionDate: null
        }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Golden Ratio Nautilus",
          description: "Perfect spiral of mathematical beauty",
          videoUrl: "https://www.youtube.com/watch?v=iKhKiXp7MKY",
          reflection: "Your nautilus shell follows the golden ratio in its spiral growth, just like the normal distribution follows precise mathematical laws. This ancient form represents how nature and statistics both create beauty through mathematical perfection - the normal curve's timeless elegance made manifest."
      },
      quizzes: [
        {
              questionPdf: "pdfs/unit5/unit5_section5.2_quiz.pdf",
              answersPdf: "pdfs/unit5/unit5_section5.2_answers.pdf",
              quizId: "5-2_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "5-3",
      name: "Topic 5.3",
      description: "The Central Limit Theorem",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/sayt12b4ew?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1N5xTQ9hpOwIDTxbF0AxIzPxxaCbmOWaA/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/7vvumt4qzm?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1Lrf2azQI_qx0zLOyp0Yn-TS11zK4fb5u/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Converging Galaxy",
          description: "Chaos transforms into order through the cosmic dance",
          videoUrl: "https://www.youtube.com/watch?v=fJOiXiflSEU",
          reflection: "Your galaxy spirals from chaos into perfect symmetry, just like the Central Limit Theorem transforms any distribution into normality through the magic of averaging. No matter where you start, increasing sample size leads to the same beautiful destination - statistical universality made visible."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit5/unit5_section5.3_quiz.pdf",
              answersPdf: "pdfs/unit5/unit5_section5.3_answers.pdf",
              quizId: "5-3_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "5-4",
      name: "Topic 5.4",
      description: "Biased and Unbiased Point Estimates",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/0k9y4dbl6i?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1n0CE4BjYdx_bRDz-iEH2FyK7sfgcG3Mj/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Truth vs. Illusion Mirror",
          description: "Reflections that reveal or distort reality",
          videoUrl: "https://www.youtube.com/watch?v=WNbsz5zqt6E",
          reflection: "Your mirror can show true reflections or create optical illusions, perfectly representing how estimators can be unbiased (showing truth) or biased (creating systematic distortions). The art lies in crafting statistical mirrors that always reflect reality accurately."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit5/unit5_section5.4_quiz.pdf",
              answersPdf: "pdfs/unit5/unit5_section5.4_answers.pdf",
              quizId: "5-4_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "5-5",
      name: "Topic 5.5",
      description: "Sampling Distributions for Sample Proportions",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/n68xwj4nrz?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1y1iW173PGADlfmDuZuvUYwg-czY2FKCo/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/3hds9p8qlq?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1EosOt0OTG3faHrdnkhQy-SrFdAxRndjF/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Proportion Phoenix",
          description: "Rising from samples to reveal population truth",
          videoUrl: "https://www.youtube.com/watch?v=vJkbSWOT3oo",
          reflection: "Your phoenix rises magnificently, transforming individual sample proportions into the majestic flight pattern of a sampling distribution. Like the mythical bird reborn from ashes, p-hat distributions emerge from scattered samples to reveal the hidden beauty of population proportions."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit5/unit5_section5.5_quiz.pdf",
              answersPdf: "pdfs/unit5/unit5_section5.5_answers.pdf",
              quizId: "5-5_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "5-6",
      name: "Topic 5.6",
      description: "Sampling Distributions for Differences in Sample Proportions",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/hl9fyvkpih?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1XufYZpotzaSRppEfFckSzr6mVavfTWoX/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/ik3wqrxnwg?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1_C6vTO44i3ypH5wU2XYU53BOa4whSZxW/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Dueling Dragons",
          description: "Two mythical forces measuring their eternal difference",
          videoUrl: "https://www.youtube.com/watch?v=bpbF7zy6s7I",
          reflection: "Your twin dragons dance in eternal opposition, measuring the space between their powers, just like difference distributions capture the space between two sample proportions. Their elegant choreography shows how statistical differences create their own beautiful, predictable patterns."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit5/unit5_section5.6_quiz.pdf",
              answersPdf: "pdfs/unit5/unit5_section5.6_answers.pdf",
              quizId: "5-6_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "5-7",
      name: "Topic 5.7",
      description: "Sampling Distributions for Sample Means",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/9a15613osy?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1ovisJH6Caxyyg8bLqPfGINveGYqQGD39/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/em70n6vdbf?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1J9UirY-l46WkrwlJRC-kX42vYd2t7_26/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Zen Garden Lotus",
          description: "Peaceful center emerging from chaotic waters",
          videoUrl: "https://www.youtube.com/watch?v=Dx7iV0Aj6jY",
          reflection: "Your lotus emerges serenely from muddy waters, finding perfect balance and beauty, just like sample means create tranquil normal distributions even when individual data points are wildly scattered. The x-bar distribution is statistics' zen garden - peaceful order from apparent chaos."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit5/unit5_section5.7_quiz.pdf",
              answersPdf: "pdfs/unit5/unit5_section5.7_answers.pdf",
              quizId: "5-7_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "5-8",
      name: "Topic 5.8",
      description: "Sampling Distributions for Differences in Sample Means",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/vdhw7lx8zh?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1zaan99AFqpAEwbvLob9LwBqV-dji4Yli/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/8tey1w8y00?sui=33,5",
              altUrl: "https://drive.google.com/file/d/1s-fZYap_45Cl2DKzsZV3l4UNs8RzCxNr/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Infinity Mobius Strip",
          description: "Endless dance of comparing mean differences",
          videoUrl: "https://www.youtube.com/watch?v=nSNBWEq6F8k",
          reflection: "Your Mobius strip has no beginning or end, flowing infinitely like the endless comparisons we can make between sample means. This topological marvel represents how difference distributions continue the beautiful dance started by individual sampling distributions - mathematical infinity made touchable."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit5/unit5_section5.8_quiz.pdf",
              answersPdf: "pdfs/unit5/unit5_section5.8_answers.pdf",
              quizId: "5-8_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "5-capstone",
      name: "Unit 5 Progress Check",
      description: "Capstone Assessment",
      videos: [],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Cosmic Mandala of Distributions",
          description: "🌟 Unit 5 Capstone Challenge - The universe of sampling revealed!",
          videoUrl: "https://www.youtube.com/watch?v=M8pT8WzfFIs",
          reflection: "Congratulations! Like this cosmic mandala that reveals the hidden patterns of the universe, you've mastered how sampling distributions reveal the hidden patterns in statistics. Each geometric section represents a key concept: CLT, normality, means, proportions, and differences. Together they form the cosmic blueprint of statistical inference - where samples become windows to population truth!"
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit5/unit5_pc_frq_quiz.pdf",
              answersPdf: "pdfs/unit5/unit5_pc_frq_answers.pdf",
              quizId: "5-capstone_q1",
              completed: false,
              completionDate: null
          },
          {
              questionPdf: null,
              answersPdf: "pdfs/unit5/unit5_pc_mcq_parta_answers.pdf",
              quizId: "5-capstone_q2",
              completed: false,
              completionDate: null
          },
          {
              questionPdf: null,
              answersPdf: "pdfs/unit5/unit5_pc_mcq_partb_answers.pdf",
              quizId: "5-capstone_q3",
              completed: false,
              completionDate: null
          },
          {
              questionPdf: null,
              answersPdf: "pdfs/unit5/unit5_pc_mcq_partc_answers.pdf",
              quizId: "5-capstone_q4",
              completed: false,
              completionDate: null
          }
      ],
      isCapstone: true,
      current: false
      }
      // --- END OF PASTED Unit 5 DATA ---
    ]
  },
  {
    unitId: 'unit6',
    displayName: "Unit 6: Inference for Categorical Data: Proportions",
        examWeight: "12-15%",
    topics: [
        {
            id: "6-1",
            name: "Topic 6.1",
            description: "Introducing Statistics: Why Be Normal?",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/w7b6pfew1i?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1fKcwvZJ-k_1_W4oNdavj1PhE5HdxpwiA/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Master's Bell Curve Sculpture",
                description: "Architectural monument to statistical normality",
                videoUrl: "https://www.youtube.com/watch?v=fBJq_TfPnys",
                reflection: "Your bell curve sculpture stands as a monument to statistical excellence, representing the pinnacle of inference mastery. Like a master architect who understands why certain proportions create timeless beauty, you now understand why normality creates the foundation for all statistical inference."
            },
            quizzes: [],
            current: false
          },
          {
            id: "6-2",
            name: "Topic 6.2",
            description: "Constructing a Confidence Interval for a Population Proportion",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/cue0tavkxg?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1Z1IVxhFEx4Bul3FfJHBqBSn8LyTDMfOB/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/sa1jzello1?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1fq3GJRjLgVz9HOo5_1SkHtCOd306KBrw/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/ho2mfeuu5x?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1jmaj_VpyrN_KyBLEm3rfPx8Bo-cQiEjG/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Precision Bridge Architecture",
                description: "Engineering confidence across uncertainty",
                videoUrl: "https://www.youtube.com/watch?v=KPHJSq4I-lM",
                reflection: "Your bridge spans the gap between sample and population with engineering precision, just like confidence intervals bridge the gap between what we observe and what we can confidently claim. Every strut and cable represents the mathematical precision needed to construct reliable inference."
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_section6.2_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_section6.2_answers.pdf",
                    quizId: "6-2_q1",
                    completed: false,
                    completionDate: null
                }
            ],
            current: false
          },
          {
            id: "6-3",
            name: "Topic 6.3",
            description: "Justifying a Claim Based on a Confidence Interval for a Population Proportion",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/5096or6fs1?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1jeFQcdB2pJN0iZbYzB_MZcvotx00A0mr/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/9nl593n5le?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1VkVgzdGiy73QAzXzBevf-Rb-kcFBRXNr/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/avzy7twn1u?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1Tv1o7BEvI0vaM8Ec09E2MuDjFwpUGo1X/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Judicial Scales of Evidence",
                description: "Weighing statistical claims with expert precision",
                videoUrl: "https://www.youtube.com/watch?v=8KWDqHjjLU4",
                reflection: "Your scales of justice weigh evidence with master-level precision, just like statistical experts use confidence intervals to adjudicate claims about population parameters. The balance represents the careful deliberation required for sound statistical judgment - evidence must tip the scales convincingly."
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_section6.3_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_section6.3_answers.pdf",
                    quizId: "6-3_q1",
                    completed: false,
                    completionDate: null
                }
            ],
            current: false
          },
          {
            id: "6-4",
            name: "Topic 6.4",
            description: "Setting Up a Test for a Population Proportion",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/pde094fkxp?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/11xz3nOZxcbyVkG5zbq62s0A1Bjl4hSaL/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/mg1k959s5t?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1WcGkierE6UKER-UtAX-7HbGtwbmJlbZv/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Master Architect's Blueprint",
                description: "Designing the framework for hypothesis testing",
                videoUrl: "https://www.youtube.com/watch?v=JKJrSsLUEO8",
                reflection: "Your architectural blueprint shows master-level planning precision, laying the foundation for rigorous hypothesis testing. Every line represents careful consideration of null and alternative hypotheses, significance levels, and test conditions - the expert craftsmanship of statistical design."
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_section6.4_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_section6.4_answers.pdf",
                    quizId: "6-4_q1",
                    completed: false,
                    completionDate: null
                }
            ],
            current: false
          },
          {
            id: "6-5",
            name: "Topic 6.5",
            description: "Interpreting p-Values",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/xkvphnx7qu?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1K1SjzRvRK_7YmJCDwktQvqDKrZl0hXes/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/crg48hjihw?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1_C9FAHoG_78nqXAcBh-REYx7a79zC7Cl/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Oracle's Probability Prism",
                description: "Expert lens for reading statistical significance",
                videoUrl: "https://www.youtube.com/watch?v=8tqm2gdcPEE",
                reflection: "Your probability prism refracts p-values into clear interpretation, requiring the expert craftsmanship of a master statistician. Like an oracle reading signs, you must interpret the subtle language of probability with precision - understanding what p-values truly reveal about evidence against null hypotheses."
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_section6.5_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_section6.5_answers.pdf",
                    quizId: "6-5_q1",
                    completed: false,
                    completionDate: null
                }
            ],
            current: false
          },
          {
            id: "6-6",
            name: "Topic 6.6",
            description: "Concluding a Test for a Population Proportion",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/7tp98ixuv7?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1DMt9tQ1_QTmBEQtOZAAukjxirGcMBrUf/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/a2xb71gu0q?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1SwyAJpXZF5U7GUm2jUNMlx5dV9JfX5rx/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Expert Surgeon's Scalpel",
                description: "Precise cuts through statistical uncertainty",
                videoUrl: "https://www.youtube.com/watch?v=FTq4jDzPUIw",
                reflection: "Your surgeon's scalpel makes precise incisions through statistical uncertainty with expert skill. Like a master surgeon who knows exactly where to cut, you now wield the tools to make clean, decisive conclusions in hypothesis testing - separating truth from chance with clinical precision."
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_section6.6_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_section6.6_answers.pdf",
                    quizId: "6-6_q1",
                    completed: false,
                    completionDate: null
                }
            ],
            current: false
          },
          {
            id: "6-7",
            name: "Topic 6.7",
            description: "Potential Errors When Performing Tests",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/6tvg0n0vow?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1xbhiSuRKc4cfXW3Ppb7iItQoh1FM_QRX/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/0nelp4z6as?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/12sJrnadHPSRJ6RUauB-VWpUnhMEunCvH/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Master Blacksmith's Forge",
                description: "Tempering steel against Type I and Type II errors",
                videoUrl: "https://www.youtube.com/watch?v=QKGRWafDYns",
                reflection: "Your forge tempers statistical steel against the dual threats of Type I and Type II errors. Like a master blacksmith who understands that both too little and too much heat can ruin the blade, you now understand how to balance alpha and beta risks with expert craftsmanship."
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_section6.7_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_section6.7_answers.pdf",
                    quizId: "6-7_q1",
                    completed: false,
                    completionDate: null
                }
            ],
            current: false
          },
          {
            id: "6-8",
            name: "Topic 6.8",
            description: "Confidence Intervals for the Difference of Two Proportions",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/2722ixl0j3?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1mRfi7bTMSHtadxhLc2pAEmAMjmLpgvZn/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/ylbup5g6tt?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1cH5jaDvcEOCQ6RGeLZxaqGVOFFt1nT5F/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Twin Tower Comparison",
                description: "Architectural elegance in measuring differences",
                videoUrl: "https://www.youtube.com/watch?v=8jADQlM_bZI",
                reflection: "Your twin towers stand in measured comparison, their height difference captured with architectural precision. Like a master builder who can measure the gap between structures with expert accuracy, you now construct confidence intervals that capture the true difference between two population proportions."
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_section6.8_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_section6.8_answers.pdf",
                    quizId: "6-8_q1",
                    completed: false,
                    completionDate: null
                }
            ],
            current: false
          },
          {
            id: "6-9",
            name: "Topic 6.9",
            description: "Justifying a Claim Based on a Confidence Interval for a Difference of Population Proportions",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/dpnop7yqy7?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1LqtzJe8MTykYtX8mVcf4pbU1BtVcvwfb/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/px2wxa1pql?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1pBYs6pAkS_RyUVfNMxoaKvg8tuapkNFe/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Expert Detective's Magnifying Glass",
                description: "Examining evidence through expert investigation",
                videoUrl: "https://www.youtube.com/watch?v=IKHs-J8xoZY",
                reflection: "Your magnifying glass focuses expert attention on the crucial evidence within confidence intervals. Like a master detective who can discern truth from the smallest clues, you now use differences in proportions to build compelling cases about population relationships with investigative excellence."
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_section6.9_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_section6.9_answers.pdf",
                    quizId: "6-9_q1",
                    completed: false,
                    completionDate: null
                }
            ],
            current: false
          },
          {
            id: "6-10",
            name: "Topic 6.10",
            description: "Setting Up a Test for the Difference of Two Population Proportions",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/ycy5l5nclj?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1dIRMyHdePpkx7pCJFcAkRHIPj2Q8RtqG/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/etzlkyzo8u?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1SDYELDZa9kcJldq_qf1DsOOMhrjzfkio/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Master Engineer's Dual Compass",
                description: "Precision instruments for measuring comparative hypotheses",
                videoUrl: "https://www.youtube.com/watch?v=7VGlq0g-OkY",
                reflection: "Your dual compass draws perfect circles of comparison with engineering precision. Like a master engineer who uses matched instruments to ensure perfect alignment, you now set up hypothesis tests for differences between proportions with the expertise that comes only from true statistical craftsmanship."
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_section6.10_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_section6.10_answers.pdf",
                    quizId: "6-10_q1",
                    completed: false,
                    completionDate: null
                }
            ],
            current: false
          },
          {
            id: "6-11",
            name: "Topic 6.11",
            description: "Carrying Out a Test for the Difference of Two Population Proportions",
            videos: [
                {
                    url: "https://apclassroom.collegeboard.org/d/f1fyz21kv4?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1nJ5tGJ5m9ft1c8yieYqHjCQAvZLotnD1/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/xjd28ei312?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1rEKSvHoivPVRtsq63NOys-A5x-xtMjoG/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                },
                {
                    url: "https://apclassroom.collegeboard.org/d/8xwgbceh02?sui=33,6",
                    altUrl: "https://drive.google.com/file/d/1K9ZtMx2HhFlPWXq6Ip-7slWaY0zJDMOU/view?usp=drive_link",
                    completed: false,
                    completionDate: null
                }
            ],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Master Conductor's Baton",
                description: "Orchestrating the symphony of two-sample testing",
                videoUrl: "https://www.youtube.com/watch?v=fK8R5-_sHIw",
                reflection: "Your conductor's baton orchestrates the complex symphony of two-sample hypothesis testing with masterful precision. Like a virtuoso conductor who coordinates every instrument to create harmony, you now execute tests for proportion differences with the expertise of a statistical maestro."
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_section6.11_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_section6.11_answers.pdf",
                    quizId: "6-11_q1",
                    completed: false,
                    completionDate: null
                }
            ],
            current: false
          },
          {
            id: "6-capstone",
            name: "Unit 6 Progress Check",
            description: "Capstone Assessment",
            videos: [],
            blooket: {
                url: "", // To be provided
                completed: false,
                completionDate: null
            },
            origami: {
                name: "Master Craftsman's Workshop",
                description: "🌟 Unit 6 Capstone Challenge - The guild hall of statistical expertise!",
                videoUrl: "https://www.youtube.com/watch?v=kFQNOxNY_AE",
                reflection: "Congratulations! Like this master craftsman's workshop filled with expert tools and completed masterpieces, you've achieved the rank of statistical expert in proportion inference. Each tool represents a key mastery: confidence intervals, hypothesis tests, p-values, errors, and comparisons. You now possess the complete toolkit of expert craftsmanship in categorical data inference!"
            },
            quizzes: [
                {
                    questionPdf: "pdfs/unit6/unit6_pc_frq_quiz.pdf",
                    answersPdf: "pdfs/unit6/unit6_pc_frq_answers.pdf",
                    quizId: "6-capstone_q1",
                    completed: false,
                    completionDate: null
                },
                {
                    questionPdf: null,
                    answersPdf: "pdfs/unit6/unit6_pc_mcq_parta_answers.pdf",
                    quizId: "6-capstone_q2",
                    completed: false,
                    completionDate: null
                },
                {
                    questionPdf: null,
                    answersPdf: "pdfs/unit6/unit6_pc_mcq_partb_answers.pdf",
                    quizId: "6-capstone_q3",
                    completed: false,
                    completionDate: null
                },
                {
                    questionPdf: null,
                    answersPdf: "pdfs/unit6/unit6_pc_mcq_partc_answers.pdf",
                    quizId: "6-capstone_q4",
                    completed: false,
                    completionDate: null
                },
                {
                    questionPdf: null,
                    answersPdf: "pdfs/unit6/unit6_pc_mcq_partd_answers.pdf",
                    quizId: "6-capstone_q5",
                    completed: false,
                    completionDate: null
                }
            ],
            isCapstone: true,
            current: false
        }
    ]
  },
  {
    unitId: 'unit7',
    displayName: "Unit 7: Inference for Quantitative Data: Means",
    examWeight: "10-18%",
    topics: [
      {
        id: "7-1",
      name: "Topic 7.1",
      description: "Introducing Statistics: Should I Worry About Error?",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/3t8pczvov0?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1DRCmH8ENSMJwf75yG-M_hPnUWcF2uww4/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Dragon's First Awakening",
          description: "The legendary guardian stirs, sensing statistical uncertainty",
          videoUrl: "https://www.youtube.com/watch?v=8UZGN2FuLpI",
          reflection: "Like this awakening dragon who begins to sense disturbances in the realm, you've awakened to the reality of measurement error in means. The dragon's first breath represents your understanding that all measurements contain uncertainty, and true statistical mastery requires acknowledging this eternal truth."
      },
      quizzes: [],
      current: false
    },
    {
      id: "7-2",
      name: "Topic 7.2",
      description: "Constructing a Confidence Interval for a Population Mean",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/tapwqbw3dq?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1QOnc8wCvA10U9AvoAfl9ksdmnzC7rIi1/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/utu3y3bkag?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1CaDaKiUhi3e954ZcpVYUEVpWZdKgNi0o/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/pytemtrew7?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1eQUfrAiMrRCz1GpDzzQJ4ueBD3IQiD6z/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Phoenix of Confidence",
          description: "Rising from ashes of uncertainty with golden interval wings",
          videoUrl: "https://www.youtube.com/watch?v=vR7rrOj02rY",
          reflection: "Your phoenix soars majestically with wings of confidence, reborn from the ashes of sampling uncertainty. The golden feathers represent your mastery of confidence intervals for means - each plume a degree of confidence that captures the true population parameter within its majestic wingspan."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit7/unit7_section7.2_quiz.pdf",
              answersPdf: "pdfs/unit7/unit7_section7.2_answers.pdf",
              quizId: "7-2_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "7-3",
      name: "Topic 7.3",
      description: "Justifying a Claim About a Population Mean Based on a Confidence Interval",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/b1ywa7d80z?sui=33,7",
              altUrl: "https://drive.google.com/file/d/12f3_LWkXq3ezMJwDaFfGlxobizRKvj1I/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/xk5a52ajgk?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1ie_ChlondI_Y1tiTlEum5OZAGovX5R2u/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/lghtcfwy1x?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1VP_COxmeIU2S0jC24EgYgAnRqnsJz9B6/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Oracle's Sacred Scroll",
          description: "Ancient wisdom revealing truth through confidence intervals",
          videoUrl: "https://www.youtube.com/watch?v=F1i7CKPUZrQ",
          reflection: "The Oracle's scroll unfurls to reveal divine truths about population means. Its sacred runes represent your power to justify claims using confidence intervals - a legendary skill that allows you to read the statistical future and declare whether hypothesized values deserve belief or banishment."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit7/unit7_section7.3_quiz.pdf",
              answersPdf: "pdfs/unit7/unit7_section7.3_answers.pdf",
              quizId: "7-3_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "7-4",
      name: "Topic 7.4",
      description: "Setting Up a Test for a Population Mean",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/kyfddpb99h?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1ugAdsbFI9jyFAClJPphWtmva2DWNron2/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/2ufhcaan1t?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1093Dkx-RAxtiFVsWnnZ22rS1E6Tkhau6/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Titan's Battle Arena",
          description: "Where statistical hypotheses clash in epic combat",
          videoUrl: "https://www.youtube.com/watch?v=y8V4h6d5F6M",
          reflection: "In this colosseum of the gods, you've learned to construct the arena where statistical battles unfold. The null and alternative hypotheses stand as mighty titans, each representing a different truth about population means. You now wield the power to set up these legendary confrontations between competing claims."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit7/unit7_section7.4_quiz.pdf",
              answersPdf: "pdfs/unit7/unit7_section7.4_answers.pdf",
              quizId: "7-4_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "7-5",
      name: "Topic 7.5",
      description: "Carrying Out a Test for the Population Mean",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/6vq538ni85?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1h5r9eDoSwjLJye7PeHcz68AI5p-RDFeR/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/pc2evx8bvr?sui=33,7",
              altUrl: "https://drive.google.com/file/d/14CEJsy6KqSjm-kPilGkdhzSidogpeRf6/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/n1c6957pbw?sui=33,7",
              altUrl: "https://drive.google.com/file/d/13htsG5jUJZbwNCi9gAr1DEglECxHE-j5/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Thor's Mighty Hammer",
          description: "Wielding the legendary power of statistical testing",
          videoUrl: "https://www.youtube.com/watch?v=kqUyo_PLe5g",
          reflection: "Like Thor wielding Mjolnir, you now command the legendary power to execute hypothesis tests for population means. Your hammer strikes with the force of t-statistics and p-values, capable of shattering false claims and upholding statistical truth. Only those worthy of statistical mastery can lift this mythical weapon."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit7/unit7_section7.5_quiz.pdf",
              answersPdf: "pdfs/unit7/unit7_section7.5_answers.pdf",
              quizId: "7-5_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "7-6",
      name: "Topic 7.6",
      description: "Confidence Intervals for the Difference of Two Means",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/9i05oi3975?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1fIwr8VpJ1OfuMxmweLAYOL88CLUVpzvF/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/q64qp5gkag?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1dju4ZGQzNLFdFbR5oCoz4e9bzQHapIVk/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Twin Dragons of Comparison",
          description: "Legendary beasts whose differences reveal cosmic truths",
          videoUrl: "https://www.youtube.com/watch?v=FTGg7XwB5Sw",
          reflection: "These twin dragons, each representing a different population, dance around each other in eternal comparison. Their synchronized flight pattern reveals the confidence interval for the difference of means - a legendary technique that captures the true gap between populations within the cosmic dance of statistical uncertainty."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit7/unit7_section7.6_quiz.pdf",
              answersPdf: "pdfs/unit7/unit7_section7.6_answers.pdf",
              quizId: "7-6_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "7-7",
      name: "Topic 7.7",
      description: "Justifying a Claim About the Difference of Two Means Based on a Confidence Interval",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/rgaf9khpy1?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1bkfmDJMIaDxbg2XTAnRfdpamFMSCFfM-/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/fbif6dujgq?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1njeWzbSUOPWw0fZHWoYBU7uca9RbduBU/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Sage's Crystal Ball",
          description: "Peering through intervals to glimpse truth between populations",
          videoUrl: "https://www.youtube.com/watch?v=EJMBRpjYQx4",
          reflection: "Through the mystical crystal sphere, the ancient sage perceives whether population differences deserve belief. The swirling mists within represent confidence intervals - when zero disappears from view, the difference becomes clear. You've gained the legendary sight to justify claims about mean differences through interval wisdom."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit7/unit7_section7.7_quiz.pdf",
              answersPdf: "pdfs/unit7/unit7_section7.7_answers.pdf",
              quizId: "7-7_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "7-8",
      name: "Topic 7.8",
      description: "Setting Up a Test for the Difference of Two Population Means",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/kf1yd6gpdi?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1uLGTaehZ2mRh5el69Zu88SnsWfwiKwRR/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/9xskxlobvm?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1PAx6MB_d4DDsF5KHYAbxjOf7VUP0_-E5/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Kraken's Battle Throne",
          description: "Where legendary sea beasts clash in hypothesis warfare",
          videoUrl: "https://www.youtube.com/watch?v=8DPKJ6jCsYc",
          reflection: "From the depths of statistical uncertainty rises the Kraken's throne, where epic battles between population means unfold. The tentacles represent competing hypotheses about mean differences - you've learned to orchestrate these legendary confrontations, setting the stage for epic statistical warfare between populations."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit7/unit7_section7.8_quiz.pdf",
              answersPdf: "pdfs/unit7/unit7_section7.8_answers.pdf",
              quizId: "7-8_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "7-9",
      name: "Topic 7.9",
      description: "Carrying Out a Test for the Difference of Two Population Means",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/2kkmkj7ric?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1329C4d76DZoxl1yQQql_T9SAeoHedObV/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/j22ffmh28e?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1bJ-id40s9xbnD2UZp9bzfBAKxUwtOT2q/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/ox9np4xfys?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1BWoDK2CpQFkIjMsZtzrHb3VjiaJCQlw-/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Poseidon's Trident",
          description: "Three-pronged legendary weapon of statistical execution",
          videoUrl: "https://www.youtube.com/watch?v=_5Ck-4kNPJo",
          reflection: "Poseidon's trident strikes with the fury of the seven seas, each prong representing mastery of two-sample testing: conditions, calculations, and conclusions. Your legendary trident commands the tides of p-values and t-statistics, capable of devastating false null hypotheses with the raw power of statistical thunder."
      },
      quizzes: [
          {
              questionPdf: "pdfs/unit7/unit7_section7.9_quiz.pdf",
              answersPdf: "pdfs/unit7/unit7_section7.9_answers.pdf",
              quizId: "7-9_q1",
              completed: false,
              completionDate: null
          }
      ],
      current: false
    },
    {
      id: "7-10",
      name: "Topic 7.10",
      description: "Skills Focus: Selecting, Implementing, and Communicating Inference Procedures",
      videos: [
          {
              url: "https://apclassroom.collegeboard.org/d/p1yut2e5pp?sui=33,7",
              altUrl: "https://drive.google.com/file/d/19SaxraKugKUY6Q1xjbanPY81njG45xBH/view?usp=drive_link",
              completed: false,
              completionDate: null
          },
          {
              url: "https://apclassroom.collegeboard.org/d/dkerwbidln?sui=33,7",
              altUrl: "https://drive.google.com/file/d/1LiE45fJPP_XMvutGZzVtr3QfNicJedMi/view?usp=drive_link",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Merlin's Spellbook of Mastery",
          description: "The arcane tome containing all legendary inference techniques",
          videoUrl: "https://www.youtube.com/watch?v=7QCtBVRubrQ",
          reflection: "Merlin's ancient spellbook contains the complete mastery of statistical inference - from selection to implementation to communication. Each page represents a different skill: choosing procedures, checking conditions, executing techniques, and communicating results. You've earned the right to wield this legendary tome of statistical wizardry."
      },
      quizzes: [],
      current: false
    },
    {
      id: "7-capstone",
      name: "Unit 7 Progress Check",
      description: "Capstone Assessment",
      videos: [],
      quizzes: [
          {
              questionPdf: "pdfs/unit7/unit7_pc_frq_quiz.pdf",
              answersPdf: "pdfs/unit7/unit7_pc_frq_answers.pdf",
              quizId: "7-capstone_q1",
              completed: false,
              completionDate: null
          },
          {
              questionPdf: null,
              answersPdf: "pdfs/unit7/unit7_pc_mcq_parta_answers.pdf",
              quizId: "7-capstone_q2",
              completed: false,
              completionDate: null
          },
          {
              questionPdf: null,
              answersPdf: "pdfs/unit7/unit7_pc_mcq_partb_answers.pdf",
              quizId: "7-capstone_q3",
              completed: false,
              completionDate: null
          },
          {
              questionPdf: null,
              answersPdf: "pdfs/unit7/unit7_pc_mcq_partc_answers.pdf",
              quizId: "7-capstone_q4",
              completed: false,
              completionDate: null
          }
      ],
      blooket: {
          url: "", // To be provided
          completed: false,
          completionDate: null
      },
      origami: {
          name: "Legendary Hall of Means",
          description: "🌟 Unit 7 Capstone Challenge - The pantheon of quantitative mastery!",
          videoUrl: "https://www.youtube.com/watch?v=cCeeTfsm8cI",
          reflection: "Congratulations! You've built the Legendary Hall of Means, where the greatest statistical heroes gather. Each pillar represents a legendary mastery: confidence intervals, hypothesis tests, t-distributions, two-sample comparisons, and communication skills. You now stand among the legendary masters of quantitative inference!"
      },
      isCapstone: true,
      current: false
      }
    ]
  },
  {
    unitId: 'unit8',
    displayName: "Unit 8: Inference for Categorical Data: Chi-Square",
    examWeight: "2-5%",
    topics: [
      {
        id: "8-1",
        name: "Topic 8.1",
        description: "Introducing Statistics: Are My Results Unexpected?",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/ej0nzh9akp?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1kw-NYDqOcOUP8zvAsSuzIfuQ9KXow99C/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Renaissance Portrait Frame",
            description: "Elegant golden frame showcasing unexpected beauty",
            videoUrl: "https://www.youtube.com/watch?v=oOLr8aKoQT8",
            reflection: "Your ornate Renaissance frame displays the unexpected beauty in data patterns. Like art curators who identify masterpieces among ordinary paintings, you've learned to recognize when results are truly unexpected, worthy of the master's gallery of statistical discovery."
        },
        quizzes: [],
        current: false
      },
      {
        id: "8-2",
        name: "Topic 8.2",
        description: "Setting Up a Chi-Square Goodness of Fit Test",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/y7ikpxw7jp?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1Aup8w5fYTy69zWogOdtsXCO6kl6UNCCT/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/3uua57pe0x?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1Y7lopnXRCIbckoMM9csk8h1uCixX3LKd/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/z0hykwj3ge?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1FMDpI5aNP3UoB4YppkX3ba7llfvfhLba/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Gallery Curator's Easel",
            description: "Sophisticated display stand for statistical masterpieces",
            videoUrl: "https://www.youtube.com/watch?v=JKnXhgZLWTQ",
            reflection: "Your curator's easel presents the elegant framework of goodness-of-fit testing. Like preparing a gallery exhibition, you've learned to set up the perfect display for comparing observed versus expected categorical data, creating the foundation for statistical artistry."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit8/unit8_section8.2_quiz.pdf",
                answersPdf: "pdfs/unit8/unit8_section8.2_answers.pdf",
                quizId: "8-2_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "8-3",
        name: "Topic 8.3",
        description: "Carrying Out a Chi-Square Test for Goodness of Fit",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/9fkzxeaa5b?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1NemHYSwgnig3l3FUeyDYcDdt80aIYfd4/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/1rm91jvq1n?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1A3t8-9QW7ubguCrQdApGKf4GkZWb1qBi/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/nayiwphnlr?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1tqgSvs4IHjltdUWtH7WmyqbPWGCMMoXb/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Art Critic's Magnifying Monocle",
            description: "Refined lens for examining statistical masterpieces",
            videoUrl: "https://www.youtube.com/watch?v=xj3Jc_JCxGw",
            reflection: "Through your critic's monocle, you examine the fine details of goodness-of-fit execution. Like a distinguished art critic who spots authentic masterpieces through careful analysis, you now possess the refined skills to execute chi-square tests with gallery-worthy precision."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit8/unit8_section8.3_quiz.pdf",
                answersPdf: "pdfs/unit8/unit8_section8.3_answers.pdf",
                quizId: "8-3_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "8-4",
        name: "Topic 8.4",
        description: "Expected Counts in Two-Way Tables",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/hmyh34raqt?sui=33,8",
                altUrl: "https://drive.google.com/file/d/16dgP2zYBVUN2qzFlGRXKZ5aqErJv8FyQ/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Master's Grid Canvas",
            description: "Sophisticated foundation for two-dimensional artistic vision",
            videoUrl: "https://www.youtube.com/watch?v=pBXKhrhP1QQ",
            reflection: "Your master's grid canvas provides the elegant foundation for two-way table artistry. Like Renaissance masters who used mathematical grids to create perfect perspective, you now understand how expected counts create the structured foundation for categorical data analysis."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit8/unit8_section8.4_quiz.pdf",
                answersPdf: "pdfs/unit8/unit8_section8.4_answers.pdf",
                quizId: "8-4_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "8-5",
        name: "Topic 8.5",
        description: "Setting Up a Chi-Square Test for Homogeneity or Independence",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/0bnpabex6u?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1YHP2ipcZ5Vj35OVgZBYwExUjfU-yB2q1/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/kqfcpu28su?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1YHP2ipcZ5Vj35OVgZBYwExUjfU-yB2q1/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Venetian Masquerade Mask",
            description: "Elegant disguise revealing hidden statistical relationships",
            videoUrl: "https://www.youtube.com/watch?v=TKLKoYWKvBQ",
            reflection: "Your Venetian mask embodies the sophisticated artistry of setting up tests for homogeneity and independence. Like skilled artisans who craft elaborate masks to reveal or conceal identity, you now design elegant statistical frameworks to uncover hidden relationships between categorical variables."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit8/unit8_section8.5_quiz.pdf",
                answersPdf: "pdfs/unit8/unit8_section8.5_answers.pdf",
                quizId: "8-5_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "8-6",
        name: "Topic 8.6",
        description: "Carrying Out a Chi-Square Test for Homogeneity or Independence",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/gp64nrb7vq?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1DS_LxyMAABbjaN3VrMjBcDXy0PwbDaP3/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/88cjo73k9v?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1hm-K8vBzjXcx7hTdU2E8-0bIDhdUgiq_/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/1ea6gxau2t?sui=33,8",
                altUrl: "https://drive.google.com/file/d/1v9ENpspNX7MSsuE50ZXoQyizuGOJ35sp/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Sculptor's Finishing Chisel",
            description: "Precision tool for revealing the final statistical masterpiece",
            videoUrl: "https://www.youtube.com/watch?v=BQLDTjqYVlA",
            reflection: "Your sculptor's chisel brings statistical masterpieces to completion through precise execution of homogeneity and independence tests. Like Michelangelo revealing David from marble, you now possess the refined technique to carve away uncertainty and reveal the true relationships hidden within categorical data."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit8/unit8_section8.6_quiz.pdf",
                answersPdf: "pdfs/unit8/unit8_section8.6_answers.pdf",
                quizId: "8-6_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "8-7",
        name: "Topic 8.7",
        description: "Skills Focus: Selecting an Appropriate Inference Procedure for Categorical Data",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/v3kuvm87ss?sui=33,8",
                altUrl: "https://drive.google.com/file/d/175SWda7WXUWkt1EbLLDOwKWD-4Gn8llx/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Master Curator's Selection Guide",
            description: "Elegant handbook for choosing the perfect statistical display",
            videoUrl: "https://www.youtube.com/watch?v=QvyA_FwPeNI",
            reflection: "Your curator's guide represents the sophisticated art of selecting appropriate inference procedures for categorical data. Like master curators who choose the perfect pieces for prestigious exhibitions, you now possess the refined judgment to select the ideal statistical approach for any categorical analysis."
        },
        quizzes: [],
        current: false
      },
      {
        id: "8-capstone",
        name: "Unit 8 Progress Check",
        description: "Capstone Assessment",
        videos: [],
        quizzes: [
            {
                questionPdf: "pdfs/unit8/unit8_pc_frq.pdf",
                answersPdf: "pdfs/unit8/unit8_pc_frq_answers.pdf",
                quizId: "8-capstone_q1",
                completed: false,
                completionDate: null
            },
            {
                questionPdf: "pdfs/unit8/unit8_pc_mcq_partA_answers.pdf",
                answersPdf: null,
                quizId: "8-capstone_q2",
                completed: false,
                completionDate: null
            },
            {
                questionPdf: "pdfs/unit8/unit8_pc_mcq_partB_answers.pdf",
                answersPdf: null,
                quizId: "8-capstone_q3",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Grand Gallery Exhibition Hall",
            description: "🌟 Unit 8 Capstone Challenge - The prestigious showcase of categorical mastery!",
            videoUrl: "https://www.youtube.com/watch?v=jZq_dL3Qh4w",
            reflection: "Congratulations! You've opened your Grand Gallery Exhibition Hall, featuring the complete collection of categorical data mastery. Each wing displays a different expertise: goodness-of-fit testing, two-way tables, homogeneity tests, independence analysis, and procedure selection. Visitors from around the statistical world come to admire your sophisticated chi-square artistry!"
        },
        isCapstone: true,
        current: false
      }
    ]
  },
  {
    unitId: 'unit9',
    displayName: "Unit 9: Inference for Quantitative Data: Slopes",
        examWeight: "2-5%",
    topics: [
      {
        id: "9-1",
        name: "Topic 9.1",
        description: "Introducing Statistics: Do Those Points Align?",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/pdddxf5g7m?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1aMPs1uK5H7dvYoVaGh2TQLkdJGBAjoPd/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Conductor's Precision Baton",
            description: "The maestro's tool for orchestrating perfect linear harmony",
            videoUrl: "https://www.youtube.com/watch?v=lqMeEgF8cxs",
            reflection: "Your conductor's baton represents the virtuoso skill of detecting linear alignment in data points. Like a master conductor who can hear when musicians are perfectly in sync, you now possess the refined ear to determine when data points truly align in meaningful regression relationships."
        },
        quizzes: [],
        current: false
      },
      {
        id: "9-2",
        name: "Topic 9.2",
        description: "Confidence Intervals for the Slope of a Regression Model",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/juuru4ud2g?sui=33,9",
                altUrl: "https://drive.google.com/file/d/18e3wAS58P1SW1ok8tv3mtFPhmM3pCRwN/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/s7fp3ef6i1?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1LLyG6B71f0kAoo6QHxQPb1JGQ4hVwkKq/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/ote8293qie?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1UkOJyY-qEovCHQANK5jtZhzNNpa4iHbK/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Virtuoso's Golden Violin",
            description: "Strings of confidence resonating with slope precision",
            videoUrl: "https://www.youtube.com/watch?v=9V1Q2qBXbhc",
            reflection: "Your golden violin sings with the virtuosic mastery of slope confidence intervals. Each string represents a different aspect of regression inference - when played together with expert technique, they create the beautiful harmony of precise statistical estimation for linear relationships."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit9/unit9_section9.2_quiz.pdf",
                answersPdf: "pdfs/unit9/unit9_section9.2_answers.pdf",
                quizId: "9-2_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "9-3",
        name: "Topic 9.3",
        description: "Justifying a Claim About the Slope of a Regression Model Based on a Confidence Interval",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/umv9qc22kb?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1yWqjcF-IyHImRwTBV3cEIt13u0infZzI/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/ynbq7du52l?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1GqvcUy_AJRnTgDORWQkAVHSWjKpRxTaT/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Opera Singer's Crystal Microphone",
            description: "Amplifying the truth of slope claims with perfect pitch",
            videoUrl: "https://www.youtube.com/watch?v=8CRJF1q_e1k",
            reflection: "Your crystal microphone amplifies statistical truth with the clarity of a virtuoso opera singer. Like a prima donna who can hit the perfect note to justify any musical claim, you now wield the power to justify slope claims through confidence interval analysis with flawless statistical pitch."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit9/unit9_section9.3_quiz.pdf",
                answersPdf: "pdfs/unit9/unit9_section9.3_answers.pdf",
                quizId: "9-3_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "9-4",
        name: "Topic 9.4",
        description: "Setting Up a Test for the Slope of a Regression Model",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/quc0brlorr?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1LKHmLObjf3Nnszvk833XeLgH5JJ9F0_g/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/mqvjasjnfa?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1EBPBsC-oJXGaxn7jp1Q92IWetvaPNl1M/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Ballet Master's Performance Stage",
            description: "The elegant platform where slope hypotheses dance",
            videoUrl: "https://www.youtube.com/watch?v=DnNwwFhQDhE",
            reflection: "Your performance stage sets the scene for the elegant ballet of slope hypothesis testing. Like a ballet master who choreographs each movement with precision, you now design the perfect statistical stage where null and alternative hypotheses about slopes perform their graceful dance of inference."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit9/unit9_section9.4_quiz.pdf",
                answersPdf: "pdfs/unit9/unit9_section9.4_answers.pdf",
                quizId: "9-4_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "9-5",
        name: "Topic 9.5",
        description: "Carrying Out a Test for the Slope of a Regression Model",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/qepiqzyga4?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1aggJHSL5dJcEBYuo4Z7M_lvsoLvx4RYY/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/7rptngcenm?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1vct7foAM_sxXzRy4rviUox0DkQMm7Yf-/view?usp=drive_link",
                completed: false,
                completionDate: null
            },
            {
                url: "https://apclassroom.collegeboard.org/d/mwl7ag5ipr?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1h5OJH_mC6MUqmKbW_K-Xqx7IN3bjOscz/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Virtuoso Pianist's Grand Piano",
            description: "88 keys of statistical mastery in perfect harmony",
            videoUrl: "https://www.youtube.com/watch?v=kj9fM_5H2kU",
            reflection: "Your grand piano represents the virtuoso execution of slope hypothesis testing. Each of the 88 keys corresponds to a different statistical skill - when played by a true virtuoso, they create the magnificent symphony of t-statistics, p-values, and conclusions that determine the fate of slope hypotheses."
        },
        quizzes: [
            {
                questionPdf: "pdfs/unit9/unit9_section9.5_quiz.pdf",
                answersPdf: "pdfs/unit9/unit9_section9.5_answers.pdf",
                quizId: "9-5_q1",
                completed: false,
                completionDate: null
            }
        ],
        current: false
      },
      {
        id: "9-6",
        name: "Topic 9.6",
        description: "Skills Focus: Selecting an Appropriate Inference Procedure",
        videos: [
            {
                url: "https://apclassroom.collegeboard.org/d/mitydyeo84?sui=33,9",
                altUrl: "https://drive.google.com/file/d/1FcZcPYSLBXLkfBkpkyTfAWQ6tR_WxZ6o/view?usp=drive_link",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Symphony Conductor's Score",
            description: "The master composition for orchestrating all inference procedures",
            videoUrl: "https://www.youtube.com/watch?v=rlYvfkPTOhI",
            reflection: "Your conductor's score contains the complete symphony of statistical inference selection. Like Beethoven's Ninth Symphony that masterfully combines all musical elements, you now possess the virtuoso ability to select and orchestrate the perfect inference procedure for any statistical performance."
        },
        quizzes: [],
        current: false
      },
      {
        id: "9-capstone",
        name: "Unit 9 Progress Check",
        description: "Capstone Assessment",
        videos: [],
        quizzes: [
            {
                questionPdf: "pdfs/unit9/unit9_pc_frq.pdf",
                answersPdf: "pdfs/unit9/unit9_pc_frq_answers.pdf",
                quizId: "9-capstone_q1",
                completed: false,
                completionDate: null
            },
            {
                answersPdf: "pdfs/unit9/unit9_pc_mcq_partA_answers.pdf",
                quizId: "9-capstone_q2",
                completed: false,
                completionDate: null
            },
            {
                answersPdf: "pdfs/unit9/unit9_pc_mcq_partB_answers.pdf",
                quizId: "9-capstone_q3",
                completed: false,
                completionDate: null
            }
        ],
        blooket: {
            url: "", // To be provided
            completed: false,
            completionDate: null
        },
        origami: {
            name: "Carnegie Hall of Statistical Virtuosity",
            description: "🌟 Unit 9 Capstone Challenge - The world's most prestigious performance venue!",
            videoUrl: "https://www.youtube.com/watch?v=LrKCW_qRhHg",
            reflection: "Congratulations! You've built Carnegie Hall, where only the greatest statistical virtuosos perform. Your concert hall showcases the complete mastery of slope inference: detecting relationships, confidence intervals, justifying claims, hypothesis testing, and procedure selection. Standing ovations echo through the hall as audiences worldwide recognize your virtuoso statistical performance!"
        },
        isCapstone: true,
        current: false
      }
    ]
  },
  
]; // End of ALL_UNITS_DATA array

// Optional helper function to calculate totals (can be included in the same file)
// This function is used by displayRemainingItemCounts and displayFlexibleQuota
function getTotalItemCounts(allUnitsDataArray = ALL_UNITS_DATA) {
    let totalVideos = 0;
    let totalQuizzes = 0;

    if (!allUnitsDataArray || !Array.isArray(allUnitsDataArray)) {
        console.error("Invalid data provided to getTotalItemCounts in allUnitsData.js");
        return { totalVideos: 0, totalQuizzes: 0 };
    }

    allUnitsDataArray.forEach(unit => {
        if (unit.topics && Array.isArray(unit.topics)) {
            unit.topics.forEach(topic => {
                // Count videos
                if (topic.videos && Array.isArray(topic.videos)) {
                    // Ensure we count each unique video URL only once if necessary,
                    // or simply count the number of video objects if each represents a task.
                    // Current implementation counts each video object:
                    totalVideos += topic.videos.length;
                }
                // Count quizzes
                if (topic.quizzes && Array.isArray(topic.quizzes)) {
                    // Counts each quiz object as one item. Adjust if structure is different (e.g., multiple PDFs per quiz object).
                    totalQuizzes += topic.quizzes.length;
                }
            });
        }
    });
    console.log(`getTotalItemCounts calculated: ${totalVideos} videos, ${totalQuizzes} quizzes`); // Added log
    return { totalVideos, totalQuizzes };
}

// Example of how other scripts might use this (don't include this line if using getTotalItemCounts):
// const globalCounts = getTotalItemCounts();
