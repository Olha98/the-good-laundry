import { ChunkGraph } from 'webpack';

export const resizeObserver = new ResizeObserver(entries => {
  console.log('here');
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      const contentBoxSize = entry.contentBoxSize[0];
      h1Elem.style.fontSize = `${Math.max(1.5, contentBoxSize.inlineSize / 200)}rem`;
      pElem.style.fontSize = `${Math.max(1, contentBoxSize.inlineSize / 600)}rem`;
    } else {
      h1Elem.style.fontSize = `${Math.max(1.5, entry.contentRect.width / 200)}rem`;
      pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`;
    }
  }

  console.log('Size changed');
});

window.addEventListener('error', function (e) {
  console.error(e.message);
});
