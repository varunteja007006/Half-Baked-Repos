import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gauge, Car, Users, Route, BarChart3, Shield, Mail, Phone, DollarSign } from "lucide-react";
import { BRAND_NAME, BRAND_EMAIL } from "@/lib/config/brand";

const features = [
  {
    icon: Car,
    title: "Fleet Management",
    description: "Comprehensive vehicle tracking and maintenance scheduling for your entire fleet.",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    icon: Users,
    title: "Driver Management",
    description: "Manage driver profiles, licenses, and assignments with ease.",
    color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
  },
  {
    icon: Route,
    title: "Trip Planning",
    description: "Optimize routes and track trips in real-time for maximum efficiency.",
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Get insights into your fleet performance with detailed analytics.",
    color: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Ensure compliance with industry standards and maintain security protocols.",
    color: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
  },
  {
    icon: DollarSign,
    title: "Cost Effective Solutions",
    description:
      "Reduce operational costs with simple, streamlined processes and automated workflows.",
    color: "bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="space-y-6 sm:space-y-8 p-4 sm:p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Gauge className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {BRAND_NAME}
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Effortlessly manage your fleet, drivers, and trips with our comprehensive fleet
            management solution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/auth/signin">
              <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                Get Started
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto cursor-pointer">
                Learn More
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Car className="h-3 w-3" />
              Fleet Tracking
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Driver Management
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Analytics
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="space-y-6 sm:space-y-8 p-4 sm:p-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Everything You Need to Manage Your Fleet
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive fleet management system provides all the tools you need to efficiently
            manage your fleet operations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.title} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className="space-y-6 sm:space-y-8 p-4 sm:p-6 mb-10">
        <div className="max-w-2xl mx-auto text-center min-h-[40vh] flex flex-col justify-center h-full space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions or need support? We&apos;re here to help you get started.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center space-x-3 p-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Email Support</p>
                <a href={`mailto:${BRAND_EMAIL}`} className="text-sm text-primary hover:underline">
                  {BRAND_EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Phone Support</p>
                <p className="text-sm text-muted-foreground">+91 1234567890</p>
              </div>
            </div>
          </div>

          <Link href="/auth/signin">
            <Button className="w-full sm:w-auto cursor-pointer">
              Start Managing Your Fleet Today
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
