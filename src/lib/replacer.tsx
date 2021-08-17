export function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#x27')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function replaceToBr(src: string): string {
  return src.replace(/\n/g, '<br />')
}

export function replaceToAnchor(src: string): string {
  return src.replace(
    /((https?|ftp)(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+))/g,
    `<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`
  )
}

export default function replaceToHtml(str: string): string {
  return replaceToAnchor(replaceToBr(sanitize(str)))
}
