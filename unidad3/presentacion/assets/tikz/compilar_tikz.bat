@echo off
cd /d %~dp0
for %%f in (peralte_dcl pendulo_conico_dcl circular_vertical_dcl) do (
  pdflatex -interaction=nonstopmode -halt-on-error %%f.tex
  inkscape %%f.pdf --export-type=svg --export-filename=%%f.svg
)
pause
