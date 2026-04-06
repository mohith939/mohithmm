import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15),
  subject: z.string().min(2, "Subject must be at least 2 characters").max(100),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-accent mb-4 block">Get In Touch</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-lg mx-auto">
            We'd love to hear from you. Reach out anytime!
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Let's Talk</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Have a question about our products, want to place a bulk order, or just want to say hello? We're here for you.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                  { icon: Mail, label: "Email", value: "hello@milletmithai.com", href: "mailto:hello@milletmithai.com" },
                  { icon: MapPin, label: "Location", value: "Hyderabad, India", href: "#" },
                  { icon: Clock, label: "Hours", value: "Mon–Sat, 9 AM – 7 PM", href: "#" },
                ].map((item, index) => (
                  <a key={index} href={item.href} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/8 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-lg space-y-6">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <h3 className="font-heading text-xl font-bold text-foreground">Send a Message</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What's this about?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what's on your mind..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full rounded-full gap-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Send className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

