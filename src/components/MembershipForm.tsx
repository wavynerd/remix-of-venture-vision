import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const membershipSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email format"),
  location: z.string().min(2, "Location is required"),
  businessSize: z.string().min(1, "Please select business size"),
  industry: z.string().min(1, "Please select an industry"),
  interestType: z.enum(["investor", "investee"], {
    errorMap: () => ({ message: "Please select interest type" })
  }),
  // Additional fields for investors
  investorCategory: z.string().optional(),
  // Additional fields for companies seeking funding
  companyType: z.string().optional(),
  valuationCurrency: z.string().optional(),
  valuationAmount: z.string().optional(),
});

type MembershipFormData = z.infer<typeof membershipSchema>;

interface MembershipFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultInterestType?: "investor" | "investee";
  title?: string;
}

const MembershipForm = ({ open, onOpenChange, defaultInterestType = "investor", title = "Apply for Membership" }: MembershipFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      businessSize: "",
      industry: "",
      interestType: defaultInterestType,
      investorCategory: "",
      companyType: "",
      valuationCurrency: "",
      valuationAmount: "",
    },
  });

  const watchInterestType = form.watch("interestType");

  const onSubmit = async (data: MembershipFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", data);
    
    toast({
      title: "Application Submitted Successfully!",
      description: `Thank you, ${data.name}. We've received your ${data.interestType} application and will review it shortly.`,
    });
    
    setIsSubmitting(false);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Lagos, Nigeria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interestType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interest type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="investor">Investor - Looking to invest</SelectItem>
                      <SelectItem value="investee">Investee - Seeking funding</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchInterestType === "investor" && (
              <FormField
                control={form.control}
                name="investorCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investor Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investor category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="angel">Angel Investor</SelectItem>
                        <SelectItem value="private-equity">Private Equity</SelectItem>
                        <SelectItem value="venture-capital">Venture Capital</SelectItem>
                        <SelectItem value="hnwi">HNWI or UHNWI</SelectItem>
                        <SelectItem value="fund-manager">Fund / Asset Managers</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchInterestType === "investee" && (
              <FormField
                control={form.control}
                name="companyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="startup">Start up</SelectItem>
                        <SelectItem value="sme">SME</SelectItem>
                        <SelectItem value="large">Large companies</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                      <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                      <SelectItem value="Oil & Gas">Oil & Gas</SelectItem>
                      <SelectItem value="FinTech">FinTech</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Size</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchInterestType === "investee" && (
              <>
                <FormField
                  control={form.control}
                  name="companyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="startup">Start up</SelectItem>
                          <SelectItem value="sme">SME</SelectItem>
                          <SelectItem value="large">Large companies</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valuationCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valuation Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ngn">NGN (₦)</SelectItem>
                          <SelectItem value="usd">USD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valuationAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Capitalisation / Valuation</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="e.g., 5000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipForm;
