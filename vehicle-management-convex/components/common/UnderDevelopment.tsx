"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Construction, Wrench, Clock, ArrowLeft, Code, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

interface UnderDevelopmentProps {
  /**
   * The title of the feature/page under development
   */
  title?: string;

  /**
   * Optional description of what's being worked on
   */
  description?: string;

  /**
   * Expected completion date or timeline
   */
  expectedCompletion?: string;

  /**
   * Show a back button
   */
  showBackButton?: boolean;

  /**
   * Custom back button action
   */
  onBack?: () => void;

  /**
   * Additional features/items being worked on
   */
  features?: string[];

  /**
   * Contact information for questions
   */
  contactInfo?: string;

  /**
   * Custom className for styling
   */
  className?: string;

  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg" | "full";

  /**
   * Theme variant
   */
  variant?: "default" | "minimal" | "detailed";
}

export default function UnderDevelopment({
  title = "Under Development",
  description = "This feature is currently being developed and will be available soon.",
  expectedCompletion,
  showBackButton = true,
  onBack,
  features = [],
  contactInfo,
  className,
  size = "md",
  variant = "default",
}: Readonly<UnderDevelopmentProps>) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    full: "w-full",
  };

  const getIconSize = () => {
    if (size === "sm") return 48;
    if (size === "md") return 64;
    return 80;
  };
  const iconSize = getIconSize();

  if (variant === "minimal") {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
        <Construction className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {showBackButton && (
          <Button variant="outline" onClick={handleBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("container mx-auto p-4 md:p-6 lg:p-8", className)}>
      <div className={cn("mx-auto", sizeClasses[size])}>
        <Card className="border border-dashed border-border bg-muted/30">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Construction className="text-primary animate-pulse" size={iconSize} />
                <div className="absolute top-0 right-0 translate-x-2 -translate-y-2">
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3 mr-1" />
                    In Progress
                  </Badge>
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {expectedCompletion && (
              <div className="bg-background/50 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Expected Completion:</span>
                  <span className="text-primary font-semibold">{expectedCompletion}</span>
                </div>
              </div>
            )}

            {features.length > 0 && variant === "detailed" && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Features in Development:</h4>
                </div>
                <div className="grid gap-2">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-3 p-3 bg-muted/40 rounded-lg border border-border"
                    >
                      <Code className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {contactInfo && variant === "detailed" && (
              <div className="bg-accent/30 rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Wrench className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Questions or Feedback?</span>
                </div>
                <p className="text-sm text-muted-foreground">{contactInfo}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              {showBackButton && (
                <Button variant="outline" onClick={handleBack} className="min-w-[120px]">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              )}

              <Button
                variant="secondary"
                className="min-w-[120px]"
                onClick={() => window.location.reload()}
              >
                <Construction className="h-4 w-4 mr-2" />
                Check Again
              </Button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                This page will automatically update when the feature is ready
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Export some pre-configured variants for common use cases
export const UnderDevelopmentPage = (props: Omit<UnderDevelopmentProps, "size" | "variant">) => (
  <UnderDevelopment {...props} size="lg" variant="detailed" />
);

export const UnderDevelopmentSection = (props: Omit<UnderDevelopmentProps, "size" | "variant">) => (
  <UnderDevelopment {...props} size="md" variant="default" />
);

export const UnderDevelopmentCard = (props: Omit<UnderDevelopmentProps, "size" | "variant">) => (
  <UnderDevelopment {...props} size="sm" variant="minimal" />
);
