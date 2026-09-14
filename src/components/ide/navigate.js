/** Gmail compose link — same behavior as the Send-via-Gmail form button. */
export function gmailLink(to, subject = '', body = '') {
  return (
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  )
}

/** Toggle the floating terminal panel (VS Code style). */
export function toggleTerminal() {
  window.dispatchEvent(new CustomEvent('ide:terminal'))
}
