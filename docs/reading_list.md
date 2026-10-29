# Reading list

- ★ = read first. Titles and authors were listed from memory: check each with OpenResearch and confirm title, year and arXiv ID before citing.
- "(notes)" = from earlier planning notes; not independently checked.
- File each paper you read in `research-vault/papers/` with the NOTE template and score its `overlap`.

## A. Closest prior art
- ★ Golsefid 2026, Measuring Stability and Failure Behavior (notes)
- ★ The Missing Primitive 2026 (notes)
- ★ CogArena, Hou et al. 2026 (notes)
- ★ Beyond Scores 2026; SkillEval 2026 (notes)
- ★ Zhou et al. 2025, General Scales Unlock AI Evaluation with Explanatory and Predictive Power (ADeLe)
- ★ Burden et al. 2023, Bayesian triangulation of capabilities (arXiv 2309.11975)
- Jiang and Zhai 2026, Competence-Based Evaluation of Logical Reasoning (in repo)
- CogArena, Fernandez et al. 2026 (in repo)

## B. Probe 1: surface dependence and rewrites
- ★ Mirzadeh et al. 2024, GSM-Symbolic
- Li et al. 2024, GSM-Plus
- Shi et al. 2023, LLMs Can Be Easily Distracted by Irrelevant Context (GSM-IC)
- Huang et al. 2025, MATH-Perturb
- Srivastava et al. 2024, functional benchmarks and the reasoning gap
- Zhang et al. 2024, A Careful Examination of LLM Performance on Grade School Arithmetic (GSM1k)
- GSM-SEM 2026 (notes)
- ★ Wu et al. 2023, Reasoning or Reciting?
- Chen et al. 2024, Premise Order Matters in Reasoning with LLMs
- Sclar et al. 2023, Quantifying Sensitivity to Spurious Features in Prompt Design
- Berglund et al. 2023, The Reversal Curse
- ★ McCoy et al. 2023, Embers of Autoregression
- Nezhurina et al. 2024, Alice in Wonderland
- Williams and Huckle 2024, Easy Problems That LLMs Get Wrong
- Ancestors: ★ Ribeiro et al. 2020, CheckList; ★ Gardner et al. 2020, Contrast Sets; McCoy et al. 2019, Right for the Wrong Reasons (HANS); Geirhos et al. 2020, Shortcut Learning; Gururangan et al. 2018, annotation artifacts

## C. Probe 2: planning, state tracking, lookahead
- ★ Valmeekam et al. 2023, PlanBench
- Valmeekam et al. 2024, LLMs Still Can't Plan; Can LRMs?
- Kambhampati et al. 2024, LLM-Modulo Frameworks
- Xie et al. 2024, TravelPlanner; Zheng et al. 2024, NATURAL PLAN
- ★ Shojaee et al. 2025, The Illusion of Thinking, with Lawsen 2025, The Illusion of the Illusion of Thinking
- Kim and Schuster 2023, Entity Tracking in Language Models
- Prakash et al. 2024, Fine-Tuning Enhances Existing Mechanisms: Entity Tracking
- Liu et al. 2023, Transformers Learn Shortcuts to Automata
- Merrill et al. 2024, The Illusion of State in State-Space Models
- Pal et al. 2023, Future Lens; Wu et al. 2024, Do Language Models Plan Ahead for Future Tokens?
- Jenner et al. 2024, Evidence of Learned Look-Ahead in a Chess-Playing Neural Network
- Dziri et al. 2023, Faith and Fate
- Anil et al. 2022, length generalization

## D. Probe 3: memorization, exposure, contamination
- ★ Xie et al. 2024, On Memorization of LLMs in Logical Reasoning (Knights and Knaves)
- ★ Ruis et al. 2024, Procedural Knowledge in Pretraining Drives Reasoning
- ★ Razeghi et al. 2022, Impact of Pretraining Term Frequencies on Few-Shot Reasoning
- Kandpal et al. 2022, long-tail knowledge
- Liu et al. 2024, Infini-gram
- ★ OLMoTrace 2025 (AI2)
- Groeneveld et al. 2024, OLMo; Soldaini et al. 2024, Dolma; OLMo 2 and OLMo 3 reports
- Biderman et al. 2023, Pythia
- Carlini et al. 2022, Quantifying Memorization Across Neural Language Models
- Shi et al. 2023, Detecting Pretraining Data (Min-K% prob)
- Golchin and Surdeanu 2023, Time Travel in LLMs
- Ye, Allen-Zhu et al. 2024, Physics of Language Models Part 2.1
- Wang et al. 2024, Grokked Transformers are Implicit Reasoners
- LiReF (notes)

