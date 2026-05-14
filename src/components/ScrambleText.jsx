import { useState } from 'react';
import { useScramble } from '../hooks/useScramble.js';

function extractText(node) {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node.props && node.props.children != null) return extractText(node.props.children);
  return '';
}

export function ScrambleText({ children, className = '', tag: Tag = 'span', hover: hoverProp, ...rest }) {
  const target = extractText(children);
  const [internalHover, setInternalHover] = useState(false);
  const controlled = hoverProp !== undefined;
  const hover = controlled ? hoverProp : internalHover;
  const text = useScramble(target, hover, 24);
  const handlers = controlled
    ? {}
    : {
        onMouseEnter: () => setInternalHover(true),
        onMouseLeave: () => setInternalHover(false),
      };
  return (
    <Tag className={`scramble ${className}`} {...handlers} {...rest}>
      {text}
    </Tag>
  );
}
