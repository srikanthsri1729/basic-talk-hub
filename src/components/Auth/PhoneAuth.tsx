import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Phone, Shield } from 'lucide-react';
// import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const PhoneAuth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate OTP sending for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll skip actual Supabase integration
      // const { error } = await supabase.auth.signInWithOtp({
      //   phone: phone,
      //   options: { shouldCreateUser: true }
      // });
      // if (error) throw error;

      setStep('otp');
      toast({
        title: "OTP sent!",
        description: `Verification code sent to ${phone}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate OTP verification for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll skip actual verification
      // const { error } = await supabase.auth.verifyOtp({
      //   phone: phone,
      //   token: otp,
      //   type: 'sms'
      // });
      // if (error) throw error;
      
      // Simulate successful login
      localStorage.setItem('whatsapp_user', JSON.stringify({ phone, id: 'demo-user' }));

      toast({
        title: "Welcome to WhatsApp!",
        description: "Successfully logged in",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-whatsapp flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-whatsapp rounded-full p-3">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to WhatsApp</CardTitle>
          <CardDescription>
            {step === 'phone' 
              ? 'Enter your phone number to get started'
              : 'Enter the verification code sent to your phone'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-whatsapp hover:bg-whatsapp-dark"
                disabled={loading || !phone}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">
                  Verification Code
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 text-center tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-whatsapp hover:bg-whatsapp-dark"
                disabled={loading || otp.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="w-full"
                onClick={() => setStep('phone')}
              >
                Change Phone Number
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};