## E. Faithfulness
- ★ Lanham et al. 2023, Measuring Faithfulness in Chain-of-Thought Reasoning
- ★ Turpin et al. 2023, Language Models Don't Always Say What They Think
- Chen et al. 2025 (Anthropic), Reasoning Models Don't Always Say What They Think
- Arcuschin et al. 2025, Chain-of-Thought Reasoning in the Wild Is Not Always Faithful
- Pfau et al. 2024, Let's Think Dot by Dot
- Korbak et al. 2025, Chain of Thought Monitorability
- Radhakrishnan et al. 2023, question decomposition improves faithfulness

## F. Self-correction, uncertainty, pressure
- ★ Huang et al. 2023, LLMs Cannot Self-Correct Reasoning Yet
- Tyen et al. 2023, LLMs cannot find reasoning errors but can correct them
- Kamoi et al. 2024, When Can LLMs Actually Correct Their Own Mistakes?
- Kumar et al. 2024, SCoRe
- Madaan et al. 2023, Self-Refine; Shinn et al. 2023, Reflexion
- Wang et al. 2023, Can ChatGPT Defend Its Belief in Truth?
- Sharma et al. 2023, Towards Understanding Sycophancy
- ★ Kadavath et al. 2022, Language Models (Mostly) Know What They Know (arXiv 2207.05221)
- ★ Moreno Cencerrado et al. 2025, No Answer Needed: Predicting LLM Answer Accuracy from Question-Only Linear Probes (arXiv 2509.10625)
- Ferrando et al. 2025, Do I Know This Entity? (SAE features for knowledge awareness)
- Lin et al. 2022, teaching models to express uncertainty in words
- Farquhar et al. 2024, Semantic Entropy
- Wen et al. 2024, abstention survey
- Blog: Joshi 2026, Asking LLM for confidence (rumple.github.io)

## G. Psychometrics and ability structure
- ★ Burnell et al. 2023, Revealing the Structure of Language Model Capabilities
- ★ Ruan et al. 2024, Observational Scaling Laws
- Polo et al. 2024, tinyBenchmarks
- Kipnis et al. 2024, metabench
- Binz and Schulz 2023, Using Cognitive Psychology to Understand GPT-3
- Hagendorff 2023, Machine Psychology
- Coda-Forno et al. 2024, CogBench
- ★ Bean et al. 2025, Measuring What Matters: Construct Validity in LLM Benchmarks

## H. Eval rigor and noise
- ★ Miller 2024 (Anthropic), Adding Error Bars to Evals
- ★ Heineman et al. 2025 (AI2), Signal and Noise
- Madaan et al. 2024, Quantifying Variance in Evaluation Benchmarks
- He et al. 2025 (Thinking Machines), Defeating Nondeterminism in LLM Inference
- Biderman et al. 2024, Lessons from the Trenches on Reproducible Evaluation
- Singh et al. 2025, The Leaderboard Illusion

## I. Mech interp methods
- Elhage et al. 2022, Toy Models of Superposition
- Bricken et al. 2023, Towards Monosemanticity; Templeton et al. 2024, Scaling Monosemanticity
- ★ Lieberum et al. 2024, Gemma Scope (and Gemma Scope 2)
- Dunefsky et al. 2024, Transcoders Find Interpretable LLM Feature Circuits
- ★ Ameisen et al. 2025, Circuit Tracing; Lindsey et al. 2025, On the Biology of a Large Language Model
- Lindsey et al. 2024, Crosscoders
- Marks et al. 2024, Sparse Feature Circuits
- ★ Heimersheim and Nanda 2024, How to Use and Interpret Activation Patching; Zhang and Nanda 2023, patching best practices
- Kramár et al. 2024, AtP*
- Meng et al. 2022, ROME (causal tracing)
- Wang et al. 2022, Interpretability in the Wild (IOI)
- Belinkov 2022, probing classifiers; Belrose et al. 2023, Tuned Lens; logit lens (nostalgebraist 2020)
- Geiger et al., causal abstraction and Distributed Alignment Search
- Zou et al. 2023, Representation Engineering; Turner et al. 2023, ActAdd; Rimsky et al. 2024, CAA; Arditi et al. 2024, Refusal Is Mediated by a Single Direction
- Gurnee et al. 2023, sparse probing; Gurnee et al. 2024, Universal Neurons
- ICA Lens; Shabalin and Piotrowski 2026, neurons vs transcoders (in repo)
- Critiques: ★ Wu et al. 2025, AxBench; Smith et al. 2025 (DeepMind), negative SAE results; Heap et al. 2025, SAEs on random transformers; ★ Sharkey et al. 2025, Open Problems in Mechanistic Interpretability

