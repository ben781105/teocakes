import Section from './layout/section'
function CallToAction() {
  const whatsappNumber = '256700000000'
  const message = encodeURIComponent("Hi! I'd like to order a cake.")

  return (
    <Section>

      <div className="relative border bg-orange-400 rounded-3xl z-10 h-full flex flex-col items-center justify-center text-center px-6 py-4">
        <span className="text-sm font-medium text-white/80 uppercase tracking-wide mb-3">
          Ordering made simple
        </span>
        <h2 className="text-white text-3xl md:text-4xl font-semibold max-w-xl">
          Order your cake directly on WhatsApp
        </h2>
        <p className="text-white/85 mt-3 max-w-md">
          No sign-ups, no waiting. Message us your order and we'll confirm availability, pricing, and pickup details right away.
        </p>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.552 4.115 1.516 5.844L0 24l6.328-1.492A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.996 0-3.865-.56-5.454-1.531l-.391-.232-4.062.958.972-3.96-.256-.406A9.706 9.706 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
          </svg>
          Order on WhatsApp
        </a>
      </div>
    </Section>
  )
}

export default CallToAction