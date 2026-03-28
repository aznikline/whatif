# Overleaf Project

## Files
- `main.tex`: main paper source
- `main_neurips_2025.tex`: official NeurIPS 2025-ready shell that expects `neurips_2025.sty`
- `paper_body.tex`: shared paper body used for easier maintenance
- `refs.bib`: BibTeX bibliography database

## Overleaf Usage
1. Create a new Overleaf project.
2. Upload `main.tex` and `refs.bib`.
3. Select `pdfLaTeX` as the compiler.
4. Use `BibTeX` for references.

## Official NeurIPS 2025 Path
1. Start from the official NeurIPS 2025 author kit or add `neurips_2025.sty` to this directory.
2. Use `main_neurips_2025.tex` as the project entry file.
3. Keep `paper_body.tex` and `refs.bib` in the same folder.
4. Compile with `pdfLaTeX + BibTeX`.

## Notes
- The paper is now fully in English.
- The template now uses a two-column English `article` layout to approximate a NeurIPS-like conference-paper feel while preserving simple Overleaf compatibility.
- `main.tex` is now self-contained, so it no longer depends on `paper_body.tex` for standard Overleaf compilation.
- Citations use `natbib + plainnat`.
- The current version includes:
  - a formal English abstract
  - a more complete `Related Work` section
  - additional references on retrieval, tool use, and reflective agents
  - more consistent capitalization, terminology, and acronym expansion on first use
  - tighter prose and a more conference-style academic voice
  - a standard author / affiliation / email block with editable placeholders
  - an official NeurIPS 2025-ready shell file
  - a dedicated `Limitations and Future Directions` section
  - a `Broader Impacts and Practical Implications` section
  - a more thesis-driven, acceptance-oriented argument rather than a paper-by-paper survey
  - a standard `main.tex + refs.bib` project structure
- This is a NeurIPS-like layout, not the official NeurIPS style file. The current writing strategy is thesis-driven and acceptance-oriented: it learns from strong papers by borrowing their argumentative structure, precision, and rhetorical control rather than summarizing them in sequence. If needed, it can later be migrated to an official venue template after a first Overleaf compile pass.
