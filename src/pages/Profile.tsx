import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ProfileForm = {
  display_name: string;
  phone: string;
  address: string;
  gender: string;
};

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const getAvatarUrl = (gender: string) => {
    if (gender === 'male') {
      return 'https://api.dicebear.com/7.x/avataaars/svg?seed=male&backgroundColor=b6e3f4&clothesColor=262e33,3c4043,5199e4,25557c,1e2a4a,929598,2a2a2a,b5bdcc&topColor=a55728,b58143,bb9a20,4a312c,d6b370,724133,2c1b18&hairColor=724133,2c1b18,a55728,b58143,724133,d6b370&eyebrowColor=2c1b18&eyeColor=4a312c&skinColor=f0c2a6,dba589';
    } else if (gender === 'female') {
      return 'https://api.dicebear.com/7.x/avataaars/svg?seed=female&backgroundColor=fda4af&clothesColor=ff0000,dc2626,f97316,eab308,22c55e,06b6d4,3b82f6,8b5cf6&topColor=b58143,bb9a20,d6b370,ff0000,dc2626&hairColor=724133,2c1b18,a55728,b58143,724133,d6b370&eyebrowColor=2c1b18&eyeColor=4a312c&skinColor=f0c2a6,dba589';
    }
    return null;
  };

  const form = useForm<ProfileForm>({
    defaultValues: {
      display_name: "",
      phone: "",
      address: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

        if (data) {
          setProfile(data);
          form.reset({
            display_name: data.display_name || user.user_metadata?.display_name || "",
            phone: data.phone || "",
            address: data.address || "",
            gender: data.gender || "",
          });
        } else {
        // Set default display name from user metadata
        form.reset({
          display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || "",
          phone: "",
          address: "",
          gender: "",
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;

    setIsLoading(true);
    
    try {
      const profileData = {
        user_id: user.id,
        display_name: data.display_name,
        phone: data.phone,
        address: data.address,
        gender: data.gender,
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      });
      
      fetchProfile(); // Refresh profile data
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card border-0 bg-white">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-healing rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 overflow-hidden">
                {profile?.gender && getAvatarUrl(profile.gender) ? (
                  <img 
                    src={getAvatarUrl(profile.gender)!} 
                    alt="Profile avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8" />
                )}
              </div>
              <CardTitle className="font-heading text-3xl font-bold text-foreground">
                My Profile
              </CardTitle>
              <CardDescription className="text-warm-gray">
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Account Information</h3>
                <p className="text-warm-gray text-sm">Email: {user.email}</p>
                <p className="text-warm-gray text-sm">Account created: {new Date(user.created_at).toLocaleDateString()}</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="display_name"
                    rules={{
                      required: "Display name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Display Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your display name" 
                            className="border-border focus:ring-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="Enter your phone number" 
                            className="border-border focus:ring-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your address" 
                            className="border-border focus:ring-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-border focus:ring-primary">
                              <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-gentle"
                    disabled={isLoading}
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {isLoading ? "Saving..." : "Save Profile"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;