import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  ClipboardList,
} from "lucide-react";
import emailjs from "emailjs-com";

const FormPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    guests: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = "";

    switch (name) {
      case "email":
        if (value && !emailRegex.test(value))
          error = "Enter a valid email";
        break;

      case "phone":
        if (value && !phoneRegex.test(value))
          error = "Enter a valid 10-digit phone number";
        break;

      case "eventDate":
        if (value && value < today)
          error = "Please choose today or a future date";
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter a valid phone number";

    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.eventDate || formData.eventDate < today)
      newErrors.eventDate = "Please select a valid event date";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    emailjs
      .send(
        "service_rirk2et",
        "template_h2z8zu8",
        formData,
        "su_eSrukMplQonJE0"
      )
      .then(() => {
        alert("Enquiry submitted successfully!");

        setFormData({
          fullName: "",
          phone: "",
          email: "",
          eventType: "",
          eventDate: "",
          guests: "",
          location: "",
          message: "",
        });

        setErrors({});
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to submit enquiry.");
        setLoading(false);
      });

  };

  const fields = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      placeholder: "Enter your full name",
      icon: <User className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "tel",
      placeholder: "Enter your phone number",
      icon: <Phone className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      icon: <Mail className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Type of Event",
      name: "eventType",
      type: "select",
      options: [
        { value: "", label: "Select Event Type" },
        { value: "Wedding", label: "Wedding" },
        { value: "Birthday Party", label: "Birthday Party" },
        { value: "Corporate Event", label: "Corporate Event" },
        { value: "Music Concert", label: "Music Concert" },
        { value: "Sports Event", label: "Sports Event" },
        { value: "College Fest", label: "College Fest" },
        { value: "Cultural Event", label: "Cultural Event" },
        { value: "Other", label: "Other" },
      ],
    },
    {
      label: "Event Date",
      name: "eventDate",
      type: "date",
      icon: <Calendar className="w-4 h-4 text-gray-400" />,
      min: today,
    },
    {
      label: "Expected Guests",
      name: "guests",
      type: "number",
      placeholder: "Number of Guests",
      icon: <Users className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Event Location",
      name: "location",
      type: "text",
      placeholder: "City / Venue",
      icon: <MapPin className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Additional Requirements",
      name: "message",
      type: "textarea",
      placeholder: "Tell us about your event...",
      icon: <ClipboardList className="w-4 h-4 text-gray-400" />,
    },
  ];
    return (
    <section className="w-full bg-gray-50 py-20 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">

        <div className="text-center mb-10">

          <div className="inline-block bg-purple-100 px-5 py-2 rounded-full mb-4">
            <p className="text-purple-700 font-semibold">
              Plan Your Event
            </p>
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Let's Create Something Amazing
          </h1>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Fill in your event details and our team will contact you
            shortly with the perfect event solution.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {fields.map(
            ({
              label,
              name,
              type,
              placeholder,
              icon,
              options,
              min,
            }) => (
              <div
                key={name}
                className={
                  type === "textarea"
                    ? "md:col-span-2"
                    : ""
                }
              >

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {label}
                </label>

                <div
                  className={`flex items-start gap-3 border rounded-xl px-4 py-3 transition-all ${
                    errors[name]
                      ? "border-red-500"
                      : "border-gray-300 focus-within:border-purple-600"
                  }`}
                >

                  {icon && (
                    <div className="mt-1">
                      {icon}
                    </div>
                  )}

                  {type === "select" ? (
                    <select
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent outline-none"
                    >
                      {options.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>

                  ) : type === "textarea" ? (

                    <textarea
                      rows="5"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full bg-transparent outline-none resize-none"
                    />

                  ) : (

                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      min={min}
                      required={name !== "message"}
                      maxLength={
                        name === "phone"
                          ? 10
                          : undefined
                      }
                      onInput={(e) => {
                        if (name === "phone") {
                          e.target.value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                        }
                      }}
                      className="w-full bg-transparent outline-none"
                    />

                  )}

                </div>

                {errors[name] && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors[name]}
                  </p>
                )}

              </div>
            )
          )}

          <div className="md:col-span-2 text-center mt-6">

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading
                ? "Sending Enquiry..."
                : "Send Enquiry"}
            </button>

          </div>

        </form>

      </div>

    </section>
  );
};

export default FormPage;