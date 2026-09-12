import { useState } from "react";
import { submitCustomRequest } from "../services/customCakeService";
import Section from "./layout/section";
const SIZE_OPTIONS = [
  "Small (serves 10-15)",
  "Medium (serves 15-25)",
  "Large (serves 25-40)",
  "Extra Large (serves 40+)",
  "Not sure yet",
];

const FLAVOR_OPTIONS = [
  "Vanilla",
  "Chocolate",
  "Red Velvet",
  "Carrot",
  "Lemon",
  "Fruit Cake",
  "Marble",
  "Other (specify in notes)",
];

const OCCASION_OPTIONS = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Baby Shower",
  "Graduation",
  "Corporate Event",
  "Other (specify in notes)",
];

const BUDGET_OPTIONS = [
  "Under 50K",
  "50K - 100K",
  "100K - 200K",
  "200K - 500K",
];

function CustomCakeForm() {
  const [form, setForm] = useState({
    name: "",
    phone_number: "",
    description: "",
    size: "",
    flavor: "",
    occasion: "",
    date_needed: "",
    budget: "",
    additional_message: "",
  });
  const [exactBudget, setExactBudget] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBudgetSelect = (opt) => {
    setExactBudget("");
    setForm({ ...form, budget: opt });
  };

  const handleExactBudgetChange = (e) => {
    // Strip everything but digits so people can't type letters, symbols,
    // negative signs, decimals, etc. Cap at 9 digits (~999,999,999 Ugx).
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 9);
    setExactBudget(digitsOnly);
    setForm({
      ...form,
      budget: digitsOnly
        ? `Ugx ${Number(digitsOnly).toLocaleString()} (exact)`
        : "",
    });
  };

  const buildWhatsappMessage = (data) => {
    const lines = [
      `🎂 *Custom Cake Request*`,
      ``,
      `Name: ${data.name}`,
      `Description: ${data.description}`,
    ];
    if (data.size) lines.push(`Size: ${data.size}`);
    if (data.flavor) lines.push(`Flavor: ${data.flavor}`);
    if (data.occasion) lines.push(`Occasion: ${data.occasion}`);
    if (data.date_needed) lines.push(`Date needed: ${data.date_needed}`);
    if (data.budget) lines.push(`Budget: ${data.budget}`);
    if (data.additional_message)
      lines.push(``, `Note: ${data.additional_message}`);
    return lines.join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone_number || !form.description) {
      setError("Please fill in your name, phone number, and description.");
      return;
    }
    if (exactBudget && Number(exactBudget) <= 0) {
      setError("Please enter a valid budget amount.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      if (image) data.append("reference_image", image);

      const saved = await submitCustomRequest(data);

      const message = buildWhatsappMessage(saved);
      const whatsappUrl = `https://wa.me/256701234567?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting custom request:", err);
      setError(
        "Something went wrong submitting your request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-semibold">Request sent!</h3>
        <p className="text-sm text-gray-600 mt-2">
          We'll get back to you on WhatsApp shortly.
        </p>
      </div>
    );
  }

  const selectClass =
    "border border-cream-dark outline-0 focus:border-brick rounded-lg px-3 py-2 appearance-none";

  return (
    <Section className=" bg-cream px-0">
      <div className="max-w-3xl mx-auto bg-white py-6 px-4 rounded-lg border border-cream-dark ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4  mx-auto pb-4 "
        >
          {" "}
          <p className="text-center text-brick font-script text-2xl  lg:text-3xl">
            Custom and Ready Made
          </p>
          <h2 className="font-semibold text-center">Order Your Perfect Bake</h2>
          <p className="text-center">
            Got a cake idea that's not on our menu? Describe it below and we'll
            get back to you on WhatsApp with pricing and details.
          </p>
          <h3>1. Your Details</h3>
          <hr className="border-cream-dark" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Your Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border border-cream-dark outline-0 focus:border-brick rounded-lg px-3 py-2 "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">WhatsApp Number *</label>
              <input
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                className="border border-cream-dark outline-0 focus:border-brick rounded-lg px-3 py-2 "
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-5">
            <label className="text-sm font-medium">
              Describe what you want *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="border border-cream-dark outline-0 focus:border-brick rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <h3>2. Cake Details</h3>
          <hr className="border-cream-dark" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                Cake Size / Servings
              </label>
              <select
                name="size"
                value={form.size}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select a size</option>
                {SIZE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Flavor</label>
              <select
                name="flavor"
                value={form.flavor}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select a flavor</option>
                {FLAVOR_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Occasion</label>
              <select
                name="occasion"
                value={form.occasion}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select an occasion</option>
                {OCCASION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Date Needed</label>
              <input
                type="date"
                name="date_needed"
                value={form.date_needed}
                onChange={handleChange}
                className="border border-cream-dark outline-0 focus:border-brick rounded-lg px-3 py-2 "
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-medium">Budget (Ugx)</label>
            <div className="flex flex-wrap gap-2">
              {BUDGET_OPTIONS.map((opt) => {
                const isSelected = form.budget === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleBudgetSelect(opt)}
                    className={`px-3 py-2 rounded-full text-sm border transition-colors ${
                      isSelected
                        ? "bg-brick border-brick text-white"
                        : "bg-white border-cream-dark  hover:border-brick hover:bg-brick hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              inputMode="numeric"
              value={exactBudget}
              onChange={handleExactBudgetChange}
              placeholder="Or type an exact amount, e.g. 150,000"
              className="border border-cream-dark outline-0 focus:border-brick rounded-lg px-3 py-2  mt-1"
            />
            <p className="text-xs text-brick">
              Type an exact amount if you have a specific price in mind - this
              overrides the range above
            </p>
          </div>
          <h3>3. Upload Details</h3>
          <hr className="border-cream-dark" />
          <div className="flex flex-col gap-1 ">
            <label className="text-sm font-medium">Reference Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Additional Notes and special instructions
            </label>
            <textarea
              name="additional_message"
              value={form.additional_message}
              onChange={handleChange}
              rows={2}
              className="border border-cream-dark outline-0 focus:border-brick rounded-lg px-3 py-2 text-sm"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <span className="text-center">
            After submitting, admin will call or WhatsApp you to confirm order
            details.
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="w-[75%]  sm:w-[50%]  self-center bg-brick hover:bg-brick-hover hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-xl text-cream hover:text-white py-3 rounded-3xl disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md disabled:hover:bg-brick  disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Send Request via WhatsApp"}
          </button>
        </form>
      </div>
    </Section>
  );
}

export default CustomCakeForm;
