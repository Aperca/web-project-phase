import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

type FormStates = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormStates>();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit((data) => {
          console.log("Form submitted:", data);
          setSubmitted(true);
          reset();
        })}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>
  
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
  
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
  
          <div className="flex flex-col space-y-1">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Write your message"
              rows={4}
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send
        </button>
  
        {submitted && (
          <p className="text-green-600 text-center mt-4">
            Form successfully submitted!
          </p>
        )}
  
        <DevTool control={control} />
      </form>
    </div>
  );
} 

export default ContactForm