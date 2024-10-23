"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/ssr";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/config/routes";

export default function TwoFactorVerifyPage(): JSX.Element {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong. Please try again.</div>}
    >
      <TwoFactorVerify />
    </ErrorBoundary>
  );
}

function TwoFactorVerify(): JSX.Element {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  async function handleVerify(): Promise<void> {
    setIsLoading(true);
    try {
      const { data: factorsData, error: factorsError } =
        await supabase.auth.mfa.listFactors();
      if (factorsError) throw factorsError;

      const totpFactor = factorsData.totp[0];
      if (!totpFactor) throw new Error("No TOTP factor found");

      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId: totpFactor.id });
      if (challengeError) throw challengeError;

      const { error } = await supabase.auth.mfa.verify({
        factorId: totpFactor.id,
        challengeId: challengeData.id,
        code: verificationCode,
      });
      if (error) throw error;

      router.push(routes.dashboard);
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      toast({
        title: "Error",
        description: "Failed to verify 2FA code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-6">
        Verify Two-Factor Authentication
      </h1>
      <Input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Enter verification code"
        className="mb-4 w-64"
        disabled={isLoading}
      />
      <Button onClick={handleVerify} disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
    </div>
  );
}
