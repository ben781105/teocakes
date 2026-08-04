import { Search, MessageCircle, PackageCheck } from 'lucide-react'
import Section from './layout/section'
const steps = [
  {
    icon: Search,
    title: 'Browse the menu',
    description: 'Look through available cakes, or describe a custom design you have in mind.',
  },
  {
    icon: MessageCircle,
    title: 'Send your order',
    description: "Submit your request and she'll confirm details and pricing with you directly.",
  },
  {
    icon: PackageCheck,
    title: 'Pick up your cake',
    description: 'Collect your cake on the agreed date, fresh and ready to celebrate.',
  },
]

function HowItWorks() {
  return (
    <Section id="howitworks">
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
        How it works
      </h2>
      <p className="text-gray-500 text-center mb-12">
        Ordering a cake is simple — no accounts, no complicated checkout.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map(({ icon: Icon, title, description }, index) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-orange-600 mb-1">
              Step {index + 1}
            </span>
            <h3 className="text-base font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 max-w-xs">{description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default HowItWorks