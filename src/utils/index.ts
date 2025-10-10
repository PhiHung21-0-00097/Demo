export const analyzeComplexity = (code: string) => {
  if (!code) return null;

  const loopCount = (code.match(/for\s*\(|while\s*\(/g) || []).length;
  const nestedLoop = code.match(/for\s*\([^)]*\)\s*{[\s\S]*for\s*\(/);
  const recursive = code.match(/function\s+(\w+)\s*\([^)]*\)\s*{[^}]*\1\(/);

  if (recursive) return "O(2^n) (recursive)";
  if (nestedLoop) return "O(n²) (nested loop)";
  if (loopCount > 0) return "O(n) (loop)";
  if (/map|filter|reduce/.test(code)) return "O(n) (array)";
  return "O(1)";
};
