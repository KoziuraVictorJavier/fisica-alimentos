#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
for f in peralte_dcl pendulo_conico_dcl circular_vertical_dcl; do
  pdflatex -interaction=nonstopmode -halt-on-error "$f.tex"
  inkscape "$f.pdf" --export-type=svg --export-filename="$f.svg"
done
