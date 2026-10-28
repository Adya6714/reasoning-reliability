# Using this vault

Open the repository root folder in Obsidian so notes can link to `docs/`, `configs/`, and the literature notes. Start at [[research-vault/00_Home]].

## Adding a paper

1. Add the paper to Zotero using its DOI, arXiv ID, or publisher page. Let Zotero manage the PDF and metadata.
2. Create `research-vault/papers/AuthorYear_ShortTitle.md` from [[research-vault/templates/PAPER_NOTE]]. To insert it from Obsidian, enable **Settings → Core plugins → Templates**, then set **Settings → Templates → Template folder location** to `research-vault/templates`. Create a new note in `research-vault/papers/`, then run **Insert template** from the command palette and choose `PAPER_NOTE`.
3. Store DOI/arXiv/official URL and the Zotero item URI in YAML frontmatter. Tag all relevant dimensions, and keep independent item counts, variants, repeated calls, and annotations distinct.
4. Record verified findings with page/table/figure references. Separate what the authors measured from their interpretation and from your own ideas.
5. Add the paper under the appropriate dimension or cross-cutting section in [[research-vault/06_Literature_Index]]. A paper can appear under multiple dimensions.
6. Link the note from the relevant decision, probe, or hypothesis. Keep “idea suggested by paper” separate from “finding established by this project.”

Do not commit copyrighted PDFs. A Zotero URI can be opened from Obsidian when Zotero is installed. If a work is openly licensed and a local copy is useful, keep it in Zotero's managed storage or link to the official open copy.
