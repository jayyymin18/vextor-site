import badgeData from '../content/site-badges.json'

const badges = badgeData as {
  pageSpeed: { score: number; device: string; measuredAt: string; reportUrl: string }
  productHunt: { postUrl: string; badgeUrl: string } | null
}

export function SiteBadges() {
  const { pageSpeed, productHunt } = badges

  return (
    <div className="mt-6 flex flex-col items-start gap-3">
      <a
        href={pageSpeed.reportUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2 transition hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        aria-label={`View Lighthouse ${pageSpeed.device.toLowerCase()} performance report: ${pageSpeed.score} out of 100, measured ${pageSpeed.measuredAt}`}
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-emerald-700 text-sm font-bold text-emerald-800 dark:border-emerald-400 dark:text-emerald-300">
          {pageSpeed.score}
        </span>
        <span>
          <span className="block text-sm font-semibold">Lighthouse performance</span>
          <span className="block text-xs text-muted-foreground">
            {pageSpeed.device} · {pageSpeed.score}/100 · <time dateTime={pageSpeed.measuredAt}>4 Nov 2026</time>
          </span>
        </span>
      </a>
      {productHunt && (
        <a
          href={productHunt.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Vextor on Product Hunt"
        >
          <img
            src={productHunt.badgeUrl}
            alt="Vextor on Product Hunt — view the post and vote count"
            width="250"
            height="54"
            loading="lazy"
          />
        </a>
      )}
    </div>
  )
}
