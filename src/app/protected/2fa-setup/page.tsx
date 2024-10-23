"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/ssr";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TwoFactorSetup() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const checkEnrollmentStatus = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;
      setIsEnrolled(data.totp.length > 0);
    } catch (error) {
      console.error("Error checking 2FA status:", error);
    }
  }, [supabase.auth.mfa]);

  useEffect(() => {
    checkEnrollmentStatus();
  }, [checkEnrollmentStatus]);

  async function handleEnroll() {
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
      });
      if (error) throw error;
      if (data.totp) {
        setQrCode(data.totp.qr_code);
        setSecret(data.totp.secret);
      }
    } catch (error) {
      console.error("Error enrolling in 2FA:", error);
      toast({
        title: "Error",
        description: "Failed to enroll in 2FA. Please try again.",
        variant: "destructive",
      });
    }
  }

  async function handleVerify() {
    if (!secret) return;
    try {
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId: secret });
      if (challengeError) throw challengeError;

      const { error } = await supabase.auth.mfa.verify({
        factorId: secret,
        challengeId: challengeData.id,
        code: verificationCode,
      });
      if (error) throw error;

      setIsEnrolled(true);
      toast({
        title: "Success",
        description: "Two-factor authentication has been enabled.",
      });
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      toast({
        title: "Error",
        description: "Failed to verify 2FA code. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (isEnrolled) {
    return (
      <div className="text-center">
        Two-factor authentication is already enabled.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-6">
        Set up Two-Factor Authentication
      </h1>
      {!qrCode && <Button onClick={handleEnroll}>Enroll in 2FA</Button>}
      {qrCode && (
        <>
          <Image src={qrCode} alt="QR Code for 2FA" width={200} height={200} />
          <p className="mt-4 mb-4">Secret: {secret}</p>
          <Input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            className="mb-4 w-64"
          />
          <Button onClick={handleVerify}>Verify</Button>
        </>
      )}
    </div>
  );
}