## J. Mech interp of reasoning and failure
- ★ Nikankin et al. 2024, Arithmetic Without Algorithms
- Stolfo et al. 2023, mechanistic view of arithmetic reasoning
- Zhou et al. 2024, Fourier features for addition; Kantamneni and Tegmark 2025, LLMs use trigonometry to add
- Nanda et al. 2023, Progress Measures for Grokking
- Dutta et al. 2024, How to Think Step-by-Step
- ★ Bogdan et al. 2025, Thought Anchors
- Venhoff et al. 2025, steering vectors in thinking models
- ★ Orgad et al. 2024, LLMs Know More Than They Show
- Zhang et al. 2025, Reasoning Models Know When They're Right
- Azaria and Mitchell 2023, The Internal State of an LLM Knows When It's Lying
- Yang et al. 2024, latent multi-hop reasoning; Biran et al. 2024, Hopping Too Late
- Hao et al. 2024, Coconut

## K. Fixes: training and RL
- Wang et al. 2022, Self-Consistency
- ★ Lightman et al. 2023, Let's Verify Step by Step
- Zelikman et al. 2022, STaR
- DeepSeek-AI 2025, DeepSeek-R1; Lambert et al. 2024, Tülu 3
- ★ Yue et al. 2025, Does RL Really Incentivize Reasoning Beyond the Base Model?
- ★ Chu et al. 2025, SFT Memorizes, RL Generalizes
- Shao et al. 2025, Spurious Rewards
- Muennighoff et al. 2025, s1
- Snell et al. 2024, test-time compute scaling; Brown et al. 2024, Large Language Monkeys
- ★ Stojanovski et al. 2025, Reasoning Gym
- Wu et al. 2024, ReFT
- LLM-JEPA (Huang, LeCun, Balestriero) (notes); Subspace Tuning (in repo)

## L. Harnesses, agents, systems
- Yao et al. 2022, ReAct; Schick et al. 2023, Toolformer; Gao et al. 2022, PAL; Chen et al. 2022, Program of Thoughts; Yao et al. 2023, Tree of Thoughts
- Khattab et al. 2023, DSPy
- ★ Yao et al. 2024, tau-bench (pass^k)
- ★ Kapoor et al. 2024, AI Agents That Matter
- Jimenez et al. 2023, SWE-bench; Yang et al. 2024, SWE-agent
- ★ Kwa et al. 2025 (METR), Measuring AI Ability to Complete Long Tasks
- ★ Cemri et al. 2025, Why Do Multi-Agent LLM Systems Fail?
- Zhu et al. 2025, Establishing Best Practices for Building Rigorous Agentic Benchmarks

## M. Unusual angles on failure
- McKenzie et al. 2023, Inverse Scaling
- Liu et al. 2023, Lost in the Middle
- ★ Liu et al. 2024, Mind Your Step (by Step)
- Chen et al. 2024, Do NOT Think That Much for 2+3=?; Wang et al. 2025, underthinking
- Lake and Baroni 2018, SCAN
- Chollet 2019, On the Measure of Intelligence

## N. Benchmark and generator sources
- ★ Zhu et al. 2023, DyVal
- Zhou et al. 2025, GSM-Infinite
- Fan et al. 2023, NPHardEval
- Gu et al. 2024, CRUXEval; Jain et al. 2024, LiveCodeBench
- White et al. 2024, LiveBench; Balunović et al. 2025, MathArena
- Lin et al. 2025, ZebraLogic
- Suzgun et al. 2022, BIG-Bench Hard; Kazemi et al. 2025, BIG-Bench Extra Hard
- Markeeva et al. 2024, CLRS-Text
- Jev benchmark paper (arXiv 2610.11978) (notes)

## O. Human cognition background
- McGrew 2009, CHC theory
- Miyake et al. 2000, executive functions
- Polya 1945, How to Solve It; Schoenfeld 1985, Mathematical Problem Solving
- Gick and Holyoak 1980, 1983, analogical transfer
- ★ Kotovsky, Hayes and Simon 1985, Why Are Some Problems Hard?
- Shallice 1982, Tower of London
- Fodor and Pylyshyn 1988; Lake et al. 2017, Building Machines That Learn and Think Like People
- Flavell 1979, metacognition; Johnson et al. 1993, source monitoring
- Lieder and Griffiths 2020, resource-rational analysis; Gershman, What Makes Us Smart
- Brown and Walter, The Art of Problem Posing

## P. Companies and labs
- Interpretability: Anthropic, Google DeepMind (Gemma Scope), Goodfire, Transluce, EleutherAI
- Evals: METR, Epoch AI, Apollo Research, Scale AI, AI2
- RL environments: Prime Intellect (verifiers, Environments Hub), Nous Research (Atropos), Hugging Face (Open-R1)
- Reliability, routing, eval ops: Martian, Not Diamond, Patronus AI, Haize Labs, Braintrust, LangSmith, Sierra, Harmonic, Thinking Machines, TypeSafe AI (Jev)
