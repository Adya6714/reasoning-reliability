yeah agreed, that drop was the most interesting thing in v1 honestly. it's already partly in v2: format/protocol is a planned factor, and thinking on vs off on Qwen gives the same contrast inside one model. I'll add your 3-level version (full working / brief / answer only) as a small baseline run across models, so every later variant has a reference effect size to compare against. thanks!

fair point, they're different knobs. I'll keep them separate and cross them: thinking on/off × the 3 instruction levels, so I can tell "couldn't think" from "told not to show steps", and see if they interact. good catch

@Adya Srivastava agreed those reports are real. the issue is that GitHub, LessWrong and X are where the 17 types came from, so they can't also confirm the list. that's like grading a model on its training set. two checks would be independent:
• freeze the list now, then label failures from reports posted after today and count how many don't fit any type
• take agent logs nobody built around your taxonomy, e.g. a teammate's own runs, and label those blind
a big "doesn't fit" bucket tells you what the list misses.

Yep, I should've clarified this earlier. A confirmatory approach makes more sense here since every question is already designed around a specific dimension, so those labels are defined upfront.

The plan is:

- **Baseline:** 2PL with one overall ability score per model.
- **Main model:** Bifactor model with one general ability factor plus specific factors for each dimension.
- **Validation:** A dimension only counts if it explains failures beyond what general ability already explains, and the bifactor model provides a better fit than the baseline.

I'll run the power simulations using the bifactor model itself, so we can establish how many questions are needed per dimension. I'll update the design doc accordingly. Thanks!

Son of Anton
APP 1 minute ago
@Adya Srivastava one risk with padding the pool with small models and early checkpoints: they sit near the floor on most items, which can fake structure.
• if one dimension's items are harder overall, weak models fail that block almost entirely. the bifactor fit can read that difficulty gap as a specific factor.
• so the sim should use the real ability spread of the pool you'd actually run, with item difficulty roughly matched across dimensions
• also simulate data with zero specific factors and count how often the bifactor model still beats 2PL. that false-positive rate tells you whether a win means anything
Adya Srivastava
Just now
Agreed on all three. I'll match item difficulty across dimensions (using the 30–80% performance band per model), run simulations using the actual ability distribution from the pilot pool, and include a null simulation with no specific factors to estimate the false-positive rate before trusting any bifactor improvement.
Fair, it's intentional. Even if a habit doesn't transfer, it's still worth understanding and fixing. But I agree this should be explicit. I'll add hidden-family prediction as a checkpoint at the end of Phase 1, so Phases 2–3 proceed with a clear picture of whether these habits generalise. Updating the roadmap.

yep, that's why the design rule is "hold harness and format fixed when measuring the model". every test runs one minimal scaffold: same prompt wrapper, same tool schema and answer format, full context with no compaction or memory tricks, identical across models. harness effects become their own experiment later (stage 4), not noise in the profile.
I'll add your check too: run one item subset under two scaffolds and see if model rankings hold (Kendall W). if they flip, the test is measuring the harness

@Adya Srivastava with only two scaffolds, use Kendall's tau or Spearman's rho on the two model rankings. Kendall's W is built for 3+ rankers, and with two it's just (rho + 1)/2, so it adds nothing and hides the sign. With ~8 models the rank correlation will be noisy, so bootstrap over items and report a confidence interval.
good catch, W is pointless with two rankers. switching to Kendall's tau (and Spearman's rho) between the two scaffold rankings, with a bootstrap over items for the interval
@Adya Srivastava one catch with the expansion plan: OLMo stages, sizes and thinking on/off are close relatives of a few base models, so 20 variants might behave more like 5 or 6 independent models.

• in the model-item regression, add a random effect per model family, so siblings share a family-level term and the confidence interval for B3 over B2 reflects the number of families
• as a sensitivity check, also report B3 vs B2 using one variant per family. if the gain only shows up with all the siblings included, it is probably family-specific behaviour rather than a general habit

more model-item pairs help pin down the demand side of the interaction, but the ability side still depends on how many distinct models you have
I'll pin both down in the doc before building anything:
• matched baseline: same data source, steps and compute, mixed pool with no ability targeting
• strong baseline: what people actually use: a generic "check your work" harness, and plain RL on all generators pooled

the headline claim needs targeted > strong baseline. I'll also add a mismatch control: give a model the fix meant for a different weakness. if diagnosis really matters, the matched fix should beat the mismatched one at the same compute
agreed, the bars go into prereg before step 1. starting numbers (to tune on pilot noise):
• probes: AUROC at least +0.05 over the question-only probe and a text-only classifier, 95% CI excluding 0, on fresh twins
• patching: at least 50% of the pass/fail gap recovered from 3 or fewer layers
• steering: effect beyond the 95th percentile of the random-direction controls, rising with dose

I'll also check power first, so a null means "nothing there" rather than "too few items to see it"
