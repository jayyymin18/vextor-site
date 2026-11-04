declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

let lastPageLocation = ''

export function trackPageView(pathname: string, title: string) {
  if (!window.gtag) return

  // Route changes run after the title is updated. Avoid duplicate StrictMode events
  // and exclude query strings and fragments from the page location.
  const pageLocation = `${window.location.origin}${pathname}`
  if (pageLocation === lastPageLocation) return

  window.gtag('event', 'page_view', {
    page_title: title,
    page_location: pageLocation,
    page_referrer: lastPageLocation || document.referrer.split(/[?#]/)[0],
  })
  lastPageLocation = pageLocation
}
