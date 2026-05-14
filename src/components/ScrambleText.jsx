import { useState } from 'react';
import { useScramble } from '../hooks/useScramble.js';

function extractText(node) {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node.props && node.props.children != null) return extractText(node.props.children);
  return '';
}

export function ScrambleText({ children, className = '', tag: Tag = 'span', ...rest }) {
  const target = extractText(children);
  const [hover, setHover] = useState(false);
  const text = useScramble(target, hover, 24);
  return (
    <Tag
      className={`scramble ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {text}
    </Tag>
  );
}
