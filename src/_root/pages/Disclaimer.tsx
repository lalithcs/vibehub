import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"

const Disclaimer = () => {
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
    },
  })

  const handleContinue = () => {
    if (!agreed) {
      toast({
        title: "Please accept the terms",
        description: "You must agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }
    
    // Store agreement in localStorage
    localStorage.setItem("disclaimerAgreed", "true")
    navigate("/")
  }

  const handleFeedbackSubmit = (values: { name: string; email: string; feedback: string }) => {
    // Log feedback data (you can send this to your backend)
    console.log("Feedback submitted:", values)
    
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    })
    form.reset()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-1 px-4">
      <div className="w-full max-w-4xl bg-dark-2 rounded-lg p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="/assets/images/logo.svg"
            alt="VibeHub Logo"
            className="mx-auto mb-4"
            width={200}
            height={50}
          />
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to VibeHub</h1>
          <p className="text-light-3">Please read and accept our terms before continuing</p>
        </div>

        {/* Disclaimer Content */}
        <div className="bg-dark-3 rounded-lg p-6 mb-8 max-h-96 overflow-y-auto custom-scrollbar">
          <h2 className="text-xl font-semibold text-white mb-4">Terms and Conditions</h2>
          
          <div className="space-y-4 text-light-2">
            <div>
              <h3 className="font-semibold text-white mb-2">1. Acceptance of Terms</h3>
              <p>By accessing and using VibeHub, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">2. User Content</h3>
              <p>Users are responsible for the content they post. All content must comply with our community guidelines and applicable laws.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">3. Privacy Policy</h3>
              <p>We respect your privacy and are committed to protecting your personal data. Please review our privacy policy for more information.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">4. Job Postings Disclaimer</h3>
              <p>The information and job links posted on this website are provided by third parties. We are not responsible for the accuracy, reliability, or legitimacy of any job postings or external links shared on this site. Any interactions with companies regarding job opportunities are solely between the company and the user.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">5. Prohibited Activities</h3>
              <p>Users must not engage in harassment, spam, illegal activities, or any behavior that violates our community standards.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">6. Intellectual Property</h3>
              <p>All intellectual property rights in VibeHub remain with us or our licensors. Users retain rights to their own content.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">7. Limitation of Liability</h3>
              <p>VibeHub is provided "as is" without warranties. We are not liable for any damages arising from the use of our platform or interactions with third parties.</p>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mr-3 h-4 w-4 rounded border-gray-600 bg-dark-4 text-primary-500 focus:ring-primary-500"
          />
          <label htmlFor="agree" className="text-light-2">
            I have read and agree to the terms and conditions
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 items-center justify-center mb-8">
          <Button
            type="button"
            className="shad-button_dark_4 px-8"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="shad-button_primary px-8"
            onClick={handleContinue}
            disabled={!agreed}
          >
            Continue to VibeHub
          </Button>
        </div>

        {/* Feedback Form */}
        <div className="border-t border-dark-4 pt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Have feedback about our terms?</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFeedbackSubmit)} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="shad-form_label">Name (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          className="shad-input" 
                          placeholder="Your name"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="shad-form_label">Email (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          className="shad-input" 
                          placeholder="your.email@example.com"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Feedback</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="shad-textarea custom-scrollbar" 
                        placeholder="Share your thoughts about our terms and conditions..."
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" className="shad-button_primary">
                  Submit Feedback
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer